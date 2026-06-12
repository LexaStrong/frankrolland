'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/invest', label: 'Invest' },
    { href: '/brokerage', label: 'Brokerage' },
    { href: '/build', label: 'Build' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="header">
      <div className="container nav">
        <Link href="/">
          <img src="/logo.png" alt="Frank Rolland" className="logo-img" style={{ height: 44, width: 'auto', borderRadius: 4 }} />
        </Link>
        <nav className="nav-links">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="mobile-toggle" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
