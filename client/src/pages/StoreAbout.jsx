import copy from '../../../shared/site-copy.json'
export default function StoreAbout() {
  return <section className="section wrap story-page">
    <p className="eyebrow">The story behind NuVitta</p><h1>Skincare with<br />a personal connection.</h1>
    <div className="story-section"><img src="/images/founder.webp" alt="Ela, the founder of NuVitta" /><div><h2>About the founder</h2>{copy.founder.map((text, i) => <p key={i}>{text}</p>)}</div></div>
    <div className="story-section product-story"><img src="/images/products.webp" alt="NuVitta skincare collection" /><div><h2>Our products</h2>{copy.products.map((text, i) => <p key={i}>{text}</p>)}</div></div>
  </section>
}
