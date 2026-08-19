import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoImage from '../assets/images/a11-logo-footer.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <Link className="footer-brand" to="/"><img src={logoImage} alt="" /><span>A11 Freight</span></Link>
          <h2>Freight handled with care.<br />Business kept in motion.</h2>
          <p>Reliable commercial transportation across the Fraser Valley and British Columbia.</p>
        </div>
        <div className="footer-dispatch">
          <span>Talk to dispatch</span>
          <a href="tel:+18334989898"><Phone size={19} /> 1-833-498-9898</a>
          <a href="mailto:info@a11freight.com"><Mail size={17} /> info@a11freight.com</a>
          <Link to="/booking">Request a freight quote <ArrowUpRight size={16} /></Link>
        </div>
      </div>

      <div className="container footer-links-grid">
        <div><h3>Company</h3><ul><li><Link to="/">Home</Link></li><li><Link to="/about">About A11</Link></li><li><Link to="/contact">Contact</Link></li></ul></div>
        <div><h3>Services</h3><ul><li><span>Full Truckload</span></li><li><span>LTL Freight</span></li><li><span>Scheduled Routes</span></li><li><span>Commercial Delivery</span></li></ul></div>
        <div><h3>Coverage</h3><ul><li><span>Fraser Valley</span></li><li><span>Lower Mainland</span></li><li><span>British Columbia</span></li></ul></div>
        <div><h3>Service base</h3><p className="footer-location"><MapPin size={16} /> Fraser Valley, British Columbia</p></div>
      </div>

      <div className="container footer-bottom"><span>© {new Date().getFullYear()} A11 Freight. All rights reserved.</span><span>Commercial freight · Fraser Valley, BC</span></div>
    </footer>
  )
}
