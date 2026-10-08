export default function BrandLogo() {
  return <span className="brand-logo-image">
    <img src="/images/nuvitaglo-v-young-leaves_cdx.webp" alt="NuVitaGlo" width="2172" height="724" />
  </span>
}

export function TypographyLogo({ font = 'Outfit', weight = 500 }) {
  return <span className="brand-logo" aria-label="NuVitta">
    <svg className="brand-logo-leaf" viewBox="0 0 80 52" fill="none" aria-hidden="true">
      <path d="M9 32C10 12 26 6 45 8C58 9 68 6 75 2C70 23 58 37 40 39C29 40 18 36 9 32Z" fill="currentColor" />
      <path d="M6 35C20 34 29 39 42 40C51 41 60 39 66 35C60 47 47 51 33 48C20 46 11 40 6 35Z" fill="#84966b" />
      <path d="M8 34C26 33 44 26 60 15M30 30L38 20" stroke="#faf9f5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <span className="brand-logo-name" style={{ fontFamily: `'${font}', ${font === 'Cormorant Garamond' || font === 'Fraunces' ? 'serif' : 'sans-serif'}`, fontWeight: weight }} aria-hidden="true">NuVitta</span>
  </span>
}
