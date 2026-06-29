const THEMES = {
  classic: {
    name: 'Classic',
    emoji: '🟢',
    bg: '#F1EFE8',
    accent: '#1D9E75',
    accentDark: '#0F6E56',
    accentLight: '#E1F5EE',
    decoration: null
  },
  blossom: {
    name: 'Blossom',
    emoji: '🌸',
    bg: '#FAF4F4',
    accent: '#C2607A',
    accentDark: '#9B3F58',
    accentLight: '#FAEAED',
    decoration: 'blossom'
  },
  alpine: {
    name: 'Alpine',
    emoji: '🏔️',
    bg: '#F2F4F3',
    accent: '#3A7D6B',
    accentDark: '#2A5E52',
    accentLight: '#E0EEEA',
    decoration: 'alpine'
  },
  coastal: {
    name: 'Coastal',
    emoji: '🌊',
    bg: '#F5F3EE',
    accent: '#3A7EA8',
    accentDark: '#2A5E80',
    accentLight: '#E0EEF5',
    decoration: 'coastal'
  },
  jungle: {
    name: 'Jungle',
    emoji: '🌿',
    bg: '#F2F5F0',
    accent: '#2E7D52',
    accentDark: '#1F5C3A',
    accentLight: '#E0F0E6',
    decoration: 'jungle'
  },
  desert: {
    name: 'Desert',
    emoji: '🏜️',
    bg: '#FAF3EC',
    accent: '#C2703A',
    accentDark: '#9B5228',
    accentLight: '#FAEADC',
    decoration: 'desert'
  },
  letters: {
    name: 'Letters',
    emoji: '✉️',
    bg: '#FAF8F4',
    accent: '#1D9E75',
    accentDark: '#0F6E56',
    accentLight: '#E1F5EE',
    decoration: 'letters'
  },
  characters: {
    name: 'Characters',
    emoji: '🧒',
    bg: '#F5F4F0',
    accent: '#1D9E75',
    accentDark: '#0F6E56',
    accentLight: '#E1F5EE',
    decoration: 'characters'
  }
}

const SVGS = {
  blossom: `
    <svg viewBox="0 0 200 600" xmlns="http://www.w3.org/2000/svg" style="position:fixed;right:0;top:0;height:100vh;width:180px;pointer-events:none;opacity:0.18;z-index:0;">
      <line x1="160" y1="600" x2="100" y2="300" stroke="#C2607A" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="100" y1="300" x2="60" y2="160" stroke="#C2607A" stroke-width="2" stroke-linecap="round"/>
      <line x1="60" y1="160" x2="30" y2="60" stroke="#C2607A" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="100" y1="300" x2="150" y2="200" stroke="#C2607A" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="60" y1="160" x2="110" y2="100" stroke="#C2607A" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="60" y1="160" x2="20" y2="120" stroke="#C2607A" stroke-width="1.2" stroke-linecap="round"/>
      <!-- blossoms -->
      <circle cx="30" cy="60" r="6" fill="#F4A7B9" opacity="0.7"/>
      <circle cx="22" cy="54" r="4" fill="#F4A7B9" opacity="0.5"/>
      <circle cx="38" cy="52" r="5" fill="#FCCDD8" opacity="0.6"/>
      <circle cx="150" cy="200" r="5" fill="#F4A7B9" opacity="0.6"/>
      <circle cx="160" cy="192" r="4" fill="#FCCDD8" opacity="0.5"/>
      <circle cx="110" cy="100" r="5" fill="#F4A7B9" opacity="0.6"/>
      <circle cx="118" cy="92" r="4" fill="#FCCDD8" opacity="0.5"/>
      <circle cx="20" cy="120" r="4" fill="#F4A7B9" opacity="0.5"/>
      <circle cx="12" cy="113" r="3" fill="#FCCDD8" opacity="0.4"/>
      <!-- falling petals -->
      <ellipse cx="80" cy="250" rx="4" ry="6" fill="#F4A7B9" opacity="0.3" transform="rotate(-20 80 250)"/>
      <ellipse cx="140" cy="350" rx="3" ry="5" fill="#FCCDD8" opacity="0.25" transform="rotate(15 140 350)"/>
      <ellipse cx="50" cy="420" rx="3" ry="5" fill="#F4A7B9" opacity="0.2" transform="rotate(-10 50 420)"/>
      <ellipse cx="170" cy="480" rx="4" ry="6" fill="#FCCDD8" opacity="0.2" transform="rotate(25 170 480)"/>
    </svg>`,

  alpine: `
    <svg viewBox="0 0 200 600" xmlns="http://www.w3.org/2000/svg" style="position:fixed;right:0;top:0;height:100vh;width:180px;pointer-events:none;opacity:0.15;z-index:0;">
      <!-- mountains -->
      <polyline points="0,600 60,380 120,460 180,320 200,380 200,600" fill="#B8CEC8" stroke="none"/>
      <polyline points="40,600 110,340 160,420 200,360 200,600" fill="#D4E4E0" stroke="none"/>
      <!-- mountain outlines -->
      <polyline points="0,600 60,380 120,460 180,320 200,380" fill="none" stroke="#3A7D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- snow caps -->
      <polyline points="50,395 60,380 70,395" fill="white" stroke="white" stroke-width="1" stroke-linejoin="round"/>
      <polyline points="168,338 180,320 192,338" fill="white" stroke="white" stroke-width="1" stroke-linejoin="round"/>
      <!-- pine trees -->
      <line x1="20" y1="580" x2="20" y2="530" stroke="#2A5E52" stroke-width="1.2"/>
      <polygon points="20,530 12,555 28,555" fill="#2A5E52" opacity="0.6"/>
      <polygon points="20,518 11,540 29,540" fill="#2A5E52" opacity="0.5"/>
      <line x1="170" y1="580" x2="170" y2="540" stroke="#2A5E52" stroke-width="1.2"/>
      <polygon points="170,540 163,560 177,560" fill="#2A5E52" opacity="0.5"/>
      <polygon points="170,528 162,548 178,548" fill="#2A5E52" opacity="0.4"/>
    </svg>`,

  coastal: `
    <svg viewBox="0 0 200 600" xmlns="http://www.w3.org/2000/svg" style="position:fixed;right:0;top:0;height:100vh;width:180px;pointer-events:none;opacity:0.18;z-index:0;">
      <!-- sky gradient hint -->
      <rect x="0" y="0" width="200" height="350" fill="#D4E8F5" opacity="0.3"/>
      <!-- horizon -->
      <line x1="0" y1="350" x2="200" y2="350" stroke="#3A7EA8" stroke-width="1" opacity="0.4"/>
      <!-- waves -->
      <path d="M0,370 Q25,360 50,370 Q75,380 100,370 Q125,360 150,370 Q175,380 200,370" fill="none" stroke="#3A7EA8" stroke-width="1.5" opacity="0.5"/>
      <path d="M0,390 Q30,378 60,390 Q90,402 120,390 Q150,378 180,390 Q195,396 200,390" fill="none" stroke="#3A7EA8" stroke-width="1.2" opacity="0.4"/>
      <path d="M0,415 Q40,403 80,415 Q120,427 160,415 Q180,409 200,415" fill="none" stroke="#3A7EA8" stroke-width="1" opacity="0.3"/>
      <!-- sand -->
      <path d="M0,440 Q100,430 200,440 L200,600 L0,600 Z" fill="#E8D9C0" opacity="0.3"/>
      <!-- sun -->
      <circle cx="150" cy="120" r="28" fill="#F5D98A" opacity="0.25"/>
      <circle cx="150" cy="120" r="20" fill="#F5C84A" opacity="0.2"/>
      <!-- seagull hints -->
      <path d="M60,180 Q68,175 76,180" fill="none" stroke="#3A7EA8" stroke-width="1.2" opacity="0.4"/>
      <path d="M90,160 Q100,154 110,160" fill="none" stroke="#3A7EA8" stroke-width="1" opacity="0.3"/>
      <!-- sailboat -->
      <line x1="130" y1="340" x2="130" y2="300" stroke="#3A7EA8" stroke-width="1" opacity="0.4"/>
      <polygon points="130,305 110,338 130,338" fill="#E8D9C0" opacity="0.3" stroke="#3A7EA8" stroke-width="0.8"/>
      <polygon points="130,310 148,336 130,336" fill="white" opacity="0.3" stroke="#3A7EA8" stroke-width="0.8"/>
    </svg>`,

  jungle: `
    <svg viewBox="0 0 200 600" xmlns="http://www.w3.org/2000/svg" style="position:fixed;right:0;top:0;height:100vh;width:180px;pointer-events:none;opacity:0.18;z-index:0;">
      <!-- large leaves -->
      <path d="M180,0 Q80,80 120,200" fill="none" stroke="#2E7D52" stroke-width="2" stroke-linecap="round"/>
      <path d="M180,0 Q160,100 120,200" fill="#2E7D52" opacity="0.12"/>
      <path d="M200,100 Q120,160 140,300" fill="none" stroke="#2E7D52" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M200,100 Q180,180 140,300" fill="#2E7D52" opacity="0.1"/>
      <path d="M160,280 Q80,340 100,460" fill="none" stroke="#1F5C3A" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M160,280 Q140,360 100,460" fill="#1F5C3A" opacity="0.1"/>
      <!-- small detail leaves -->
      <ellipse cx="120" cy="200" rx="18" ry="8" fill="#2E7D52" opacity="0.2" transform="rotate(-30 120 200)"/>
      <ellipse cx="140" cy="300" rx="14" ry="6" fill="#2E7D52" opacity="0.15" transform="rotate(20 140 300)"/>
      <ellipse cx="100" cy="460" rx="16" ry="7" fill="#1F5C3A" opacity="0.15" transform="rotate(-15 100 460)"/>
      <!-- vine -->
      <path d="M200,400 Q170,450 180,520 Q190,560 160,600" fill="none" stroke="#2E7D52" stroke-width="1" stroke-dasharray="4,3" opacity="0.3"/>
    </svg>`,

  desert: `
    <svg viewBox="0 0 200 600" xmlns="http://www.w3.org/2000/svg" style="position:fixed;right:0;top:0;height:100vh;width:180px;pointer-events:none;opacity:0.18;z-index:0;">
      <!-- sky -->
      <rect x="0" y="0" width="200" height="380" fill="#FAD98A" opacity="0.15"/>
      <!-- mesa / butte horizon -->
      <path d="M0,380 L0,320 L40,320 L40,300 L90,300 L90,320 L130,320 L130,290 L170,290 L170,320 L200,320 L200,380 Z" fill="#C2703A" opacity="0.2"/>
      <path d="M0,380 L0,340 L50,340 L50,360 L100,360 L100,340 L150,340 L150,360 L200,360 L200,380 Z" fill="#D4845A" opacity="0.15"/>
      <!-- ground -->
      <rect x="0" y="380" width="200" height="220" fill="#E8C89A" opacity="0.2"/>
      <!-- cactus left -->
      <line x1="30" y1="560" x2="30" y2="420" stroke="#2E7D52" stroke-width="3" stroke-linecap="round"/>
      <line x1="30" y1="470" x2="10" y2="450" stroke="#2E7D52" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="10" y1="450" x2="10" y2="435" stroke="#2E7D52" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="30" y1="490" x2="52" y2="468" stroke="#2E7D52" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="52" y1="468" x2="52" y2="452" stroke="#2E7D52" stroke-width="2.5" stroke-linecap="round"/>
      <!-- cactus right -->
      <line x1="170" y1="560" x2="170" y2="450" stroke="#2E7D52" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="170" y1="480" x2="152" y2="462" stroke="#2E7D52" stroke-width="2" stroke-linecap="round"/>
      <line x1="152" y1="462" x2="152" y2="450" stroke="#2E7D52" stroke-width="2" stroke-linecap="round"/>
      <!-- sun -->
      <circle cx="160" cy="80" r="30" fill="#F5C84A" opacity="0.2"/>
      <circle cx="160" cy="80" r="22" fill="#F5D98A" opacity="0.2"/>
    </svg>`,

  letters: `
    <svg viewBox="0 0 200 600" xmlns="http://www.w3.org/2000/svg" style="position:fixed;right:0;top:0;height:100vh;width:180px;pointer-events:none;opacity:0.15;z-index:0;">
      <!-- envelope 1 -->
      <rect x="20" y="40" width="80" height="55" rx="4" fill="none" stroke="#1D9E75" stroke-width="1.5"/>
      <polyline points="20,44 60,72 100,44" fill="none" stroke="#1D9E75" stroke-width="1.5" stroke-linejoin="round"/>
      <!-- stamp -->
      <rect x="80" y="44" width="16" height="18" rx="2" fill="none" stroke="#1D9E75" stroke-width="1"/>
      <rect x="82" y="46" width="12" height="14" rx="1" fill="#E1F5EE" opacity="0.5"/>
      <!-- postmark circle -->
      <circle cx="75" cy="58" r="10" fill="none" stroke="#1D9E75" stroke-width="0.8" stroke-dasharray="2,2"/>
      <!-- envelope 2 - tilted -->
      <g transform="rotate(-12 150 220)">
        <rect x="110" y="195" width="70" height="48" rx="4" fill="none" stroke="#1D9E75" stroke-width="1.5"/>
        <polyline points="110,199 145,222 180,199" fill="none" stroke="#1D9E75" stroke-width="1.5" stroke-linejoin="round"/>
      </g>
      <!-- wax seal -->
      <circle cx="50" cy="380" r="18" fill="none" stroke="#C2607A" stroke-width="1.2"/>
      <circle cx="50" cy="380" r="13" fill="#FAEAED" opacity="0.4"/>
      <text x="50" y="385" text-anchor="middle" font-size="10" fill="#C2607A" opacity="0.6">LL</text>
      <!-- string/twine -->
      <path d="M0,300 Q40,320 30,360 Q20,400 60,420" fill="none" stroke="#C2A87A" stroke-width="1" stroke-dasharray="3,2" opacity="0.4"/>
      <!-- small envelope 3 -->
      <g transform="rotate(8 140 480)">
        <rect x="120" y="460" width="55" height="38" rx="3" fill="none" stroke="#1D9E75" stroke-width="1.2"/>
        <polyline points="120,463 147,480 175,463" fill="none" stroke="#1D9E75" stroke-width="1.2" stroke-linejoin="round"/>
      </g>
      <!-- dots/stamps scattered -->
      <rect x="160" y="140" width="12" height="14" rx="2" fill="none" stroke="#1D9E75" stroke-width="1" opacity="0.5"/>
      <rect x="10" y="520" width="10" height="12" rx="2" fill="none" stroke="#1D9E75" stroke-width="1" opacity="0.4"/>
    </svg>`,

  characters: `
    <svg viewBox="0 0 200 600" xmlns="http://www.w3.org/2000/svg" style="position:fixed;right:0;top:0;height:100vh;width:180px;pointer-events:none;opacity:0.18;z-index:0;">
      <!-- character 1: kid peeking from bottom right -->
      <g transform="translate(120, 520)">
        <!-- head -->
        <circle cx="30" cy="20" r="22" fill="#FDDCB0"/>
        <!-- hair -->
        <path d="M10,14 Q30,-4 50,14" fill="#6B3F1A" opacity="0.8"/>
        <!-- eyes -->
        <circle cx="22" cy="18" r="3" fill="#3A2010"/>
        <circle cx="38" cy="18" r="3" fill="#3A2010"/>
        <circle cx="23" cy="17" r="1" fill="white"/>
        <circle cx="39" cy="17" r="1" fill="white"/>
        <!-- smile -->
        <path d="M22,26 Q30,32 38,26" fill="none" stroke="#C2703A" stroke-width="1.5" stroke-linecap="round"/>
        <!-- hand waving -->
        <ellipse cx="58" cy="10" rx="8" ry="6" fill="#FDDCB0" transform="rotate(-20 58 10)"/>
        <line x1="52" y1="8" x2="58" y2="4" stroke="#FDDCB0" stroke-width="3" stroke-linecap="round"/>
      </g>
      <!-- character 2: small kid sitting top left corner -->
      <g transform="translate(0, 60)">
        <!-- head -->
        <circle cx="28" cy="18" r="16" fill="#F5C9A0"/>
        <!-- hair -->
        <path d="M13,12 Q28,0 43,12" fill="#2A1A0A" opacity="0.7"/>
        <!-- eyes -->
        <circle cx="22" cy="16" r="2.5" fill="#2A1A0A"/>
        <circle cx="34" cy="16" r="2.5" fill="#2A1A0A"/>
        <circle cx="23" cy="15" r="1" fill="white"/>
        <circle cx="35" cy="15" r="1" fill="white"/>
        <!-- smile -->
        <path d="M22,22 Q28,27 34,22" fill="none" stroke="#C2703A" stroke-width="1.2" stroke-linecap="round"/>
        <!-- body sitting -->
        <rect x="16" y="32" width="24" height="20" rx="6" fill="#4A90D9" opacity="0.6"/>
        <!-- legs -->
        <line x1="20" y1="52" x2="18" y2="68" stroke="#FDDCB0" stroke-width="4" stroke-linecap="round"/>
        <line x1="36" y1="52" x2="38" y2="68" stroke="#FDDCB0" stroke-width="4" stroke-linecap="round"/>
        <!-- holding letter -->
        <rect x="42" y="30" width="22" height="16" rx="2" fill="white" stroke="#1D9E75" stroke-width="1"/>
        <polyline points="42,32 53,40 64,32" fill="none" stroke="#1D9E75" stroke-width="1" stroke-linejoin="round"/>
      </g>
      <!-- character 3: tiny figure middle right -->
      <g transform="translate(150, 280)">
        <circle cx="16" cy="12" r="12" fill="#FDDCB0"/>
        <path d="M5,8 Q16,-1 27,8" fill="#8B5E3C" opacity="0.7"/>
        <circle cx="11" cy="11" r="2" fill="#2A1A0A"/>
        <circle cx="21" cy="11" r="2" fill="#2A1A0A"/>
        <path d="M11,17 Q16,21 21,17" fill="none" stroke="#C2703A" stroke-width="1" stroke-linecap="round"/>
        <rect x="8" y="23" width="16" height="14" rx="4" fill="#E85D75" opacity="0.6"/>
      </g>
    </svg>`
}

// ── Apply theme to current page ──────────────────────────────────────────────
export function applyTheme(themeName) {
  const theme = THEMES[themeName] || THEMES.classic

  // CSS variables
  document.documentElement.style.setProperty('--accent', theme.accent)
  document.documentElement.style.setProperty('--accent-dark', theme.accentDark)
  document.documentElement.style.setProperty('--accent-light', theme.accentLight)
  document.documentElement.style.setProperty('--bg', theme.bg)
  document.body.style.background = theme.bg

  // Inject decoration SVG
  document.getElementById('theme-decoration')?.remove()
  if (theme.decoration && SVGS[theme.decoration]) {
    const div = document.createElement('div')
    div.id = 'theme-decoration'
    div.innerHTML = SVGS[theme.decoration]
    document.body.appendChild(div)
  }
}

// ── Theme picker widget (for settings + signup) ───────────────────────────────
export function renderThemePicker(containerId, currentTheme, onChange) {
  const container = document.getElementById(containerId)
  if (!container) return

  container.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:10px;">
      ${Object.entries(THEMES).map(([key, t]) => `
        <button type="button"
          onclick="selectTheme('${key}')"
          id="theme-btn-${key}"
          style="
            display:flex;flex-direction:column;align-items:center;gap:6px;
            padding:12px 16px;border-radius:12px;border:2px solid ${key === currentTheme ? t.accent : '#e5e3dc'};
            background:${key === currentTheme ? t.accentLight : 'white'};
            cursor:pointer;font-family:inherit;transition:all .15s;min-width:80px;
          ">
          <span style="font-size:22px;">${t.emoji}</span>
          <span style="font-size:11px;font-weight:${key === currentTheme ? '600' : '400'};color:${key === currentTheme ? t.accentDark : '#555'};">${t.name}</span>
        </button>
      `).join('')}
    </div>`

  window.selectTheme = function(key) {
    const theme = THEMES[key]
    // Update button styles
    Object.keys(THEMES).forEach(k => {
      const btn = document.getElementById('theme-btn-' + k)
      const t = THEMES[k]
      btn.style.borderColor = k === key ? t.accent : '#e5e3dc'
      btn.style.background = k === key ? t.accentLight : 'white'
      btn.querySelector('span:last-child').style.fontWeight = k === key ? '600' : '400'
      btn.querySelector('span:last-child').style.color = k === key ? t.accentDark : '#555'
    })
    applyTheme(key)
    onChange(key)
  }
}

// ── Load theme for logged-in user ────────────────────────────────────────────
export async function loadAndApplyTheme(supabase) {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const { data: user } = await supabase.from('users').select('theme').eq('id', session.user.id).single()
    applyTheme(user?.theme || 'classic')
  } catch(e) {
    applyTheme('classic')
  }
}

export { THEMES }
