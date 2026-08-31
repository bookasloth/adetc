import { INDEXABLE_ROUTES, absoluteUrl } from '@/lib/seo';

// Next.js App Router sitemap route -> served at /sitemap.xml
// Lists only indexable routes (see lib/seo.js). Paginated/dupe URLs excluded.
export default function sitemap() {
  // Static build has no per-page git mtime; use build time as lastModified.
  const lastModified = new Date();
  return INDEXABLE_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
