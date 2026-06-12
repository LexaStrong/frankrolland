'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_BASE = '/api/v1';

const PROCESS_STEPS = [
  { icon: '📋', title: 'List or Search', desc: 'Tell us what you need — buying, selling, or renting. We match you with the right agent.' },
  { icon: '🤝', title: 'Match & Negotiate', desc: 'Your dedicated agent handles viewings, negotiations, and due diligence on your behalf.' },
  { icon: '✅', title: 'Close & Celebrate', desc: 'We manage the legal paperwork, title transfer, and handover. You move in stress-free.' },
];

export default function BrokeragePage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/agents`).then(r => r.json()).then(d => { setAgents(d.data); setLoading(false); }).catch(console.error);
    fetch(`${API_BASE}/testimonials`).then(r => r.json()).then(d => setTestimonials(d.data)).catch(console.error);
    fetch(`${API_BASE}/stats`).then(r => r.json()).then(d => setStats(d.data)).catch(console.error);
  }, []);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="hero" style={{ minHeight: 'auto', padding: '10rem 0 5rem', textAlign: 'center' }}>
        <div className="hero-bg" style={{ backgroundImage: "url('/agent.png')" }}></div>
        <div className="container hero-content" style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1>Expert Representation. <span>Exceptional Results.</span></h1>
          <p style={{ margin: '0 auto 3rem', maxWidth: 600 }}>Connect with Ghana&apos;s most distinguished real estate professionals for seamless end-to-end property transactions.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#sell" className="btn btn-primary btn-lg">Request Valuation</a>
            <a href="#agents" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>Find an Agent</a>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR (NEW) ─── */}
      {stats && (
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div>
                <div className="stat-value">{stats.total_agents}</div>
                <div className="stat-label">Licensed Agents</div>
              </div>
              <div>
                <div className="stat-value">{stats.total_transactions}+</div>
                <div className="stat-label">Transactions Closed</div>
              </div>
              <div>
                <div className="stat-value">{stats.client_satisfaction_pct}%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div>
                <div className="stat-value">{stats.cities_active}</div>
                <div className="stat-label">Cities Covered</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── OUR PROCESS (NEW) ─── */}
      <section className="section-spacing container">
        <div className="section-header">
          <h2>Our Process</h2>
          <p>Simple, transparent, and stress-free — from listing to closing.</p>
        </div>
        <div className="process-grid">
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="process-step">
              <div className="process-icon">{step.icon}</div>
              <h3 style={{ marginBottom: '0.75rem' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AGENTS ─── */}
      <section id="agents" className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Directors & Agents</h2>
            <p>Ghana&apos;s finest real estate professionals at your service.</p>
          </div>
          {loading ? (
            <div className="loading-spinner">Loading agents...</div>
          ) : (
            <div className="agents-grid">
              {agents.map(agent => (
                <Link key={agent.id} href={`/brokerage/${agent.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="agent-card">
                    <img src={agent.photo_url} alt={agent.full_name} className="agent-photo" />
                    <h3 className="agent-name">{agent.full_name}</h3>
                    <div className="agent-title">{agent.title}</div>
                    <div className="agent-stats">
                      <div className="stat">
                        <span className="stat-val-sm">{agent.active_listings_count}</span>
                        <span className="stat-lbl">Active</span>
                      </div>
                      <div className="stat">
                        <span className="stat-val-sm">{agent.transactions_closed}</span>
                        <span className="stat-lbl">Closed</span>
                      </div>
                    </div>
                    <p style={{ padding: '0 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{agent.bio}</p>
                    <button className="btn btn-outline" style={{ width: '80%' }}>View Profile</button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── TESTIMONIALS (NEW) ─── */}
      {testimonials.length > 0 && (
        <section className="section-spacing container">
          <div className="section-header">
            <h2>Client Testimonials</h2>
            <p>What our clients say about working with Frank Rolland Brokerage.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.slice(0, 3).map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── VALUATION FORM ─── */}
      <section id="sell" className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="valuation-form">
            <h2 style={{ marginBottom: '0.5rem' }}>Property Valuation Request</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Get a precise, data-backed estimate of your property&apos;s current market value.</p>
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-input" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-input" placeholder="+233..." />
                </div>
                <div className="form-group full-width">
                  <label>Property Location</label>
                  <input type="text" className="form-input" placeholder="Neighbourhood, City" />
                </div>
                <div className="form-group">
                  <label>Property Type</label>
                  <select className="form-input">
                    <option>Residential (Villa/House)</option>
                    <option>Apartment/Penthouse</option>
                    <option>Commercial Space</option>
                    <option>Land</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Intent</label>
                  <select className="form-input">
                    <option>Looking to Sell</option>
                    <option>Looking to Rent out</option>
                    <option>Just curious about value</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Request</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
