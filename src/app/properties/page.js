'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_BASE = '/api/v1';

const TRUST_BADGES = [
  { icon: '🛡️', title: 'Title Verified', desc: 'Every property undergoes rigorous land title verification through our legal team.' },
  { icon: '🏆', title: '15+ Years Track Record', desc: 'Ghana\'s most trusted name in premium real estate since 2011.' },
  { icon: '🔒', title: 'Secure Transactions', desc: 'Escrow-protected payments and legally binding contracts on every deal.' },
  { icon: '🌍', title: 'Diaspora Friendly', desc: 'Remote viewing, virtual tours, and dedicated diaspora liaison officers.' },
];

export default function PropertiesPage() {
  const [currency, setCurrency] = useState('USD');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/properties`)
      .then(r => r.json())
      .then(d => { setProperties(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleCurrency = () => setCurrency(prev => prev === 'USD' ? 'GHS' : 'USD');

  const formatPrice = (prop) => {
    const rate = 12.0;
    const isUSD = prop.price.currency === 'USD';
    let val = prop.price.amount;
    if (currency === 'USD' && !isUSD) val = val / rate;
    if (currency === 'GHS' && isUSD) val = val * rate;
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(val);
    return prop.price.period === 'monthly' ? `${formatted} / mo` : formatted;
  };

  const filtered = properties.filter(p => {
    if (typeFilter !== 'all' && p.status !== typeFilter) return false;
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (searchTerm && !`${p.location.neighbourhood} ${p.location.city} ${p.title}`.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Mortgage calculator
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTerm, setLoanTerm] = useState(20);

  const monthlyPayment = (() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  })();

  return (
    <>
      {/* ─── SEARCH ─── */}
      <section className="search-section" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 2rem' }}>
        <div className="hero-bg" style={{ backgroundImage: "url('/villa.png')", opacity: 0.15 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-subtitle" style={{ marginBottom: '1rem' }}>FEATURED PROPERTIES</span>
              <h1 className="search-title" style={{ textTransform: 'uppercase', fontWeight: 900, lineHeight: 1.1, fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '2rem' }}>
                SPACES CRAFTED<br/>WITH PURPOSE
              </h1>
            </div>
          </div>
          
          <div className="pill-filters" style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: 'var(--radius-full)', overflowX: 'auto', scrollbarWidth: 'none', marginBottom: '1.5rem' }}>
            <button className={`pill-btn ${categoryFilter === 'all' ? 'active' : ''}`} onClick={() => setCategoryFilter('all')}>ALL</button>
            <button className={`pill-btn ${categoryFilter === 'residential' ? 'active' : ''}`} onClick={() => setCategoryFilter('residential')}>RESIDENTIAL</button>
            <button className={`pill-btn ${categoryFilter === 'commercial' ? 'active' : ''}`} onClick={() => setCategoryFilter('commercial')}>COMMERCIAL</button>
            
            <select className="pill-btn" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ appearance: 'none', border: 'none', outline: 'none' }}>
              <option value="all">ANY TYPE</option>
              <option value="for_sale">FOR SALE</option>
              <option value="for_rent">FOR RENT</option>
              <option value="off_plan">OFF-PLAN</option>
            </select>
          </div>
        </div>
      </section>

      {/* ─── LISTINGS ─── */}
      <section className="section-spacing">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem' }}>Featured Listings</h2>
            <span style={{ color: 'var(--text-secondary)' }}>Showing {filtered.length} properties</span>
          </div>
          {loading ? (
            <div className="loading-spinner">Loading properties...</div>
          ) : (
            <div className="properties-page-grid">
              {filtered.map(prop => (
                <Link key={prop.id} href={`/properties/${prop.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="properties-page-card">
                    <div className="properties-page-image-wrapper">
                      <img src={prop.media.thumbnail} alt={prop.title} className="properties-page-image" />
                      <div className="properties-page-badge">{prop.status.replace('_', ' ')}</div>
                    </div>
                    <div className="properties-page-content">
                      <div className="properties-page-category">
                        {prop.location.neighbourhood.toUpperCase()}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                      <h3 className="properties-page-title">{prop.title}</h3>
                      <div className="properties-page-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {prop.location.neighbourhood}, {prop.location.city}
                      </div>
                      <div className="properties-page-specs">
                        <span>{prop.specs.bedrooms} Bed</span>
                        <span>{prop.specs.bathrooms} Bath</span>
                        <span>{prop.specs.sqm} sqm</span>
                      </div>
                      <div className="properties-page-price">{formatPrice(prop)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── MORTGAGE CALCULATOR (NEW) ─── */}
      <section className="section-spacing hide-on-mobile" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2>Mortgage Calculator</h2>
            <p style={{ marginBottom: '2rem' }}>Estimate your monthly payments for any property in our portfolio.</p>
            <p style={{ fontSize: '0.95rem' }}>Our partnership with Ghana&apos;s leading banks means competitive rates and fast pre-approvals. Whether you&apos;re a local buyer or part of the diaspora, we&apos;ll connect you with the right financing solution.</p>
          </div>
          <div className="calculator-widget">
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Loan Amount (USD)</label>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="10000"
                value={loanAmount}
                onChange={e => setLoanAmount(+e.target.value)}
                style={{ width: '100%', accentColor: 'var(--brand-gold)' }}
              />
              <div style={{ textAlign: 'right', color: 'var(--brand-gold)', fontWeight: 700, fontSize: '1.2rem' }}>
                ${loanAmount.toLocaleString()}
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Interest Rate: {interestRate}%</label>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={interestRate}
                onChange={e => setInterestRate(+e.target.value)}
                style={{ width: '100%', accentColor: 'var(--brand-gold)' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Loan Term: {loanTerm} years</label>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={loanTerm}
                onChange={e => setLoanTerm(+e.target.value)}
                style={{ width: '100%', accentColor: 'var(--brand-gold)' }}
              />
            </div>
            <div className="calculator-result">
              <div className="calculator-monthly">
                ${Math.round(monthlyPayment).toLocaleString()}
              </div>
              <div className="calculator-label">Estimated Monthly Payment</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES (NEW) ─── */}
      <section className="section-spacing container">
        <div className="section-header">
          <h2>Why Frank Rolland Properties?</h2>
          <p>Every transaction backed by integrity, transparency, and expertise.</p>
        </div>
        <div className="trust-grid">
          {TRUST_BADGES.map((badge, i) => (
            <div key={i} className="trust-card">
              <div className="trust-icon">{badge.icon}</div>
              <div className="trust-title">{badge.title}</div>
              <div className="trust-desc">{badge.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
