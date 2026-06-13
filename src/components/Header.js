'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightPage = pathname !== '/';
  const navbarClass = `navbar ${isLightPage || isScrolled ? 'scrolled' : 'transparent'} ${isLightPage ? 'light' : ''}`;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <nav className={navbarClass}>
        <Link href="/" className="nav-logo">
          <img alt="Frank Rolland Logo" className="nav-logo-img" src="/logo.png" />
        </Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/properties">Properties</Link></li>
          <li><Link href="/invest">Invest</Link></li>
          <li><Link href="/brokerage">Brokerage</Link></li>
          <li><Link href="/build">Build</Link></li>
          <li><Link className="nav-cta" href="/#contact">Contact</Link></li>
        </ul>
        <button 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} 
          aria-label="Menu"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <Link href="/" onClick={toggleMobileMenu}>Home</Link>
        <Link href="/properties" onClick={toggleMobileMenu}>Properties</Link>
        <Link href="/invest" onClick={toggleMobileMenu}>Invest</Link>
        <Link href="/brokerage" onClick={toggleMobileMenu}>Brokerage</Link>
        <Link href="/build" onClick={toggleMobileMenu}>Build</Link>
        <Link href="/#contact" onClick={toggleMobileMenu}>Contact</Link>
      </div>
    </>
  );
}
