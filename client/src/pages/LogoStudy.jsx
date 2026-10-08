import BrandLogo, { TypographyLogo } from '../components/BrandLogo.jsx'

const fonts = [
  ['Manrope', 'Clean and open'],
  ['DM Sans', 'Soft, familiar, understated'],
  ['Outfit', 'Chosen direction · rounded and modern'],
  ['Inter', 'Crisp and restrained'],
  ['Fraunces', 'A warm, expressive modern serif'],
  ['Cormorant Garamond', 'Fine, elegant, editorial'],
]
const weights = [[400, 'Regular'], [500, 'Medium'], [600, 'Semibold']]

export default function LogoStudy({ logo, onChange }) {
  return <section className="logo-study wrap section">
    <p className="eyebrow">NuVitta · Typography study</p>
    <h1>Find the right feel.</h1>
    <p className="intro">The organic leaf V is our chosen logo. The earlier typography experiments are kept below for reference.</p>
    <div className="approved-logo-preview"><BrandLogo /><p>Chosen logo · Organic leaf V</p></div>
    <div className="logo-study-controls" role="group" aria-label="Logo weight">
      {weights.map(([weight, label]) => <button key={weight} aria-pressed={logo.weight === weight} onClick={() => onChange({ ...logo, weight })}>{label}<span>{weight}</span></button>)}
      <button className="logo-reset" onClick={() => onChange({ font: 'Outfit', weight: 500 })}>Reset to chosen logo</button>
    </div>
    <div className="logo-study-preview">
      <TypographyLogo {...logo} />
      <p>{logo.font} <span>·</span> {weights.find(([weight]) => weight === logo.weight)[1]}</p>
    </div>
    <div className="logo-font-grid" role="group" aria-label="Logo typeface">
      {fonts.map(([font, description]) => <button className="logo-font-card" key={font} aria-pressed={logo.font === font} onClick={() => onChange({ ...logo, font })}>
        <span className="logo-font-label">{font}<span aria-hidden="true">{logo.font === font ? 'Selected' : 'Try this'}</span></span>
        <TypographyLogo font={font} weight={logo.weight} />
        <span className="logo-font-description">{description}</span>
      </button>)}
    </div>
  </section>
}
