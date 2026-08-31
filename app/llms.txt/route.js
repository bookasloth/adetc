import { SITE_URL, SITE_NAME, PAGE_META, INDEXABLE_ROUTES, absoluteUrl } from '@/lib/seo';

// /llms.txt — concise, machine-readable site guide for AI crawlers.
// Reuses the same route + copy source as sitemap/metadata (lib/seo.js).
export const dynamic = 'force-static';

function line(path) {
  const m = PAGE_META[path] || {};
  const title = typeof m.title === 'string' ? m.title : m.title?.absolute || path;
  return `- [${title}](${absoluteUrl(path)})${m.description ? `: ${m.description}` : ''}`;
}

export function GET() {
  const body = `# ${SITE_NAME}

> ${SITE_NAME} is a full-service film and video production studio in Ahmedabad, India, producing TV commercials, brand videos, ad films, and creative content from concept through post-production.

## Pages
${INDEXABLE_ROUTES.map(({ path }) => line(path)).join('\n')}

## Contact
- Studio: Vastrapur, Ahmedabad, Gujarat 380015, India
- Phone: +91 9727000197
- Email: hello@adetcstudios.com
- Sitemap: ${SITE_URL}/sitemap.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
