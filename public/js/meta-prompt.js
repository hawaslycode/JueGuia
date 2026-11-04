// Meta-Prompt Maestro para Recrear y Clonar JueGuIA con IA (Gemini, Claude o GPT)

const META_PROMPT_TEXT = `
Actúa como un Diseñador de Videojuegos Educativos y Arquitecto Full-Stack Senior en Inteligencia Artificial.

OBJETIVO:
Crea un videojuego web interactivo 2D responsivo (para PC y teléfonos móviles) titulado "JueGuIA — La Odisea de Gestión de Ingresos (Edición Snack-IA)", diseñado para capacitar a un equipo corporativo de Gestión de Ingresos (Revenue Management, Facturación, Recaudo y Conciliación) en el dominio profesional de Claude AI, evaluando y ejecutando sus prompts en vivo mediante la API de Google Gemini (gemini-3.8-flash).

1. LA NARRATIVA DEL COMPARTIR (METÁFORA DE LOS SNACKS):
El juego debe estructurar toda la pedagogía alrededor de 4 snacks reales llevados a la sesión de trabajo:
- MASMELOS (Claude): El modelo de IA. Es suave y maleable, pero si se le tira un prompt vago de 3 palabras, se quema por fuera, queda crudo por dentro y alucina pagos ficticios.
- M&Ms (Tokens): La moneda de energía y costo. Cada palabra, número o celda vacía de Excel cuesta M&Ms de la bolsa. Enseña a podar tablas, usar CSV y evitar saludos ceremoniales.
- DETODITO (Contexto Multimodal de 4 Ingredientes):
    * Plátano: El Rol experto innegociable.
    * Chicharrón: El Contexto y datos del negocio (extractos bancarios, facturas).
    * Margarita: Instrucciones secuenciales paso a paso.
    * Tostacos: El Formato de salida obligatorio (Tablas con columnas exactas, CSV o JSON).
- GALLETITAS (Agentes y Proyectos): Recetas horneadas repetibles. Tienen molde fijo, System Prompt y Guardrails anti-alucinación.

2. LOS 7 NIVELES DE APRENDIZAJE:
- Nivel 1: El Efecto DeTodito (Anatomía del Prompt Profesional y los 4 ingredientes).
- Nivel 2: La Dieta de los M&Ms (Ahorro ninja de Tokens y compresión de tablas).
- Nivel 3: El Escuadrón Masmelo (Cuándo usar Claude Haiku, Sonnet u Opus; Chat vs Artifacts vs Projects).
- Nivel 4: El Monstruo de la Conciliación (Automatización de cruces Bancos vs ERP, pagos agrupados, retenciones fiscales de Renta/ICA y centavos de diferencia).
- Nivel 5: La Fábrica de Galletas (Creación de Agentes con System Prompts y Guardrails estrictos).
- Nivel 6: El Domador de Correos (Clasificación por semáforo y respuestas empáticas automáticas para cobranza y confirmación).
- Nivel 7: El Megazord Conectado (Conexión de Claude con Google Workspace: Gmail, Drive, Sheets, Calendar y herramientas externas).

3. EXPERIENCIA MULTIPLATAFORMA Y MESA DE JUGADORES:
- Onboarding inicial que solicite: Nombre completo, Área/Cargo a la que pertenece (Gestión de Ingresos, Cartera, Contabilidad, etc.) y selección de Avatar.
- Mesa de Juego en Vivo: Los compañeros conectados deben aparecer sentados en la mesa o caminando por la oficina, mostrando su nombre, área y la insignia del nivel que van pasando.
- Controles:
    * PC: Flechas del teclado o WASD para moverse, Espacio o Enter para interactuar.
    * Móvil: Cruceta táctil virtual (D-Pad) y botón de acción (A) con soporte ergonómico vertical y horizontal.
- Iconos vectoriales reales (SVG) en lugar de emojis.
- Tipografía y renderizado sin sobreescritura de texto, adaptativo a pantallas grandes y móviles.
- Alerta de Snack Físico al aprobar cada nivel: mensaje animado para reclamar el snack en la mesa.
- Recetario de Prompts descargable (.md) para llevarse los prompts al trabajo diario.
- Certificado Oficial de Graduación personalizable y descargable en PNG.

4. ARQUITECTURA TÉCNICA:
- Servidor: Node.js + Express con endpoint /api/evaluate-prompt conectado a Google Gemini 3.8 Flash (@google/genai) que califique el prompt (0-100), entregue veredicto de tokens (M&Ms), feedback humorístico y simulación exacta de la respuesta de Claude.
- Endpoint /api/network-info con código QR automático para que los compañeros se conecten desde sus celulares en la misma red Wi-Fi.
- Motor de respaldo local para jugar offline si no hay API Key disponible.
`;

function openMetaPromptModal() {
  const modal = document.getElementById("meta-prompt-modal");
  const textarea = document.getElementById("meta-prompt-content");
  if (textarea) {
    textarea.value = META_PROMPT_TEXT.trim();
  }
  if (modal) {
    modal.classList.add("active");
  }
}
