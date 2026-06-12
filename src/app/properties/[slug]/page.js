'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const API_BASE = '/api/v1';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/properties/${params.slug}`)
      .then(r => r.json())
      .then(d => {
        setProperty(d.data);
        if (d.data?.agent_id) {
          fetch(`${API_BASE}/agents/${d.data.agent_id}`)
            .then(r => r.json())
            .then(a => setAgent(a.data))
            .catch(console.error);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch(`${API_BASE}/properties`)
      .then(r => r.json())
      .then(d => setAllProperties(d.data))
      .catch(console.error);
  }, [params.slug]);

  if (loading) return <div className="loading-spinner" style={{ minHeight: '80vh' }}>Loading property...</div>;
  if (!property) return <div className="loading-spinner" style={{ minHeight: '80vh' }}>Property not found.</div>;

  const formatPrice = () => {
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: property.price.currency, maximumFractionDigits: 0 }).format(property.price.amount);
    return property.price.period === 'monthly' ? `${formatted} / mo` : formatted;
  };

  const similar = allProperties.filter(p => p.id !== property.id).slice(0, 3);

  return (
    <>
      <div className="container">
        <Link href="/properties" className="back-link">
          ← Back to Properties
        </Link>

        <div className="detail-grid">
          {/* ─── MAIN CONTENT ─── */}
          <div>
            <div className="detail-gallery">
              <img src={property.media.thumbnail} alt={property.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)' }} />
              {property.media.gallery && property.media.gallery.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                  {property.media.gallery.map((img, i) => (
                    <img key={i} src={img} alt={`${property.title} ${i + 1}`} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }} />
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className="status-badge" style={{ position: 'static' }}>{property.status.replace('_', ' ')}</span>
                {property.title_info.verified && (
                  <span className="verified-badge" style={{ position: 'static' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Title Verified — {property.title_info.ref}
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{property.title}</h1>
              <div className="property-location" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {property.location.neighbourhood}, {property.location.city}, {property.location.region}
              </div>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{property.description}</p>

              {/* Specs Table */}
              <h3 style={{ marginBottom: '1.5rem' }}>Property Specifications</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                {property.specs.bedrooms > 0 && (
                  <div className="market-tile" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-gold)' }}>{property.specs.bedrooms}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Bedrooms</div>
                  </div>
                )}
                <div className="market-tile" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-gold)' }}>{property.specs.bathrooms}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Bathrooms</div>
                </div>
                <div className="market-tile" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-gold)' }}>{property.specs.sqm}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>SQM</div>
                </div>
                {property.specs.parking > 0 && (
                  <div className="market-tile" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-gold)' }}>{property.specs.parking}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Parking</div>
                  </div>
                )}
              </div>

              {/* Amenities */}
              {property.amenities && (
                <>
                  <h3 style={{ marginBottom: '1.5rem' }}>Amenities & Features</h3>
                  <div className="amenities-grid" style={{ marginBottom: '3rem' }}>
                    {property.amenities.map((a, i) => (
                      <div key={i} className="amenity-tag">✓ {a}</div>
                    ))}
                  </div>
                </>
              )}

              {/* Map Placeholder */}
              <h3 style={{ marginBottom: '1.5rem' }}>Location</h3>
              <div style={{
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-lg)', padding: '4rem', textAlign: 'center',
                color: 'var(--text-muted)', marginBottom: '3rem'
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 1rem', display: 'block', color: 'var(--brand-gold)' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {property.location.neighbourhood}, {property.location.city}
                </div>
                <div>{property.location.region}, Ghana</div>
              </div>
            </div>
          </div>

          {/* ─── SIDEBAR ─── */}
          <div className="detail-sidebar">
            {/* Price Card */}
            <div className="sidebar-card">
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--brand-gold)', marginBottom: '0.5rem' }}>
                {formatPrice()}
              </div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                {property.category === 'residential' ? 'Residential Property' : 'Commercial Space'}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Schedule Viewing</button>
              <button className="btn btn-outline" style={{ width: '100%' }}>Request More Info</button>
            </div>

            {/* Agent Card */}
            {agent && (
              <div className="sidebar-card">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <img src={agent.photo_url} alt={agent.full_name} style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid var(--brand-gold)', margin: '0 auto 1rem', objectFit: 'cover' }} />
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{agent.full_name}</div>
                  <div style={{ color: 'var(--brand-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{agent.title}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a href={`tel:${agent.phone}`} className="btn btn-glass btn-sm" style={{ justifyContent: 'center' }}>📞 {agent.phone}</a>
                  <a href={`mailto:${agent.email}`} className="btn btn-glass btn-sm" style={{ justifyContent: 'center' }}>✉️ {agent.email}</a>
                  <Link href={`/brokerage/${agent.slug}`} className="btn btn-outline btn-sm" style={{ justifyContent: 'center' }}>View Full Profile</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── SIMILAR PROPERTIES ─── */}
        {similar.length > 0 && (
          <section className="section-spacing">
            <h2 style={{ marginBottom: '2rem' }}>Similar Properties</h2>
            <div className="similar-grid">
              {similar.map(prop => (
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
          </section>
        )}
      </div>
    </>
  );
}
