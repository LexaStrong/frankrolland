import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">FRANK <em>ROLLAND</em></Link>
          <p>Ghana&apos;s most trusted vertically integrated real estate corporation. Building excellence since 2011.</p>
        </div>
        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Portals</h4>
            <Link href="/properties">Properties</Link>
            <Link href="/invest">Investment Fund</Link>
            <Link href="/brokerage">Brokerage</Link>
            <Link href="/build">Construction</Link>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://twitter.com/frankrolland" target="_blank" rel="noreferrer">Twitter @frankrolland</a>
            <a href="https://linkedin.com/company/frankrolland" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="tel:0558878341">Phone: +233558878341</a>
            <a href="https://wa.me/233558878341" target="_blank" rel="noreferrer">WhatsApp Chat</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/#about">About Us</Link>
            <Link href="/#market">Market Insights</Link>
            <Link href="/#contact">Contact</Link>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Frank Rolland Corporation. All rights reserved. Registered in Ghana.</span>
        <span>Designed with &hearts; for Ghanaian families</span>
      </div>
    </footer>
  );
}
