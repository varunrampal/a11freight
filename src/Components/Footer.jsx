import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoImage from '../assets/images/a11-logo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" to="/">
            <img src={logoImage} alt="" />
            <span>A11 Freight</span>
          </Link>
          <p>Reliable commercial freight across the Fraser Valley and British Columbia.</p>
        </div>
        <div><h3>Company</h3><ul><li><Link to="/about">About A11</Link></li><li><Link to="/booking">Get a quote</Link></li><li><Link to="/contact">Contact</Link></li></ul></div>
        <div><h3>Services</h3><ul><li><span>Full Truckload</span></li><li><span>LTL Freight</span></li><li><span>Scheduled Routes</span></li><li><span>Commercial Delivery</span></li></ul></div>
        <div className="footer-contact"><h3>Talk to dispatch</h3><a href="tel:+16042172992"><Phone size={15} /> 604 217 2992</a><a href="mailto:info@a11freight.com"><Mail size={15} /> info@a11freight.com</a><span className="contact-detail"><MapPin size={15} /> Fraser Valley, BC</span></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} A11 Freight. All rights reserved.</span><span>Freight handled with care.</span></div>
    </footer>
  )
}
