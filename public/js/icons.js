// Biblioteca de Iconos Vectoriales SVG de Alta Calidad para JueGuIA
// Reemplaza los emojis por gráficos vectoriales definidos y escalables

const ICONS = {
  // 1. SNACKS DE IA
  masmelo: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="marshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fed7aa" />
          <stop offset="50%" stop-color="#f472b6" />
          <stop offset="100%" stop-color="#c084fc" />
        </linearGradient>
        <filter id="marshGlow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#ec4899" flood-opacity="0.3"/>
        </filter>
      </defs>
      <rect x="6" y="8" width="28" height="24" rx="8" fill="url(#marshGrad)" filter="url(#marshGlow)"/>
      <ellipse cx="20" cy="8" rx="14" ry="4" fill="#fdf2f8"/>
      <ellipse cx="20" cy="32" rx="14" ry="4" fill="#db2777" opacity="0.4"/>
      <!-- Carita tierna -->
      <circle cx="15" cy="18" r="2" fill="#1e1b4b"/>
      <circle cx="25" cy="18" r="2" fill="#1e1b4b"/>
      <path d="M18 22 C19 24, 21 24, 22 22" stroke="#1e1b4b" stroke-width="1.8" stroke-linecap="round"/>
      <ellipse cx="12" cy="21" rx="2" ry="1.2" fill="#f43f5e" opacity="0.6"/>
      <ellipse cx="28" cy="21" rx="2" ry="1.2" fill="#f43f5e" opacity="0.6"/>
    </svg>
  `,

  mm: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mmGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fbbf24" />
          <stop offset="70%" stop-color="#d97706" />
          <stop offset="100%" stop-color="#92400e" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="16" fill="url(#mmGrad)"/>
      <ellipse cx="16" cy="14" rx="10" ry="5" fill="#fef08a" opacity="0.4"/>
      <!-- Letra 'm' icónica -->
      <text x="20" y="27" font-family="'Arial Black', sans-serif" font-weight="900" font-size="18" fill="#ffffff" text-anchor="middle" font-style="italic">m</text>
    </svg>
  `,

  detodito: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef4444" />
          <stop offset="50%" stop-color="#f97316" />
          <stop offset="100%" stop-color="#eab308" />
        </linearGradient>
      </defs>
      <!-- Bolsa de snack -->
      <path d="M9 7 L31 7 L28 35 L12 35 Z" fill="url(#bagGrad)"/>
      <!-- Zigzag arriba y abajo -->
      <path d="M9 7 L12 4 L15 7 L18 4 L21 7 L24 4 L27 7 L30 4 L31 7" stroke="#b91c1c" stroke-width="2" fill="none"/>
      <!-- Papita que asoma -->
      <ellipse cx="20" cy="12" rx="7" ry="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
      <!-- Texto DeTodito -->
      <rect x="11" y="18" width="18" height="9" rx="3" fill="#ffffff"/>
      <text x="20" y="25" font-family="'Arial Black', sans-serif" font-weight="900" font-size="7" fill="#b91c1c" text-anchor="middle">TODO</text>
    </svg>
  `,

  galleta: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cookieGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#d97706" />
          <stop offset="80%" stop-color="#b45309" />
          <stop offset="100%" stop-color="#78350f" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="16" fill="url(#cookieGrad)"/>
      <!-- Chispas de chocolate -->
      <circle cx="14" cy="14" r="3" fill="#451a03"/>
      <circle cx="26" cy="15" r="2.5" fill="#451a03"/>
      <circle cx="18" cy="22" r="3" fill="#451a03"/>
      <circle cx="25" cy="27" r="2.2" fill="#451a03"/>
      <circle cx="12" cy="26" r="2" fill="#451a03"/>
      <!-- Textura de galleta -->
      <circle cx="16" cy="18" r="1" fill="#fed7aa" opacity="0.6"/>
      <circle cx="22" cy="12" r="1" fill="#fed7aa" opacity="0.6"/>
    </svg>
  `,

  // 2. ICONOS DE OFICINA & HERRAMIENTAS
  coffee: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 14 H28 V27 C28 31 24 34 20 34 C16 34 12 31 12 27 V14 Z" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>
      <path d="M28 17 H33 C35 17 36 19 36 21 C36 23 35 25 33 25 H28" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round"/>
      <!-- Humo -->
      <path d="M15 10 Q14 7 16 5" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      <path d="M20 9 Q19 6 21 4" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      <path d="M25 10 Q24 7 26 5" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  printer: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11" y="8" width="18" height="10" rx="2" fill="#ffffff" stroke="#475569" stroke-width="2"/>
      <rect x="7" y="16" width="26" height="14" rx="4" fill="#334155" stroke="#64748b" stroke-width="2"/>
      <rect x="11" y="24" width="18" height="10" rx="1" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
      <circle cx="28" cy="20" r="1.5" fill="#22c55e"/>
    </svg>
  `,

  boss: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="14" r="8" fill="#fde047"/>
      <!-- Traje y corbata -->
      <path d="M8 36 C8 27 13 24 20 24 C27 24 32 27 32 36 Z" fill="#1e293b"/>
      <polygon points="17,24 23,24 21,34 19,34" fill="#ef4444"/>
    </svg>
  `,

  user: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="14" r="7" fill="#60a5fa"/>
      <path d="M9 34 C9 26 14 23 20 23 C26 23 31 26 31 34 Z" fill="#3b82f6"/>
    </svg>
  `,

  terminal: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="28" height="20" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <rect x="16" y="28" width="8" height="5" fill="#475569"/>
      <rect x="12" y="33" width="16" height="3" rx="1.5" fill="#64748b"/>
      <path d="M10 14 L14 18 L10 22" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="21" x2="22" y2="21" stroke="#22c55e" stroke-width="2"/>
    </svg>
  `,

  robotPrompt: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="24" height="20" rx="6" fill="#6366f1" stroke="#a5b4fc" stroke-width="2"/>
      <circle cx="15" cy="18" r="3" fill="#ffffff"/>
      <circle cx="25" cy="18" r="3" fill="#ffffff"/>
      <line x1="20" y1="4" x2="20" y2="10" stroke="#a5b4fc" stroke-width="2.5"/>
      <circle cx="20" cy="3" r="2.5" fill="#f43f5e"/>
      <rect x="14" y="24" width="12" height="3" rx="1.5" fill="#1e1b4b"/>
    </svg>
  `,

  star: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,4 25,14 36,15 28,23 30,34 20,28 10,34 12,23 4,15 15,14" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
    </svg>
  `,

  table: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="12" width="28" height="8" rx="2" fill="#d97706" stroke="#92400e" stroke-width="2"/>
      <rect x="10" y="20" width="3" height="14" fill="#78350f"/>
      <rect x="27" y="20" width="3" height="14" fill="#78350f"/>
    </svg>
  `,
};

// Función para insertar icono en elementos HTML
function renderIcon(iconName, customClass = "svg-icon") {
  const svg = ICONS[iconName];
  if (!svg) return "";
  return `<span class="${customClass} icon-${iconName}">${svg}</span>`;
}

// Convertir SVG a Image para dibujarlo en HTML5 Canvas
const CANVAS_IMAGES = {};

function preloadCanvasIcons() {
  const keys = Object.keys(ICONS);
  keys.forEach(k => {
    const svgBlob = new Blob([ICONS[k]], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.src = url;
    CANVAS_IMAGES[k] = img;
  });
}

preloadCanvasIcons();
