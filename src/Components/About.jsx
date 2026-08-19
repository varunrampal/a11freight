import { createElement } from 'react'
import { ArrowRight, Boxes, Check, Clock3, MapPin, PackageCheck, Route, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import aboutImage from '../assets/images/aboutus.jpg'

const services = [
  [Truck, 'Full truckload', 'Dedicated capacity and direct routes for time-sensitive commercial loads.'],
  [Boxes, 'Less than truckload', 'Flexible movement for partial loads, pallets and recurring shipments.'],
  [Clock3, 'Local & same-day', 'Responsive freight service across the Fraser Valley when timing matters.'],
  [PackageCheck, 'Commercial delivery', 'Reliable dock-to-dock support for suppliers, warehouses and retail.'],
]

const experience = [
  ['01', 'Responsive operations', 'Straight answers and practical scheduling from a dispatch team that understands the route.'],
  ['02', 'Freight handled carefully', 'Professional pickup, secure movement and attention to every delivery detail.'],
  ['03', 'Built around business', 'Flexible service for real receiving hours, job sites and changing priorities.'],
  ['04', 'Local knowledge', 'Fraser Valley expertise paired with dependable reach across British Columbia.'],
]

export default function About() {
  return <>
    <section className="section services-section">
      <div className="container">
        <div className="section-heading-row">
          <div><span className="eyebrow">Transportation solutions</span><h2 className="section-title">One partner.<br />Every essential move.</h2></div>
          <p className="section-copy">From a single pallet to a dedicated trailer, A11 Freight gives commercial teams a simpler way to move goods throughout the Fraser Valley and across BC.</p>
        </div>
        <div className="services-grid">{services.map(([Icon, title, copy], index) => <article className="service-tile" key={title}><span className="service-index">0{index + 1}</span>{createElement(Icon, { size: 28 })}<h3>{title}</h3><p>{copy}</p><Link to="/booking">Plan this shipment <ArrowRight size={15} /></Link></article>)}</div>
      </div>
    </section>

    <section className="section story-section">
      <div className="container story-grid">
        <div className="story-image-wrap"><img src={aboutImage} alt="A11 Freight truck on the road" /><span className="image-caption">Fraser Valley · British Columbia</span></div>
        <div className="story-copy"><span className="eyebrow">The backbone behind the delivery</span><h2 className="section-title">Local insight.<br />Commercial capability.</h2><p className="section-copy">We built A11 Freight around the things busy operations teams value most: dependable pickups, clear communication and freight that arrives ready for the next step.</p><ul className="feature-list"><li><Check size={18} /> Direct access to a responsive freight team</li><li><Check size={18} /> Flexible planning around your operation</li><li><Check size={18} /> Consistent care from pickup to delivery</li></ul><Link className="text-link" to="/about">Discover A11 Freight <ArrowRight size={16} /></Link></div>
      </div>
    </section>

    <section className="section experience-section">
      <div className="container"><div className="section-heading-row section-heading-row--light"><div><span className="eyebrow">The A11 experience</span><h2 className="section-title">Confidence at every mile.</h2></div><p className="section-copy">Freight service should feel coordinated, accountable and easy to understand.</p></div><div className="experience-grid">{experience.map(([number, title, copy]) => <article className="experience-card" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
    </section>

    <section className="section coverage-section"><div className="container coverage-grid"><div><span className="eyebrow">Our service area</span><h2 className="section-title">Fraser Valley roots.<br />BC-wide reach.</h2><p className="section-copy">Regular service across Langley, Abbotsford, Surrey, Chilliwack, Mission and destinations throughout British Columbia.</p><Link className="btn btn-dark" to="/booking">Plan a shipment <ArrowRight size={15} /></Link></div><div className="coverage-visual"><div className="route-marker route-marker--start"><MapPin size={18} /><span>Fraser Valley</span></div><div className="route-track"><span /><span /><span /><span /></div><div className="route-marker route-marker--end"><Route size={20} /><span>Across BC</span></div><small>Commercial routes · scheduled runs · direct delivery</small></div></div></section>
  </>
}
