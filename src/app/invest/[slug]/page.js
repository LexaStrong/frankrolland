'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const API_BASE = '/api/v1';

export default function FundDetailPage() {
  const params = useParams();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/funds/${params.slug}`)
      .then(r => r.json())
      .then(d => { setFund(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.slug]);

  if (loading) return <div className="loading-spinner" style={{ minHeight: '80vh' }}>Loading fund details...</div>;
  if (!fund) return <div className="loading-spinner" style={{ minHeight: '80vh' }}>Fund not found.</div>;

  const fmt = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: fund.currency, maximumFractionDigits: 0 }).format(amount);
  const pct = Math.min((fund.amount_raised / fund.target_fund_size) * 100, 100);
  const isOpen = fund.status === 'open';

  return (
    <>
      <div className="compliance-banner" style={{ marginTop: '60px' }}>
        <strong>Risk Disclosure:</strong> Investments in private funds involve a high degree of risk. SEC Ghana regulated entity.
      </div>

      <div className="container">
        <Link href="/invest" className="back-link">← Back to Funds</Link>

        <div className="detail-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span className={`fund-status ${isOpen ? 'status-open' : 'status-closed'}`} style={{ position: 'static' }}>{fund.status}</span>
              <span style={{ color: 'var(--brand-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.85rem' }}>{fund.type} Fund</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{fund.name}</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>{fund.description}</p>

            {/* Key Metrics */}
            <h3 style={{ marginBottom: '1.5rem' }}>Fund Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              <div className="market-tile" style={{ textAlign: 'center' }}>
                <div className="market-tile-value">{fund.target_return_pct}%</div>
                <div className="market-tile-label">Target Return</div>
              </div>
              <div className="market-tile" style={{ textAlign: 'center' }}>
                <div className="market-tile-value">{fund.maturity}</div>
                <div className="market-tile-label">Maturity</div>
              </div>
              <div className="market-tile" style={{ textAlign: 'center' }}>
                <div className="market-tile-value">{fund.management_fee}</div>
                <div className="market-tile-label">Management Fee</div>
              </div>
              <div className="market-tile" style={{ textAlign: 'center' }}>
                <div className="market-tile-value" style={{ textTransform: 'capitalize' }}>{fund.risk_level}</div>
                <div className="market-tile-label">Risk Level</div>
              </div>
            </div>

            {/* Progress */}
            <h3 style={{ marginBottom: '1.5rem' }}>Fundraising Progress</h3>
            <div className="fund-progress-wrap" style={{ marginBottom: '3rem' }}>
              <div className="fund-progress-bar" style={{ height: 10 }}>
                <div className="fund-progress-fill" style={{ width: `${pct}%` }}></div>
              </div>
              <div className="fund-progress-text" style={{ fontSize: '1rem' }}>
                <span>{fmt(fund.amount_raised)} Raised</span>
                <span>{fmt(fund.target_fund_size)} Target</span>
              </div>
            </div>

            {/* Highlights */}
            {fund.highlights && (
              <>
                <h3 style={{ marginBottom: '1.5rem' }}>Fund Highlights</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
                  {fund.highlights.map((h, i) => (
                    <div key={i} className="amenity-tag" style={{ padding: '1rem' }}>✓ {h}</div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="detail-sidebar">
            <div className="sidebar-card">
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Minimum Investment</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--brand-gold)', marginBottom: '2rem' }}>{fmt(fund.minimum_investment)}</div>
              {isOpen ? (
                <>
                  <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Start Investment</button>
                  <button className="btn btn-outline" style={{ width: '100%' }}>Download Prospectus</button>
                </>
              ) : (
                <button className="btn btn-outline" style={{ width: '100%', cursor: 'not-allowed', opacity: 0.6 }}>Fully Subscribed</button>
              )}
            </div>

            <div className="sidebar-card">
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Regulatory</div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>SEC Ghana Ref:</strong>
                <div style={{ color: 'var(--brand-gold)', fontWeight: 600 }}>{fund.sec_ghana_ref}</div>
              </div>
              <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>This fund is regulated by the Securities and Exchange Commission of Ghana.</p>
            </div>

            <div className="sidebar-card">
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Need Help?</div>
              <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>Speak with our investment team for personalized guidance.</p>
              <a href="tel:+233240000000" className="btn btn-glass" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>📞 Call Us</a>
              <a href="mailto:invest@frankrolland.com" className="btn btn-glass" style={{ width: '100%', justifyContent: 'center' }}>✉️ Email Us</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
