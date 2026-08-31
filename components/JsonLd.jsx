import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/seo';

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

// Site-wide Organization + WebSite graph. Rendered once in the root layout.
// TODO(adetc): add address/telephone (LocalBusiness) + real sameAs profile URLs.
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl('/assets/images/adetc-logo.png'),
        description:
          'adetc is a full-service film and video production studio in Ahmedabad, producing commercials, brand videos, and creative films.',
        // sameAs: ['https://instagram.com/...', 'https://youtube.com/...'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
  return <JsonLd data={data} />;
}
