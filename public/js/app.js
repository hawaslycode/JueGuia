// Controlador Principal de la Aplicación y Modales de JueGuIA
// Actualizado con registro de nombre/área, mesa de jugadores, meta-prompt e iconos SVG

class AppUI {
  constructor() {
    this.game = null;
    this.currentLevelId = 1;
    this.geminiApiKey = localStorage.getItem("jueguia_user_api_key") || "";
    this.isEvaluating = false;
    this.teammates = [];

    this.init();
  }

  init() {
    // Iniciar Motor del Juego
    this.game = new OfficeGame("game-canvas");
    window.gameInstance = this.game;

    // Vincular Botones de la Barra Superior
    this.bindTopNav();

    // Actualizar HUD inicial
    this.updateHud();

    // Consultar datos de red para el QR de celular
    this.fetchNetworkInfo();

    // Comprobar si el usuario ya registró su perfil (Nombre y Área)
    const isRegistered = localStorage.getItem("jueguia_player_registered");
    if (!isRegistered) {
      setTimeout(() => this.openProfileModal(true), 400);
    }

    // Configurar cierres de modal
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", () => this.closeAllModals());
    });

    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", e => {
        if (e.target === backdrop) {
          this.closeAllModals();
        }
      });
    });

    // Cargar nombre en formulario de certificado
    const nameInput = document.getElementById("player-name-input");
    if (nameInput) {
      nameInput.value = this.game.playerName;
      nameInput.addEventListener("change", e => {
        this.game.setProfile(e.target.value, this.game.playerArea, this.game.playerAvatar);
      });
    }
  }

  bindTopNav() {
    // Selector rápido de niveles
    const levelSelector = document.getElementById("quick-level-select");
    if (levelSelector) {
      levelSelector.addEventListener("change", e => {
        const val = Number(e.target.value);
        if (val) {
          this.openLevelModal(val);
        }
      });
    }

    // Botón Perfil / Registro (Nombre y Área)
    const btnProfile = document.getElementById("btn-my-profile");
    if (btnProfile) {
      btnProfile.addEventListener("click", () => this.openProfileModal(false));
    }

    // Botón Mesa de Jugadores Activos
    const btnTeammates = document.getElementById("btn-teammates-table");
    if (btnTeammates) {
      btnTeammates.addEventListener("click", () => this.openTeammatesModal());
    }

    // Botón Prompt Maestro del Juego (Para recrear el juego con IA)
    const btnMetaPrompt = document.getElementById("btn-meta-prompt");
    if (btnMetaPrompt) {
      btnMetaPrompt.addEventListener("click", () => openMetaPromptModal());
    }

    // Botón Recetario de Prompts
    document.getElementById("btn-cookbook").addEventListener("click", () => {
      this.openCookbookModal();
    });

    // Botón Flotante para Ocultar/Mostrar Menú en Celular
    const btnToggleMobileHud = document.getElementById("btn-toggle-mobile-hud");
    if (btnToggleMobileHud) {
      btnToggleMobileHud.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleMobileHud();
      });
    }

    // Botón Compartir / Celular QR
    document.getElementById("btn-mobile-qr").addEventListener("click", () => {
      this.openQrModal();
    });

    // Botón Mesa de Snacks
    document.getElementById("btn-snacks-info").addEventListener("click", () => {
      this.showSnackTableModal();
    });

    // Botón Configurar API Key
    document.getElementById("btn-settings").addEventListener("click", () => {
      this.openSettingsModal();
    });

    // Botón Silenciar / Sonido
    const soundBtn = document.getElementById("btn-sound-toggle");
    soundBtn.addEventListener("click", () => {
      const isMuted = window.soundFX.toggleMute();
      soundBtn.innerHTML = isMuted ? "🔇" : "🔊";
    });

    // Botón Certificado Final
    document.getElementById("btn-certificate").addEventListener("click", () => {
      this.openCertificateModal();
    });
  }

  updateHud() {
    document.getElementById("hud-masmelos").innerText = this.game.snackScore.masmelos;
    document.getElementById("hud-mms").innerText = this.game.snackScore.mms;
    document.getElementById("hud-detodito").innerText = this.game.snackScore.detodito;
    document.getElementById("hud-galletas").innerText = this.game.snackScore.galletas;

    const completedCount = this.game.completedLevels.size;
    document.getElementById("hud-progress").innerText = `${completedCount}/7`;

    // Etiqueta del jugador en la barra
    const hudPlayerName = document.getElementById("hud-player-name");
    if (hudPlayerName) {
      hudPlayerName.innerText = `${this.game.playerName} (${this.game.playerArea})`;
    }

    // Actualizar selector de niveles
    const select = document.getElementById("quick-level-select");
    if (select) {
      select.innerHTML = '<option value="">🚀 Ir a Nivel...</option>';
      GAME_LEVELS.forEach(lvl => {
        const isDone = this.game.completedLevels.has(lvl.id);
        const isUnlocked = this.game.unlockedLevels.has(lvl.id);
        const opt = document.createElement("option");
        opt.value = lvl.id;
        opt.innerText = `${isDone ? "✅" : isUnlocked ? "🔓" : "🔒"} Nivel ${lvl.id}: ${lvl.title.split(":")[0]}`;
        select.appendChild(opt);
      });
    }
  }

  updateTeammatesList(players) {
    this.teammates = players || [];
    const countBadge = document.getElementById("teammates-count-badge");
    if (countBadge) {
      countBadge.innerText = `${Math.max(1, this.teammates.length)} en vivo`;
    }

    const container = document.getElementById("teammates-cards-container");
    if (!container) return;

    container.innerHTML = "";
    this.teammates.forEach(p => {
      const isMe = p.id === this.game.playerId;
      const card = document.createElement("div");
      card.className = `teammate-card ${isMe ? 'is-me' : ''}`;

      const lvlLabel = (p.completedLevels && p.completedLevels.length >= 7)
        ? "🎓 Graduado Maestro"
        : `Piso ${p.currentLevel || 1} de 7`;

      card.innerHTML = `
        <div class="teammate-card-header">
          <div class="teammate-avatar-icon">${renderIcon("user")}</div>
          <div class="teammate-info-col">
            <strong>${escapeHtml(p.name)} ${isMe ? '(Tú)' : ''}</strong>
            <span class="teammate-area-tag">${escapeHtml(p.area || 'Gestión de Ingresos')}</span>
          </div>
        </div>
        <div class="teammate-card-progress">
          <span class="lvl-badge-pill">${lvlLabel}</span>
          <span class="active-dot-live">● Conectado</span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  openProfileModal(isOnboarding = false) {
    this.game.activeModal = true;
    const modal = document.getElementById("profile-modal");
    modal.classList.add("active");

    const nameInput = document.getElementById("reg-player-name");
    const areaSelect = document.getElementById("reg-player-area");

    nameInput.value = this.game.playerName !== "Especialista" ? this.game.playerName : "";
    if (areaSelect) {
      areaSelect.value = this.game.playerArea;
    }

    const titleEl = document.getElementById("profile-modal-title");
    if (titleEl) {
      titleEl.innerText = isOnboarding ? "¡Bienvenido! Registra tu Jugador" : "Editar Mi Perfil";
    }

    document.getElementById("btn-save-profile").onclick = () => {
      const name = nameInput.value.trim();
      const area = areaSelect.value;

      if (!name) {
        alert("Por favor ingresa tu nombre para que tus compañeros te reconozcan en la mesa.");
        return;
      }

      this.game.setProfile(name, area, "analista");
      localStorage.setItem("jueguia_player_registered", "true");
      this.closeAllModals();

      if (window.soundFX) window.soundFX.playFanfare();
    };
  }

  openTeammatesModal() {
    this.game.activeModal = true;
    const modal = document.getElementById("teammates-modal");
    modal.classList.add("active");
    this.updateTeammatesList(this.game.teammates.concat([
      {
        id: this.game.playerId,
        name: this.game.playerName,
        area: this.game.playerArea,
        currentLevel: this.game.completedLevels.size + 1,
        completedLevels: Array.from(this.game.completedLevels),
      }
    ]));
  }

  async fetchNetworkInfo() {
    try {
      const res = await fetch("/api/network-info");
      const data = await res.json();
      this.networkData = data;

      const qrImg = document.getElementById("qr-code-img");
      const qrUrl = document.getElementById("qr-network-url");
      if (qrImg && data.qrCodeDataUrl) {
        qrImg.src = data.qrCodeDataUrl;
      }
      if (qrUrl && data.url) {
        qrUrl.innerText = data.url;
        qrUrl.href = data.url;
      }

      const apiStatusBadge = document.getElementById("api-status-badge");
      if (apiStatusBadge) {
        if (data.hasServerKey || this.geminiApiKey) {
          apiStatusBadge.className = "api-badge online";
          apiStatusBadge.innerHTML = "🟢 Gemini 3.8 Conectado";
        } else {
          apiStatusBadge.className = "api-badge offline";
          apiStatusBadge.innerHTML = "🟡 Modo Local";
        }
      }
    } catch (e) {
      console.warn("No se pudo obtener información de red:", e);
    }
  }

  openLevelModal(levelId) {
    this.currentLevelId = levelId;
    const level = GAME_LEVELS.find(l => l.id === levelId);
    if (!level) return;

    this.game.activeModal = true;
    const modal = document.getElementById("level-modal");
    modal.classList.add("active");

    // Llenar contenido
    document.getElementById("lvl-number-badge").innerText = `NIVEL ${level.id} DE 7`;
    document.getElementById("lvl-snack-tag").innerHTML = `${renderIcon(level.iconType, "inline-icon")} <strong>Snack:</strong> ${level.snackName}`;
    document.getElementById("lvl-concept-tag").innerText = `🎯 ${level.concept}`;
    document.getElementById("lvl-title").innerText = level.title;
    document.getElementById("lvl-subtitle").innerText = level.subtitle;
    document.getElementById("lvl-humor-intro").innerText = level.humorIntro;
    document.getElementById("lvl-lesson-body").innerHTML = level.lesson;
    document.getElementById("lvl-case-title").innerText = level.caseDataTitle;
    document.getElementById("lvl-case-data").innerText = level.caseData.trim();
    document.getElementById("lvl-challenge-goal").innerText = level.challengeGoal;

    // Resetear o cargar prompt
    const saved = window.cookbook.getAll()[levelId];
    const promptInput = document.getElementById("player-prompt-input");
    promptInput.value = saved && !saved.isMasterTemplate ? saved.prompt : "";

    // Resetear resultados
    document.getElementById("evaluation-result-box").style.display = "none";
    document.getElementById("claude-simulation-box").style.display = "none";

    const templateBtn = document.getElementById("btn-insert-template");
    templateBtn.onclick = () => {
      promptInput.value = level.recommendedTemplate;
      this.updatePromptMetrics();
      if (window.soundFX) window.soundFX.playCrunch();
    };

    const submitBtn = document.getElementById("btn-submit-prompt");
    submitBtn.onclick = () => this.evaluateCurrentPrompt();

    promptInput.oninput = () => this.updatePromptMetrics();
    this.updatePromptMetrics();
  }

  updatePromptMetrics() {
    const text = document.getElementById("player-prompt-input").value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const tokens = Math.max(0, Math.round(words * 1.35));

    document.getElementById("live-mms-counter").innerText = `${tokens} M&Ms`;

    const hasRol = /actúa como|eres un|como especialista|como auditor|como contador|como analista|asume el rol/i.test(text);
    const hasContext = /ingreso|extracto|banco|factur|pago|cliente|retenci|cuenta|empresa|saldo/i.test(text);
    const hasSteps = /paso|primero|luego|identifica|clasifica|compara|cruza|analiza|valida/i.test(text);
    const hasFormat = /tabla|columna|formato|json|csv|lista|resumen|viñetas|encabezado|correo/i.test(text);

    this.setIngredientBadge("ing-rol", hasRol);
    this.setIngredientBadge("ing-context", hasContext);
    this.setIngredientBadge("ing-steps", hasSteps);
    this.setIngredientBadge("ing-format", hasFormat);
  }

  setIngredientBadge(id, present) {
    const el = document.getElementById(id);
    if (!el) return;
    if (present) {
      el.classList.add("checked");
      el.querySelector(".badge-status").innerText = "Listo";
    } else {
      el.classList.remove("checked");
      el.querySelector(".badge-status").innerText = "Pendiente";
    }
  }

  async evaluateCurrentPrompt() {
    if (this.isEvaluating) return;

    const promptText = document.getElementById("player-prompt-input").value;
    if (!promptText || promptText.trim().length < 10) {
      alert("Por favor escribe un prompt con al menos una instrucción clara antes de enviar.");
      return;
    }

    const level = GAME_LEVELS.find(l => l.id === this.currentLevelId);
    this.isEvaluating = true;

    const submitBtn = document.getElementById("btn-submit-prompt");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `⏳ Claude y Gemini 3.8 están pensando...`;
    submitBtn.disabled = true;

    try {
      if (window.soundFX) window.soundFX.playStep();

      const response = await fetch("/api/evaluate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          levelId: level.id,
          levelTitle: level.title,
          scenarioContext: level.caseData,
          playerPrompt: promptText,
          customApiKey: this.geminiApiKey,
        }),
      });

      const data = await response.json();
      this.displayEvaluationResult(data, level, promptText);
    } catch (err) {
      console.error("Error evaluando prompt:", err);
      alert("Ocurrió un error al procesar el prompt. Intenta de nuevo.");
    } finally {
      this.isEvaluating = false;
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  displayEvaluationResult(result, level, promptText) {
    const resultBox = document.getElementById("evaluation-result-box");
    const simulationBox = document.getElementById("claude-simulation-box");

    resultBox.style.display = "block";
    simulationBox.style.display = "block";

    const scoreBadge = document.getElementById("eval-score-badge");
    scoreBadge.innerText = `${result.score}/100`;
    if (result.approved) {
      scoreBadge.className = "score-badge approved";
      document.getElementById("eval-status-title").innerHTML = "¡NIVEL APROBADO!";
      if (window.soundFX) window.soundFX.playFanfare();
      this.game.unlockNextLevel(level.id);
      window.cookbook.savePrompt(level.id, promptText, result.score);
      this.launchConfetti();
    } else {
      scoreBadge.className = "score-badge retry";
      document.getElementById("eval-status-title").innerHTML = "EL MASMELO SE QUEMÓ UN POQUITO";
      if (window.soundFX) window.soundFX.playError();
    }

    document.getElementById("eval-humor-quote").innerText = result.humor_feedback;
    document.getElementById("eval-token-verdict").innerText = result.token_verdict;
    document.getElementById("eval-pro-tip").innerText = result.pro_tip;

    // Alerta de Snack Físico del Compartir
    const rewardAlert = document.getElementById("eval-snack-reward");
    if (result.approved) {
      rewardAlert.innerHTML = `
        <div class="physical-snack-banner">
          <div class="snack-icon-container">${renderIcon(level.iconType, "large-snack-icon")}</div>
          <div>
            <strong>¡RECLAMA TU RECOMPENSA FÍSICA EN LA MESA!</strong><br>
            <span>${level.snackReward}</span>
          </div>
        </div>
      `;
      rewardAlert.style.display = "block";
    } else {
      rewardAlert.style.display = "none";
    }

    // Desglose del DeTodito
    if (result.detodito_breakdown) {
      const b = result.detodito_breakdown;
      document.getElementById("eval-detodito-feedback").innerHTML = `
        <div class="detodito-feedback-grid">
          <div class="breakdown-card ${b.rol.included ? 'ok' : 'missing'}">
            <strong>Rol (Plátano):</strong> ${b.rol.comment}
          </div>
          <div class="breakdown-card ${b.contexto.included ? 'ok' : 'missing'}">
            <strong>Contexto (Chicharrón):</strong> ${b.contexto.comment}
          </div>
          <div class="breakdown-card ${b.instrucciones.included ? 'ok' : 'missing'}">
            <strong>Pasos (Margarita):</strong> ${b.instrucciones.comment}
          </div>
          <div class="breakdown-card ${b.formato.included ? 'ok' : 'missing'}">
            <strong>Formato (Tostacos):</strong> ${b.formato.comment}
          </div>
        </div>
      `;
    }

    // Formatear la simulación de Claude (con soporte de tablas Markdown limpias)
    const simulationContent = document.getElementById("claude-simulation-content");
    simulationContent.innerHTML = formatMarkdownSimulation(result.claude_simulation);

    resultBox.scrollIntoView({ behavior: "smooth" });
  }

  showDialogue(title, message, iconKey) {
    this.game.activeModal = true;
    const modal = document.getElementById("dialogue-modal");
    document.getElementById("dialogue-title").innerText = title;
    document.getElementById("dialogue-icon").innerHTML = renderIcon(iconKey || "user", "dialogue-svg-avatar");
    document.getElementById("dialogue-body").innerText = message;
    modal.classList.add("active");
  }

  showSnackTableModal() {
    this.game.activeModal = true;
    const modal = document.getElementById("snack-table-modal");
    modal.classList.add("active");
  }

  openCookbookModal() {
    this.game.activeModal = true;
    const modal = document.getElementById("cookbook-modal");
    modal.classList.add("active");

    const container = document.getElementById("cookbook-list");
    container.innerHTML = "";

    const savedPrompts = window.cookbook.getAll();

    GAME_LEVELS.forEach(lvl => {
      const entry = savedPrompts[lvl.id];
      const card = document.createElement("div");
      card.className = "cookbook-card";

      const promptToUse = entry ? entry.prompt : lvl.recommendedTemplate;

      card.innerHTML = `
        <div class="cookbook-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            ${renderIcon(lvl.iconType, "inline-icon")}
            <div>
              <h4>Nivel ${lvl.id}: ${lvl.title}</h4>
              <span class="cookbook-badge">${lvl.concept}</span>
            </div>
          </div>
          <button class="btn-copy-prompt" data-level="${lvl.id}">📋 Copiar Prompt</button>
        </div>
        <pre class="cookbook-prompt-preview">${escapeHtml(promptToUse)}</pre>
      `;

      card.querySelector(".btn-copy-prompt").addEventListener("click", e => {
        window.cookbook.copyToClipboard(promptToUse, e.target);
        if (window.soundFX) window.soundFX.playCoin();
      });

      container.appendChild(card);
    });

    document.getElementById("btn-download-cookbook").onclick = () => {
      window.cookbook.downloadCookbookMarkdown();
      if (window.soundFX) window.soundFX.playFanfare();
    };
  }

  openQrModal() {
    this.game.activeModal = true;
    const modal = document.getElementById("qr-modal");
    modal.classList.add("active");
  }

  openSettingsModal() {
    this.game.activeModal = true;
    const modal = document.getElementById("settings-modal");
    const keyInput = document.getElementById("settings-api-key");
    keyInput.value = this.geminiApiKey;
    modal.classList.add("active");

    document.getElementById("btn-save-key").onclick = async () => {
      const newKey = keyInput.value.trim();
      if (!newKey) {
        alert("Por favor ingresa una API Key.");
        return;
      }

      const saveBtn = document.getElementById("btn-save-key");
      saveBtn.innerText = "⏳ Verificando con Gemini 3.8...";
      saveBtn.disabled = true;

      try {
        const res = await fetch("/api/configure-key", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey: newKey }),
        });
        const data = await res.json();

        if (res.ok) {
          this.geminiApiKey = newKey;
          localStorage.setItem("jueguia_user_api_key", newKey);
          alert("🎉 ¡Conexión exitosa con Gemini 3.8 Flash!");
          this.fetchNetworkInfo();
          this.closeAllModals();
        } else {
          alert("❌ " + (data.error || "No se pudo validar la clave."));
        }
      } catch (e) {
        alert("Error de conexión al servidor.");
      } finally {
        saveBtn.innerText = "Guardar y Conectar";
        saveBtn.disabled = false;
      }
    };
  }

  openCertificateModal() {
    this.game.activeModal = true;
    const modal = document.getElementById("certificate-modal");
    modal.classList.add("active");

    const canvas = document.getElementById("certificate-canvas");
    const playerName = this.game.playerName;
    const completedCount = this.game.completedLevels.size;

    window.cookbook.generateCertificate(canvas, playerName, completedCount, 950);

    document.getElementById("btn-download-certificate").onclick = () => {
      const a = document.createElement("a");
      a.download = `Certificado_IA_${playerName.replace(/\s+/g, "_")}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
      if (window.soundFX) window.soundFX.playFanfare();
    };
  }

  toggleMobileHud(forceHide = null) {
    if (forceHide === true) {
      document.body.classList.add("hud-hidden");
    } else if (forceHide === false) {
      document.body.classList.remove("hud-hidden");
    } else {
      document.body.classList.toggle("hud-hidden");
    }

    const btn = document.getElementById("btn-toggle-mobile-hud");
    if (btn) {
      const isHidden = document.body.classList.contains("hud-hidden");
      const icon = btn.querySelector(".hud-toggle-icon");
      const label = btn.querySelector(".hud-toggle-label");
      if (icon) icon.innerText = isHidden ? "☰" : "✕";
      if (label) label.innerText = isHidden ? "Menú" : "Ocultar";
    }
  }

  closeAllModals() {
    document.querySelectorAll(".modal-backdrop").forEach(m => {
      m.classList.remove("active");
    });
    this.game.activeModal = false;
  }

  launchConfetti() {
    const count = 60;
    const colors = ["#ec4899", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"];
    const container = document.body;

    for (let i = 0; i < count; i++) {
      const bit = document.createElement("div");
      bit.className = "confetti-particle";
      bit.style.left = `${Math.random() * 100}vw`;
      bit.style.top = "-10px";
      bit.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      bit.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(bit);

      setTimeout(() => {
        bit.remove();
      }, 3000);
    }
  }
}

// Formateador limpio de Markdown y tablas para evitar sobreescritura de texto
function formatMarkdownSimulation(text) {
  if (!text) return "";

  // Convertir tablas Markdown en tablas HTML con estilo
  const lines = text.split("\n");
  let inTable = false;
  let tableHtml = "";
  let finalHtml = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      if (line.includes("---")) {
        continue; // Fila divisoria de Markdown
      }
      if (!inTable) {
        inTable = true;
        tableHtml = "<div class='sim-table-wrapper'><table class='sim-table'>";
      }
      const cells = line.split("|").slice(1, -1);
      const isHeader = !tableHtml.includes("</tr>");
      tableHtml += "<tr>";
      cells.forEach(c => {
        const tag = isHeader ? "th" : "td";
        tableHtml += `<${tag}>${escapeHtml(c.trim())}</${tag}>`;
      });
      tableHtml += "</tr>";
    } else {
      if (inTable) {
        tableHtml += "</table></div>";
        finalHtml += tableHtml;
        inTable = false;
        tableHtml = "";
      }
      if (line.startsWith("### ")) {
        finalHtml += `<h4 class="sim-h4">${escapeHtml(line.replace("### ", ""))}</h4>`;
      } else if (line.startsWith("## ")) {
        finalHtml += `<h3 class="sim-h3">${escapeHtml(line.replace("## ", ""))}</h3>`;
      } else if (line.startsWith("- ")) {
        finalHtml += `<div class="sim-list-item">• ${escapeHtml(line.replace("- ", ""))}</div>`;
      } else if (line.startsWith("```")) {
        // Bloque de código simple
        finalHtml += `<pre class="sim-code-block">${escapeHtml(line)}</pre>`;
      } else if (line) {
        finalHtml += `<p class="sim-p">${escapeHtml(line)}</p>`;
      }
    }
  }

  if (inTable) {
    tableHtml += "</table></div>";
    finalHtml += tableHtml;
  }

  return finalHtml || escapeHtml(text);
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

window.addEventListener("DOMContentLoaded", () => {
  window.appUI = new AppUI();
});
