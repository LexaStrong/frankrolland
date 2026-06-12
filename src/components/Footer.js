import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/villa.png" alt="Frank Rolland" className="logo-img" style={{ height: 40, borderRadius: 4 }} />
            <p>Ghana&apos;s most trusted vertically integrated real estate corporation. Building excellence since 2011.</p>
          </div>
          <div className="footer-col">
            <h4>Portals</h4>
            <Link href="/properties">Properties</Link>
            <Link href="/invest">Investment Fund</Link>
            <Link href="/brokerage">Brokerage</Link>
            <Link href="/build">Construction</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/#about">About Us</Link>
            <Link href="/#market">Market Insights</Link>
            <Link href="/#contact">Contact</Link>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">SEC Disclosure</a>
          </div>
        </div>
        <div className="footer-bar">
          &copy; {new Date().getFullYear()} Frank Rolland Corporation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
