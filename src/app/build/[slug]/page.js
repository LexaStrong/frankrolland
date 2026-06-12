'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const API_BASE = '/api/v1';

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/projects/${params.slug}`)
      .then(r => r.json())
      .then(d => { setProject(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.slug]);

  if (loading) return <div className="loading-spinner" style={{ minHeight: '80vh' }}>Loading project...</div>;
  if (!project) return <div className="loading-spinner" style={{ minHeight: '80vh' }}>Project not found.</div>;

  const soldPct = Math.round((project.units_sold / project.total_units) * 100);

  return (
    <div className="container">
      <Link href="/build" className="back-link">← Back to Projects</Link>

      {/* Hero Image */}
      <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '3rem', maxHeight: 500 }}>
        <img src={project.media.thumbnail} alt={project.name} style={{ width: '100%', height: 500, objectFit: 'cover' }} />
      </div>

      <div className="detail-grid">
        <div>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span className={`status-badge status-${project.status}`} style={{ position: 'static' }}>
              {project.status.replace('_', ' ')}
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{project.name}</h1>
          <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{project.tagline}</p>
          <div className="property-location" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {project.location.neighbourhood}, {project.location.city}, {project.location.region}
          </div>

          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>{project.description}</p>

          {/* Key Metrics */}
          <h3 style={{ marginBottom: '1.5rem' }}>Project Metrics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            <div className="market-tile" style={{ textAlign: 'center' }}>
              <div className="market-tile-value">{project.total_units}</div>
              <div className="market-tile-label">Total Units</div>
            </div>
            <div className="market-tile" style={{ textAlign: 'center' }}>
              <div className="market-tile-value">{project.units_sold}</div>
              <div className="market-tile-label">Units Sold</div>
            </div>
            <div className="market-tile" style={{ textAlign: 'center' }}>
              <div className="market-tile-value">{soldPct}%</div>
              <div className="market-tile-label">Sold</div>
            </div>
            <div className="market-tile" style={{ textAlign: 'center' }}>
              <div className="market-tile-value">{new Date(project.completion_date).getFullYear()}</div>
              <div className="market-tile-label">Completion Year</div>
            </div>
          </div>

          {/* Construction Timeline */}
          {project.milestones && (
            <>
              <h3 style={{ marginBottom: '2rem' }}>Construction Timeline</h3>
              <div className="timeline" style={{ marginBottom: '3rem' }}>
                {project.milestones.map((m, i) => (
                  <div key={i} className="timeline-item">
                    <div className={`timeline-dot ${m.completed ? 'completed' : ''}`}></div>
                    <div className="timeline-content">
                      <div className="timeline-phase">{m.phase}</div>
                      <div className="timeline-date">
                        {new Date(m.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        {m.completed && <span style={{ color: 'var(--accent-green)', marginLeft: '0.5rem' }}>✓ Complete</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Gallery */}
          {project.media.gallery && project.media.gallery.length > 0 && (
            <>
              <h3 style={{ marginBottom: '1.5rem' }}>Project Gallery</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                {project.media.gallery.map((img, i) => (
                  <div key={i} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: 200, border: '1px solid var(--border-glass)' }}>
                    <img src={img} alt={`${project.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="detail-sidebar">
          {/* Sales Status */}
          <div className="sidebar-card">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Sales Progress</div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="fund-progress-bar" style={{ height: 8, marginBottom: '0.5rem' }}>
                <div className="fund-progress-fill" style={{ width: `${soldPct}%` }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>{project.units_sold} sold</span>
                <span>{project.total_units - project.units_sold} remaining</span>
              </div>
            </div>
            {project.units_sold < project.total_units ? (
              <button className="btn btn-primary" style={{ width: '100%', marginBottom: '0.75rem' }}>Reserve a Unit</button>
            ) : (
              <button className="btn btn-outline" style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed', marginBottom: '0.75rem' }}>Sold Out</button>
            )}
            <button className="btn btn-outline" style={{ width: '100%' }}>Download Brochure</button>
          </div>

          {/* Sustainability */}
          <div className="sidebar-card">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Sustainability</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {project.sustainability.edge_certified && (
                <div className="amenity-tag" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669', borderColor: 'rgba(5, 150, 105, 0.3)' }}>🏅 EDGE Certified</div>
              )}
              {project.sustainability.solar_ready && (
                <div className="amenity-tag" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706', borderColor: 'rgba(217, 119, 6, 0.3)' }}>☀️ Solar Ready</div>
              )}
              {project.sustainability.rainwater_harvesting && (
                <div className="amenity-tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderColor: 'rgba(59, 130, 246, 0.3)' }}>💧 Rainwater Harvesting</div>
              )}
              {project.sustainability.waste_recycling && (
                <div className="amenity-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>♻️ Waste Recycling</div>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="sidebar-card">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Interested?</div>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>Speak with our development team about available units and pricing.</p>
            <a href="tel:+233240000000" className="btn btn-glass" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>📞 Call Sales Team</a>
            <a href="mailto:build@frankrolland.com" className="btn btn-glass" style={{ width: '100%', justifyContent: 'center' }}>✉️ Email Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
