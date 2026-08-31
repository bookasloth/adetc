import { SITE_URL } from '@/lib/seo';

// Next.js App Router robots route -> served at /robots.txt
// AI crawlers ALLOWED on purpose: a production studio wants to be cited by
// generative engines (ChatGPT, Perplexity, Claude, Google AI Overviews).
// Flip any block below to Disallow if that policy changes.
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Generative / AI crawlers — explicit allow (documented decision).
      // Superset of what the live site already serves; keep in sync.
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
