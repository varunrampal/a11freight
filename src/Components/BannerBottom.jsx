import { ArrowRight, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BannerBottom() {
  return <section className="cta"><div className="container cta-inner"><div><h2>Ready to move your freight?</h2><p>Tell us where it needs to go and our dispatch team will get back to you with a quote.</p></div><div className="cta-actions"><Link className="btn btn-dark" to="/booking">Get a Quote <ArrowRight size={15} /></Link><a className="btn btn-ghost" href="mailto:info@a11freight.com"><Mail size={15} /> Email Us</a><a className="contact-detail" href="tel:+16042172992"><Phone size={16} /> 604 217 2992</a></div></div></section>
}
