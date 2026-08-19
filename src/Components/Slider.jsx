import { ArrowRight, CheckCircle2, Headphones, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Slider() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-kicker"><span /> Fraser Valley based · BC connected</span>
          <h1>Freight that keeps<br />business <em>moving.</em></h1>
          <p>Dependable FTL, LTL and commercial delivery backed by responsive dispatch, careful handling and local expertise.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/booking">Request a quote <ArrowRight size={16} /></Link>
            <a className="hero-phone" href="tel:+18334989898"><Headphones size={18} /><span><small>Speak with dispatch</small>1-833-498-9898</span></a>
          </div>
        </div>
        <aside className="hero-panel">
          <span className="hero-panel-index">A11 / BC</span>
          <div className="hero-panel-content">
            <MapPin size={25} />
            <span>Service area</span>
            <strong>Fraser Valley<br />to destinations<br />across BC.</strong>
          </div>
          <div className="hero-panel-footer"><CheckCircle2 size={16} /> Commercial freight specialists</div>
        </aside>
      </div>
      <div className="hero-scroll">Explore our capabilities <span /></div>
    </section>
  )
}
