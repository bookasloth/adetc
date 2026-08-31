import { SITE_URL, SITE_NAME, absoluteUrl, BUSINESS } from '@/lib/seo';

// Server component. Emits schema.org JSON-LD.
// XSS-safe: escape '<' so a "</script>" in any field can't break out of the tag.
function serialize(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

// Site-wide Organization + WebSite + LocalBusiness graph. Rendered in root layout.
export function OrganizationJsonLd() {
  const description =
    'AdEtc Studios is a full-service film and video production studio in Ahmedabad, producing commercials, brand videos, and creative films.';
  const logo = absoluteUrl('/assets/images/adetc-logo.png');
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo,
        description,
        sameAs: BUSINESS.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: SITE_NAME,
        url: SITE_URL,
        image: logo,
        description,
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        address: {
          '@type': 'PostalAddress',
          ...BUSINESS.address,
        },
        areaServed: 'IN',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        sameAs: BUSINESS.sameAs,
      },
    ],
  };
  return <JsonLd data={data} />;
}
