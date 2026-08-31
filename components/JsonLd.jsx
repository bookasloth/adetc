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

// FAQPage schema. `items` = [{ q, a }] — must mirror the visible on-page Q&A.
export function FaqJsonLd({ items }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  return <JsonLd data={data} />;
}

// BlogPosting schema for an article page. `post` = a lib/blog-posts entry.
export function ArticleJsonLd({ path, post, datePublished }) {
  const org = { '@id': `${SITE_URL}/#organization` };
  const url = absoluteUrl(path);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? absoluteUrl(post.image) : undefined,
    ...(datePublished ? { datePublished, dateModified: datePublished } : {}),
    author: org,
    publisher: org,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  };
  return <JsonLd data={data} />;
}

// BreadcrumbList schema. `trail` = [{ name, path }], root-first.
export function BreadcrumbJsonLd({ trail }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(({ name, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
  return <JsonLd data={data} />;
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
