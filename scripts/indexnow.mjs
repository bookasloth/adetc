// IndexNow submit — pings search engines to recrawl after a deploy.
// Run AFTER the new content is live:  node scripts/indexnow.mjs
// Key file public/<KEY>.txt must be deployed and reachable at the site root.
import { INDEXABLE_ROUTES, SITE_URL, absoluteUrl } from '../lib/seo.js';

const KEY = 'e1010facd605cfb043e1e0813bd41726';
const host = new URL(SITE_URL).host;
const urlList = INDEXABLE_ROUTES.map(({ path }) => absoluteUrl(path));

const body = {
  host,
  key: KEY,
  keyLocation: `${SITE_URL}/${KEY}.txt`,
  urlList,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

console.log(`IndexNow -> ${res.status} ${res.statusText} (${urlList.length} URLs)`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
