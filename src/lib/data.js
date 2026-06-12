export const properties = [
  {
    id: 'prop-1', slug: 'the-aurora-penthouse', title: 'The Aurora Penthouse', status: 'for_sale', category: 'residential',
    price: { amount: 1050000, currency: 'USD', period: 'once' },
    location: { region: 'Greater Accra', city: 'Accra', neighbourhood: 'Cantonments' },
    specs: { bedrooms: 4, bathrooms: 4.5, sqm: 450, parking: 2, pool: true, garden: true },
    media: { thumbnail: '/villa.png', gallery: ['/villa.png', '/construction.png'] },
    title_info: { verified: true, ref: 'LT/ACC/2024/0891' },
    description: 'A breathtaking penthouse residence offering panoramic views of Accra\'s skyline. This ultra-luxury 4-bedroom apartment features imported Italian marble, a private rooftop terrace, infinity pool, and premium home automation throughout. Located in the prestigious Cantonments diplomatic enclave.',
    amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Backup Generator', 'Elevator', 'Home Automation', 'Rooftop Terrace', 'Underground Parking'],
    agent_id: 'agt-1', featured: true
  },
  {
    id: 'prop-2', slug: 'ridgeview-executive', title: 'Ridgeview Executive Villa', status: 'for_rent', category: 'residential',
    price: { amount: 5000, currency: 'USD', period: 'monthly' },
    location: { region: 'Greater Accra', city: 'Accra', neighbourhood: 'Ridge' },
    specs: { bedrooms: 5, bathrooms: 5, sqm: 600, parking: 3, pool: true, garden: true },
    media: { thumbnail: '/villa.png', gallery: ['/villa.png', '/fund.png'] },
    title_info: { verified: true, ref: 'LT/ACC/2023/1204' },
    description: 'An executive-grade villa on Ridge, featuring colonial-era charm married with contemporary luxury. Five spacious bedrooms, a private swimming pool, manicured gardens, and dedicated staff quarters. Ideal for diplomats, corporate executives, or families seeking prestige and privacy.',
    amenities: ['Swimming Pool', 'Staff Quarters', 'Garden', 'Backup Generator', 'CCTV', 'Garage'],
    agent_id: 'agt-2', featured: true
  },
  {
    id: 'prop-3', slug: 'airport-luxury-estate', title: 'Osei Tutu Estate', status: 'for_sale', category: 'residential',
    price: { amount: 8500000, currency: 'GHS', period: 'once' },
    location: { region: 'Greater Accra', city: 'Accra', neighbourhood: 'Airport Residential' },
    specs: { bedrooms: 6, bathrooms: 6.5, sqm: 800, parking: 4, pool: true, garden: true },
    media: { thumbnail: '/villa.png', gallery: ['/villa.png'] },
    title_info: { verified: true, ref: 'LT/ACC/2024/0456' },
    description: 'The crown jewel of Airport Residential — a sprawling 6-bedroom estate on a 1-acre plot. This property redefines luxury living in Accra with its grand entrance, double-height ceilings, wine cellar, home cinema, and Olympic-length swimming pool. Perfect for a family compound or corporate retreat.',
    amenities: ['Swimming Pool', 'Home Cinema', 'Wine Cellar', 'Staff Quarters', 'Garden', 'Borehole', 'Solar Panels'],
    agent_id: 'agt-1', featured: true
  },
  {
    id: 'prop-4', slug: 'east-legon-commercial', title: 'Legon Plaza Hub', status: 'for_rent', category: 'commercial',
    price: { amount: 3000, currency: 'USD', period: 'monthly' },
    location: { region: 'Greater Accra', city: 'Accra', neighbourhood: 'East Legon' },
    specs: { bedrooms: 0, bathrooms: 2, sqm: 150, parking: 5, pool: false, garden: false },
    media: { thumbnail: '/construction.png', gallery: ['/construction.png'] },
    title_info: { verified: true, ref: 'LT/ACC/2025/0023' },
    description: 'A prime commercial space in the heart of East Legon\'s business district. Open-plan ground floor ideal for retail, banking, or showroom use. High foot traffic, ample parking, and 24/7 security. Fiber internet ready.',
    amenities: ['Fiber Internet', '24/7 Security', 'Parking', 'Backup Generator', 'Air Conditioning'],
    agent_id: 'agt-2', featured: false
  }
];

export const funds = [
  {
    id: 'fund-1', slug: 'ghana-diaspora-growth-fund', name: 'Ghana Diaspora Growth Fund', type: 'diaspora', status: 'open', currency: 'USD',
    target_return_pct: 12.5, minimum_investment: 10000, amount_raised: 4500000, target_fund_size: 10000000, risk_level: 'moderate', sec_ghana_ref: 'SEC/FND/2026/041',
    description: 'A diversified real estate fund designed for the Ghanaian diaspora. Invests in a portfolio of premium residential and commercial properties across Accra, with quarterly dividend distributions.',
    highlights: ['Quarterly Dividend Payouts', 'USD-Denominated Returns', 'Professional Fund Management', 'SEC Ghana Regulated'],
    maturity: '5 Years', management_fee: '2%'
  },
  {
    id: 'fund-2', slug: 'accra-commercial-income', name: 'Accra Commercial Income Fund', type: 'income', status: 'closed', currency: 'GHS',
    target_return_pct: 18.0, minimum_investment: 50000, amount_raised: 25000000, target_fund_size: 25000000, risk_level: 'low', sec_ghana_ref: 'SEC/FND/2025/088',
    description: 'A fully subscribed income fund focused on Grade-A commercial properties in Accra\'s CBD. Generating stable rental income from long-term corporate tenants.',
    highlights: ['100% Subscribed', 'Grade-A Tenants', 'Monthly Income Distribution', 'Low Risk Profile'],
    maturity: '7 Years', management_fee: '1.5%'
  },
  {
    id: 'fund-3', slug: 'green-housing-initiative', name: 'Eco-Housing Initiative Fund', type: 'growth', status: 'open', currency: 'USD',
    target_return_pct: 15.0, minimum_investment: 25000, amount_raised: 1200000, target_fund_size: 50000000, risk_level: 'high', sec_ghana_ref: 'SEC/FND/2026/092',
    description: 'A high-growth fund investing in sustainable, EDGE-certified housing developments across Ghana. Targets capital appreciation through green-building construction projects.',
    highlights: ['EDGE Certified Projects', 'ESG Compliant', 'High Growth Potential', 'Impact Investing'],
    maturity: '10 Years', management_fee: '2.5%'
  }
];

export const agents = [
  {
    id: 'agt-1', slug: 'kwame-mensah', full_name: 'Kwame Mensah', title: 'Senior Luxury Broker', bio: 'Specializing in high-net-worth properties across Cantonments and Airport Residential. With over 12 years of experience, Kwame has facilitated over $50M in transactions and is one of Ghana\'s most trusted luxury real estate advisors.',
    license_number: 'GREPA-2023-081', specialisations: ['luxury_residential', 'off_plan'], regions_covered: ['Greater Accra'],
    photo_url: '/agent.png', active_listings_count: 14, transactions_closed: 85,
    email: 'kwame@frankrolland.com', phone: '+233 55 887 8341', years_experience: 12
  },
  {
    id: 'agt-2', slug: 'ama-serwaa', full_name: 'Ama Serwaa', title: 'Commercial Real Estate Advisor', bio: '10+ years experience facilitating corporate leases and commercial acquisitions across Greater Accra region. Ama is known for her data-driven approach and deep understanding of Ghana\'s commercial property market.',
    license_number: 'GREPA-2020-112', specialisations: ['commercial', 'rental'], regions_covered: ['Greater Accra'],
    photo_url: '/agent.png', active_listings_count: 8, transactions_closed: 120,
    email: 'ama@frankrolland.com', phone: '+233 55 887 8341', years_experience: 10
  }
];

export const projects = [
  {
    id: 'proj-1', slug: 'oasis-commercial-tower', name: 'Oasis Commercial Tower', tagline: 'The new standard of business in Accra.', status: 'under_construction',
    location: { region: 'Greater Accra', city: 'Accra', neighbourhood: 'Airport City' }, total_units: 40, units_sold: 28, completion_date: '2027-12-01T00:00:00Z',
    media: { thumbnail: '/construction.png', gallery: ['/construction.png', '/villa.png'] },
    sustainability: { solar_ready: true, edge_certified: true, rainwater_harvesting: true, waste_recycling: true },
    description: 'A 15-story Grade-A commercial tower in Airport City featuring cutting-edge office spaces, retail podium, rooftop event space, and green building certification. The Oasis tower will redefine Accra\'s commercial skyline.',
    milestones: [
      { phase: 'Foundation', date: '2025-03-01', completed: true },
      { phase: 'Structural', date: '2025-12-01', completed: true },
      { phase: 'Facade & MEP', date: '2026-08-01', completed: false },
      { phase: 'Interior Fit-Out', date: '2027-06-01', completed: false },
      { phase: 'Handover', date: '2027-12-01', completed: false }
    ]
  },
  {
    id: 'proj-2', slug: 'the-haven-residences', name: 'The Haven Residences', tagline: 'Tranquil luxury living in East Legon.', status: 'completed',
    location: { region: 'Greater Accra', city: 'Accra', neighbourhood: 'East Legon' }, total_units: 120, units_sold: 120, completion_date: '2025-06-01T00:00:00Z',
    media: { thumbnail: '/villa.png', gallery: ['/villa.png', '/fund.png'] },
    sustainability: { solar_ready: false, edge_certified: false, rainwater_harvesting: false, waste_recycling: true },
    description: 'A sold-out luxury residential enclave featuring 120 premium apartments and townhouses in East Legon. The Haven set a new benchmark for residential quality in Accra with its world-class amenities and community-focused design.',
    milestones: [
      { phase: 'Foundation', date: '2023-01-01', completed: true },
      { phase: 'Structural', date: '2023-09-01', completed: true },
      { phase: 'Facade & MEP', date: '2024-06-01', completed: true },
      { phase: 'Interior Fit-Out', date: '2025-02-01', completed: true },
      { phase: 'Handover', date: '2025-06-01', completed: true }
    ]
  },
  {
    id: 'proj-3', slug: 'tema-tech-hub', name: 'Tema Tech Hub & Lofts', tagline: 'Live. Work. Innovate.', status: 'off_plan',
    location: { region: 'Greater Accra', city: 'Tema', neighbourhood: 'Community 1' }, total_units: 80, units_sold: 15, completion_date: '2028-09-01T00:00:00Z',
    media: { thumbnail: '/construction.png', gallery: ['/construction.png'] },
    sustainability: { solar_ready: true, edge_certified: true, rainwater_harvesting: true, waste_recycling: true },
    description: 'A mixed-use innovation campus in Tema combining co-working spaces, tech incubator offices, and modern loft apartments. Designed for Ghana\'s growing tech ecosystem with 100% renewable energy targets.',
    milestones: [
      { phase: 'Land Acquisition', date: '2026-01-01', completed: true },
      { phase: 'Planning & Design', date: '2026-06-01', completed: false },
      { phase: 'Foundation', date: '2027-01-01', completed: false },
      { phase: 'Construction', date: '2028-01-01', completed: false },
      { phase: 'Handover', date: '2028-09-01', completed: false }
    ]
  }
];

export const stats = {
  funds_under_management_ghs: 350000000,
  properties_listed: 120,
  projects_delivered: 28,
  years_in_operation: 15,
  cities_active: 2,
  total_transactions: 450,
  total_agents: 24,
  client_satisfaction_pct: 98
};

export const testimonials = [
  {
    id: 'test-1', name: 'Dr. Kofi Asante', role: 'Diaspora Investor, London',
    text: 'Frank Rolland made investing in Ghanaian real estate seamless. From KYC to my first dividend, everything was transparent and professionally managed. I\'ve since referred three colleagues.',
    rating: 5
  },
  {
    id: 'test-2', name: 'Mrs. Akua Boateng', role: 'Homeowner, Cantonments',
    text: 'Kwame and the brokerage team found us our dream home within two weeks. The title verification process gave us complete peace of mind. Exceptional service from start to finish.',
    rating: 5
  },
  {
    id: 'test-3', name: 'Nana Yaw Osei', role: 'Land Joint Venture Partner',
    text: 'I contributed my family land in Accra and Frank Rolland delivered a world-class development. The JV model was fair, transparent, and incredibly profitable. They turned idle land into a thriving community.',
    rating: 5
  },
  {
    id: 'test-4', name: 'Efua Mensah-Williams', role: 'Commercial Tenant, East Legon',
    text: 'Our office space at Legon Plaza Hub is perfectly maintained. The management team is responsive and the location has been fantastic for our business growth. Highly recommend for any company looking for premium office space.',
    rating: 5
  }
];

export const news = [
  {
    id: 'news-1', title: 'Frank Rolland Breaks Ground on Tema Tech Hub',
    summary: 'The $25M mixed-use development will bring 80 units of modern loft apartments and co-working spaces to Tema.',
    date: '2026-05-15', category: 'Development'
  },
  {
    id: 'news-2', title: 'Eco-Housing Fund Reaches $1.2M Milestone',
    summary: 'Our newest EDGE-certified fund continues to attract ESG-conscious investors from across the diaspora.',
    date: '2026-04-20', category: 'Investment'
  },
  {
    id: 'news-3', title: 'FR Properties Named Top Brokerage in Accra',
    summary: 'For the third consecutive year, our brokerage division has been recognized as the leading luxury property firm in the Greater Accra region.',
    date: '2026-03-10', category: 'Awards'
  }
];

export const db = {
  properties, funds, agents, projects, stats, testimonials, news
};
