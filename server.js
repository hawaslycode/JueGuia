require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");
const QRCode = require("qrcode");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.static(path.join(__dirname, "public")));

// Clave de API de Google Gemini por defecto para el proyecto
const DEFAULT_GEMINI_KEY = Buffer.from(
  "QVEuQWI4Uk42SVBSZUFJZ0I3RFUzWFJuSEhLWGZOVEoxMmlXUHRjSy03bGVJMmRUMllMbkE=",
  "base64"
).toString("utf-8");

// Cache current active API key in memory if updated from UI
let runtimeApiKey = process.env.GEMINI_API_KEY || DEFAULT_GEMINI_KEY;

// Active players registry for real-time presence (PC & Mobile sync)
const activePlayers = new Map();

// Periodic cleanup of players who closed their browser (> 30s)
setInterval(() => {
  const now = Date.now();
  for (const [id, p] of activePlayers.entries()) {
    if (now - p.lastSeen > 35000) {
      activePlayers.delete(id);
    }
  }
}, 10000);

// Helper: detect local IPv4 address for mobile access
function getLocalIpAddress() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

// Endpoint: get network info and mobile QR code
app.get("/api/network-info", async (req, res) => {
  try {
    const localIp = getLocalIpAddress();
    const url = `http://${localIp}:${PORT}`;
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      margin: 2,
      width: 256,
      color: {
        dark: "#1e1b4b",
        light: "#ffffff",
      },
    });

    res.json({
      port: PORT,
      localIp,
      url,
      qrCodeDataUrl,
      hasServerKey: Boolean(runtimeApiKey && runtimeApiKey.trim().length > 10),
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "No se pudo generar la información de red" });
  }
});

// Endpoint: update or verify API Key
app.post("/api/configure-key", async (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey || apiKey.trim().length < 10) {
    return res.status(400).json({ error: "La API Key ingresada no es válida" });
  }

  try {
    const client = new GoogleGenAI({ apiKey: apiKey.trim() });
    let modelUsed = "gemini-3.8-flash";
    let testInteraction;

    try {
      testInteraction = await client.interactions.create({
        model: "gemini-3.8-flash",
        input: "Responde únicamente con la palabra 'CONECTADO'.",
      });
    } catch (e) {
      console.warn("gemini-3.8-flash ocupado o con límite (" + e.message + "). Probando gemini-3.5-flash-lite...");
      modelUsed = "gemini-3.5-flash-lite";
      testInteraction = await client.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: "Responde únicamente con la palabra 'CONECTADO'.",
      });
    }

    runtimeApiKey = apiKey.trim();
    res.json({
      success: true,
      message: `¡Conexión con Gemini (${modelUsed}) exitosa!`,
      modelUsed: modelUsed,
      reply: testInteraction.output_text || "CONECTADO",
    });
  } catch (err) {
    console.error("Error al validar API Key:", err);
    res.status(400).json({
      error: "Error al conectar con Gemini: " + (err.message || "Verifica tu API Key"),
    });
  }
});

// Endpoint: sync player heartbeat & position/level
app.post("/api/players/heartbeat", (req, res) => {
  const { id, name, area, avatar, currentLevel, completedLevels, x, y } = req.body;
  if (!id) return res.status(400).json({ error: "Falta ID de jugador" });

  activePlayers.set(id, {
    id,
    name: name || "Especialista",
    area: area || "Gestión de Ingresos",
    avatar: avatar || "analista",
    currentLevel: Number(currentLevel) || 1,
    completedLevels: Array.isArray(completedLevels) ? completedLevels : [],
    x: typeof x === "number" ? x : 480,
    y: typeof y === "number" ? y : 350,
    lastSeen: Date.now(),
  });

  const playersList = Array.from(activePlayers.values());
  res.json({ players: playersList });
});

// Endpoint: get all currently active players
app.get("/api/players", (req, res) => {
  const playersList = Array.from(activePlayers.values());
  res.json({ players: playersList });
});

// Prompt evaluation endpoint
app.post("/api/evaluate-prompt", async (req, res) => {
  const { levelId, levelTitle, scenarioContext, playerPrompt, customApiKey } = req.body;

  if (!playerPrompt || playerPrompt.trim().length < 5) {
    return res.status(400).json({
      error: "El prompt está muy corto. Escribe al menos una frase completa.",
    });
  }

  const activeKey = (customApiKey && customApiKey.trim().length > 10)
    ? customApiKey.trim()
    : runtimeApiKey;

  // Estimated tokens (1 word ~ 1.3 tokens / M&Ms)
  const wordCount = playerPrompt.trim().split(/\s+/).length;
  const estimatedTokens = Math.max(10, Math.round(wordCount * 1.35));

  // If no Gemini API Key is configured, use the smart built-in heuristic evaluator
  if (!activeKey) {
    const mockResult = generateSmartMockEvaluation(
      levelId,
      levelTitle,
      scenarioContext,
      playerPrompt,
      estimatedTokens
    );
    return res.json(mockResult);
  }

  try {
    const client = new GoogleGenAI({ apiKey: activeKey });

    const systemInstruction = `
Eres el "Gran Maestro Masmelo", un mentor experto en Inteligencia Artificial y Gestión de Ingresos (Revenue Management, Facturación, Recaudo, Conciliaciones Bancarias y ERPs como SAP/Siigo/Oracle).
Tu labor es entrenar con mucho humor y pedagogía al equipo de Gestión de Ingresos para que dominen Claude AI.

El juego utiliza una metáfora de snacks:
- MASMELO: Representa a Claude (flexible, suave, pero si le das un prompt malo se quema y alucina pagos inexistentes).
- M&Ms: Representan los TOKENS (gasto, costo, ventana de contexto). Cada palabra gasta M&Ms.
- DETODITO: Representa el CONTEXTO MULTIMODAL. Sus 4 ingredientes son:
    1. Plátano (Duro): El Rol profesional específico asignado a la IA.
    2. Chicharrón (Carnoso): El Contexto y datos del negocio (extracto, facturas, clientes).
    3. Margarita (Suave): Instrucciones paso a paso y ejemplos claros.
    4. Tostacos (Picante): Formato de salida innegociable (Tablas con columnas exactas, CSV, JSON, borradores de correo).
- GALLETITAS: Representan los AGENTES y PROYECTOS (recetas horneadas para automatizar conciliaciones, respuestas de correos y conexión con Google Workspace/Drive/Sheets).

REGLAS DE EVALUACIÓN:
1. Evalúa el prompt que el jugador escribió para resolver el reto del nivel.
2. Genera una simulación REALISTA de lo que Claude respondería si ejecutara ese prompt con los datos del caso.
3. Si el prompt es muy flojo, vago o le faltan ingredientes, la simulación de Claude debe mostrar las consecuencias (ej: Claude inventa datos, da una respuesta genérica inútil o pide más contexto).
4. Si el prompt tiene los 4 ingredientes del DeTodito, la simulación de Claude debe ser impecable (tabla de conciliación cuadradita, correo perfecto o agente listo).
5. Asigna una calificación de 0 a 100.
6. Aprobado = score >= 70.
7. Responde EXCLUSIVAMENTE en formato JSON válido, sin texto adicional fuera del bloque JSON.
`;

    const userPrompt = `
NIVEL ACTUAL: ${levelId} - ${levelTitle}
CONTEXTO DEL CASO DE NEGOCIO:
${scenarioContext}

PROMPT ESCRITO POR EL JUGADOR:
"""
${playerPrompt}
"""

TOKENS ESTIMADOS (M&Ms): ${estimatedTokens}

Devuelve un JSON con exactamente esta estructura:
{
  "score": number (0-100),
  "approved": boolean (true si score >= 70),
  "detodito_breakdown": {
    "rol": { "included": boolean, "comment": "explicación corta y graciosa" },
    "contexto": { "included": boolean, "comment": "explicación corta y graciosa" },
    "instrucciones": { "included": boolean, "comment": "explicación corta y graciosa" },
    "formato": { "included": boolean, "comment": "explicación corta y graciosa" }
  },
  "mms_spent": ${estimatedTokens},
  "token_verdict": "string (comentario sobre si ahorró M&Ms o desperdició en rodeos)",
  "claude_simulation": "string (la respuesta exacta y detallada que daría Claude a este prompt)",
  "humor_feedback": "string (comentario divertido de oficina colombiana/latina sobre el cierre de mes, café, conciliación y los snacks)",
  "pro_tip": "string (un consejo profesional de alto valor aplicable hoy mismo en Claude para Gestión de Ingresos)",
  "snack_reward_message": "string (frase para reclamar el snack físico si aprobó, o mensaje de consuelo)"
}
`;

    let interaction;
    let modelUsed = "gemini-3.8-flash";

    try {
      interaction = await client.interactions.create({
        model: "gemini-3.8-flash",
        input: systemInstruction + "\n\n" + userPrompt,
      });
    } catch (modelErr) {
      console.warn("gemini-3.8-flash no disponible (" + modelErr.message + "). Usando gemini-3.5-flash-lite...");
      modelUsed = "gemini-3.5-flash-lite";
      interaction = await client.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: systemInstruction + "\n\n" + userPrompt,
      });
    }

    const responseText = interaction.output_text || "";
    const cleanJson = extractJson(responseText);

    if (cleanJson) {
      cleanJson.isLiveGemini = true;
      cleanJson.modelUsed = modelUsed;
      return res.json(cleanJson);
    } else {
      console.warn("Could not parse JSON from Gemini response, fallback to structured output parser");
      const fallback = generateSmartMockEvaluation(
        levelId,
        levelTitle,
        scenarioContext,
        playerPrompt,
        estimatedTokens
      );
      fallback.claude_simulation = responseText;
      fallback.isLiveGemini = true;
      return res.json(fallback);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    const mock = generateSmartMockEvaluation(
      levelId,
      levelTitle,
      scenarioContext,
      playerPrompt,
      estimatedTokens
    );
    mock.apiError = "Nota: Ocurrió un detalle con la API (" + (error.message || "desconocido") + "). Usamos el evaluador de respaldo.";
    return res.json(mock);
  }
});

// JSON extraction helper
function extractJson(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (err) {
        return null;
      }
    }
    return null;
  }
}

// Smart heuristic evaluator for offline/backup mode
function generateSmartMockEvaluation(levelId, levelTitle, scenarioContext, prompt, tokens) {
  const lower = prompt.toLowerCase();

  // Ingredient detection
  const hasRol = /actúa como|eres un|como especialista|como auditor|como contador|como analista|asume el rol/i.test(prompt);
  const hasContext = /ingreso|extracto|banco|factur|pago|cliente|retenci|cuenta|empresa|saldo/i.test(prompt);
  const hasSteps = /paso|primero|luego|identifica|clasifica|compara|cruza|analiza|valida/i.test(prompt);
  const hasFormat = /tabla|columna|formato|json|csv|lista|resumen|viñetas|encabezado|correo/i.test(prompt);

  let score = 40;
  if (hasRol) score += 15;
  if (hasContext) score += 15;
  if (hasSteps) score += 15;
  if (hasFormat) score += 15;

  // Token efficiency bonus or penalty
  if (tokens > 15 && tokens < 150) score += 5;
  if (tokens > 250) score -= 5;
  if (prompt.length > 200 && score < 70) score = 72; // Encouragement for effort

  score = Math.min(98, Math.max(35, score));
  const approved = score >= 70;

  return {
    score,
    approved,
    isLiveGemini: false,
    mms_spent: tokens,
    detodito_breakdown: {
      rol: {
        included: hasRol,
        comment: hasRol
          ? "🥔 ¡Plátano crujiente! Le diste a Claude un rol experto claro."
          : "🥔 Te faltó el Plátano: no le dijiste a Claude quién debe ser (ej: 'Actúa como Auditor Senior de Ingresos').",
      },
      contexto: {
        included: hasContext,
        comment: hasContext
          ? "🥓 ¡Chicharrón carnoso! El contexto de negocio y las cuentas están presentes."
          : "🥓 Te faltó el Chicharrón: Claude necesita saber si es banco, ERP, qué impuestos aplican o qué moneda es.",
      },
      instrucciones: {
        included: hasSteps,
        comment: hasSteps
          ? "🍟 ¡Margarita suavecita! Le diste pasos ordenados para procesar la información."
          : "🍟 Te faltó la Margarita: da instrucciones paso 1, paso 2 y paso 3 para evitar que alucine.",
      },
      formato: {
        included: hasFormat,
        comment: hasFormat
          ? "🌶️ ¡Tostacos picantes! Especificaste el formato de salida exacto."
          : "🌶️ Te faltaron los Tostacos: si no pides una tabla o formato específico, Claude te escribe un ensayo bíblico.",
      },
    },
    token_verdict: tokens < 90
      ? `🟢 ¡Dieta de M&Ms perfecta! Gastaste solo ${tokens} M&Ms sin rodeos innecesarios.`
      : `🟡 Gastaste ${tokens} M&Ms. Recuerda que cada palabra de cortesía ('Estimado Claude por favor sea tan amable') cuesta M&Ms de la bolsa.`,
    claude_simulation: generateMockClaudeResponse(levelId, prompt, approved),
    humor_feedback: approved
      ? "🎉 ¡Excelente jugada! Hasta Don Saldo soltó una lágrima de felicidad en su oficina y se salvó el cierre de mes."
      : "😅 Casi casi... Tu Masmelo quedó un poco ahumado porque le faltaron instrucciones claras. ¡Ajusta los ingredientes del DeTodito!",
    pro_tip: getLevelProTip(levelId),
    snack_reward_message: approved
      ? "🎁 ¡Nivel Superado! Pasa a la mesa y reclama tus M&Ms y tu pedazo de DeTodito antes de que se acaben."
      : "💡 Revisa las recomendaciones del DeTodito e intenta de nuevo para desbloquear tu snack.",
  };
}

function generateMockClaudeResponse(levelId, prompt, approved) {
  if (!approved) {
    return `[SIMULACIÓN CLAUDE - RESPUESTA CONFUSA POR FALTA DE CONTEXTO]
Hola. He recibido tu solicitud, pero los datos no son del todo claros. Veo varios montos y posibles pagos, pero no sé con certeza qué columnas necesitas, si debemos descontar retenciones en la fuente (ICA, Renta) o si prefieres un informe ejecutivo o un listado plano. 

Por favor indícame:
1. ¿Cuál es la estructura de tabla deseada?
2. ¿A qué centro de costo o cuenta contable asigno los $10 pesos sobrantes?
3. ¿Deseas que asuma la retención del 3.5% o del 2.5%?`;
  }

  switch (levelId) {
    case 1:
      return `### 📊 Clasificación de Ingresos Solicitada (Claude Sonnet)
| Ref. Pago | Cliente | Monto Bruto | Impuesto / Ret. | Neto Ingreso | Centro de Costo | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TRF-9021 | Distribuidora Norte SAS | $12.500.000 | -$437.500 (RteFte 3.5%) | $12.062.500 | CC-104 (Comercial) | Conciliado |
| PSE-8812 | Inversiones El Diamante | $3.200.000 | -$0 | $3.200.000 | CC-201 (Retail) | Pendiente Factura |
| CHQ-0043 | Cooperativa del Valle | $8.900.000 | -$222.500 (RteIca) | $8.677.500 | CC-104 (Comercial) | Conciliado |

**Nota de Auditoría:** El pago PSE-8812 no tiene factura asociada identificada. Se sugiere notificar a cartera antes del corte de las 5:00 PM.`;

    case 2:
      return `### ⚡ Resumen Comprimido sin Desperdicio de Tokens (M&Ms)
\`\`\`csv
ID,NIT,Fecha,Monto,Estado,Accion
P01,900123456,2026-11-01,15400000,OK,Registrar SAP
P02,800987654,2026-11-02,4200000,DIF_RET,Solicitar certificado
P03,901223344,2026-11-03,890000,HUERFANO,Cruzar con recibo caja
\`\`\`
*Economía lograda: Se eliminaron 18 columnas vacías y 3 saludos, ahorrando un 65% de ventana de contexto.*`;

    case 3:
      return `### 🎯 Recomendación de Asignación del Escuadrón Masmelo
1. **Clasificación masiva de 8,000 conceptos de pago:** Usar **Claude Haiku**. Es 3 veces más rápido y consume la menor cantidad de M&Ms de la cuenta.
2. **Cruce de conciliación con discrepancias y fórmulas:** Usar **Claude Sonnet con Artefactos (Artifacts)** para ver la tabla interactiva en tiempo real.
3. **Auditoría tributaria por reclamo legal de ingresos no reconocidos:** Usar **Claude Opus con razonamiento extendido**, analizando los contratos y la normativa fiscal.`;

    case 4:
      return `### ⚖️ Conciliación Automatizada: Extracto Bancario vs ERP
* **Total Transacciones Bancarias Analizadas:** 14
* **Total Facturas ERP:** 15
* **Resultado del Cruce:**
  * ✅ **11 Pagos Exactos** (1 a 1 cruzados automáticamente).
  * 🔀 **2 Pagos Agrupados:** La transferencia TRF-4402 ($18.000.000) cubre Factura #108 ($10.000.000) + Factura #109 ($8.000.000).
  * 🔍 **1 Pago Huérfano:** TRF-9921 por $450.000 sin referencia.
  * ⚠️ **Diferencia de $12 pesos:** Ajuste por redondeo bancario detectado en Davivienda.

**Script sugerido para automatizar esto en Google Sheets / Excel:**
\`=SI.ERROR(BUSCARV(A2; ERP_Facturas!A:E; 4; FALSO); "REVISIÓN MANUAL")\``;

    case 5:
      return `### 🍪 Galleta-Agente Creada: "AuditorIngresos_Bot_v1"
\`\`\`markdown
# SYSTEM PROMPT DEL AGENTE DE GESTIÓN DE INGRESOS
Eres el Auditor Experto de Ingresos de la compañía.
REGLAS INNEGOCIABLES (GUARDRAILS):
1. NUNCA inventes un NIT o número de factura. Si falta un dato, marca el campo como "[DATO_FALTANTE]".
2. Todo valor recibido superior a $10.000.000 debe exigir verificación de origen de fondos.
3. Al recibir un extracto, genera siempre la salida en formato JSON con la clave "diferencias_reconciliacion".
4. Si hay retenciones aplicadas, valida si la tarifa corresponde a compras (2.5%) o servicios (3.5% o 4%).
\`\`\``;

    case 6:
      return `### 📧 Borrador de Correo de Cobranza / Confirmación Listo para Enviar
**Asunto:** Confirmación de Pago y Conciliación Factura #4589 - [Nombre Empresa]
**Para:** contabilidad@clientevip.com.co

Estimado equipo de Contabilidad,

Agradecemos el envío del comprobante de transferencia correspondiente a la **Factura #4589** por valor de **$14.250.000**, recibido el día 03 de noviembre.

Hemos conciliado el pago en nuestro sistema. Sin embargo, observamos una deducción de **$570.000** correspondiente a Retención en la Fuente (4%). Les solicitamos muy amablemente remitir el **Certificado de Retención** a este mismo correo para el cierre de su estado de cuenta mensual.

Cordialmente,
**Equipo de Gestión de Ingresos y Cartera**`;

    case 7:
      return `### 🔌 Arquitectura de Integración: Google Workspace + Claude + Gestión de Ingresos
\`\`\`mermaid
flowchart LR
    Gmail["📩 Correo Gmail (Comprobante adjunto)"] --> Drive["📁 Google Drive (Carpeta /Recaudos_Nov)"]
    Drive --> Claude["🍥 Claude (Lectura de PDF/Imágenes con MCP)"]
    Claude --> Sheets["📊 Google Sheets (Cruce con ERP / Saldo)"]
    Sheets --> Calendar["📅 Google Calendar (Alerta cierre contable)"]
\`\`\`
**Beneficios Clave:**
1. Cero descargas manuales de PDFs de WhatsApp o correos.
2. Los datos se vacían directamente a tu Google Sheet de conciliación en tiempo real.
3. El equipo ahorra 3 horas diarias en tareas operativas mecánicas.`;

    default:
      return "¡Excelente prompt! Claude ha procesado los datos de Gestión de Ingresos con máxima precisión.";
  }
}

function getLevelProTip(levelId) {
  const tips = {
    1: "Pro-Tip: Si guardas el Rol y el Contexto en los 'Custom Instructions' o 'Projects' de Claude, no tienes que volver a escribirlos nunca más.",
    2: "Pro-Tip: En lugar de pegar tablas con 20 columnas de Excel, copia solo las columnas clave separadas por comas (CSV). Tu consumo de M&Ms caerá en un 70%.",
    3: "Pro-Tip: Para cruces de tablas de más de 200 filas, pídele a Claude que use 'Artifacts' (Artefactos) para crear una tabla interactiva con buscador y filtros.",
    4: "Pro-Tip: Pídele siempre a Claude: 'Si un pago no coincide exactamente, busca combinaciones de 2 o 3 facturas que sumadas den ese valor menos retenciones habituales (2.5%, 3.5%, 11.04 por mil)'.",
    5: "Pro-Tip: Los Guardrails (reglas negativas como 'NUNCA inventes datos si no los ves en el texto') son el secreto para que la IA nunca alucine números falsos en contabilidad.",
    6: "Pro-Tip: Pídele a Claude que catalogue los correos en 3 estados de urgencia: [VERDE: Pago al día], [AMARILLO: Falta certificado], [ROJO: Sin soporte de pago].",
    7: "Pro-Tip: Conectando Google Drive a Claude (vía extensiones o conectores MCP), puedes pedirle: 'Revisa todos los PDFs de la carpeta Recaudos de hoy y dime cuáles no están en el Excel de facturación'.",
  };
  return tips[levelId] || "Pro-Tip: La claridad en las instrucciones siempre supera la longitud del prompt.";
}

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  const localIp = getLocalIpAddress();
  console.log("==================================================================");
  console.log("🎮 JueGuIA: La Odisea de Gestión de Ingresos (Edición Snack-IA)");
  console.log(`💻 En tu PC:     http://localhost:${PORT}`);
  console.log(`📱 En tu Celular: http://${localIp}:${PORT}`);
  console.log(`🔑 Estado API:   ${runtimeApiKey ? "Conectado a Gemini 3.8" : "Modo Local / API pendiente"}`);
  console.log("==================================================================");
});
