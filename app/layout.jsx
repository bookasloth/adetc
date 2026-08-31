import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { OrganizationJsonLd } from '@/components/JsonLd';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Film & Video Production Studio in Ahmedabad`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'AdEtc Studios is a full-service film production studio in Ahmedabad delivering bold visuals and powerful narratives, from commercials to creative films.',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    // og:image supplied by app/opengraph-image.jsx (file convention).
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/images/favicon.ico" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </head>
      <body>
        <OrganizationJsonLd />
        <Header />
        <Sidebar />
        <main>{children}</main>
        <Footer />
        <Script
          src="/assets/js/bundle.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
