// Base de datos de los 7 Niveles Educativos de Gestión de Ingresos
// Con la narrativa de los Snacks: Masmelo, M&Ms, DeTodito y Galletitas

const GAME_LEVELS = [
  {
    id: 1,
    title: "El DeTodito: Los 4 Ingredientes del Prompt",
    subtitle: "Rol + Contexto + Pasos + Formato = Claude no se inventa nada, pues",
    snackName: "DeTodito",
    iconType: "detodito",
    snackReward: "1 DeTodito + 3 M&Ms",
    concept: "La fórmula de los 4 ingredientes",
    humorIntro: "¡Ave María! Mario le escribió a Claude 'ayudame con estos ingresos'... y Claude le mandó un poema. Sin contexto, Claude se pone a inventar, mijo.",
    lesson: `
      <div class="lesson-snack-card">
        <h4>Vea pues, todo buen prompt lleva 4 ingredientes:</h4>
        <ul class="snack-recipe-list">
          <li><strong>🍌 Rol:</strong> <em>"Actuá como analista de Gestión de Ingresos."</em></li>
          <li><strong>🥓 Contexto:</strong> <em>"Son pagos de clientes con retenciones."</em></li>
          <li><strong>🥔 Pasos:</strong> <em>"1. Identificá 2. Clasificá 3. Alertá."</em></li>
          <li><strong>🌮 Formato:</strong> <em>"Entregámelo en tabla."</em></li>
        </ul>
      </div>
    `,
    caseDataTitle: "Pagos de hoy sin clasificar:",
    caseData: `1. TRF-9021 | Distribuidora Norte | $12.062.500 | Factura #450 menos Retefuente 3.5%
2. PSE-8812 | Inversiones El Diamante | $3.200.000 | "Abono a cuenta", sin factura
3. TRF-1102 | Desconocido | $500.000 | Sin descripción`,
    challengeGoal: "Escribí un prompt con los 4 ingredientes pa' clasificar estos 3 pagos y alertar los que estén raros.",
    recommendedTemplate: `Actuá como analista de Gestión de Ingresos.

CONTEXTO: Son pagos de clientes que pueden traer retenciones.

PASOS:
1. Identificá cliente, monto y factura de cada pago.
2. Clasificá: Conciliado, Pendiente Soporte o No Identificado.
3. Alertá los pagos sin factura o sin cliente.

FORMATO: Tabla con columnas | Ref | Cliente | Monto | Factura | Estado | Alerta |`,
  },
  {
    id: 2,
    title: "La Dieta de los M&Ms: Ahorrá Tokens",
    subtitle: "Menos carreta = respuestas más rápidas y más baratas",
    snackName: "M&Ms",
    iconType: "mm",
    snackReward: "1 Puñado de M&Ms",
    concept: "Ahorro de tokens",
    humorIntro: "Carlos pegó un Excel de 10.000 filas lleno de columnas vacías. ¡Se tragó todos los M&Ms en 4 minutos, qué boleta!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>Cada palabra cuesta M&Ms (tokens), parce:</h4>
        <ul class="snack-recipe-list">
          <li><strong>Sin tanta carreta:</strong> Nada de saludos larguísimos.</li>
          <li><strong>Limpiá el Excel:</strong> Quitá las columnas vacías antes de pegar.</li>
          <li><strong>Pedí CSV:</strong> "Solo CSV, sin explicaciones."</li>
          <li><strong>Chat nuevo pa' cada tema:</strong> Los chats largos te cobran todo otra vez.</li>
        </ul>
      </div>
    `,
    caseDataTitle: "Registro de cartera todo desordenado:",
    caseData: `REPORTE CONFIDENCIAL - Hoja 1 de 1 - No imprimir
Cliente: DISTRIBUIDORA ANDINA | NIT: 900.123.456-7 | Tel: 6013456789 | Fax: N/A | Vendedor: Juan Pérez | Factura: 1045 | Días Mora: 10 | Saldo: 17.850.000 | Obs: promete pagar la otra semana`,
    challengeGoal: "Pedile a Claude solo NIT, Factura, Días Mora, Saldo y Acción en CSV, con el prompt más cortico que podás.",
    recommendedTemplate: `Actuá como analista de cartera.
Identificá y sacá del cliente solo: NIT, Factura, DiasMora, Saldo, Accion.
Formato: CSV, sin saludos ni explicaciones.`,
  },
  {
    id: 3,
    title: "El Escuadrón Masmelo: ¿Cuál Modelo Uso?",
    subtitle: "Haiku, Sonnet u Opus: cada camello tiene su masmelo",
    snackName: "Masmelo",
    iconType: "masmelo",
    snackReward: "2 Masmelos",
    concept: "Escoger modelo y herramienta",
    humorIntro: "Catalina usó Opus pa' preguntar qué es un NIT, y Haiku pa' una auditoría de $5.000 millones. ¡Todo al revés, pues!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>Escogé bien, mijo:</h4>
        <ul class="snack-recipe-list">
          <li><strong>Haiku:</strong> Rapidito y barato. Pa' tareas masivas y sencillas.</li>
          <li><strong>Sonnet:</strong> El del día a día. Conciliaciones, correos, fórmulas.</li>
          <li><strong>Opus:</strong> Pa' lo más berraco y de alto riesgo.</li>
          <li><strong>Artifacts:</strong> Tablas y apps interactivas. <strong>Projects:</strong> Memoria con tus políticas.</li>
        </ul>
      </div>
    `,
    caseDataTitle: "3 camellos del día:",
    caseData: `A: Clasificar 2.500 transacciones PSE en 3 categorías.
B: Crear un buscador interactivo de clientes con cartera vencida.
C: Diseñar la política de reconocimiento de ingresos NIIF 15.`,
    challengeGoal: "Pedile a Claude que le ponga modelo y herramienta a cada tarea, con una razón cortica.",
    recommendedTemplate: `Actuá como asesor de IA pa' Gestión de Ingresos.
Para cada tarea, analizá y asigná modelo (Haiku, Sonnet u Opus) y herramienta (Chat, Artifacts o Projects).
Formato: tabla | Tarea | Modelo | Herramienta | Razón (1 línea) |`,
  },
  {
    id: 4,
    title: "El Monstruo de la Conciliación",
    subtitle: "Banco vs ERP: pagos agrupados y retenciones",
    snackName: "Papas Margarita",
    iconType: "detodito",
    snackReward: "1 Galleta + Papas",
    concept: "Conciliación automática",
    humorIntro: "Viernes 4:30 PM: entró un pago de $18.525.000 que no cuadra con ninguna factura. ¡Catalina está que llora, Ave María!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>Decile a Claude cómo cruzar:</h4>
        <ul class="snack-recipe-list">
          <li><strong>Pagos agrupados:</strong> "Si no cuadra con 1 factura, probá sumando varias."</li>
          <li><strong>Retenciones:</strong> "Mirá si la diferencia es 2.5% o 3.5%."</li>
          <li><strong>Redondeo:</strong> "Diferencias de menos de $100 son ajuste."</li>
        </ul>
      </div>
    `,
    caseDataTitle: "Banco vs Facturas ERP:",
    caseData: `BANCO:
- Transf 501: $18.525.000 | Agroinsumos
- Transf 502: $330.000 | No identificado

ERP (retención 2.5%):
- Fac 101 Agroinsumos: $10.000.000 → neto $9.750.000
- Fac 102 Agroinsumos: $9.000.000 → neto $8.775.000`,
    challengeGoal: "Pedile a Claude que cruce banco vs ERP, encuentre qué facturas paga la 501 y alerte la 502.",
    recommendedTemplate: `Actuá como analista de conciliación bancaria.
CONTEXTO: Los clientes pagan varias facturas en una sola transferencia, con retención del 2.5%.
PASOS:
1. Cruzá cada transferencia con las facturas (probá sumando varias).
2. Validá la retención aplicada.
3. Marcá como Huérfano lo que no cruce.
FORMATO: tabla | Ref Banco | Cliente | Monto | Facturas | Diferencia | Estado |`,
  },
  {
    id: 5,
    title: "La Fábrica de Galletas: Armá tu Agente",
    subtitle: "Un molde fijo pa' que todos saquen el mismo resultado",
    snackName: "Galleta",
    iconType: "galleta",
    snackReward: "1 Galleta + 5 M&Ms",
    concept: "System Prompt y Guardrails",
    humorIntro: "Cada analista le pide cosas a Claude a su manera y los informes parecen un sancocho. Toca hornear un agente, pues.",
    lesson: `
      <div class="lesson-snack-card">
        <h4>Un agente tiene:</h4>
        <ul class="snack-recipe-list">
          <li><strong>Rol fijo:</strong> Quién es y qué hace.</li>
          <li><strong>Reglas (Guardrails):</strong> "NUNCA te inventés datos."</li>
          <li><strong>Salida fija:</strong> Siempre el mismo JSON o tabla.</li>
        </ul>
      </div>
    `,
    caseDataTitle: "Reglas del agente:",
    caseData: `1. Pagos de más de $20.000.000 → alerta SARLAFT.
2. Retención de más del 4% → alerta RETENCIÓN_EXCESIVA.
3. Salida: JSON.`,
    challengeGoal: "Escribí el System Prompt del agente con su rol, las 2 reglas y la salida en JSON.",
    recommendedTemplate: `Sos un agente de conciliación de ingresos.
Validá cada pago con estas REGLAS:
1. Si el pago pasa de $20.000.000, marcá "alerta_sarlaft": true.
2. Si la retención pasa del 4%, marcá "alerta_retencion": "EXCESIVA".
3. Nunca te inventés datos; si falta algo, poné "[NO_DISPONIBLE]".
FORMATO JSON: { "cliente", "monto", "retencion", "alerta_sarlaft", "alerta_retencion", "estado" }`,
  },
  {
    id: 6,
    title: "El Domador de Correos",
    subtitle: "Respuestas rapiditas con semáforo y buena actitud",
    snackName: "M&Ms Arcoíris",
    iconType: "mm",
    snackReward: "M&Ms + 1 Masmelo",
    concept: "Correos con IA",
    humorIntro: "Son las 4:55 PM y Carlos tiene 47 correos sin contestar. ¡Está más embalado que un cajero en quincena!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>Usá el semáforo:</h4>
        <ul class="snack-recipe-list">
          <li><strong>🟢 Verde:</strong> Pago OK → agradecé y confirmá.</li>
          <li><strong>🟡 Amarillo:</strong> Pago con diferencia → pedí el soporte.</li>
          <li><strong>🔴 Rojo:</strong> No hay pago → pedí el comprobante.</li>
          <li><strong>Tono:</strong> Amable, claro y cortico.</li>
        </ul>
      </div>
    `,
    caseDataTitle: "Correos que llegaron:",
    caseData: `1. Ferretería Bogotá: "Pagué $8.500.000, ¡despachen ya!" (Llegó con $350.000 de descuento no pactado)
2. Médicos SAS: "Adjunto pago factura #1209, ¿paz y salvo?" (Conciliado OK)
3. Transportes Col: "Ya pagamos, desbloqueen." (Sin soporte)`,
    challengeGoal: "Pedile a Claude que clasifique los 3 correos con el semáforo y redacte respuestas corticas.",
    recommendedTemplate: `Actuá como analista de cartera.
PASOS:
1. Clasificá cada correo: Verde, Amarillo o Rojo.
2. Redactá una respuesta cortica y amable pa' cada cliente.
FORMATO: Para cada correo: Cliente | Semáforo | Respuesta (máx. 4 líneas).`,
  },
  {
    id: 7,
    title: "El Megazord: Conectá Claude a Google",
    subtitle: "Gmail + Drive + Sheets camellando solitos",
    snackName: "Combo Supremo",
    iconType: "star",
    snackReward: "¡El Mega Combo completo!",
    concept: "Automatización con Google Workspace",
    humorIntro: "El equipo sigue bajando PDFs a mano como en 2002. ¡Mario descubre que Claude se conecta a Google y casi se le riega el tinto!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>Conectá y automatizá:</h4>
        <ul class="snack-recipe-list">
          <li><strong>Gmail:</strong> Lee los comprobantes que llegan.</li>
          <li><strong>Drive:</strong> Guarda los PDFs solito.</li>
          <li><strong>Sheets:</strong> Registra y cruza con las facturas.</li>
          <li><strong>Conectores (MCP, Apps Script):</strong> Juntan todo sin tocar el mouse.</li>
        </ul>
      </div>
    `,
    caseDataTitle: "Proceso a mano (3 horas al día):",
    caseData: `1. Llegan 30 comprobantes por correo.
2. Se bajan uno por uno.
3. Se digitan en Excel y se cruzan con facturas.
4. Se le confirma al cliente por correo.`,
    challengeGoal: "Pedile a Claude que diseñe el flujo automático Gmail → Drive → Sheets → respuesta.",
    recommendedTemplate: `Actuá como experto en automatización de Gestión de Ingresos.
CONTEXTO: Nos llegan 30 comprobantes de pago diarios por correo.
PASOS: Diseñá el flujo automático:
1. Gmail recibe el comprobante.
2. Drive lo guarda.
3. Claude saca Monto, Fecha, NIT y Factura.
4. Sheets registra y cruza con facturas.
5. Gmail arma la respuesta al cliente.
FORMATO: lista de pasos + horas ahorradas.`,
  },
];

// Glosario de Snacks pa' consulta del equipo
const SNACK_LORE = {
  masmelo: {
    title: "El Masmelo (Claude)",
    iconType: "masmelo",
    role: "El Modelo de IA",
    desc: "Suavecito y se acomoda a todo. Con buen contexto te saca el mes. Con un prompt flojo se quema y se inventa pagos, ¡Ave María!",
  },
  mms: {
    title: "Los M&Ms (Tokens)",
    iconType: "mm",
    role: "La Energía y el Costo de la IA",
    desc: "Cada palabra cuesta M&Ms. No los botés en carreta; limpiá las tablas y andá al grano.",
  },
  detodito: {
    title: "El DeTodito (Contexto)",
    iconType: "detodito",
    role: "Los 4 Ingredientes del Prompt",
    desc: "Plátano (Rol) + Chicharrón (Contexto) + Margarita (Pasos) + Tostacos (Formato). Si le falta uno, queda incompleto, pues.",
  },
  galletitas: {
    title: "Las Galletitas (Agentes y Proyectos)",
    iconType: "galleta",
    role: "Recetas Horneadas que se Repiten",
    desc: "Tienen molde fijo. Horneás un agente con System Prompt y Guardrails y el equipo concilia con un solo clic.",
  },
};

