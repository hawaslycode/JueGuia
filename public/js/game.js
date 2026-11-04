// Motor del Juego 2D: La Odisea de Gestión de Ingresos (Edición Snack-IA)
// Incluye presencia multijugador en vivo en la mesa y renderizado vectorial de iconos

class OfficeGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    // Medidas base virtuales del mapa
    this.virtualWidth = 960;
    this.virtualHeight = 600;
    this.scaleX = 1;
    this.scaleY = 1;
    this.offsetX = 0;
    this.offsetY = 0;

    // Identidad del Jugador Local
    this.playerId = localStorage.getItem("jueguia_player_id") || "p_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("jueguia_player_id", this.playerId);

    this.playerName = localStorage.getItem("jueguia_player_name") || "Especialista";
    this.playerArea = localStorage.getItem("jueguia_player_area") || "Gestión de Ingresos";
    this.playerAvatar = localStorage.getItem("jueguia_player_avatar") || "analista";

    // Estado del Jugador en el mapa
    this.player = {
      x: 480,
      y: 350,
      width: 32,
      height: 38,
      speed: 4,
      dir: "down",
      moving: false,
      frame: 0,
      animTimer: 0,
    };

    // Teclas presionadas
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      interact: false,
    };

    // Colección de compañeros conectados en la mesa/sala
    this.teammates = [];
    this.lastHeartbeat = 0;

    // Objetos del Mapa: Paredes, Muebles, NPCs, Snacks y Terminales
    this.furniture = [];
    this.terminals = [];
    this.npcs = [];
    this.snackPickups = [];

    // Progreso del Jugador
    this.completedLevels = new Set(
      JSON.parse(localStorage.getItem("jueguia_completed_levels") || "[]")
    );
    this.unlockedLevels = new Set([1]);
    this.completedLevels.forEach(lvl => {
      this.unlockedLevels.add(lvl);
      if (lvl < 7) this.unlockedLevels.add(lvl + 1);
    });

    this.snackScore = {
      masmelos: 2,
      mms: 45,
      detodito: 1,
      galletas: 0,
    };

    this.nearbyInteractable = null;
    this.activeModal = false;

    this.logoImg = new Image();
    this.logoImg.src = "img/gco-logo-white.png";

    this.initMap();
    this.bindEvents();
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    // Sincronización inicial con el servidor
    this.syncPlayerPresence();

    this.lastTime = performance.now();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resizeCanvas() {
    const container = this.canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    // Escala uniforme panorámica para modo horizontal en móviles y PC
    const scale = Math.min(
      (rect.width * dpr) / this.virtualWidth,
      (rect.height * dpr) / this.virtualHeight
    );

    this.scaleX = scale;
    this.scaleY = scale;
    this.offsetX = Math.max(0, ((rect.width * dpr) - (this.virtualWidth * scale)) / 2);
    this.offsetY = Math.max(0, ((rect.height * dpr) - (this.virtualHeight * scale)) / 2);
  }

  initMap() {
    // 1. Muebles y Obstáculos
    this.furniture = [
      // Paredes perimetrales
      { x: 0, y: 0, w: 960, h: 40, type: "wall", label: "Pared Norte" },
      { x: 0, y: 580, w: 960, h: 20, type: "wall", label: "Pared Sur" },
      { x: 0, y: 0, w: 20, h: 600, type: "wall", label: "Pared Oeste" },
      { x: 940, y: 0, w: 20, h: 600, type: "wall", label: "Pared Este" },

      // Mesa Central del Compartir (Snacks & Jugadores)
      {
        x: 380,
        y: 230,
        w: 200,
        h: 110,
        type: "snack_table",
        label: "Mesa del Compartir",
        desc: "La mesa sagrada donde el combo se junta a mecatear y aprender IA.",
      },

      // Cafetera Corporativa
      {
        x: 60,
        y: 50,
        w: 70,
        h: 60,
        type: "coffee",
        label: "La Greca del Tintico",
        desc: "Tintico bien cargado. La gasolina oficial del cierre de mes.",
      },

      // Escritorio Mario (Gerente)
      {
        x: 800,
        y: 60,
        w: 110,
        h: 70,
        type: "boss_desk",
        label: "Despacho de Mario",
        desc: "Mario revisando un extracto con lupa y un sello de RECHAZADO. ¡No lo vayás a interrumpir!",
      },

      // Escritorios operativos
      { x: 80, y: 200, w: 80, h: 60, type: "desk", label: "Escritorio Catalina" },
      { x: 80, y: 350, w: 80, h: 60, type: "desk", label: "Escritorio Carlos" },
      { x: 80, y: 480, w: 80, h: 60, type: "desk", label: "Escritorio Braian" },

      // Estación de El Cristian (Líder de Gestión de Ingresos)
      {
        x: 845,
        y: 175,
        w: 75,
        h: 60,
        type: "desk",
        label: "Estación de El Cristian",
        desc: "Escritorio impecable con un letrero: 'NO ME HABLEN ANTES DEL TINTO'. Tiene un Excel abierto con 47 pestañas, todas en rojo. ¡Qué susto, pues!",
      },

      // Escritorios de La Juliana y Estefa
      { x: 700, y: 505, w: 70, h: 55, type: "desk", label: "Escritorio La Juliana", desc: "Lleno de facturas organizadas por colores y una matica que se llama 'IVA'." },
      { x: 702, y: 362, w: 60, h: 50, type: "desk", label: "Escritorio Estefa", desc: "Una calculadora gigante y un post-it que dice: 'Si no cuadra, probá sumando'." },

      // Impresora humeante
      {
        x: 830,
        y: 480,
        w: 70,
        h: 60,
        type: "printer",
        label: "Impresora Humeante",
        desc: "¡Ave María! Imprimiendo 400 páginas de extractos de Bancolombia que nadie va a leer.",
      },
    ];

    // 2. NPCs (Mentores de Oficina)
    this.npcs = [
      {
        id: "don_saldo",
        name: "Mario (Gerente)",
        area: "Gerencia de Ingresos",
        x: 750,
        y: 90,
        dialog: "¡Qué más pues, muchachos! El cierre es a las 5:00 PM. Si le cogen el tiro a Claude, nos vamos tempranito.",
        iconKey: "mario",
        size: 44,
      },
      {
        id: "lina_concilia",
        name: "Catalina (Conciliaciones)",
        area: "Bancos & Conciliación",
        x: 180,
        y: 210,
        dialog: "¡Ave María, parce! Claude me encontró $18 pesos de diferencia en 4 segundos. Usá los 4 ingredientes, pues.",
        iconKey: "catalina",
        size: 44,
      },
      {
        id: "carlos_cartera",
        name: "Carlos (Cobranzas)",
        area: "Cartera & Recaudos",
        x: 180,
        y: 360,
        dialog: "Vea, pegá solo lo necesario en CSV. Ahorrás M&Ms y Claude te responde mejor.",
        iconKey: "carlos",
        size: 44,
      },
      {
        id: "sofi_auto",
        name: "Braian (Automatizaciones)",
        area: "Transformación Digital",
        x: 180,
        y: 490,
        dialog: "¿Todavía bajando PDFs a mano, mijo? Conectá Gmail y Drive a Claude. ¡Probalo en la Terminal 7!",
        iconKey: "braian",
        size: 44,
      },
      {
        id: "el_cristian",
        name: "El Cristian (Líder de Gestión de Ingresos)",
        badge: "El Cristian",
        area: "Gestión de Ingresos",
        x: 800,
        y: 190,
        dialog: "¡Ush, qué pereza! ¿Y vos qué hacés ahí parado? Andá pa' la terminal y nada de prompts de 3 palabras, que me da piedra. ¡Y no te comás mis M&Ms!",
        iconKey: "cristian",
        size: 44,
      },
      {
        id: "la_juliana",
        name: "La Juliana (Facturación)",
        badge: "La Juliana",
        area: "Facturación & ERP",
        x: 650,
        y: 520,
        dialog: "¡Hola, mi amor! Vea, si le pedís a Claude la factura en tabla con NIT, valor e IVA, te queda lista pa'l ERP en un segundo. ¡Una nota!",
        iconKey: "juliana",
        size: 44,
      },
      {
        id: "el_chanty",
        name: "El Chanty (Tesorería)",
        badge: "El Chanty",
        area: "Tesorería & Bancos",
        x: 175,
        y: 62,
        dialog: "¡Quiubo, parce! Aquí en la greca se piensa mejor. Mi truco: chat nuevo pa' cada tema, así no se te van los M&Ms. ¿Un tintico?",
        iconKey: "chanty",
        size: 44,
      },
      {
        id: "estefa",
        name: "Estefa (Recaudos)",
        badge: "Estefa",
        area: "Recaudos",
        x: 660,
        y: 375,
        dialog: "¡Ay, qué más pues! Yo ya no cuadro pagos a mano: le digo a Claude 'si no cuadra, probá sumando varias facturas' y listo. ¡Andá al Piso 4!",
        iconKey: "estefa",
        size: 44,
      },
      {
        id: "yano",
        name: "Yano \"La Coleta\" (Gestión de Ingresos)",
        badge: "Yano",
        area: "Gestión de Ingresos",
        x: 878,
        y: 256,
        dialog: "¡Ey, qué más pues! Yo soy la que le baja la piedra a El Cristian. Mi truco: cuando Claude te responda, pedile 'revisá tu respuesta y decime qué podría estar mal'. ¡Así no se te cuela ni un peso!",
        iconKey: "yano",
        size: 44,
      },
    ];

    // 3. Las 7 Terminales de los Niveles
    this.terminals = [
      { id: 1, x: 290, y: 90, label: "T1: El DeTodito", iconKey: "detodito" },
      { id: 2, x: 440, y: 90, label: "T2: M&Ms Tokens", iconKey: "mm" },
      { id: 3, x: 590, y: 90, label: "T3: Escuadrón Masmelo", iconKey: "masmelo" },
      { id: 4, x: 310, y: 450, label: "T4: Conciliaciones", iconKey: "detodito" },
      { id: 5, x: 470, y: 450, label: "T5: Fábrica Galletas", iconKey: "galleta" },
      { id: 6, x: 630, y: 450, label: "T6: Correos Pro", iconKey: "mm" },
      { id: 7, x: 800, y: 310, label: "T7: Megazord Conectado", iconKey: "star" },
    ];

    // 4. Snacks coleccionables
    this.snackPickups = [
      { id: 1, x: 240, y: 130, type: "mm", iconKey: "mm", collected: false },
      { id: 2, x: 530, y: 150, type: "detodito", iconKey: "detodito", collected: false },
      { id: 3, x: 720, y: 220, type: "masmelo", iconKey: "masmelo", collected: false },
      { id: 4, x: 260, y: 310, type: "galleta", iconKey: "galleta", collected: false },
      { id: 5, x: 610, y: 400, type: "mm", iconKey: "mm", collected: false },
      { id: 6, x: 790, y: 420, type: "mm", iconKey: "mm", collected: false },
      { id: 7, x: 390, y: 520, type: "masmelo", iconKey: "masmelo", collected: false },
    ];
  }

  bindEvents() {
    window.addEventListener("keydown", e => {
      if (this.activeModal) {
        if (e.key === "Escape") {
          window.appUI.closeAllModals();
        }
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          this.keys.up = true;
          e.preventDefault();
          break;
        case "ArrowDown":
        case "s":
        case "S":
          this.keys.down = true;
          e.preventDefault();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          this.keys.left = true;
          e.preventDefault();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          this.keys.right = true;
          e.preventDefault();
          break;
        case " ":
        case "Enter":
          this.triggerInteraction();
          e.preventDefault();
          break;
      }
    });

    window.addEventListener("keyup", e => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          this.keys.up = false;
          break;
        case "ArrowDown":
        case "s":
        case "S":
          this.keys.down = false;
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          this.keys.left = false;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          this.keys.right = false;
          break;
      }
    });

    // Controles táctiles móviles
    this.bindTouchControl("btn-up", "up");
    this.bindTouchControl("btn-down", "down");
    this.bindTouchControl("btn-left", "left");
    this.bindTouchControl("btn-right", "right");

    const actionBtn = document.getElementById("btn-action");
    if (actionBtn) {
      actionBtn.addEventListener("touchstart", e => {
        e.preventDefault();
        this.triggerInteraction();
      });
      actionBtn.addEventListener("click", () => {
        this.triggerInteraction();
      });
    }

    // Tocar el canvas en móvil para ocultar o mostrar la barra superior / menú
    this.canvas.addEventListener("click", () => {
      if (this.activeModal) return;
      if (window.innerWidth <= 860 && window.appUI) {
        window.appUI.toggleMobileHud();
      }
    });
  }

  bindTouchControl(elementId, direction) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const startHandler = e => {
      e.preventDefault();
      this.keys[direction] = true;
      // Al empezar a moverse en celular, ocultar la barra superior automáticamente para despejar el tablero
      if (window.innerWidth <= 860 && window.appUI) {
        window.appUI.toggleMobileHud(true);
      }
      if (window.soundFX) window.soundFX.playStep();
    };

    const endHandler = e => {
      e.preventDefault();
      this.keys[direction] = false;
    };

    el.addEventListener("touchstart", startHandler, { passive: false });
    el.addEventListener("touchend", endHandler);
    el.addEventListener("mousedown", startHandler);
    el.addEventListener("mouseup", endHandler);
    el.addEventListener("mouseleave", endHandler);
  }

  triggerInteraction() {
    if (!this.nearbyInteractable) return;

    if (window.soundFX) window.soundFX.playCoin();

    const item = this.nearbyInteractable;
    if (item.isTerminal) {
      window.appUI.openLevelModal(item.id);
    } else if (item.isNpc) {
      window.appUI.showDialogue(item.name, item.dialog, item.iconKey);
    } else if (item.isTeammate) {
      window.appUI.showDialogue(
        `Compañero: ${item.name}`,
        `Área: ${item.area}\nVa en el nivel: ${item.currentLevel}/7\n¡Está aquí en la sala camellándole a los retos con Claude!`,
        "user"
      );
    } else if (item.isFurniture) {
      if (item.type === "snack_table") {
        window.appUI.showSnackTableModal();
      } else if (item.type === "coffee") {
        window.appUI.showDialogue(
          "La Greca del Tintico",
          "Un tintico bien cargado, mijo. ¡Sin esto no cuadra ni el cierre ni nada!",
          "coffee"
        );
      } else {
        window.appUI.showDialogue(item.label, item.desc || "Un mueble de oficina bien cuidadito.", "table");
      }
    }
  }

  update(dt) {
    if (this.activeModal) return;

    let dx = 0;
    let dy = 0;

    if (this.keys.up) {
      dy -= this.player.speed;
      this.player.dir = "up";
    }
    if (this.keys.down) {
      dy += this.player.speed;
      this.player.dir = "down";
    }
    if (this.keys.left) {
      dx -= this.player.speed;
      this.player.dir = "left";
    }
    if (this.keys.right) {
      dx += this.player.speed;
      this.player.dir = "right";
    }

    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071;
      dy *= 0.7071;
    }

    this.player.moving = dx !== 0 || dy !== 0;

    if (this.player.moving) {
      this.player.animTimer += dt;
      if (this.player.animTimer > 120) {
        this.player.frame = (this.player.frame + 1) % 4;
        this.player.animTimer = 0;
      }
    } else {
      this.player.frame = 0;
    }

    // Movimiento con colisiones en X
    const newX = this.player.x + dx;
    if (!this.checkCollision(newX, this.player.y)) {
      this.player.x = newX;
    }

    // Movimiento con colisiones en Y
    const newY = this.player.y + dy;
    if (!this.checkCollision(this.player.x, newY)) {
      this.player.y = newY;
    }

    // Recoger Snacks flotantes
    this.snackPickups.forEach(s => {
      if (!s.collected) {
        const dist = Math.hypot(this.player.x + 16 - s.x, this.player.y + 16 - s.y);
        if (dist < 28) {
          s.collected = true;
          if (s.type === "mm") {
            this.snackScore.mms += 5;
            if (window.soundFX) window.soundFX.playCoin();
          } else if (s.type === "masmelo") {
            this.snackScore.masmelos += 1;
            if (window.soundFX) window.soundFX.playCrunch();
          } else if (s.type === "detodito") {
            this.snackScore.detodito += 1;
            if (window.soundFX) window.soundFX.playCrunch();
          } else if (s.type === "galleta") {
            this.snackScore.galletas += 1;
            if (window.soundFX) window.soundFX.playCrunch();
          }
          window.appUI.updateHud();
        }
      }
    });

    // Sincronizar presencia de jugadores periódicamente
    const now = performance.now();
    if (now - this.lastHeartbeat > 2500) {
      this.lastHeartbeat = now;
      this.syncPlayerPresence();
    }

    this.detectNearby();
  }

  async syncPlayerPresence() {
    try {
      const payload = {
        id: this.playerId,
        name: this.playerName,
        area: this.playerArea,
        avatar: this.playerAvatar,
        currentLevel: this.completedLevels.size + 1,
        completedLevels: Array.from(this.completedLevels),
        x: Math.round(this.player.x),
        y: Math.round(this.player.y),
      };

      const res = await fetch("/api/players/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        // Filtrar otros jugadores distintos al local
        this.teammates = (data.players || []).filter(p => p.id !== this.playerId);

        // Si hay pocos jugadores reales conectados, agregar 2 compañeros simulados para ambientar la mesa
        if (this.teammates.length === 0) {
          this.teammates = [
            {
              id: "sim_1",
              name: "Camilo R.",
              area: "Facturación & ERP",
              currentLevel: 4,
              x: 350,
              y: 270,
              isSeated: true,
            },
            {
              id: "sim_2",
              name: "Mariana T.",
              area: "Tesorería & Bancos",
              currentLevel: 6,
              x: 590,
              y: 270,
              isSeated: true,
            },
          ];
        }

        window.appUI.updateTeammatesList(data.players || []);
      }
    } catch (e) {
      // Continuar silenciosamente
    }
  }

  checkCollision(x, y) {
    const pw = this.player.width;
    const ph = this.player.height;

    for (const f of this.furniture) {
      if (
        x < f.x + f.w &&
        x + pw > f.x &&
        y < f.y + f.h &&
        y + ph > f.y
      ) {
        return true;
      }
    }

    for (const t of this.terminals) {
      if (
        x < t.x + 36 &&
        x + pw > t.x &&
        y < t.y + 36 &&
        y + ph > t.y
      ) {
        return true;
      }
    }

    for (const npc of this.npcs) {
      if (
        x < npc.x + 30 &&
        x + pw > npc.x &&
        y < npc.y + 36 &&
        y + ph > npc.y
      ) {
        return true;
      }
    }

    return false;
  }

  detectNearby() {
    this.nearbyInteractable = null;
    const px = this.player.x + 16;
    const py = this.player.y + 19;
    const reach = 55;

    // 1. Terminales
    for (const t of this.terminals) {
      const dist = Math.hypot(px - (t.x + 18), py - (t.y + 18));
      if (dist < reach) {
        const isUnlocked = this.unlockedLevels.has(t.id);
        const isCompleted = this.completedLevels.has(t.id);
        this.nearbyInteractable = {
          isTerminal: true,
          id: t.id,
          label: isCompleted
            ? `[Nivel ${t.id} Completado] Ver de nuevo`
            : (isUnlocked ? `Entrar a ${t.label}` : `[Bloqueado] Completa el nivel anterior`),
          unlocked: isUnlocked,
        };
        return;
      }
    }

    // 2. Teammates / Compañeros en la sala
    for (const mate of this.teammates) {
      const dist = Math.hypot(px - (mate.x + 16), py - (mate.y + 19));
      if (dist < reach) {
        this.nearbyInteractable = {
          isTeammate: true,
          name: mate.name,
          area: mate.area,
          currentLevel: mate.currentLevel,
          label: `Compañero: ${mate.name} (${mate.area})`,
        };
        return;
      }
    }

    // 3. NPCs
    for (const npc of this.npcs) {
      const dist = Math.hypot(px - (npc.x + 15), py - (npc.y + 18));
      if (dist < reach) {
        this.nearbyInteractable = {
          isNpc: true,
          id: npc.id,
          name: npc.name,
          dialog: npc.dialog,
          iconKey: npc.iconKey,
          label: `Hablar con ${npc.name}`,
        };
        return;
      }
    }

    // 4. Muebles Especiales
    for (const f of this.furniture) {
      if (f.type === "snack_table" || f.type === "coffee" || f.type === "printer") {
        const cx = f.x + f.w / 2;
        const cy = f.y + f.h / 2;
        const dist = Math.hypot(px - cx, py - cy);
        if (dist < reach + 25) {
          this.nearbyInteractable = {
            isFurniture: true,
            type: f.type,
            label: f.label,
            desc: f.desc,
          };
          return;
        }
      }
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.offsetX || 0, this.offsetY || 0);
    ctx.scale(this.scaleX, this.scaleY);

    // 1. Piso
    this.renderFloor(ctx);

    // 2. Muebles
    this.renderFurniture(ctx);

    // 3. Terminales
    this.renderTerminals(ctx);

    // 4. Snacks
    this.renderSnacks(ctx);

    // 5. NPCs
    this.renderNpcs(ctx);

    // 6. Teammates (Compañeros conectados en vivo)
    this.renderTeammates(ctx);

    // 7. Jugador Local
    this.renderPlayer(ctx);

    // 8. Globos de Interacción sin sobreescritura de texto
    this.renderPromptBubble(ctx);

    ctx.restore();
  }

  renderFloor(ctx) {
    const W = this.virtualWidth, H = this.virtualHeight;
    // Piso tipo alfombra modular en dos tonos
    ctx.fillStyle = "#1b2433";
    ctx.fillRect(0, 0, W, H);
    const t = 48;
    for (let x = 20, i = 0; x < 940; x += t, i++) {
      for (let y = 40, j = 0; y < 580; y += t, j++) {
        ctx.fillStyle = (i + j) % 2 === 0 ? "#1e293b" : "#212c3f";
        ctx.fillRect(x, y, t, t);
      }
    }

    // Zonas del área (tapetes con rótulo)
    const zone = (x, y, w, h, color, label, bottom = false) => {
      ctx.fillStyle = color + "22";
      ctx.beginPath(); ctx.roundRect(x, y, w, h, 14); ctx.fill();
      ctx.strokeStyle = color + "66"; ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 5]); ctx.stroke(); ctx.setLineDash([]);
      if (label) {
        ctx.font = "bold 9px system-ui, sans-serif";
        ctx.fillStyle = color; ctx.textAlign = "left";
        ctx.fillText(label, x + 10, bottom ? y + h - 8 : y + 14);
      }
    };
    zone(32, 48, 245, 118, "#f59e0b", "TESORERÍA · LA GRECA", true);
    zone(32, 178, 245, 390, "#38bdf8", "CONCILIACIONES · CARTERA · AUTOMATIZACIÓN");
    zone(638, 345, 150, 225, "#2dd4bf", "RECAUDOS · FACTURACIÓN");
    zone(772, 150, 160, 152, "#f87171", "LIDERAZGO GI");

    // Tapete de la Mesa del Compartir con colores GCO
    ctx.fillStyle = "#3b3f9e";
    ctx.beginPath(); ctx.roundRect(330, 196, 300, 176, 18); ctx.fill();
    ctx.strokeStyle = "#818cf8"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = "#e0e7ff";
    ctx.font = "bold 12px system-ui, sans-serif"; ctx.textAlign = "center";
    ctx.fillText("MESA DEL COMPARTIR · GESTIÓN DE INGRESOS", 480, 216);

    // Oficina de vidrio de la Gerencia
    ctx.fillStyle = "rgba(125, 211, 252, 0.07)";
    ctx.fillRect(712, 42, 226, 100);
    ctx.strokeStyle = "rgba(125, 211, 252, 0.55)"; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(712, 42); ctx.lineTo(712, 142); ctx.lineTo(735, 142); // puerta abierta
    ctx.moveTo(790, 142); ctx.lineTo(938, 142);
    ctx.stroke();
    ctx.fillStyle = "#7dd3fc"; ctx.font = "bold 9px system-ui, sans-serif"; ctx.textAlign = "right";
    ctx.fillText("GERENCIA FINANCIERA", 932, 137);

    // Matas
    const plant = (x, y, s = 1) => {
      ctx.fillStyle = "#92400e";
      ctx.beginPath(); ctx.roundRect(x - 7 * s, y, 14 * s, 11 * s, 3); ctx.fill();
      ctx.fillStyle = "#16a34a";
      [[-6, -2, 7], [6, -2, 7], [0, -9, 8], [-3, -14, 5], [4, -13, 5]].forEach(([dx, dy, r]) => {
        ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = "#22c55e";
      ctx.beginPath(); ctx.arc(x - 2 * s, y - 10 * s, 3.5 * s, 0, Math.PI * 2); ctx.fill();
    };
    plant(40, 560); plant(925, 545); plant(290, 172, 0.8); plant(605, 172, 0.8); plant(925, 168, 0.8);
  }

  renderNorthWall(ctx, f) {
    // Pared
    const g = ctx.createLinearGradient(0, f.y, 0, f.y + f.h);
    g.addColorStop(0, "#0b1220"); g.addColorStop(1, "#111a2c");
    ctx.fillStyle = g; ctx.fillRect(f.x, f.y, f.w, f.h);
    ctx.fillStyle = "#334155"; ctx.fillRect(f.x, f.y + f.h - 3, f.w, 3);

    // Ventanas con las montañas de Medellín
    const windowAt = (x) => {
      const y = 6, w = 92, h = 28;
      const sky = ctx.createLinearGradient(0, y, 0, y + h);
      sky.addColorStop(0, "#7dd3fc"); sky.addColorStop(1, "#fde68a");
      ctx.fillStyle = sky; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "#15803d";
      ctx.beginPath(); ctx.moveTo(x, y + h);
      ctx.quadraticCurveTo(x + 20, y + 8, x + 42, y + 18);
      ctx.quadraticCurveTo(x + 62, y + 6, x + w, y + 16);
      ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#166534";
      ctx.beginPath(); ctx.moveTo(x, y + h);
      ctx.quadraticCurveTo(x + 35, y + 16, x + w, y + h - 4);
      ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fill();
      // casitas en la ladera
      ctx.fillStyle = "#f8fafc";
      [[18, 22], [30, 20], [60, 21], [72, 19]].forEach(([dx, dy]) => ctx.fillRect(x + dx, y + dy, 3, 2));
      ctx.strokeStyle = "#475569"; ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
      ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.stroke();
    };
    windowAt(150); windowAt(560);

    // Logo GCO en la pared
    if (this.logoImg && this.logoImg.complete && this.logoImg.naturalWidth) {
      const lh = 26, lw = lh * (this.logoImg.naturalWidth / this.logoImg.naturalHeight);
      ctx.drawImage(this.logoImg, 330, 7, lw, lh);
    }
    ctx.fillStyle = "#c7d2fe"; ctx.font = "bold 10px system-ui, sans-serif"; ctx.textAlign = "left";
    ctx.fillText("Gestión de Ingresos", 412, 18);
    ctx.fillStyle = "#94a3b8"; ctx.font = "9px system-ui, sans-serif";
    ctx.fillText("Gerencia Financiera", 412, 30);

    // Pantalla de recaudo del día
    const sx = 262, sy = 6;
    ctx.fillStyle = "#020617"; ctx.fillRect(sx, sy, 58, 28);
    ctx.strokeStyle = "#475569"; ctx.lineWidth = 1.5; ctx.strokeRect(sx, sy, 58, 28);
    [7, 11, 9, 14, 16].forEach((v, i) => {
      ctx.fillStyle = i === 4 ? "#22c55e" : "#6366f1";
      ctx.fillRect(sx + 6 + i * 10, sy + 25 - v, 6, v);
    });
    ctx.fillStyle = "#86efac"; ctx.font = "bold 7px system-ui, sans-serif"; ctx.textAlign = "left";
    ctx.fillText("RECAUDO", sx + 4, sy + 8);

    // Reloj del cierre
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0"), mm = String(now.getMinutes()).padStart(2, "0");
    ctx.fillStyle = "#020617"; ctx.beginPath(); ctx.roundRect(668, 8, 36, 24, 4); ctx.fill();
    ctx.fillStyle = "#f87171"; ctx.font = "bold 10px monospace"; ctx.textAlign = "center";
    ctx.fillText(`${hh}:${mm}`, 686, 24);
    ctx.fillStyle = "#94a3b8"; ctx.font = "7px system-ui, sans-serif";
    ctx.fillText("CIERRE 5PM", 686, 39);

    // Tablero de metas en la oficina de gerencia
    ctx.fillStyle = "#f8fafc"; ctx.fillRect(722, 8, 70, 26);
    ctx.strokeStyle = "#94a3b8"; ctx.lineWidth = 1; ctx.strokeRect(722, 8, 70, 26);
    ctx.fillStyle = "#1e293b"; ctx.font = "bold 7px system-ui, sans-serif"; ctx.textAlign = "left";
    ctx.fillText("META MES", 727, 17);
    ctx.fillStyle = "#e2e8f0"; ctx.fillRect(727, 22, 60, 6);
    ctx.fillStyle = "#22c55e"; ctx.fillRect(727, 22, 52, 6);
    ctx.fillStyle = "#16a34a"; ctx.font = "bold 7px system-ui, sans-serif";
    ctx.fillText("87%", 770, 17);
  }

  renderFurniture(ctx) {
    const wood = (x, y, w, h, r = 6) => {
      ctx.fillStyle = "#7c4a24";
      ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
      ctx.fillStyle = "#93592b";
      ctx.beginPath(); ctx.roundRect(x + 2, y + 2, w - 4, h - 6, r); ctx.fill();
      ctx.strokeStyle = "#4a2a12"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.stroke();
    };
    const monitor = (x, y, w, h, kind) => {
      ctx.fillStyle = "#0f172a"; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "#334155"; ctx.fillRect(x + w / 2 - 3, y + h, 6, 4);
      if (kind === "excel") {
        ctx.fillStyle = "#f8fafc"; ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
        ctx.fillStyle = "#16a34a"; ctx.fillRect(x + 2, y + 2, w - 4, 3);
        ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 0.6;
        for (let gx = x + 6; gx < x + w - 2; gx += 6) { ctx.beginPath(); ctx.moveTo(gx, y + 5); ctx.lineTo(gx, y + h - 2); ctx.stroke(); }
        for (let gy = y + 8; gy < y + h - 2; gy += 3.5) { ctx.beginPath(); ctx.moveTo(x + 2, gy); ctx.lineTo(x + w - 2, gy); ctx.stroke(); }
      } else {
        ctx.fillStyle = "#1e1b4b"; ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
        [5, 9, 6, 11].forEach((v, i) => {
          ctx.fillStyle = ["#facc15", "#6366f1", "#38bdf8", "#22c55e"][i];
          ctx.fillRect(x + 4 + i * ((w - 8) / 4), y + h - 3 - v, (w - 8) / 4 - 2, v);
        });
      }
    };
    const nameplate = (text, cx, y) => {
      ctx.font = "bold 8px system-ui, sans-serif";
      const tw = ctx.measureText(text).width + 8;
      ctx.fillStyle = "#0f172a"; ctx.beginPath(); ctx.roundRect(cx - tw / 2, y, tw, 11, 3); ctx.fill();
      ctx.fillStyle = "#fde68a"; ctx.textAlign = "center"; ctx.fillText(text, cx, y + 8.5);
    };

    for (const f of this.furniture) {
      if (f.type === "wall") {
        if (f.label === "Pared Norte") { this.renderNorthWall(ctx, f); continue; }
        ctx.fillStyle = "#0b1220";
        ctx.fillRect(f.x, f.y, f.w, f.h);
        ctx.fillStyle = "#334155";
        if (f.label === "Pared Sur") {
          ctx.fillRect(f.x, f.y, f.w, 2);
          ctx.fillStyle = "#64748b"; ctx.font = "9px system-ui, sans-serif"; ctx.textAlign = "center";
          ctx.fillText("GCO · Gerencia Financiera · Equipo de Gestión de Ingresos", 480, f.y + 14);
        }
      } else if (f.type === "snack_table") {
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.beginPath(); ctx.roundRect(f.x + 4, f.y + 6, f.w, f.h, 14); ctx.fill();
        wood(f.x, f.y, f.w, f.h, 14);
        // mantel GCO
        ctx.fillStyle = "#5868e8";
        ctx.beginPath(); ctx.roundRect(f.x + 12, f.y + 14, f.w - 24, 40, 8); ctx.fill();
        this.drawVectorIcon(ctx, "masmelo", f.x + 25, f.y + 19, 30, 30);
        this.drawVectorIcon(ctx, "detodito", f.x + 70, f.y + 19, 30, 30);
        this.drawVectorIcon(ctx, "mm", f.x + 115, f.y + 19, 30, 30);
        this.drawVectorIcon(ctx, "galleta", f.x + 155, f.y + 19, 30, 30);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.beginPath(); ctx.roundRect(f.x + 15, f.y + 66, f.w - 30, 30, 6); ctx.fill();
        ctx.font = "bold 11px system-ui, sans-serif"; ctx.fillStyle = "#fef3c7"; ctx.textAlign = "center";
        ctx.fillText("¡MECATO PA'L EQUIPO!", f.x + f.w / 2, f.y + 85);
      } else if (f.type === "coffee") {
        wood(f.x, f.y, f.w, f.h);
        // greca
        ctx.fillStyle = "#cbd5e1"; ctx.beginPath(); ctx.roundRect(f.x + 10, f.y + 10, 22, 34, 4); ctx.fill();
        ctx.fillStyle = "#94a3b8"; ctx.fillRect(f.x + 8, f.y + 8, 26, 5);
        ctx.fillStyle = "#ef4444"; ctx.beginPath(); ctx.arc(f.x + 21, f.y + 26, 2.5, 0, Math.PI * 2); ctx.fill();
        // pocillos
        [[42, 30], [54, 34]].forEach(([dx, dy]) => {
          ctx.fillStyle = "#f8fafc"; ctx.fillRect(f.x + dx, f.y + dy, 9, 9);
          ctx.fillStyle = "#78350f"; ctx.fillRect(f.x + dx + 1, f.y + dy + 1, 7, 2);
        });
        nameplate("GRECA", f.x + f.w / 2, f.y + f.h - 13);
      } else if (f.type === "printer") {
        ctx.fillStyle = "#334155"; ctx.beginPath(); ctx.roundRect(f.x, f.y, f.w, f.h, 6); ctx.fill();
        this.drawVectorIcon(ctx, "printer", f.x + 17, f.y + 8, 36, 36);
        ctx.fillStyle = "#f8fafc"; ctx.fillRect(f.x + 52, f.y + 40, 12, 14); ctx.fillRect(f.x + 54, f.y + 37, 12, 14);
        // humo
        ctx.fillStyle = "rgba(148,163,184,0.5)";
        ctx.beginPath(); ctx.arc(f.x + 20, f.y - 4, 5, 0, Math.PI * 2); ctx.arc(f.x + 30, f.y - 10, 6, 0, Math.PI * 2); ctx.fill();
      } else if (f.type === "boss_desk") {
        wood(f.x, f.y, f.w, f.h, 10);
        monitor(f.x + 12, f.y + 8, 34, 22, "bi");
        monitor(f.x + 52, f.y + 8, 34, 22, "excel");
        ctx.fillStyle = "#fbbf24"; ctx.fillRect(f.x + 92, f.y + 12, 10, 14); // carpeta
        ctx.fillStyle = "#1f2937"; ctx.beginPath(); ctx.arc(f.x + 55, f.y + f.h + 2, 9, Math.PI, 0); ctx.fill();
        nameplate("MARIO · GERENTE", f.x + f.w / 2, f.y + f.h - 16);
      } else {
        // Escritorio de trabajo con doble pantalla
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.beginPath(); ctx.roundRect(f.x + 3, f.y + 4, f.w, f.h, 6); ctx.fill();
        wood(f.x, f.y, f.w, f.h);
        const mw = (f.w - 18) / 2;
        monitor(f.x + 6, f.y + 6, mw, 20, "excel");
        monitor(f.x + 12 + mw, f.y + 6, mw, 20, "bi");
        ctx.fillStyle = "#e2e8f0"; ctx.fillRect(f.x + f.w / 2 - 12, f.y + 32, 24, 5); // teclado
        ctx.fillStyle = "#475569"; ctx.beginPath(); ctx.arc(f.x + f.w + 6, f.y + f.h / 2, 8, 0, Math.PI * 2); ctx.fill(); // silla
        const who = (f.label || "").replace(/^(Escritorio|Estación de)\s+/i, "");
        nameplate(who, f.x + f.w / 2, f.y + f.h - 13);
      }
    }
  }

  renderTerminals(ctx) {
    for (const t of this.terminals) {
      const isCompleted = this.completedLevels.has(t.id);
      const isUnlocked = this.unlockedLevels.has(t.id);

      ctx.fillStyle = isCompleted ? "#065f46" : isUnlocked ? "#1e3a8a" : "#374151";
      ctx.beginPath();
      ctx.roundRect(t.x, t.y, 40, 44, 8);
      ctx.fill();

      ctx.strokeStyle = isCompleted ? "#34d399" : isUnlocked ? "#60a5fa" : "#6b7280";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Pantalla
      ctx.fillStyle = isCompleted ? "#10b981" : isUnlocked ? "#0284c7" : "#4b5563";
      ctx.fillRect(t.x + 6, t.y + 6, 28, 20);

      this.drawVectorIcon(ctx, t.iconKey || "terminal", t.x + 8, t.y + 6, 24, 20);

      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText(`Piso ${t.id}`, t.x + 20, t.y + 38);

      if (isCompleted) {
        this.drawVectorIcon(ctx, "star", t.x + 26, t.y - 6, 16, 16);
      }
    }
  }

  renderSnacks(ctx) {
    const time = performance.now() * 0.003;
    for (const s of this.snackPickups) {
      if (!s.collected) {
        const floatY = s.y + Math.sin(time + s.id) * 4;
        this.drawVectorIcon(ctx, s.iconKey, s.x - 12, floatY - 12, 26, 26);

        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.beginPath();
        ctx.ellipse(s.x + 1, s.y + 14, 8, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  renderNpcs(ctx) {
    for (const npc of this.npcs) {
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.beginPath();
      ctx.ellipse(npc.x + 15, npc.y + 34, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      const sz = npc.size || 34;
      const off = (sz - 30) / 2;
      this.drawVectorIcon(ctx, npc.iconKey || "user", npc.x - off, npc.y + 34 - sz, sz, sz);

      // Etiqueta de nombre sin sobreescritura
      this.drawPillBadge(ctx, npc.badge || npc.name.split(" ")[0], npc.x + 15, npc.y + 44, "#1e293b", "#f1f5f9");
    }
  }

  renderTeammates(ctx) {
    for (const mate of this.teammates) {
      const mx = mate.x || 400;
      const my = mate.y || 270;

      // Sombra
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.beginPath();
      ctx.ellipse(mx + 16, my + 35, 13, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sprite de compañero
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.roundRect(mx + 6, my + 14, 20, 18, 4);
      ctx.fill();

      ctx.fillStyle = "#fed7aa";
      ctx.beginPath();
      ctx.arc(mx + 16, my + 10, 8, 0, Math.PI * 2);
      ctx.fill();

      // Cabello
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(mx + 16, my + 6, 8, Math.PI, Math.PI * 2);
      ctx.fill();

      // Insignia del Nivel que va haciendo
      const lvlText = mate.currentLevel > 7 ? "🎓 Graduado" : `Nivel ${mate.currentLevel}`;
      this.drawPillBadge(ctx, `${mate.name} • ${lvlText}`, mx + 16, my - 8, "#0f172a", "#38bdf8", "#0284c7");
      this.drawPillBadge(ctx, mate.area || "Ingresos", mx + 16, my + 44, "rgba(30,41,59,0.9)", "#94a3b8");
    }
  }

  renderPlayer(ctx) {
    const p = this.player;

    // Sombra
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(p.x + 16, p.y + 35, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Buzo del jugador (Color violeta tecnológico)
    ctx.fillStyle = "#8b5cf6";
    ctx.beginPath();
    ctx.roundRect(p.x + 6, p.y + 14, 20, 18, 4);
    ctx.fill();

    // Cabeza
    ctx.fillStyle = "#fed7aa";
    ctx.beginPath();
    ctx.arc(p.x + 16, p.y + 10, 9, 0, Math.PI * 2);
    ctx.fill();

    // Cabello
    ctx.fillStyle = "#451a03";
    ctx.beginPath();
    ctx.arc(p.x + 16, p.y + 6, 9, Math.PI, Math.PI * 2);
    ctx.fill();

    // Ojos
    ctx.fillStyle = "#1e293b";
    if (p.dir === "down") {
      ctx.fillRect(p.x + 12, p.y + 9, 2, 3);
      ctx.fillRect(p.x + 18, p.y + 9, 2, 3);
    } else if (p.dir === "left") {
      ctx.fillRect(p.x + 10, p.y + 9, 2, 3);
    } else if (p.dir === "right") {
      ctx.fillRect(p.x + 20, p.y + 9, 2, 3);
    }

    // Taza de café o snack en mano
    this.drawVectorIcon(ctx, "coffee", p.x + 20, p.y + 16, 14, 14);

    // Pies
    ctx.fillStyle = "#1e1b4b";
    const stepOffset = p.moving ? Math.sin(p.frame * Math.PI) * 4 : 0;
    ctx.fillRect(p.x + 8, p.y + 30 + stepOffset, 6, 6);
    ctx.fillRect(p.x + 18, p.y + 30 - stepOffset, 6, 6);

    // Nombre y Área del Jugador sobre la cabeza
    const myLvl = this.completedLevels.size + 1;
    const tagLvl = myLvl > 7 ? "🎓 Graduado" : `Piso ${myLvl}`;
    this.drawPillBadge(ctx, `${this.playerName} (Tú) • ${tagLvl}`, p.x + 16, p.y - 12, "#1e1b4b", "#fbbf24", "#f59e0b");
    this.drawPillBadge(ctx, this.playerArea, p.x + 16, p.y + 44, "#0f172a", "#cbd5e1");
  }

  drawPillBadge(ctx, text, centerX, centerY, bgColor, textColor, borderColor = null) {
    ctx.font = "bold 10px system-ui, sans-serif";
    const paddingX = 7;
    const paddingY = 3;
    const textWidth = ctx.measureText(text).width;
    const w = textWidth + paddingX * 2;
    const h = 18;
    const x = centerX - w / 2;
    const y = centerY - h / 2;

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 6);
    ctx.fill();

    if (borderColor) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, centerX, centerY);
    ctx.textBaseline = "alphabetic";
  }

  renderPromptBubble(ctx) {
    if (!this.nearbyInteractable) return;

    const px = this.player.x + 16;
    const py = this.player.y - 30;

    const text = this.nearbyInteractable.label;
    ctx.font = "bold 12px system-ui, sans-serif";
    const textWidth = ctx.measureText(text).width;
    const bubbleW = textWidth + 24;
    const bubbleH = 34;

    ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
    ctx.beginPath();
    ctx.roundRect(px - bubbleW / 2, py - bubbleH / 2, bubbleW, bubbleH, 8);
    ctx.fill();

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.textAlign = "center";
    ctx.fillText(text, px, py - 3);

    ctx.font = "bold 9px system-ui, sans-serif";
    ctx.fillStyle = "#facc15";
    ctx.fillText("[ ESPACIO / TAP A ]", px, py + 11);
  }

  drawVectorIcon(ctx, iconKey, x, y, w, h) {
    if (CANVAS_IMAGES[iconKey] && CANVAS_IMAGES[iconKey].complete) {
      try {
        ctx.drawImage(CANVAS_IMAGES[iconKey], x, y, w, h);
        return;
      } catch (e) {}
    }

    // Fallback geométrico limpio si la imagen aún carga
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  unlockNextLevel(completedLevelId) {
    this.completedLevels.add(completedLevelId);
    if (completedLevelId < 7) {
      this.unlockedLevels.add(completedLevelId + 1);
    }
    localStorage.setItem(
      "jueguia_completed_levels",
      JSON.stringify(Array.from(this.completedLevels))
    );
    this.syncPlayerPresence();
    window.appUI.updateHud();
  }

  setProfile(name, area, avatar) {
    this.playerName = name.trim() || "Especialista";
    this.playerArea = area.trim() || "Gestión de Ingresos";
    this.playerAvatar = avatar || "analista";

    localStorage.setItem("jueguia_player_name", this.playerName);
    localStorage.setItem("jueguia_player_area", this.playerArea);
    localStorage.setItem("jueguia_player_avatar", this.playerAvatar);

    this.syncPlayerPresence();
    window.appUI.updateHud();
  }

  loop(currentTime) {
    const dt = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    requestAnimationFrame(this.loop);
  }
}
