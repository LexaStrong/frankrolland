'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ActionModal from '@/components/ActionModal';

const API_BASE = '/api/v1';

const HOW_IT_WORKS = [
  { num: '01', title: 'Register & KYC', desc: 'Complete your investor profile and identity verification. SEC Ghana compliance requires KYC before any investment.' },
  { num: '02', title: 'Choose a Fund', desc: 'Browse our SEC-regulated funds, review prospectuses, and select the opportunity that matches your risk profile and goals.' },
  { num: '03', title: 'Invest & Earn', desc: 'Transfer your investment securely. Receive quarterly reports and dividend distributions directly to your account.' },
];

const FAQ_DATA = [
  { q: 'What is the minimum investment amount?', a: 'Minimum investments start from $10,000 for our Diaspora Growth Fund. Other funds may have higher minimums depending on the fund type and risk profile. All minimums are listed on each fund\'s detail page.' },
  { q: 'Are these funds regulated?', a: 'Yes, all Frank Rolland investment funds are registered with and regulated by the Securities and Exchange Commission of Ghana (SEC Ghana). Each fund has a unique SEC reference number for verification.' },
  { q: 'Can I invest from outside Ghana?', a: 'Absolutely. Our Diaspora Fund is specifically designed for international investors. We support wire transfers in USD, GBP, and EUR, and our team provides dedicated diaspora support.' },
  { q: 'What are the exit options?', a: 'Fund maturity periods range from 5 to 10 years. Early redemption may be available after the lock-up period (typically 2 years) subject to fund liquidity and a redemption fee.' },
  { q: 'How are returns distributed?', a: 'Income funds distribute returns quarterly via direct bank transfer. Growth funds typically distribute returns at maturity or upon asset liquidation events.' },
];

export default function InvestPage() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/funds`)
      .then(r => r.json())
      .then(d => { setFunds(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const fmt = (amount, currency) => new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      {/* ─── COMPLIANCE BANNER ─── */}
      <div className="compliance-banner" style={{ marginTop: '60px' }}>
        <strong>Risk Disclosure:</strong> Investments in private funds involve a high degree of risk. SEC Ghana regulated entity.
      </div>

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('/fund.png')" }}></div>
        <div className="container hero-content">
          <div className="hero-tag" style={{ display: 'inline-block', marginBottom: '1rem' }}>Accredited Investors Only</div>
          <h1>Build Wealth Through <span>Real Estate.</span></h1>
          <p>Access exclusive, SEC-compliant private real estate funds targeting high-yield opportunities across Ghana.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#funds" className="btn btn-primary btn-lg">View Open Funds</a>
            <button className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }} onClick={() => setModalOpen(true)}>Register for KYC</button>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (NEW) ─── */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Three simple steps to start building wealth with Frank Rolland.</p>
          </div>
          <div className="steps-grid">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FUND LISTINGS ─── */}
      <section id="funds" className="section-spacing container">
        <div className="section-header">
          <h2>Current Offerings</h2>
          <p>Explore our SEC-regulated fund portfolio.</p>
        </div>
        {loading ? (
          <div className="loading-spinner">Loading funds...</div>
        ) : (
          <div className="fund-grid">
            {funds.map(fund => {
              const pct = Math.min((fund.amount_raised / fund.target_fund_size) * 100, 100);
              const isOpen = fund.status === 'open';
              return (
                <Link key={fund.id} href={`/invest/${fund.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="fund-card">
                    <div className={`fund-status ${isOpen ? 'status-open' : 'status-closed'}`}>{fund.status}</div>
                    <div className="fund-type">{fund.type} Fund</div>
                    <h3 className="fund-name">{fund.name}</h3>
                    <div className="fund-metrics">
                      <div><div className="metric-val">{fund.target_return_pct}%</div><div className="metric-label">Target Return</div></div>
                      <div><div className="metric-val">{fmt(fund.minimum_investment, fund.currency)}</div><div className="metric-label">Min. Inv.</div></div>
                    </div>
                    <div className="fund-progress-wrap">
                      <div className="fund-progress-bar"><div className="fund-progress-fill" style={{ width: `${pct}%` }}></div></div>
                      <div className="fund-progress-text"><span>{fmt(fund.amount_raised, fund.currency)} Raised</span><span>{fmt(fund.target_fund_size, fund.currency)} Target</span></div>
                    </div>
                    <button className={`btn-invest ${isOpen ? 'open' : 'closed'}`}>{isOpen ? 'View Details' : 'Fully Subscribed'}</button>
                    <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{fund.sec_ghana_ref}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── DIASPORA SECTION (NEW) ─── */}
      <section id="diaspora" className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container highlight-layout">
          <div className="highlight-content">
            <span className="highlight-tag">For the Diaspora</span>
            <h2 className="highlight-title">Invest in Ghana from Anywhere in the World</h2>
            <p style={{ marginBottom: '2rem' }}>
              Whether you&apos;re in London, New York, Toronto, or Dubai — our diaspora-focused funds make it seamless to invest in Ghana&apos;s booming real estate market. USD-denominated returns, remote onboarding, and a dedicated relationship manager.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="market-tile" style={{ flex: 1, minWidth: 150 }}>
                <div className="market-tile-label">Available In</div>
                <div className="market-tile-value" style={{ fontSize: '1.3rem' }}>USD · GBP · EUR</div>
              </div>
              <div className="market-tile" style={{ flex: 1, minWidth: 150 }}>
                <div className="market-tile-label">Onboarding</div>
                <div className="market-tile-value" style={{ fontSize: '1.3rem' }}>100% Remote</div>
              </div>
            </div>
          </div>
          <div className="highlight-img">
            <img src="/villa.png" alt="Diaspora Investment" />
          </div>
        </div>
      </section>

      {/* ─── FAQ (NEW) ─── */}
      <section className="section-spacing container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about investing with Frank Rolland.</p>
        </div>
        <div className="faq-list">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className="faq-chevron">▾</span>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── RISK DISCLOSURE ─── */}
      <section className="section-spacing" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--brand-gold)' }}>Important Risk Disclosure</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
            All investments carry risk. Past performance is not indicative of future results. The value of investments and the income from them may go down as well as up. 
            Frank Rolland Invest is regulated by the Securities and Exchange Commission of Ghana. Investors should read the fund prospectus and understand the risks before investing.
            This is not financial advice. Consult your financial advisor before making investment decisions.
          </p>
        </div>
      </section>

      <ActionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register for KYC" description="To comply with SEC regulations, please chat with our team on WhatsApp or send us an email to begin your KYC verification." />
    </>
  );
}
