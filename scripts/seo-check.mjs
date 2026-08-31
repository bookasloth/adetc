// SEO invariant checks. Run AFTER `npm run build`:  node scripts/seo-check.mjs
// No test framework — plain asserts against built output in .next/server/app.
// Fails (exit 1) if any SEO invariant regresses.
import assert from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { INDEXABLE_ROUTES } from '../lib/seo.js';

const APP = '.next/server/app';
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '');
let checks = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); checks++; };

// --- sitemap: lists every indexable route, excludes the paginated dupe ---
const sitemap = read(`${APP}/sitemap.xml.body`);
ok(sitemap.includes('<urlset'), 'sitemap.xml not generated');
for (const { path } of INDEXABLE_ROUTES) {
  const loc = path === '/' ? '</loc>' : `${path}</loc>`;
  ok(sitemap.includes(loc), `sitemap missing indexable route: ${path}`);
}
ok(!sitemap.includes('/blog/page/2'), 'sitemap must NOT list paginated dupe /blog/page/2');

// --- robots: points at sitemap, allows AI crawlers on purpose ---
const robots = read(`${APP}/robots.txt.body`);
ok(/Sitemap:\s*https?:\/\/\S+\/sitemap\.xml/.test(robots), 'robots.txt missing Sitemap line');
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'CCBot', 'Google-Extended']) {
  ok(robots.includes(bot), `robots.txt missing explicit AI crawler rule: ${bot}`);
}

console.log(`SEO checks passed: ${checks}`);
