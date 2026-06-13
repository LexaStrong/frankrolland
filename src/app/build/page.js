'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ActionModal from '@/components/ActionModal';

const API_BASE = '/api/v1';

const SUSTAINABILITY = [
  { icon: '☀️', label: 'Solar Ready', desc: 'All new developments feature solar-ready infrastructure for clean energy adoption.' },
  { icon: '🏅', label: 'EDGE Certified', desc: 'International green building certification ensuring resource efficiency and sustainability.' },
  { icon: '💧', label: 'Rainwater Harvesting', desc: 'Integrated systems to reduce water consumption and environmental impact.' },
  { icon: '♻️', label: 'Waste Recycling', desc: 'On-site waste management and recycling programs during construction and occupancy.' },
];

export default function BuildPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [enquireModalOpen, setEnquireModalOpen] = useState(false);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then(r => r.json())
      .then(d => { setProjects(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.status === activeFilter);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="hero" style={{ textAlign: 'center', minHeight: 'auto', padding: '10rem 0 5rem' }}>
        <div className="hero-bg" style={{ backgroundImage: "url('/construction.png')", opacity: 0.4 }}></div>
        <div className="container hero-content" style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1>Shaping the <span>Skyline.</span></h1>
          <p style={{ margin: '0 auto 3rem', maxWidth: 700 }}>
            From ultra-luxury residential enclaves to state-of-the-art commercial hubs, Frank Rolland Development delivers world-class real estate across Ghana.
          </p>
          <a href="#projects" className="btn btn-primary btn-lg">View Our Projects</a>
        </div>
      </section>

      {/* ─── PROJECT PORTFOLIO ─── */}
      <section id="projects" className="section-spacing">
        <div className="container">
          <div className="section-header">
            <h2>Signature Developments</h2>
            <div className="filters">
              {['all', 'under_construction', 'completed', 'off_plan'].map(f => (
                <button
                  key={f}
                  className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f === 'all' ? 'All Projects' : f.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading projects...</div>
          ) : (
            <div className="projects-grid">
              {filtered.map(proj => (
                <Link key={proj.id} href={`/build/${proj.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="project-card">
                    <div className="project-img-wrap">
                      <img src={proj.media.thumbnail} alt={proj.name} className="project-img" />
                      <div className={`status-badge status-${proj.status}`}>{proj.status.replace('_', ' ')}</div>
                    </div>
                    <div className="project-content">
                      <h3 className="project-name">{proj.name}</h3>
                      <p className="project-tagline">{proj.tagline}</p>
                      <div className="project-metrics">
                        <div className="p-metric">
                          <div className="p-val">{proj.total_units}</div>
                          <div className="p-lbl">Total Units</div>
                        </div>
                        <div className="p-metric">
                          <div className="p-val">{Math.round((proj.units_sold / proj.total_units) * 100)}%</div>
                          <div className="p-lbl">Sold</div>
                        </div>
                        <div className="p-metric">
                          <div className="p-val">{new Date(proj.completion_date).getFullYear()}</div>
                          <div className="p-lbl">Completion</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {proj.sustainability.edge_certified && <span style={{ fontSize: '0.75rem', background: '#059669', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>EDGE Certified</span>}
                        {proj.sustainability.solar_ready && <span style={{ fontSize: '0.75rem', background: '#d97706', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Solar Ready</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── SUSTAINABILITY (NEW) ─── */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our Sustainability Commitment</h2>
            <p>Building for today while preserving tomorrow. Every project adheres to international green building standards.</p>
          </div>
          <div className="sustainability-grid">
            {SUSTAINABILITY.map((s, i) => (
              <div key={i} className="sustain-badge">
                <div className="sustain-icon">{s.icon}</div>
                <div className="sustain-label">{s.label}</div>
                <div className="sustain-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="services-section">
        <div className="container services-grid">
          <div className="service-card">
            <h3>Bespoke Build Services</h3>
            <p>Have land? Want to build your dream home or a commercial plaza to international standards? Our team handles everything from architectural design and permitting to construction and final handover.</p>
            <button className="btn btn-primary" onClick={() => setEnquireModalOpen(true)}>Enquire Now</button>
          </div>
          <div id="jv" className="service-card">
            <h3>Land Joint Ventures</h3>
            <p>We partner with landowners in prime locations across Ghana. Turn your dormant land into a high-yielding, premium real estate asset through our equity or profit-sharing JV models.</p>
            <button className="btn btn-primary" onClick={() => setProposalModalOpen(true)}>Submit Land Proposal</button>
          </div>
        </div>
      </section>

      {/* ─── GALLERY (NEW) ─── */}
      <section className="section-spacing container hide-on-mobile">
        <div className="section-header">
          <h2>Project Gallery</h2>
          <p>A glimpse into the quality and craftsmanship of Frank Rolland developments.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {['/villa.png', '/construction.png', '/fund.png', '/agent.png', '/villa.png', '/construction.png'].map((img, i) => (
            <div key={i} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: 220, border: '1px solid var(--border-glass)' }}>
              <img src={img} alt={`Gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </section>

      <ActionModal 
        isOpen={enquireModalOpen} 
        onClose={() => setEnquireModalOpen(false)} 
        title="Enquire About Build Services" 
        description="Our development team is ready to discuss your custom build project. Contact us via WhatsApp or Email." 
      />

      <ActionModal 
        isOpen={proposalModalOpen} 
        onClose={() => setProposalModalOpen(false)} 
        title="Submit Land Proposal" 
        description="Have prime land for a Joint Venture? Send us the details and title documents via email or chat with our acquisitions team on WhatsApp." 
      />
    </>
  );
}
