import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowUpRight } from 'lucide-react';
import logoImage from '../assets/images/a11-logo.png'

const Header = () => {
    const [open, setOpen] = useState(false)
    const links = [['/', 'Home'], ['/about', 'About'], ['/booking', 'Book Freight'], ['/contact', 'Contact']]
    return (
   <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/" onClick={() => setOpen(false)}><img src={logoImage} alt="" /><span>A11 Freight</span></NavLink>
        <nav className="nav-links" aria-label="Primary navigation">{links.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}</nav>
        <div className="header-contact"><a href="tel:+18334989898"><Phone size={14} />1-833-498-9898</a><a href="mailto:info@a11freight.com"><Mail size={14} />info@a11freight.com</a></div>
        <NavLink className="btn btn-primary" to="/booking">Get a Quote <ArrowUpRight size={15} /></NavLink>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      <nav className={`container mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile navigation">{links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}</nav>
   </header>
    
    )
}

export default Header
