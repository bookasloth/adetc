// Central SEO/GEO/AEO config + helpers.
// metadataBase (set in app/layout.jsx) resolves the relative paths below to absolute URLs.

export const SITE = {
  name: 'AdEtc Studios',
  legalName: 'adetc Studio',
  url: 'https://adetcstudios.com',
  logo: 'https://adetcstudios.com/assets/images/adetc-logo.png',
  ogImage: '/opengraph-image', // generated 1200x630 card (app/opengraph-image.jsx)
  description:
    'AdEtc Studios is a full-service film and video production company in Ahmedabad, delivering ad films, brand videos, TVCs and post-production with bold visuals and powerful storytelling.',
  phones: ['+919727000197', '+919909901116'],
  email: 'hello@adetcstudios.com',
  updated: '2026-08-17', // bump when content is meaningfully refreshed (dateModified)
  services: [
    'Video Production',
    'Video Editing',
    'Script Writing',
    'Motion Graphics',
    'Sound Design',
  ],
  address: {
    street: '314, Judges Bunglow Rd, Suryapooja Block B, Vastrapur',
    city: 'Ahmedabad',
    region: 'Gujarat',
    postalCode: '380015',
    country: 'IN',
  },
  // Real social/profile URLs (verified from the live site) — strengthen the
  // brand's knowledge-graph entity. Footer/page links now point to these too.
  sameAs: [
    'https://www.instagram.com/adetc_studios/',
    'https://www.youtube.com/@AdEtcStudios',
    'https://www.linkedin.com/company/adetc-studios/',
    'https://www.facebook.com/profile.php?id=61578905199852',
    'https://x.com/AdEtcstudios',
  ],
};

// Build a page's Next.js `metadata` object with canonical + OpenGraph + Twitter.
// Omit `title` for the home page so the layout's default title is used.
export function pageMetadata({ title, description, path = '/', image } = {}) {
  const meta = {
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      url: path,
      title: title ? `${title} | ${SITE.name}` : undefined,
      description,
      images: [{ url: image || SITE.ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || SITE.name,
      description,
      images: [image || SITE.ogImage],
    },
  };
  if (title) meta.title = title; // string title → layout template adds "| AdEtc Studios"
  return meta;
}

// ---- JSON-LD builders (return plain objects; render via <JsonLd data={...} />) ----

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.logo,
    description: SITE.description,
    address: postalAddress,
    telephone: SITE.phones[0],
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

export function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/#localbusiness`,
    name: SITE.name,
    image: SITE.logo,
    url: SITE.url,
    telephone: SITE.phones[0],
    priceRange: '$$',
    address: postalAddress,
    areaServed: [
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'State', name: 'Gujarat' },
      { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Video Production Services',
      itemListElement: SITE.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s, provider: { '@id': `${SITE.url}/#organization` } },
      })),
    },
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

// items: [{ q, a }]
export function faqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

// items: [{ name, path }] in order, root first.
export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function articleLd({ headline, description, image, datePublished, dateModified, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image ? `${SITE.url}${image}` : SITE.logo,
    datePublished,
    dateModified: dateModified || SITE.updated || datePublished,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}${path}` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', 'article p'],
    },
  };
}
