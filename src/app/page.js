'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_BASE = '/api/v1';

const MARKET_SNAPSHOTS = [
  { label: 'BoG Policy Rate', value: '27%', context: 'Stabilizing from 2024 peak — watch for cuts' },
  { label: 'Accra Avg. Rental Yield', value: '8.2%', context: 'Among the highest in Sub-Saharan Africa' },
  { label: 'GHS/USD Rate', value: '₵12.05', context: 'Relative stability supports diaspora investment' },
  { label: 'Avg. Days on Market', value: '42', context: 'Down 15% YoY — demand exceeding supply' },
];

const LEADERSHIP = [
  { name: 'Frank Rolland', role: 'Founder & CEO', photo: '/agent.png' },
  { name: 'Ama Serwaa', role: 'Head of Brokerage', photo: '/agent.png' },
  { name: 'Kwame Mensah', role: 'Director of Investments', photo: '/agent.png' },
];

const PARTNERS = [
  'Bank of Ghana', 'SEC Ghana', 'EDGE Green Building', 'Stanbic Bank',
  'Ghana Real Estate Developers Assoc.', 'Absa Capital'
];

export default function CorporatePage() {
  const [stats, setStats] = useState(null);
  const [featuredProps, setFeaturedProps] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [news, setNews] = useState([]);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    fetch(`${API_BASE}/stats`).then(r => r.json()).then(d => setStats(d.data)).catch(console.error);
    fetch(`${API_BASE}/properties`).then(r => r.json()).then(d => { if (d?.data) setFeaturedProps(d.data.filter(p => p.featured)); }).catch(console.error);
    fetch(`${API_BASE}/testimonials`).then(r => r.json()).then(d => setTestimonials(d.data)).catch(console.error);
    fetch(`${API_BASE}/news`).then(r => r.json()).then(d => setNews(d.data)).catch(console.error);
  }, []);

  const fmt = (v) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 }).format(v);
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

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('/villa.png')" }}></div>
        <div className="container hero-content">
          <h1>Building the Future of <span>Ghana&apos;s Real Estate.</span></h1>
          <p>A vertically integrated real estate corporation delivering premium properties, structured investments, expert brokerage, and world-class construction across Ghana.</p>
          <Link href="#pillars" className="btn btn-primary">Explore Our Ecosystem</Link>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section id="about" className="stats-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }} className="stats-intro">
            <h2>A Legacy of Excellence</h2>
            <p>For over a decade, Frank Rolland has been at the forefront of shaping Ghana&apos;s urban landscape — providing unmatched value across the entire real estate lifecycle.</p>
          </div>
          {stats && (
            <div className="stats-grid">
              <div>
                <div className="stat-value">GHS {fmt(stats.funds_under_management_ghs)}</div>
                <div className="stat-label">Funds Under Management</div>
              </div>
              <div>
                <div className="stat-value">{stats.properties_listed}+</div>
                <div className="stat-label">Properties Listed</div>
              </div>
              <div>
                <div className="stat-value">{stats.projects_delivered}</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div>
                <div className="stat-value">{stats.years_in_operation}</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div>
                <div className="stat-value">{stats.cities_active}</div>
                <div className="stat-label">Cities Active</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── PILLARS ─── */}
      <section id="pillars" className="section-spacing-lg container">
        <div className="section-header">
          <h2>Our Core Pillars</h2>
          <p>Four specialized divisions. One standard of excellence.</p>
        </div>
        <div className="portals-grid">
          <Link href="/properties" className="portal-card">
            <img src="/villa.png" alt="Properties" className="portal-image" />
            <div className="portal-content">
              <span className="portal-tag">Properties</span>
              <h3 className="portal-title">Discover Luxury</h3>
              <p>Title-verified properties across Ghana — for sale, rent, and off-plan purchase.</p>
            </div>
          </Link>
          <Link href="/invest" className="portal-card">
            <img src="/fund.png" alt="Investment Fund" className="portal-image" />
            <div className="portal-content">
              <span className="portal-tag">Investment Fund</span>
              <h3 className="portal-title">Grow Wealth</h3>
              <p>SEC-compliant private real estate funds for accredited investors and the diaspora.</p>
            </div>
          </Link>
          <Link href="/brokerage" className="portal-card">
            <img src="/agent.png" alt="Brokerage" className="portal-image" />
            <div className="portal-content">
              <span className="portal-tag">Brokerage</span>
              <h3 className="portal-title">Expert Agents</h3>
              <p>Licensed professionals for end-to-end property transactions.</p>
            </div>
          </Link>
          <Link href="/build" className="portal-card">
            <img src="/construction.png" alt="Construction" className="portal-image" />
            <div className="portal-content">
              <span className="portal-tag">Construction</span>
              <h3 className="portal-title">Build the Future</h3>
              <p>Active developments, joint ventures, and bespoke builds to global standards.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES (NEW) ─── */}
      {featuredProps.length > 0 && (
        <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2>Featured Properties</h2>
                <p>Exclusive listings representing the standard across our portfolio.</p>
              </div>
              <button className="currency-toggle" onClick={toggleCurrency}>
                {currency} ⇄ {currency === 'USD' ? 'GHS' : 'USD'}
              </button>
            </div>
            
            <div className="property-grid">
              {featuredProps.map(prop => (
                <Link key={prop.id} href={`/properties/${prop.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="property-card">
                    <div className="property-image-wrapper">
                      <img src={prop.media.thumbnail} alt={prop.title} className="property-image" />
                      <div className="status-badge">{prop.status.replace('_', ' ')}</div>
                      {prop.title_info.verified && (
                        <div className="verified-badge">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          Title Verified
                        </div>
                      )}
                    </div>
                    <div className="property-content">
                      <div className="property-price">{formatPrice(prop)}</div>
                      <h3 className="property-title">{prop.title}</h3>
                      <div className="property-location">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {prop.location.neighbourhood}, {prop.location.city}
                      </div>
                      <div className="property-specs">
                        <div className="spec-item">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                          {prop.specs.bedrooms} Beds
                        </div>
                        <div className="spec-item">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20"></path><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"></path></svg>
                          {prop.specs.bathrooms} Baths
                        </div>
                        <div className="spec-item">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                          {prop.specs.sqm} sqm
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/properties" className="btn btn-outline">View All Properties</Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── MARKET SNAPSHOT ─── */}
      <section id="market" className="section-spacing container">
        <div className="section-header">
          <h2>Ghana Market Snapshot</h2>
          <p>Key indicators shaping the Ghanaian real estate landscape.</p>
        </div>
        <div className="market-grid">
          {MARKET_SNAPSHOTS.map((tile, i) => (
            <div key={i} className="market-tile">
              <div className="market-tile-label">{tile.label}</div>
              <div className="market-tile-value">{tile.value}</div>
              <div className="market-tile-context">{tile.context}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS (NEW) ─── */}
      {testimonials.length > 0 && (
        <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div className="section-header">
              <h2>What Our Clients Say</h2>
              <p>Trusted by investors, homeowners, and partners across Ghana and the diaspora.</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map(t => (
                <div key={t.id} className="testimonial-card">
                  <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* ─── LEADERSHIP ─── */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Leadership</h2>
            <p>The team driving Ghana&apos;s most trusted real estate brand.</p>
          </div>
          <div className="leadership-grid">
            {LEADERSHIP.map((leader, i) => (
              <div key={i} className="leader-card">
                <img src={leader.photo} alt={leader.name} className="leader-photo" />
                <div className="leader-name">{leader.name}</div>
                <div className="leader-role">{leader.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNERS (NEW) ─── */}
      <section className="section-spacing container">
        <div className="section-header">
          <h2>Partners & Affiliations</h2>
          <p>Working alongside Ghana&apos;s leading financial and regulatory institutions.</p>
        </div>
        <div className="partners-strip">
          {PARTNERS.map((p, i) => (
            <div key={i} className="partner-logo">{p}</div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="section-spacing container" id="contact">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-subtitle">GET IN TOUCH</span>
            <h2>SCHEDULE A CONSULTATION</h2>
            <p>Whether you're looking to invest, buy, sell, or build — our team is ready to guide you.</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="contact-details">
                  <h4>HEAD OFFICE — ACCRA</h4>
                  <p>14 Rangoon Lane, Cantonments, Accra</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div className="contact-details">
                  <h4>GENERAL ENQUIRIES</h4>
                  <p>info@frankrolland.com</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="contact-details">
                  <h4>PHONE / WHATSAPP</h4>
                  <p>+233 55 887 8341</p>
                </div>
              </div>
            </div>

            <a href="https://wa.me/233558878341" className="btn btn-whatsapp inline-wa-btn" style={{ width: '100%', marginTop: '2rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
          
          <div className="contact-form-card">
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>FULL NAME</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>PHONE</label>
                  <input type="tel" placeholder="Your number" />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>EMAIL</label>
                <input type="email" placeholder="your@email.com" />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>SERVICE REQUIRED</label>
                <select>
                  <option>Select a service</option>
                  <option>Property Purchase</option>
                  <option>Investment Fund</option>
                  <option>Development</option>
                </select>
              </div>
              
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label>MESSAGE</label>
                <textarea rows="4" placeholder="Tell us about your property needs..."></textarea>
              </div>
              
              <button type="button" className="btn btn-primary" style={{ width: '100%' }}>
                SEND MESSAGE
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
