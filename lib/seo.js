// Central SEO config. Single source of truth for site URL + indexable routes.
// ponytail: one constant, env-overridable. Set NEXT_PUBLIC_SITE_URL in prod.

// TODO(adetc): replace placeholder with the real production origin (no trailing slash).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://adetc.com'
).replace(/\/$/, '');

export const SITE_NAME = 'adetc';

// Public, indexable routes. Sitemap + canonical checks read from here.
// `/blog/page/2` intentionally omitted: paginated duplicate of /blog (canonical → /blog).
export const INDEXABLE_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/service-detail', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/project', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/project-detail', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/team', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/testimonial', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/ad-film-makers', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/brand-video', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/tvc-format', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/video-production-company', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/single-post', priority: 0.6, changeFrequency: 'monthly' },
];

export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path === '/' ? '' : path}`;
