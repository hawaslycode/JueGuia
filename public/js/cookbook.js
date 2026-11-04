// Gestor del Recetario de Prompts y Certificado de Graduación

class PromptCookbook {
  constructor() {
    this.storageKey = "jueguia_saved_prompts";
    this.playerKey = "jueguia_player_name";
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.storageKey)) {
      // Pre-cargar con las plantillas maestras recomendadas
      const defaults = {};
      GAME_LEVELS.forEach(lvl => {
        defaults[lvl.id] = {
          levelId: lvl.id,
          levelTitle: lvl.title,
          snack: lvl.snackName,
          prompt: lvl.recommendedTemplate,
          score: 100,
          savedAt: new Date().toLocaleDateString(),
          isMasterTemplate: true,
        };
      });
      this.saveAll(defaults);
    }
  }

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    } catch (e) {
      return {};
    }
  }

  saveAll(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  savePrompt(levelId, promptText, score) {
    const all = this.getAll();
    const lvl = GAME_LEVELS.find(l => l.id === Number(levelId));
    all[levelId] = {
      levelId: Number(levelId),
      levelTitle: lvl ? lvl.title : `Nivel ${levelId}`,
      snack: lvl ? lvl.snackName : "Snack",
      prompt: promptText,
      score: score || 85,
      savedAt: new Date().toLocaleDateString(),
      isMasterTemplate: false,
    };
    this.saveAll(all);
  }

  getPlayerName() {
    return localStorage.getItem(this.playerKey) || "Especialista de Ingresos";
  }

  setPlayerName(name) {
    localStorage.setItem(this.playerKey, name.trim() || "Especialista de Ingresos");
  }

  copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      if (btnElement) {
        const original = btnElement.innerText;
        btnElement.innerText = "✅ ¡Copiado!";
        setTimeout(() => {
          btnElement.innerText = original;
        }, 2000);
      }
    });
  }

  downloadCookbookMarkdown() {
    const all = this.getAll();
    const playerName = this.getPlayerName();

    let md = `# 📖 RECETARIO MAESTRO DE PROMPTS PARA GESTIÓN DE INGRESOS\n`;
    md += `**Autor/Especialista:** ${playerName}\n`;
    md += `**Fecha de Certificación:** ${new Date().toLocaleDateString()}\n`;
    md += `**Metáfora de Snacks:** Masmelos (Claude), M&Ms (Tokens), DeTodito (Contexto), Galletitas (Agentes)\n\n`;
    md += `---\n\n`;

    GAME_LEVELS.forEach(lvl => {
      const userEntry = all[lvl.id];
      md += `## 🍿 Nivel ${lvl.id}: ${lvl.title}\n`;
      md += `* **Snack Asociado:** ${lvl.snackIcon} ${lvl.snackName}\n`;
      md += `* **Concepto Clave:** ${lvl.concept}\n`;
      md += `* **Calificación Obtenida:** ${userEntry ? userEntry.score + "/100" : "Pendiente"}\n\n`;

      md += `### 📝 Prompt de Trabajo Listo para Claude:\n`;
      md += `\`\`\`text\n${(userEntry && userEntry.prompt) || lvl.recommendedTemplate}\n\`\`\`\n\n`;

      md += `> [!TIP]\n`;
      md += `> **Consejo Ninja:** Aplica siempre los 4 ingredientes del DeTodito: Rol, Contexto, Instrucciones y Formato.\n\n`;
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Recetario_Prompts_Ingresos_${playerName.replace(/\s+/g, "_")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  generateCertificate(canvas, playerName, completedLevelsCount, tokensSaved) {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Fondo elegante corporativo-snack
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#0f172a");
    grad.addColorStop(0.5, "#1e1b4b");
    grad.addColorStop(1, "#311042");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Borde dorado
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Decoraciones de Snacks
    ctx.font = "36px Arial";
    ctx.fillText("🍥", 50, 80);
    ctx.fillText("🍫", width - 90, 80);
    ctx.fillText("🥔", 50, height - 60);
    ctx.fillText("🍪", width - 90, height - 60);

    // Título Principal
    ctx.textAlign = "center";
    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 32px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    ctx.fillText("CERTIFICADO OFICIAL DE MAESTRÍA EN IA", width / 2, 90);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "italic 18px 'Segoe UI', sans-serif";
    ctx.fillText("La Academia Snack de Gestión de Ingresos y Recaudo otorga el presente reconocimiento a:", width / 2, 130);

    // Nombre del alumno
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px 'Segoe UI', sans-serif";
    ctx.fillText(playerName.toUpperCase(), width / 2, 185);

    // Línea bajo el nombre
    ctx.strokeStyle = "#ec4899";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 220, 200);
    ctx.lineTo(width / 2 + 220, 200);
    ctx.stroke();

    // Texto del logro
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "17px 'Segoe UI', sans-serif";
    ctx.fillText("Por haber superado con éxito los 7 pisos del Edificio de Operaciones,", width / 2, 235);
    ctx.fillText("domar al Monstruo de la Conciliación, ahorrar miles de M&Ms en tokens,", width / 2, 260);
    ctx.fillText("y graduarse como:", width / 2, 285);

    // Título gracioso
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 22px 'Segoe UI', sans-serif";
    ctx.fillText("« DOMADOR SUPREMO DE MASMELOS Y CONCILIACIONES CON CLAUDE »", width / 2, 325);

    // Métricas
    ctx.fillStyle = "#fbbf24";
    ctx.font = "15px 'Segoe UI', sans-serif";
    ctx.fillText(`⭐ Niveles Completados: ${completedLevelsCount}/7   |   🍫 M&Ms (Tokens) Ahorrados: ~${tokensSaved || 850}   |   ☕ Cierres de Mes Salvados: 100%`, width / 2, 365);

    // Firmas Cómicas
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px 'Segoe UI', sans-serif";
    ctx.fillText("________________________", width / 2 - 180, 430);
    ctx.fillText("Claude El Masmelo", width / 2 - 180, 450);
    ctx.fillText("Cerebro de IA & Protector de Cuentas", width / 2 - 180, 470);

    ctx.fillText("________________________", width / 2 + 180, 430);
    ctx.fillText("Don Saldo & El Equipo", width / 2 + 180, 450);
    ctx.fillText("Gerencia de Gestión de Ingresos", width / 2 + 180, 470);

    // Sello circular
    ctx.beginPath();
    ctx.arc(width / 2, 440, 36, 0, Math.PI * 2);
    ctx.fillStyle = "#b45309";
    ctx.fill();
    ctx.strokeStyle = "#fef08a";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px Arial";
    ctx.fillText("VERIFICADO", width / 2, 435);
    ctx.fillText("GEMINI 3.8", width / 2, 450);
  }
}

window.cookbook = new PromptCookbook();
