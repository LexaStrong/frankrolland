'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const API_BASE = '/api/v1';

export default function AgentDetailPage() {
  const params = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/agents/${params.slug}`)
      .then(r => r.json())
      .then(d => { setAgent(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.slug]);

  if (loading) return <div className="loading-spinner" style={{ minHeight: '80vh' }}>Loading agent profile...</div>;
  if (!agent) return <div className="loading-spinner" style={{ minHeight: '80vh' }}>Agent not found.</div>;

  return (
    <div className="container">
      <Link href="/brokerage" className="back-link">← Back to Brokerage</Link>

      <div className="detail-grid">
        <div>
          {/* Profile Header */}
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', marginBottom: '3rem' }}>
            <img
              src={agent.photo_url}
              alt={agent.full_name}
              style={{ width: 200, height: 200, borderRadius: 'var(--radius-lg)', objectFit: 'cover', border: '3px solid var(--brand-gold)' }}
            />
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{agent.full_name}</h1>
              <div style={{ color: 'var(--brand-gold)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{agent.title}</div>

              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                <div className="stat">
                  <span className="stat-val-sm" style={{ fontSize: '1.5rem', color: 'var(--brand-gold)' }}>{agent.active_listings_count}</span>
                  <span className="stat-lbl">Active Listings</span>
                </div>
                <div className="stat">
                  <span className="stat-val-sm" style={{ fontSize: '1.5rem', color: 'var(--brand-gold)' }}>{agent.transactions_closed}</span>
                  <span className="stat-lbl">Transactions Closed</span>
                </div>
                <div className="stat">
                  <span className="stat-val-sm" style={{ fontSize: '1.5rem', color: 'var(--brand-gold)' }}>{agent.years_experience}</span>
                  <span className="stat-lbl">Years Experience</span>
                </div>
              </div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>{agent.bio}</p>
            </div>
          </div>

          {/* Specialisations */}
          <h3 style={{ marginBottom: '1.5rem' }}>Specialisations</h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {agent.specialisations.map((s, i) => (
              <span key={i} className="amenity-tag" style={{ textTransform: 'capitalize' }}>{s.replace('_', ' ')}</span>
            ))}
          </div>

          {/* Regions */}
          <h3 style={{ marginBottom: '1.5rem' }}>Regions Covered</h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {agent.regions_covered.map((r, i) => (
              <span key={i} className="amenity-tag">📍 {r}</span>
            ))}
          </div>

          {/* Agent Listings */}
          {agent.listings && agent.listings.length > 0 && (
            <>
              <h3 style={{ marginBottom: '1.5rem' }}>{agent.full_name}&apos;s Active Listings</h3>
              <div className="property-grid" style={{ marginBottom: '3rem' }}>
                {agent.listings.map(prop => (
                  <Link key={prop.id} href={`/properties/${prop.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="property-card">
                      <div className="property-image-wrapper">
                        <img src={prop.media.thumbnail} alt={prop.title} className="property-image" />
                        <div className="status-badge">{prop.status.replace('_', ' ')}</div>
                      </div>
                      <div className="property-content">
                        <div className="property-price">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: prop.price.currency, maximumFractionDigits: 0 }).format(prop.price.amount)}
                        </div>
                        <h3 className="property-title">{prop.title}</h3>
                        <div className="property-location">
                          {prop.location.neighbourhood}, {prop.location.city}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="detail-sidebar">
          <div className="sidebar-card">
            <h3 style={{ marginBottom: '1.5rem' }}>Contact {agent.full_name.split(' ')[0]}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a href={`tel:${agent.phone}`} className="btn btn-glass" style={{ justifyContent: 'center' }}>📞 {agent.phone}</a>
              <a href={`mailto:${agent.email}`} className="btn btn-glass" style={{ justifyContent: 'center' }}>✉️ {agent.email}</a>
            </div>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input type="text" className="form-input" placeholder="Your Name" />
              <input type="tel" className="form-input" placeholder="Phone Number" />
              <textarea className="form-textarea" placeholder="How can this agent help you?" style={{ minHeight: 80 }}></textarea>
              <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>

          <div className="sidebar-card">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>License</div>
            <div style={{ fontWeight: 600, color: 'var(--brand-gold)' }}>{agent.license_number}</div>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Ghana Real Estate Professionals Association</p>
          </div>
        </div>
      </div>
    </div>
  );
}
