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

  // Personajes especiales
  cristian: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 38 C7 28 12 25 20 25 C28 25 33 28 33 38 Z" fill="#475569"/>
      <path d="M16 25 L20 31 L24 25 Z" fill="#e2e8f0"/>
      <rect x="9" y="29" width="22" height="5" rx="2.5" fill="#334155"/><rect x="11" y="31" width="18" height="4" rx="2" fill="#1e293b"/>
      <circle cx="10.5" cy="31.5" r="2" fill="#f5d0b0"/><circle cx="29.5" cy="31.5" r="2" fill="#f5d0b0"/>
      <ellipse cx="20" cy="15" rx="8" ry="8.5" fill="#f5d0b0"/>
      <path d="M11.8 13.5 C11.5 6.5 15.5 5 20.5 5 C25.5 5 28.5 7 28.2 13.5 C27.5 10.5 26 9.6 24 9.4 C21 9.2 17 8.6 15.5 7.2 C14.5 9 13 10.5 11.8 13.5 Z" fill="#3b2a20"/>
      <path d="M15.5 7.2 C17 6.6 18.5 6.4 20 6.5" stroke="#5b4335" stroke-width="0.8" stroke-linecap="round"/>
      <path d="M12.3 16 C12.6 23 16.5 24.5 20 24.5 C23.5 24.5 27.4 23 27.7 16 C26 19.6 24 20.6 20 20.6 C16 20.6 14 19.6 12.3 16 Z" fill="#3b2a20" opacity="1"/><path d="M17 19.6 Q20 18.6 23 19.6 Q20 20.6 17 19.6 Z" fill="#3b2a20"/>
      <path d="M14.5 11.8 L18.5 13.6" stroke="#1c1917" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M25.5 11.8 L21.5 13.6" stroke="#1c1917" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M15.5 15.3 L18 15.3" stroke="#1c1917" stroke-width="1.6" stroke-linecap="round"/><path d="M22 15.3 L24.5 15.3" stroke="#1c1917" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M17.2 20.6 Q20 18.6 22.8 20.6" stroke="#fca5a5" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="14.3" cy="17.5" r="1.4" fill="#f87171" opacity="0.6"/><circle cx="25.7" cy="17.5" r="1.4" fill="#f87171" opacity="0.6"/>
      <path d="M31 4 L33 6 M35 4 L33 6 M33 6 L33 8.5 M33 6 L30.5 6 M33 6 L35.5 6" stroke="#ef4444" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="7" cy="7" r="2" fill="#94a3b8" opacity="0.8"/><circle cx="5" cy="4" r="1.3" fill="#94a3b8" opacity="0.6"/>
    </svg>
  `,

  mario: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Traje azul oscuro -->
      <path d="M7 38 C7 28 12 25 20 25 C28 25 33 28 33 38 Z" fill="#1e3a8a"/>
      <!-- Camisa y solapas -->
      <path d="M16 25 L20 32 L24 25 Z" fill="#e0f2fe"/>
      <path d="M16 25 L18.5 33 L14 29 Z" fill="#172554"/>
      <path d="M24 25 L21.5 33 L26 29 Z" fill="#172554"/>
      <!-- Corbata dorada -->
      <polygon points="19,26.5 21,26.5 21.6,33 20,35 18.4,33" fill="#f59e0b"/>
      <!-- Carpeta con informe -->
      <rect x="25" y="29" width="7" height="8" rx="1" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
      <path d="M26.5 32 L30.5 32 M26.5 34 L29.5 34" stroke="#22c55e" stroke-width="1" stroke-linecap="round"/>
      <!-- Cabeza -->
      <ellipse cx="20" cy="15" rx="8" ry="8.5" fill="#f1c27d"/>
      <!-- Pelo canoso a los lados, entradas arriba -->
      <path d="M12 15 C11.5 9 14 6.5 17 6 C15 8 14.5 11 14.5 14 Z" fill="#cbd5e1"/>
      <path d="M28 15 C28.5 9 26 6.5 23 6 C25 8 25.5 11 25.5 14 Z" fill="#cbd5e1"/>
      <path d="M17 6 C19 5.3 21 5.3 23 6 C21 6.8 19 6.8 17 6 Z" fill="#cbd5e1"/>
      <!-- Gafas -->
      <rect x="13.8" y="12.6" width="5.2" height="4.2" rx="1.6" stroke="#0f172a" stroke-width="1.2" fill="#e0f2fe" fill-opacity="0.4"/>
      <rect x="21" y="12.6" width="5.2" height="4.2" rx="1.6" stroke="#0f172a" stroke-width="1.2" fill="#e0f2fe" fill-opacity="0.4"/>
      <path d="M19 14.4 L21 14.4" stroke="#0f172a" stroke-width="1.1"/>
      <!-- Ojos -->
      <circle cx="16.4" cy="14.8" r="0.9" fill="#0f172a"/>
      <circle cx="23.6" cy="14.8" r="0.9" fill="#0f172a"/>
      <!-- Sonrisa amable -->
      <path d="M16.5 19 Q20 22.5 23.5 19" stroke="#7c2d12" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,

  catalina: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 14 C10 6 15 4.5 20 4.5 C25 4.5 30 6 29 14 L30.5 30 C27 31 25 28 25 25 L15 25 C15 28 13 31 9.5 30 Z" fill="#5b3416"/>
      <path d="M7 38 C7 28 12 25 20 25 C28 25 33 28 33 38 Z" fill="#059669"/><path d="M16.5 25 L20 29.5 L23.5 25 Z" fill="#f8fafc"/>
      <ellipse cx="20" cy="15" rx="8" ry="8.5" fill="#f1c27d"/>
      <path d="M12 13.5 C12 7 16 6 20 6 C24 6 28 7 28 13.5 C26 10.5 23 9.5 21 9 C18 11 15 12 12 13.5 Z" fill="#5b3416"/>
      <circle cx="16.8" cy="15" r="1" fill="#0f172a"/><circle cx="23.2" cy="15" r="1" fill="#0f172a"/>
      <circle cx="14.6" cy="18" r="1.2" fill="#fb7185" opacity="0.45"/><circle cx="25.4" cy="18" r="1.2" fill="#fb7185" opacity="0.45"/>
      <path d="M16.8 19 Q20 21.8 23.2 19" stroke="#7c2d12" stroke-width="1.4" stroke-linecap="round"/>
      <rect x="13.8" y="12.8" width="5.4" height="4.2" rx="1.6" stroke="#dc2626" stroke-width="1.4" fill="#e0f2fe" fill-opacity="0.35"/><rect x="20.8" y="12.8" width="5.4" height="4.2" rx="1.6" stroke="#dc2626" stroke-width="1.4" fill="#e0f2fe" fill-opacity="0.35"/><path d="M19.2 14.6 L20.8 14.6" stroke="#dc2626" stroke-width="1"/>
      <circle cx="29" cy="31" r="3.4" fill="#e0f2fe" fill-opacity="0.6" stroke="#facc15" stroke-width="1.6"/>
      <path d="M26.6 33.4 L24 36.5" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,

  carlos: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 38 C7 28 12 25 20 25 C28 25 33 28 33 38 Z" fill="#38bdf8"/><path d="M16.5 25 L20 29.5 L23.5 25 Z" fill="#e0f2fe"/>
      <ellipse cx="20" cy="15" rx="8" ry="8.5" fill="#8d5524"/>
      <ellipse cx="17.5" cy="9.5" rx="3" ry="1.6" fill="#ffffff" opacity="0.28"/>
      <path d="M12.3 16 C12.6 23 16.5 24.5 20 24.5 C23.5 24.5 27.4 23 27.7 16 C26 19.6 24 20.6 20 20.6 C16 20.6 14 19.6 12.3 16 Z" fill="#2b1a10" opacity="1"/><path d="M17 19.6 Q20 18.6 23 19.6 Q20 20.6 17 19.6 Z" fill="#2b1a10"/>
      <circle cx="16.8" cy="15" r="1" fill="#0f172a"/><circle cx="23.2" cy="15" r="1" fill="#0f172a"/>
      <path d="M17.8 19.9 Q20 21.2 22.2 19.9" stroke="#f8fafc" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M11.2 15 C11.2 3.5 28.8 3.5 28.8 15" stroke="#334155" stroke-width="1.6"/>
      <rect x="9.6" y="13" width="3" height="5" rx="1.2" fill="#334155"/><rect x="27.4" y="13" width="3" height="5" rx="1.2" fill="#334155"/>
      <path d="M11 18 C11 21 13 22.8 15.5 22.8" stroke="#334155" stroke-width="1.2"/><circle cx="16" cy="22.8" r="1.2" fill="#ef4444"/>
    </svg>
  `,

  braian: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 15 C10 6 15 4 20 4 C25 4 30 6 29 15 L29.5 21 C28 21.5 27.5 19 27.5 17 L12.5 17 C12.5 19 12 21.5 10.5 21 Z" fill="#b5651d"/>
      <path d="M7 38 C7 28 12 25 20 25 C28 25 33 28 33 38 Z" fill="#7c3aed"/><path d="M16.5 25 L20 29.5 L23.5 25 Z" fill="#c4b5fd"/>
      <ellipse cx="20" cy="15" rx="8" ry="8.5" fill="#f0c8a0"/>
      <path d="M12 13.5 C12 7.5 15.5 5.8 20 5.8 C24.5 5.8 28 7.5 28 13.5 C26 11 24.5 9.5 22 9.2 C20 10.8 15 11.5 12 13.5 Z" fill="#b5651d"/>
      <path d="M12.3 16 C12.6 23 16.5 24.5 20 24.5 C23.5 24.5 27.4 23 27.7 16 C26 19.6 24 20.6 20 20.6 C16 20.6 14 19.6 12.3 16 Z" fill="#8a4b16" opacity="1"/><path d="M17 19.6 Q20 18.6 23 19.6 Q20 20.6 17 19.6 Z" fill="#8a4b16"/>
      <circle cx="16.8" cy="15" r="1" fill="#0f172a"/><circle cx="23.2" cy="15" r="1" fill="#0f172a"/>
      <path d="M17.6 19.7 Q20 21.4 22.4 19.7" stroke="#f8fafc" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M12 26 C12 31 28 31 28 26" stroke="#0f172a" stroke-width="1.6"/><circle cx="12" cy="26.5" r="2" fill="#0f172a"/><circle cx="28" cy="26.5" r="2" fill="#0f172a"/>
      <rect x="22" y="29" width="12" height="7" rx="1" fill="#cbd5e1" stroke="#475569" stroke-width="0.8"/>
      <path d="M24 31.3 L26 31.3 M24 33.5 L30 33.5" stroke="#22c55e" stroke-width="1" stroke-linecap="round"/>
      <rect x="20.5" y="36" width="15" height="1.6" rx="0.8" fill="#64748b"/>
    </svg>
  `,

  juliana: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 14 C10 6 15 4.5 20 4.5 C25 4.5 30 6 29 14 L30.5 30 C27 31 25 28 25 25 L15 25 C15 28 13 31 9.5 30 Z" fill="#a16207"/>
      <path d="M7 38 C7 28 12 25 20 25 C28 25 33 28 33 38 Z" fill="#ec4899"/><path d="M16.5 25 L20 29.5 L23.5 25 Z" fill="#fce7f3"/>
      <ellipse cx="20" cy="15" rx="8" ry="8.5" fill="#fde2cc"/>
      <path d="M12 13.5 C12 7 16 6 20 6 C24 6 28 7 28 13.5 C26 10.5 23 9.5 21 9 C18 11 15 12 12 13.5 Z" fill="#a16207"/>
      <circle cx="26.5" cy="9" r="1.2" fill="#a855f7"/>
      <circle cx="16.8" cy="15" r="1" fill="#0f172a"/><circle cx="23.2" cy="15" r="1" fill="#0f172a"/>
      <path d="M15.6 13.6 L15 12.8 M24.4 13.6 L25 12.8" stroke="#0f172a" stroke-width="0.8" stroke-linecap="round"/>
      <circle cx="14.6" cy="18" r="1.2" fill="#fb7185" opacity="0.45"/><circle cx="25.4" cy="18" r="1.2" fill="#fb7185" opacity="0.45"/>
      <path d="M16.8 19 Q20 21.8 23.2 19" stroke="#7c2d12" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M25 28 L33 28 L33 37 L31.7 36 L30.3 37 L29 36 L27.7 37 L26.3 36 L25 37 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.8"/>
      <path d="M26.5 30.3 L31.5 30.3 M26.5 32.3 L30 32.3" stroke="#64748b" stroke-width="0.9"/>
      <text x="29" y="35.6" font-size="3.2" font-family="Arial" font-weight="bold" fill="#16a34a" text-anchor="middle">$</text>
    </svg>
  `,

  chanty: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 13 C9.5 5 15 3.5 20 3.5 C25 3.5 30.5 5 29 13 L31.5 34 C29 35.5 26.5 33 26 30 L14 30 C13.5 33 11 35.5 8.5 34 Z" fill="#0b0b0f" stroke="#4b5563" stroke-width="0.7"/>
      <path d="M7 38 C7 28 12 25 20 25 C28 25 33 28 33 38 Z" fill="#1f2937"/>
      <path d="M21 27.5 L17.5 32 L20 32 L18.5 36 L23 30.5 L20.5 30.5 L22 27.5 Z" fill="#ef4444"/>
      <path d="M13 30 L8.5 34 C8 31 10.5 27 13 26 Z M27 30 L31.5 34 C32 31 29.5 27 27 26 Z" fill="#0b0b0f" stroke="#4b5563" stroke-width="0.7"/>
      <ellipse cx="20" cy="15" rx="8" ry="8.5" fill="#a0663a"/>
      <path d="M11.8 14 L12.5 8 C13.5 5.5 17 4.8 20 4.8 C23 4.8 26.5 5.5 27.5 8 L28.2 14 L26.5 10.5 L25 13 L23.5 10 L21.5 12.8 L20 9.8 L18.5 12.8 L16.5 10 L15 13 L13.5 10.5 Z" fill="#0b0b0f" stroke="#4b5563" stroke-width="0.7"/>
      <path d="M12.5 18 L11.5 28 M27.5 18 L28.5 28" stroke="#6b7280" stroke-width="0.6" stroke-linecap="round"/>
      <ellipse cx="16.8" cy="15.4" rx="1.5" ry="1.8" fill="#0f172a"/><ellipse cx="23.2" cy="15.4" rx="1.5" ry="1.8" fill="#0f172a"/>
      <circle cx="17.3" cy="14.8" r="0.6" fill="#ffffff"/><circle cx="23.7" cy="14.8" r="0.6" fill="#ffffff"/>
      <path d="M16.8 19.3 Q20 22 23.2 19.3" stroke="#3f1d0b" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M25.5 29 L32.5 29 L31.5 36.5 L26.5 36.5 Z" fill="#f8fafc" stroke="#78350f" stroke-width="0.9"/>
      <path d="M32.3 30.5 C34.5 30.5 34.5 34 31.9 34" stroke="#78350f" stroke-width="0.9"/>
      <rect x="26" y="29.6" width="6" height="1.5" fill="#78350f"/>
      <path d="M27.5 27.5 C26.8 26.5 28.2 25.5 27.5 24.3 M30.3 27.5 C29.6 26.5 31 25.5 30.3 24.3" stroke="#cbd5e1" stroke-width="0.8" stroke-linecap="round"/>
    </svg>
  `,

  estefa: `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 14 C10 6 15 4.5 20 4.5 C25 4.5 30 6 29 14 L29.5 25 C27 26 25.5 24 25.5 22 L14.5 22 C14.5 24 13 26 10.5 25 Z" fill="#facc15"/>
      <path d="M7 38 C7 28 12 25 20 25 C28 25 33 28 33 38 Z" fill="#14b8a6"/><path d="M16.5 25 L20 29.5 L23.5 25 Z" fill="#ccfbf1"/>
      <ellipse cx="20" cy="15" rx="8" ry="8.5" fill="#fde2cc"/>
      <path d="M12 13.5 C11.8 7 16 5.6 20 5.6 C24.5 5.6 28.2 7 28 13.5 C27 10 25 8.8 22.5 8.6 C21 10.6 16 11.8 12 13.5 Z" fill="#facc15"/>
      <path d="M22.5 8.6 C23.5 7.5 25 7 26.5 7.5" stroke="#eab308" stroke-width="0.8" stroke-linecap="round"/>
      <circle cx="11.9" cy="18.3" r="1.6" stroke="#a855f7" stroke-width="0.9"/><circle cx="28.1" cy="18.3" r="1.6" stroke="#a855f7" stroke-width="0.9"/>
      <circle cx="16.8" cy="15" r="1" fill="#0f172a"/><circle cx="23.2" cy="15" r="1" fill="#0f172a"/>
      <circle cx="14.6" cy="18" r="1.2" fill="#fb7185" opacity="0.45"/><circle cx="25.4" cy="18" r="1.2" fill="#fb7185" opacity="0.45"/>
      <path d="M16.8 19 Q20 21.8 23.2 19" stroke="#7c2d12" stroke-width="1.4" stroke-linecap="round"/>
      <rect x="13.8" y="12.8" width="5.4" height="4.2" rx="1.6" stroke="#1e293b" stroke-width="1.2" fill="#e0f2fe" fill-opacity="0.35"/><rect x="20.8" y="12.8" width="5.4" height="4.2" rx="1.6" stroke="#1e293b" stroke-width="1.2" fill="#e0f2fe" fill-opacity="0.35"/><path d="M19.2 14.6 L20.8 14.6" stroke="#1e293b" stroke-width="1"/>
      <rect x="25" y="27.5" width="8" height="10" rx="1.2" fill="#334155"/>
      <rect x="26.2" y="28.6" width="5.6" height="2.4" rx="0.4" fill="#86efac"/>
      <rect x="26.2" y="32.0" width="1.4" height="1.3" rx="0.3" fill="#cbd5e1"/><rect x="26.2" y="33.9" width="1.4" height="1.3" rx="0.3" fill="#cbd5e1"/><rect x="26.2" y="35.8" width="1.4" height="1.3" rx="0.3" fill="#cbd5e1"/><rect x="28.2" y="32.0" width="1.4" height="1.3" rx="0.3" fill="#cbd5e1"/><rect x="28.2" y="33.9" width="1.4" height="1.3" rx="0.3" fill="#cbd5e1"/><rect x="28.2" y="35.8" width="1.4" height="1.3" rx="0.3" fill="#cbd5e1"/><rect x="30.2" y="32.0" width="1.4" height="1.3" rx="0.3" fill="#cbd5e1"/><rect x="30.2" y="33.9" width="1.4" height="1.3" rx="0.3" fill="#cbd5e1"/><rect x="30.2" y="35.8" width="1.4" height="1.3" rx="0.3" fill="#cbd5e1"/>
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
