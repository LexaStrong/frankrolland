# Frank Rolland — Ghana's Premier Real Estate Corporation

![Frank Rolland Logo](public/logo.png)

Frank Rolland is a vertically integrated real estate corporation offering premium property listings, structured real estate investments, expert brokerage, and world-class construction services across Ghana.

## Overview

This repository contains the unified **Frank Rolland Ecosystem Web Application**, built using **Next.js (App Router)**. It serves as a unified digital platform representing the four main pillars of the corporation:

1. **Properties:** Discover luxury, title-verified properties across Ghana for sale, rent, and off-plan purchase.
2. **Invest:** SEC-compliant private real estate funds for accredited investors and the diaspora.
3. **Brokerage:** Connect with Ghana's most distinguished real estate professionals for seamless property transactions.
4. **Build:** World-class construction, bespoke builds, and active development pipelines.

> [!TIP]
> The platform recently transitioned from a multi-SPA (Single Page Application) Vite workspace to a unified, SEO-optimized Next.js architecture. This ensures drastically improved performance, unified routing, and advanced search engine capabilities.

## Architecture & Tech Stack

- **Framework:** Next.js (React 19, App Router)
- **Styling:** Vanilla CSS with custom Global Tokens (`globals.css`)
- **API & Data:** Fully native Next.js API Routes (`/api/v1/[...route]`) utilizing a lightweight mock database.
- **Search Engine Optimization (SEO):** Deeply integrated Open Graph tags, robust meta descriptions, and XML sitemaps.
- **Answer Engine Optimization (AEO) & GEO:** Embedded structured data (JSON-LD Schema) to ensure the platform is comprehensible to generative AI models and intelligent answer engines.

## Features

- **Dynamic Server-Side Routing:** Dynamic parameter extraction for specific property, fund, project, and agent details (`[slug]/page.js`).
- **Comprehensive API:** An internal router serving mock JSON data equivalent to a dedicated Express microservice.
- **Real-Time Currency Toggles:** Allow users to dynamically assess property values in both USD and GHS.
- **Web-Vitals Optimized:** Minimized bundle sizes and native Image usage.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation & Startup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)

> [!IMPORTANT]
> The development server uses port `3000` by default. If it is already in use, Next.js will automatically select an alternative port.

## Deployment

To build the application for production:

```bash
npm run build
```

Then, to start the production server:

```bash
npm run start
```

## SEO, AEO, and GEO

> [!NOTE]
> This application employs advanced discovery techniques:
> - **SEO:** Static generation, semantic HTML, and dynamic Metadata mapping for pages.
> - **AEO (Answer Engine Optimization):** Clear, factual content blocks without flowery fluff, allowing AI search engines to pull direct answers.
> - **GEO (Generative Engine Optimization):** Schema.org `RealEstateAgent` representations injecting authoritative metadata (address, offerings, coordinates) directly into the `<head>` of the DOM. 
> - **Robots & Sitemaps:** Automated generation of `robots.txt` and dynamic `sitemap.xml` directly within the App Router context.

## Contact

**Head Office:** 14 Rangoon Lane, Cantonments, Accra  
**Phone:** +233 55 887 8341  
**Email:** info@frankrolland.com  
# frankrolland
