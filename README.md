# 🎮 JueGuIA: La Odisea de Gestión de Ingresos (Edición Snack-IA)

Un videojuego web interactivo 2D para enseñar a los compañeros del equipo de **Gestión de Ingresos (Revenue Management)** a dominar **Claude AI** desde cero hasta la creación de agentes, conciliaciones complejas y automatizaciones con Google Workspace, evaluando sus prompts en vivo mediante la **API de Google Gemini (`gemini-3.8-flash`)**.

---

## 🍿 La Metáfora de los Snacks del Compartir

| Snack Físico | Símbolo en el Juego | Concepto de IA | Significado Humorístico |
| :--- | :--- | :--- | :--- |
| 🍥 **Masmelos** | Claude-Mallow | **El Modelo de IA (Claude)** | Esponjoso y adaptable. Si le tiras un prompt vago de 3 palabras, **se quema por fuera, queda crudo por dentro y alucina pagos que no existen**. |
| 🍫 **M&Ms** | M&M-Tokens | **Tokens (Energía y Costo)** | Cada sílaba, número o fila vacía de Excel cuesta M&Ms de la bolsa. No los desperdicies en saludos eternos ni en tablas sucias. |
| 🥔 **DeTodito** | Combo Multimodal | **Contexto (4 Ingredientes)** | **Plátano** (Rol experto) + **Chicharrón** (Contexto y reglas de negocio) + **Margarita** (Pasos ordenados) + **Tostacos** (Formato innegociable de tabla o JSON). |
| 🍪 **Galletitas** | Galleta-Agente | **Agentes y Proyectos** | Recetas horneadas repetibles. Tienen molde fijo, System Prompt y Guardrails para que el equipo concilie con un solo clic. |

---

## 🗺️ Los 7 Niveles de Gestión de Ingresos

1. 🥔 **Nivel 1: El Efecto DeTodito:** Los 4 ingredientes obligatorios para que Claude no alucine.
2. 🍫 **Nivel 2: La Dieta de los M&Ms:** Ahorro ninja de tokens, compresión a CSV y limpieza de archivos de Excel.
3. 🍥 **Nivel 3: El Escuadrón Masmelo:** Cuándo usar Claude Haiku, Sonnet u Opus, y cuándo usar Chat vs Artifacts vs Projects.
4. ⚖️ **Nivel 4: El Monstruo de la Conciliación:** Cruce automatizado de extractos bancarios vs ERP (SAP/Siigo), pagos agrupados, retenciones fiscales y diferencias de centavos.
5. 🍪 **Nivel 5: La Fábrica de Galletas:** Cómo hornear Agentes con System Prompts, Guardrails anti-alucinación y salida JSON estandarizada.
6. 📧 **Nivel 6: El Domador de Correos:** Respuestas inteligentes parametrizadas para cobranza, confirmación de pagos y reclamos comerciales.
7. 🚀 **Nivel 7: El Megazord Conectado:** Integración total con Google Workspace (Gmail, Drive, Sheets, Calendar) y conectores MCP / automatizaciones para ahorrar 3 horas de trabajo al día.

---

## 🕹️ Controles

* **En Computadora (PC / Mac):**
  * **Moverse:** Flechas del teclado (`↑`, `↓`, `←`, `→`) o teclas `W`, `A`, `S`, `D`.
  * **Interactuar:** Barra `ESPACIO` o `ENTER` cuando estés cerca de una terminal, compañero o mesa de snacks.
  * **Cerrar Ventanas:** Tecla `ESC`.
* **En Celular / Tablet:**
  * **Cruceta Virtual (D-Pad):** Botones táctiles en pantalla para caminar.
  * **Botón A:** Toca para interactuar.
* **Navegación Rápida:** Selector en la barra superior para saltar directamente a cualquier nivel.

---

## 🚀 Cómo Iniciar el Servidor

1. Abre una terminal en la carpeta del proyecto:
   ```bash
   cd c:\Users\hawaslycode\Desktop\JueGuIA
   ```
2. Inicia el servidor:
   ```bash
   npm start
   ```
3. Accede desde tu navegador:
   * **En tu computador:** `http://localhost:3000`
   * **En el celular de tus compañeros:** Abre el menú **"📱 Celular QR"** en la barra superior para que escaneen el código QR con su cámara, o ingresa directamente a `http://<TU-IP-LOCAL>:3000`.

---

## 🔑 Conectar tu API Key de Gemini (`gemini-3.8-flash`)

Hay dos formas muy sencillas de activarla:

1. **Desde el archivo `.env` (Recomendado para toda la sala):**
   Abre el archivo `.env` en la raíz del proyecto y escribe tu clave:
   ```env
   GEMINI_API_KEY=AIzaSyTuClaveDeGoogleGemini...
   PORT=3000
   ```
   *Al iniciar el servidor, todos los compañeros conectados desde su PC o celular usarán automáticamente esta clave.*

2. **Desde el botón ⚙️ en el juego:**
   Haz clic en el icono de tuerca `⚙️` en la esquina superior derecha y pega tu API Key. El juego la verificará en vivo con el modelo `gemini-3.8-flash`.

> [!NOTE]
> Si juegas sin API Key, el juego cuenta con un **Motor Inteligente de Respaldo Local** que detecta los ingredientes del DeTodito, calcula el gasto de M&Ms y simula la respuesta de Claude para que nadie se quede sin jugar.

---

## 🎁 Funcionalidades Adicionales

* **Alerta de Recompensa Física:** Al aprobar cada nivel, el juego muestra en pantalla qué snack físico reclamar en la mesa del compartir.
* **📖 Recetario Descargable:** Guarda los prompts aprobados y permite descargarlos en formato Markdown (`.md`) para usarlos en el trabajo diario.
* **🎓 Certificado de Graduación:** Genera un diploma cómico oficial personalizado con el nombre del compañero, listo para descargar en imagen PNG.
* **🔊 Efectos de Sonido Retro:** Sintetizados en tiempo real con Web Audio API (cero descargas de audio externas).
