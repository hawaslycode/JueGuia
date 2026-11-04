// Base de datos de los 7 Niveles Educativos de Gestión de Ingresos
// Con la narrativa de los Snacks: Masmelo, M&Ms, DeTodito y Galletitas

const GAME_LEVELS = [
  {
    id: 1,
    title: "El Efecto DeTodito: Anatomía de un Prompt Profesional",
    subtitle: "Aprende los 4 ingredientes indispensables para que Claude no alucine",
    snackName: "DeTodito (Papas Variadas)",
    iconType: "detodito",
    snackReward: "1 Paquete de DeTodito + 3 M&Ms",
    concept: "Contexto Multimodal & Fórmula de 4 Ingredientes",
    humorIntro: "Son las 9:00 AM. Don Saldo, el jefe de operaciones, le escribió a Claude: 'Ayúdame con estos ingresos'. Claude, al no tener contexto, le respondió con un poema de tres estrofas sobre la abundancia financiera del universo. ¡Don Saldo casi colapsa del susto!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>La Fórmula del DeTodito para Prompts de Gestión de Ingresos:</h4>
        <p>Un prompt profesional no es una frase al aire; es un paquete completo de 4 sabores:</p>
        <ul class="snack-recipe-list">
          <li><strong>1. Plátano Maduro (El Rol Innegociable):</strong> Quién es Claude. <em>Ej: "Actúa como especialista senior en Gestión de Ingresos y Recaudo..."</em></li>
          <li><strong>2. Chicharrón Carnoso (El Contexto del Negocio):</strong> Dónde estamos y qué reglas aplican. <em>Ej: "Trabajamos con facturación B2B, impuestos colombianos (Retefuente 2.5% o 3.5% y ReteICA 11.04/1000)..."</em></li>
          <li><strong>3. Papitas Margarita (Instrucciones Paso a Paso):</strong> La receta ordenada. <em>Ej: "Paso 1: Identifica el cliente. Paso 2: Calcula retenciones. Paso 3: Alerta si falta factura..."</em></li>
          <li><strong>4. Tostacos Picantes (El Formato de Salida Obligatorio):</strong> Cómo quieres la respuesta. <em>Ej: "Devuélveme una tabla Markdown con las columnas [ID, Cliente, Monto Bruto, Retención, Neto, Centro de Costo, Estado]..."</em></li>
        </ul>
      </div>
    `,
    caseDataTitle: "Transacciones de la Mañana (Llegaron al correo sin clasificar):",
    caseData: `1. Ref: TRF-9021 | Cliente: Distribuidora Norte SAS | Monto consignado: $12.062.500 | Concepto: Pago factura servicios soporte TI #450 ($12.500.000 menos retención del 3.5%).
2. Ref: PSE-8812 | Cliente: Inversiones El Diamante | Monto consignado: $3.200.000 | Concepto: "Abono a cuenta". No indica factura ni NIT visible.
3. Ref: CHQ-0043 | Cliente: Cooperativa del Valle | Monto consignado: $8.677.500 | Concepto: Factura venta insumos #890 por $8.900.000 (aplicaron ReteICA del 2.5%).
4. Ref: TRF-1102 | Cliente: Desconocido (Consignación nacional efectivo) | Monto: $500.000 | Concepto: Sin descripción.`,
    challengeGoal: "Escribe un prompt que le dé a Claude los 4 ingredientes del DeTodito (Rol, Contexto, Instrucciones y Formato de Tabla) para clasificar estas 4 transacciones, calcular retenciones y alertar sobre transacciones dudosas.",
    recommendedTemplate: `Actúa como especialista senior en Gestión de Ingresos y Recaudo.

CONTEXTO:
Manejamos recaudos empresariales donde los clientes pagan facturas comerciales aplicando retenciones en la fuente e ICA. Necesitamos procesar los ingresos recibidos hoy.

INSTRUCCIONES:
1. Revisa cada una de las siguientes 4 transacciones.
2. Identifica el cliente, el monto bruto de la factura y las deducciones aplicadas.
3. Clasifica el estado: "Conciliado", "Pendiente Soporte" o "Depósito No Identificado".
4. Si un pago no tiene factura o cliente identificado, agrega una alerta prioritaria de auditoría.

FORMATO DE SALIDA:
Entrega una tabla Markdown clara con las columnas:
| Ref | Cliente | Monto Recibido | Deducción/Retención | Factura Asociada | Estado | Alerta de Acción |`,
  },
  {
    id: 2,
    title: "La Dieta de los M&Ms: Ahorro Ninja de Tokens",
    subtitle: "Cómo procesar miles de datos sin quemar el presupuesto ni la memoria de Claude",
    snackName: "M&Ms (La Moneda de Tokens)",
    iconType: "mm",
    snackReward: "1 Puñado Generoso de M&Ms",
    concept: "Optimización de Tokens, Ventana de Contexto y Limpieza de Datos",
    humorIntro: "El compañero Carlos copió y pegó un Excel de 10,000 filas con 40 columnas vacías, fotos de firmas escaneadas y un encabezado de 5 páginas. Se gastó la cuota mensual de M&Ms de la empresa en 4 minutos y Claude se quedó mudo a mitad del cálculo.",
    lesson: `
      <div class="lesson-snack-card">
        <h4>¿Qué es un Token (M&M) y por qué cada grano de chocolate cuenta?</h4>
        <p>En los modelos de IA como Claude, <strong>1 Token ≈ 0.75 palabras</strong>. Si le hablas con rodeos o le pegas basura, gastas tus M&Ms inútilmente:</p>
        <ul class="snack-recipe-list">
          <li><strong>Regla 1: Cero Cortesías Eternas:</strong> Decirle <em>'Estimado señor don Claude, espero que su día vaya de maravilla, le agradecería enormemente si pudiera tener la gentileza de...'</em> gasta 25 M&Ms que no aportan nada al cierre contable.</li>
          <li><strong>Regla 2: Poda el Excel antes de pegarlo:</strong> Elimina columnas vacías, totales repetidos y formatos raros. Convierte tus tablas a formato <strong>CSV</strong> o <strong>Markdown compacto</strong>.</li>
          <li><strong>Regla 3: Nuevos Chats para Nuevos Temas:</strong> Cada vez que continúas un chat viejo de 50 mensajes, Claude relee TODOS los mensajes anteriores y te cobra los M&Ms de nuevo en cada pregunta.</li>
          <li><strong>Regla 4: Pide respuestas compactas:</strong> Instruye a la IA: <em>'Responde solo en tabla CSV sin introducciones ni despedidas'</em>.</li>
        </ul>
      </div>
    `,
    caseDataTitle: "Tabla Sucia de Cartera con Datos Basura que debes comprimir:",
    caseData: `Compañía XYZ - Reporte generado por el sistema a las 08:34:12 - Hoja 1 de 1 - CONFIDENCIAL - Favor no imprimir si no es necesario.
Fila vacía | Fila vacía | Fila vacía
Cliente Nombre: DISTRIBUIDORA ANDINA S.A.S. | NIT: 900.123.456-7 | Dirección: Calle 100 # 15-20 Bogotá | Tel: 6013456789 | Fax: N/A | Correo: contacto@andina.com | Vendedor: Juan Pérez | Zona: Centro | Factura No: 1045 | Fecha Emisión: 10/10/2026 | Fecha Vencimiento: 25/10/2026 | Días Mora: 10 | Valor Bruto: 15.000.000 | IVA: 2.850.000 | Total: 17.850.000 | Saldo Pendiente: 17.850.000 | Observaciones: Cliente promete pagar la otra semana si le aprueban el crédito bancario según llamada del cobrador el martes por la tarde.`,
    challengeGoal: "Escribe un prompt que le pida a Claude comprimir y extraer SOLO los campos críticos para la gestión de cobro (NIT, Factura, Días Mora, Saldo y Estado de Acción) en formato CSV ultra compacto, gastando el mínimo posible de M&Ms.",
    recommendedTemplate: `Actúa como procesador de datos contables de alta eficiencia.

TAREA:
Extrae de los datos del cliente únicamente los campos esenciales para el comité de cartera:
- NIT
- Factura
- Días Mora
- Saldo Pendiente
- Acción Recomendada (basada en la mora)

REGLAS DE AHORRO DE TOKENS:
- Salida EXCLUSIVAMENTE en bloque CSV delimitado por comas.
- Cero saludos, cero explicaciones y cero conclusiones.
- Formato: NIT,Factura,DiasMora,Saldo,Accion`,
  },
  {
    id: 3,
    title: "El Escuadrón Masmelo: ¿Qué Modelo o Herramienta Usar?",
    subtitle: "Domina Haiku, Sonnet, Opus, Artefactos y Proyectos sin quemar el dulce",
    snackName: "Masmelo Esponjoso",
    iconType: "masmelo",
    snackReward: "2 Masmelos Gigantes Suavecitos",
    concept: "Selección de Modelos de Claude y Funcionalidades (Artifacts vs Projects vs Chat)",
    humorIntro: "Lina, de conciliaciones, usó el modelo más pesado y costoso (Opus) para preguntarle a la IA qué significaba la sigla 'NIT', y luego usó el modelo más rápido y básico para cuadrar una auditoría de fusión empresarial con $5.000 millones en juego. ¡Casi quema la cocina!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>Conoce a tu Escuadrón Masmelo en Claude:</h4>
        <ul class="snack-recipe-list">
          <li><strong>Claude Haiku (El Masmelo Rápido):</strong> Ultra veloz y económico en M&Ms. Ideal para clasificar correos en masa, extraer 3 datos de 500 recibos o tareas repetitivas sencillas.</li>
          <li><strong>Claude Sonnet (El Masmelo Estrella del Negocio):</strong> El balance perfecto entre cerebro y velocidad. El 90% del trabajo de Gestión de Ingresos vive aquí: conciliaciones, tablas de análisis, fórmulas complejas de Excel/Sheets, redacción de correos y Artefactos interactivos.</li>
          <li><strong>Claude Opus (El Masmelo Sabio Pensador):</strong> Para cuando hay problemas tributarios gravísimos, análisis de contratos de 80 páginas o diseño de políticas de cobro complejas.</li>
          <li><strong>Herramientas Clave:</strong><br>
            • <strong>Artifacts (Artefactos):</strong> Ventana lateral en Claude que genera código, dashboards interactivos o tablas descargables sin ensuciar la conversación.<br>
            • <strong>Projects (Proyectos):</strong> Una carpeta donde dejas cargadas las políticas de la empresa para que Claude las recuerde siempre.
          </li>
        </ul>
      </div>
    `,
    caseDataTitle: "4 Desafíos del Día en Gestión de Ingresos:",
    caseData: `Caso A: Clasificar 2.500 descripciones de transacciones bancarias rápidas de PSE en 3 categorías: 'Tienda Web', 'Sucursal Física' o 'Transferencia Directa'.
Caso B: Crear una aplicación interactiva con buscador y filtros para que los vendedores consulten en tiempo real qué clientes tienen cartera vencida de más de 60 días.
Caso C: Diseñar la política corporativa de reconocimiento de ingresos bajo norma NIIF 15 / IFRS 15 para contratos de software con entregas escalonadas y garantías de 2 años.
Caso D: Redactar un correo conciliatorio para un cliente corporativo que dedujo $15.000.000 argumentando una devolución de mercancía que el almacén dice no haber recibido.`,
    challengeGoal: "Escribe un prompt que le asigne a cada uno de los 4 casos el modelo exacto de Claude (Haiku, Sonnet u Opus) y la funcionalidad (Chat normal, Artifacts o Projects), justificando el porqué en términos de ahorro de M&Ms y precisión.",
    recommendedTemplate: `Actúa como Arquitecto de Soluciones de IA para el área de Gestión de Ingresos.

OBJETIVO:
Asigna a cada uno de los 4 casos operativos la mejor combinación de modelo y herramienta de Claude:
- Modelo: Claude Haiku, Claude Sonnet o Claude Opus.
- Funcionalidad: Chat Convencional, Artifacts (Artefactos interactivos) o Projects (Proyectos con memoria).

CRITERIOS:
1. Máxima eficiencia de tokens (M&Ms).
2. Precisión requerida según el riesgo financiero.
3. Velocidad de respuesta para el usuario final.

FORMATO DE SALIDA:
Tabla comparativa con columnas: [Caso, Modelo Recomendado, Herramienta Claude, Justificación Operativa, Nivel de Ahorro de Tokens].`,
  },
  {
    id: 4,
    title: "El Monstruo de la Conciliación: Cruce Bancario vs ERP",
    subtitle: "Cómo automatizar pagos agrupados, retenciones fantasma y diferencias de centavos",
    snackName: "Papas Margarita Crujientes (del DeTodito)",
    iconType: "detodito",
    snackReward: "1 Galleta + 1 Ración de Papas Crujientes",
    concept: "Automatización de Conciliaciones, Lógica Multivariable y Detección de Descuadre",
    humorIntro: "Son las 4:30 PM de viernes de cierre contable. Aparece el Monstruo de la Conciliación: un pago único de $28.500.000 en Bancolombia que no coincide con ninguna factura individual, y una diferencia de $18 pesos que no deja cuadrar la cuenta T. ¡Lina está a punto de llorar en la cafetera!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>El Secreto para que Claude Concilie como un Dios Contable:</h4>
        <p>Los humanos fallan buscando combinaciones a ojo. A Claude debes darle la regla de <strong>búsqueda combinatoria y deducción de retenciones</strong>:</p>
        <ul class="snack-recipe-list">
          <li><strong>1. Instrucción de Pagos Agrupados (1 a N):</strong> <em>'Si una transferencia no coincide con una sola factura, busca combinaciones de 2, 3 o 4 facturas del mismo cliente cuya suma neta dé el valor exacto.'</em></li>
          <li><strong>2. Deducción de Retenciones Automática:</strong> <em>'Calcula si la diferencia corresponde exactamente al 2.5% o 3.5% de Retefuente o al 1.104% de ReteICA.'</em></li>
          <li><strong>3. Tolerancia de Redondeo:</strong> <em>'Si la diferencia es menor a $100 pesos, márcala como Ajuste por Redondeo Bancario y no detengas el cruce.'</em></li>
          <li><strong>4. Código o Fórmula de Replicación:</strong> Pídele a Claude que te genere la fórmula de Excel o el script de Google Sheets para que el próximo mes se haga en 2 segundos.</li>
        </ul>
      </div>
    `,
    caseDataTitle: "Extracto Bancario vs Facturas Pendientes en el ERP (SAP/Siigo):",
    caseData: `[EXTRACTO BANCO - ENTRADAS DE HOY]:
- Transf 501: $18.525.000 | Cliente: Agroinsumos SAS
- Transf 502: $4.875.000  | Cliente: Ferretería Central
- Transf 503: $330.000     | Cliente: Depósito no identificado (Efectivo cajero)

[FACTURAS ABIERTAS EN ERP]:
- Fac 101 (Agroinsumos): $10.000.000 (Retención esperada 2.5% = $250.000 -> Neto $9.750.000)
- Fac 102 (Agroinsumos): $9.000.000  (Retención esperada 2.5% = $225.000 -> Neto $8.775.000)
- Fac 103 (Ferretería Central): $5.000.000 (Retención esperada 2.5% = $125.000 -> Neto $4.875.000)
- Fac 104 (Comercializadora Sur): $3.500.000`,
    challengeGoal: "Escribe un prompt que le ordene a Claude cruzar automáticamente el extracto con el ERP, identificar qué facturas cubre la Transf 501 agrupada, verificar la Transf 502, alertar sobre el depósito huérfano 503 y entregar una tabla lista para contabilizar.",
    recommendedTemplate: `Actúa como Auditor Contable experto en Conciliación Bancaria y Recaudo.

CONTEXTO:
Tenemos un extracto bancario del día de hoy y una lista de facturas pendientes en el ERP. Algunos clientes pagan varias facturas en una sola transferencia y aplican deducciones fiscales.

INSTRUCCIONES DE CONCILIACIÓN:
1. Cruza cada transferencia bancaria contra las facturas abiertas.
2. Identifica si la Transf 501 de Agroinsumos corresponde a un pago agrupado (sumando los valores netos tras retención del 2.5%).
3. Valida si la Transf 502 cruza de forma exacta uno a uno.
4. Identifica las transacciones huérfanas (sin cruce en el ERP) y las facturas que quedaron sin pagar.

FORMATO DE ENTREGA:
Una tabla Markdown con:
[Ref Banco, Cliente, Monto Banco, Facturas ERP Cruzadas, Valor Bruto ERP, Retenciones Aplicadas, Diferencia, Estado (Conciliado Agrupado / Conciliado Directo / Huérfano), Acción Contable].`,
  },
  {
    id: 5,
    title: "La Fábrica de Galletas: Creación de Agentes y Proyectos",
    subtitle: "Hornea asistentes estandarizados con System Prompts y Guardrails",
    snackName: "Galletitas Horneadas",
    iconType: "galleta",
    snackReward: "1 Galleta Horneada con Chips de Chocolate + 5 M&Ms",
    concept: "System Prompts, Agentes Autónomos, Proyectos de Claude y Guardrails",
    humorIntro: "En la oficina cada analista le pide cosas a Claude a su manera: unos le hablan en verso, otros con faltas de ortografía y otros le piden que sea poeta. El resultado es que los informes de recaudo parecen un circo. ¡Es hora de hornear una Galleta-Agente con molde oficial!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>¿Cómo se Hornea un Agente o Proyecto en Claude?</h4>
        <p>Una Galleta ya tiene forma fija y no cambia. Un <strong>Agente (o Proyecto de Claude)</strong> tiene 4 ingredientes maestros:</p>
        <ul class="snack-recipe-list">
          <li><strong>1. System Prompt (Instrucción Central Permanente):</strong> La personalidad y reglas inmutables que se ejecutan antes de cualquier mensaje.</li>
          <li><strong>2. Base de Conocimiento (Archivos de Referencia):</strong> Subes el catálogo de cuentas contables, el manual de políticas de cartera y las tarifas de retención. Ya no tienes que volver a pegarlos en cada chat.</li>
          <li><strong>3. Guardrails (Barreras de Protección Anti-Alucinación):</strong> Reglas negativas estrictas: <em>'NUNCA inventes números. Si una factura no tiene soporte físico adjunto, reporta [SOPORTE_NO_ENCONTRADO] y detén el proceso'</em>.</li>
          <li><strong>4. Protocolo de Salida Estandarizado:</strong> El agente siempre responderá con la misma estructura JSON o tabla corporativa lista para importar al ERP.</li>
        </ul>
      </div>
    `,
    caseDataTitle: "Políticas que debe cumplir el nuevo Agente de Gestión de Ingresos:",
    caseData: `1. Nombre del Agente: Agente_Conciliador_Ingresos_v1.
2. Regla 1: Todo ingreso mayor a $20.000.000 requiere verificación SARLAFT / Origen de Fondos.
3. Regla 2: Si el cliente dedujo más del 4% en retenciones, marcar alerta [RETENCIÓN_EXCESIVA].
4. Regla 3: Si falta el comprobante bancario legible, solicitar al analista que adjunte el PDF o captura.
5. Salida obligatoria: Bloque JSON estructurado para integración con el sistema contable.`,
    challengeGoal: "Diseña el System Prompt completo para este Agente en Claude, incluyendo su rol, sus 3 guardrails de seguridad y el formato JSON obligatorio de salida.",
    recommendedTemplate: `# SYSTEM PROMPT: Agente_Conciliador_Ingresos_v1

ROL Y PROPÓSITO:
Eres el Agente Oficial de Auditoría y Conciliación de Ingresos de la compañía. Tu misión es procesar soportes de pago, validar cumplimiento tributario y generar registros listos para el ERP.

POLÍTICAS Y GUARDRAILS INNEGOCIABLES:
1. ALERTA SARLAFT: Si cualquier transacción supera los $20.000.000 COP, debes marcar el campo "alerta_sarlaft": true y requerir validación de origen de fondos.
2. CONTROL TRIBUTARIO: La retención máxima permitida sin justificación especial es del 4%. Si la deducción supera este porcentaje, marca "alerta_retencion": "EXCESIVA_VERIFICAR".
3. VERACIDAD: Jamás asumas un NIT o número de factura que no esté en el soporte. Si no es visible, usa "[DATO_NO_DISPONIBLE]".

FORMATO DE RESPUESTA EXCLUSIVO:
Devuelve siempre un objeto JSON con la estructura:
{
  "transaccion_id": string,
  "cliente": string,
  "monto_bruto": number,
  "retenciones": number,
  "monto_neto": number,
  "alerta_sarlaft": boolean,
  "estado": "APROBADO" | "RECHAZADO" | "EN_REVISION",
  "observaciones_contables": string
}`,
  },
  {
    id: 6,
    title: "El Domador de la Bandeja de Entrada: Correos Inteligentes",
    subtitle: "Automatiza respuestas de cobranza, confirmación de pagos y reclamos sin sonar como un robot",
    snackName: "M&Ms Arcoíris",
    iconType: "mm",
    snackReward: "1 Bolsita de M&Ms + 1 Masmelo",
    concept: "Ingeniería de Prompts para Comunicaciones, Tono Ejecutivo y Plantillas Paramétricas",
    humorIntro: "Son las 4:55 PM y Carlos tiene 47 correos sin responder. Clientes molestos porque no les despachan la mercancía ('¡Ya les pagué hace una hora!'), el gerente comercial pidiendo certificados de paz y salvo, y proveedores mandando recibos ilegibles. ¡El estrés se corta con tijeras!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>El Arte del Correo Inteligente con Claude:</h4>
        <p>No redactes el mismo correo 40 veces. Crea un <strong>Prompt Parametrizado</strong> que reciba el estado contable y genere respuestas con empatía y precisión:</p>
        <ul class="snack-recipe-list">
          <li><strong>1. Clasificación por Semáforo:</strong> Pídele a Claude que clasifique el correo entrante:
            <br>• Verde: Pago confirmado y aplicado -> Respuesta inmediata de agradecimiento y liberación de despacho.
            <br>• Amarillo: Pago recibido pero falta certificado de retención -> Respuesta cordial solicitando el soporte para no frenar la cuenta.
            <br>• Rojo: No se encuentra el dinero en bancos -> Respuesta asertiva solicitando comprobante con fecha, valor y banco emisor.
          </li>
          <li><strong>2. Variables Claras:</strong> Pasa a Claude los datos como variables: [Nombre_Cliente], [Monto], [Factura], [Banco_Destino].</li>
          <li><strong>3. Tono Asertivo y Empático:</strong> Instruye: <em>'Tono corporativo cálido, profesional, sin frases agresivas de cobranza pero con plazos claros'</em>.</li>
        </ul>
      </div>
    `,
    caseDataTitle: "3 Correos Críticos en la Bandeja de Entrada:",
    caseData: `Correo 1: De: compras@ferreteriabogota.com | "Señores, hace 2 días les transferí $8.500.000 para liberar el pedido de cemento #9901 y en su bodega me dicen que no hay pago. ¡Exijo despacho hoy mismo!" (Verificación interna: El pago entró a Bancolombia hoy a las 2:00 PM con descuento no pactado de $350.000).

Correo 2: De: tesoreria@medicossas.com | "Adjunto soporte de pago de la factura #1209 por $22.000.000. Por favor confirmarnos el paz y salvo." (Verificación interna: El pago entró perfecto y está conciliado al 100%).

Correo 3: De: gerencia@transportescol.com | "Señores, ya pagamos la cuota mensual. Desbloqueen el servicio." (Verificación interna: No adjuntan soporte, no indican valor ni a cuál banco consignaron).`,
    challengeGoal: "Escribe un prompt que le pida a Claude clasificar los 3 correos por estado (Verde, Amarillo, Rojo) y redactar las 3 respuestas listas para enviar, con tono impecable y los datos específicos de cada caso.",
    recommendedTemplate: `Actúa como Coordinador de Servicio al Cliente y Gestión de Cartera.

CONTEXTO:
Manejamos la bandeja de recaudos de la compañía. Necesitamos responder con rapidez y empatía a los clientes, cuidando la relación comercial pero garantizando la conciliación contable.

INSTRUCCIONES:
1. Analiza los 3 correos entrantes y su verificación interna.
2. Asigna a cada uno una etiqueta de estado:
   - [VERDE - PAGO CONCILIADO]
   - [AMARILLO - PAGO PARCIAL / DIFERENCIA]
   - [ROJO - SIN SOPORTE / PENDIENTE IDENTIFICAR]
3. Redacta para cada uno el borrador exacto de correo listo para enviar.
4. Tono: Respetuoso, claro, resolutivo y profesional.

FORMATO DE SALIDA:
Para cada correo presenta:
- Cliente y Estado
- Asunto sugerido del correo
- Cuerpo del correo (con saludo, explicación clara, llamado a la acción y firma institucional).`,
  },
  {
    id: 7,
    title: "El Megazord Conectado: Google Workspace y Herramientas Externas",
    subtitle: "Conecta Claude con Gmail, Google Drive, Sheets, Calendar y Flujos de Automatización",
    snackName: "Combo Supremo Snack (DeTodito + Masmelo + M&Ms + Galleta)",
    iconType: "star",
    snackReward: "¡El Mega Combo del Compartir Completo!",
    concept: "Conexión de Servicios de Google Workspace, MCP (Model Context Protocol) y Flujos de Trabajo",
    humorIntro: "El equipo ya sabe usar Claude, pero siguen descargando PDFs de Gmail a mano, guardándolos en descargas, abriendo Excel, copiando y pegando como en el año 2002. ¡Don Saldo descubre que Claude se puede conectar a Google y casi se le cae el café de la emoción!",
    lesson: `
      <div class="lesson-snack-card">
        <h4>¿Por qué conectar Google Workspace y otras herramientas a tu IA?</h4>
        <p>Cuando conectas Claude a tus herramientas cotidianas, la IA pasa de ser un 'chat de texto' a ser un <strong>asistente operativo con manos y pies</strong>:</p>
        <ul class="snack-recipe-list">
          <li><strong>Google Drive:</strong> Claude puede leer carpetas enteras de extractos bancarios en PDF o contratos de clientes sin que tengas que subirlos uno a uno.</li>
          <li><strong>Google Sheets:</strong> Puedes pedirle: <em>'Lee la hoja 'Recaudos_Noviembre', busca qué pagos no tienen recibo de caja en la columna H y agrégales la observación automática'</em>.</li>
          <li><strong>Gmail:</strong> Permite buscar hilos de correo por número de factura y generar borradores automáticos listos con un clic.</li>
          <li><strong>Google Calendar:</strong> Programa alertas automáticas para las fechas de corte tributario y cierres de mes.</li>
          <li><strong>Conectores (MCP, Apps Script, Make, Zapier, n8n):</strong> Un comprobante que llega a un correo puede ser leído por la IA, cruzado en Sheets y notificado en Google Chat o Teams en 10 segundos, ¡sin tocar el mouse!</li>
        </ul>
      </div>
    `,
    caseDataTitle: "El Flujo Operativo Manual que vamos a transformar en Megazord:",
    caseData: `Flujo Manual Actual (Tarda 3 horas al día):
1. Llegan 30 correos a recaudo@empresa.com con comprobantes bancarios en PDF o imagen.
2. El analista descarga los 30 archivos uno a uno en su carpeta de Descargas.
3. Abre el archivo de Excel en Google Drive "Control_Recaudos_2026.xlsx".
4. Digita a mano: Banco, Fecha, Valor, NIT y Factura.
5. Revisa en la pestaña "Facturas_Emitidas" si el valor cuadra.
6. Si cuadra, manda un correo manual al cliente confirmando.
7. Si no cuadra, busca al vendedor por chat para que investigue.`,
    challengeGoal: "Escribe un prompt arquitectónico maestro que defina el flujo automatizado ideal conectando Google Workspace (Gmail + Drive + Sheets) con Claude (vía Apps Script o conectores MCP), detallando las instrucciones exactas que debe ejecutar la IA en cada paso para ahorrar esas 3 horas diarias.",
    recommendedTemplate: `Actúa como Consultor en Automatización de Procesos de Negocio e Inteligencia Artificial.

OBJETIVO:
Diseña el flujo automatizado de extremo a extremo para el área de Gestión de Ingresos, integrando Google Workspace (Gmail, Google Drive, Google Sheets) con Claude.

ESTRUCTURA DEL DISEÑO:
1. ARQUITECTURA DEL FLUJO:
   - Disparador (Trigger): Recepción de correo en Gmail con adjunto (PDF/Imagen).
   - Almacenamiento: Guardado automático en Google Drive en la carpeta "/Recaudos_Pendientes_2026".
   - Procesamiento con Claude: Extracción de datos del comprobante (Monto, Fecha, Referencia, NIT).
   - Registro en Google Sheets: Inserción de fila en "Control_Recaudos" y cruce con la pestaña "Facturas_ERP".
   - Acción de Cierre: Si cuadra, creación de borrador en Gmail; si descuadra, alerta al analista.

2. SYSTEM PROMPT DEL FLUJO:
   Redacta el prompt exacto que ejecutará Claude cuando reciba el texto/imagen del comprobante para extraer los campos en formato JSON estandarizado.

3. ESTIMACIÓN DE BENEFICIOS:
   - Ahorro de tiempo diario para el equipo.
   - Reducción del margen de error humano en digitación.
   - Beneficio en el cierre contable mensual.`,
  },
];

// Glosario de Snacks para consulta del equipo
const SNACK_LORE = {
  masmelo: {
    title: "El Masmelo (Claude)",
    iconType: "masmelo",
    role: "El Modelo de IA",
    desc: "Suave, adaptable y dulce. Si le das un buen contexto, te resuelve el mes. Pero si le tiras fuego directo con un prompt vago, se quema por fuera, queda crudo por dentro y alucina pagos que no existen.",
  },
  mms: {
    title: "Los M&Ms (Tokens)",
    iconType: "mm",
    role: "La Energía y Costo de la IA",
    desc: "Cada sílaba y número cuesta M&Ms de la bolsa. No los desperdicies en rodeos eternos. Úsalos con sabiduría limpiando tablas y siendo conciso.",
  },
  detodito: {
    title: "El DeTodito (Contexto Multimodal)",
    iconType: "detodito",
    role: "Los 4 Ingredientes del Prompt Profesional",
    desc: "Plátano (Rol experto) + Chicharrón (Contexto del negocio) + Margarita (Instrucciones ordenadas) + Tostacos (Formato de tabla o JSON innegociable). Si le falta uno, el DeTodito queda incompleto.",
  },
  galletitas: {
    title: "Las Galletitas (Agentes y Proyectos)",
    iconType: "galleta",
    role: "Recetas Horneadas Repetibles",
    desc: "Tienen molde y receta fija. En vez de escribir desde cero cada lunes cómo conciliar, horneas un Agente en Claude con System Prompt y Guardrails para que haga el trabajo con un solo clic.",
  },
};
