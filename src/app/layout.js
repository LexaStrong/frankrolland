import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppCTA from '@/components/WhatsAppCTA';

export const metadata = {
  metadataBase: new URL('https://frankrolland.com'),
  title: {
    default: "Frank Rolland — Ghana's Premier Real Estate Corporation",
    template: "%s | Frank Rolland",
  },
  description: 'A vertically integrated real estate corporation delivering premium properties, structured investments, expert brokerage, and world-class construction across Ghana.',
  keywords: ['Ghana real estate', 'luxury property Ghana', 'real estate investment', 'Accra property', 'Ghana brokerage', 'construction Ghana', 'Diaspora real estate investment Ghana', 'SEC regulated property funds Ghana', 'EDGE certified buildings Ghana'],
  authors: [{ name: 'Frank Rolland' }],
  creator: 'Frank Rolland',
  publisher: 'Frank Rolland Real Estate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Frank Rolland — Ghana's Premier Real Estate Corporation",
    description: 'Delivering premium properties, structured investments, expert brokerage, and world-class construction across Ghana.',
    url: 'https://frankrolland.com',
    siteName: 'Frank Rolland',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Frank Rolland Logo',
      },
    ],
    locale: 'en_GH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Frank Rolland — Ghana's Premier Real Estate Corporation",
    description: 'Delivering premium properties, structured investments, expert brokerage, and world-class construction across Ghana.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Frank Rolland',
  url: 'https://frankrolland.com',
  logo: 'https://frankrolland.com/logo.png',
  image: 'https://frankrolland.com/logo.png',
  description: 'Ghana\'s Premier Real Estate Corporation offering properties, investment funds, brokerage, and construction services.',
  telephone: '+233558878341',
  email: 'info@frankrolland.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '14 Rangoon Lane',
    addressLocality: 'Cantonments, Accra',
    addressRegion: 'Greater Accra',
    addressCountry: 'GH'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '5.5866',
    longitude: '-0.1706'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00'
  },
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate Brokerage' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate Investment Funds' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Property Development and Construction' } }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppCTA />
      </body>
    </html>
  );
}
