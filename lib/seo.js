// Central SEO config. Single source of truth for site URL + indexable routes.
// ponytail: one constant, env-overridable. Set NEXT_PUBLIC_SITE_URL in prod.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://adetcstudios.com'
).replace(/\/$/, '');

export const SITE_NAME = 'AdEtc Studios';

// Verified from the live site (adetcstudios.com/contact). Used for LocalBusiness.
export const BUSINESS = {
  telephone: '+91 9727000197',
  email: 'hello@adetcstudios.com',
  address: {
    streetAddress: '314, Shivalik Shilp 2, Judges Bunglow Rd, Suryapooja Block B, Vastrapur',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380015',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/adetc_studios/',
    'https://www.youtube.com/@AdEtcStudios',
    'https://www.linkedin.com/company/adetc-studios/',
    'https://www.facebook.com/profile.php?id=61578905199852',
    'https://x.com/AdEtcstudios',
  ],
};

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

// Default OG image = the generated 1200x630 card (app/opengraph-image.jsx).
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: 'AdEtc Studios — Film & Video Production Studio in Ahmedabad',
};

// Per-route title + description. Single source for <title>, meta description,
// canonical, and Open Graph. Titles kept < ~60 chars, descriptions < ~155,
// keyword-front where it reads naturally.
export const PAGE_META = {
  '/': {
    // Absolute: root segment doesn't inherit the layout title template.
    title: { absolute: 'AdEtc Studios — Film & Video Production Studio in Ahmedabad' },
    description:
      'adetc is a full-service film production studio in Ahmedabad crafting commercials, brand videos, and creative films with bold visuals and powerful narratives.',
  },
  '/about': {
    title: 'About Us',
    description:
      'Meet adetc, an Ahmedabad film production studio built on the belief that visual storytelling is a craft. Learn our story, values, and way of working.',
  },
  '/services': {
    title: 'Services',
    description:
      'Video production services from adetc: TV commercials, brand videos, ad films, corporate videos, and full-service pre- to post-production in Ahmedabad.',
  },
  '/service-detail': {
    title: 'Video Production Company in Ahmedabad',
    description:
      'How adetc delivers end-to-end video production in Ahmedabad, from concept and scripting through filming, editing, and final delivery for brands.',
  },
  '/pricing': {
    title: 'Pricing & Packages',
    description:
      'Transparent video production pricing from adetc. Compare packages for commercials, brand videos, and ad films to find the right fit for your budget.',
  },
  '/project': {
    title: 'Portfolio',
    description:
      "Explore adetc's portfolio of commercials, brand films, and creative video projects produced for brands across industries.",
  },
  '/project-detail': {
    title: 'Project Detail',
    description:
      'A closer look at a video production project by adetc — the brief, the creative approach, and the final result.',
  },
  '/team': {
    title: 'Our Team',
    description:
      'The directors, cinematographers, and editors behind adetc — the crew turning ideas into powerful visual stories in Ahmedabad.',
  },
  '/testimonial': {
    title: 'Testimonials',
    description:
      'What clients say about working with adetc — reviews and results from brands that trusted us with their video production.',
  },
  '/contact': {
    title: 'Contact Us',
    description:
      'Get in touch with adetc to start your next video or film project. Reach our Ahmedabad studio for quotes, questions, and collaborations.',
  },
  '/blog': {
    title: 'Blog & Journal',
    description:
      'Insights on video production, ad films, TVC formats, and brand storytelling from the adetc studio in Ahmedabad.',
  },
  '/ad-film-makers': {
    title: 'Ad Film Makers in Ahmedabad',
    description:
      'adetc creates impactful ad films in Ahmedabad, from concept and scripting to filming, direction, editing, and post-production.',
  },
  '/brand-video': {
    title: 'Brand Video: Visual Storytelling That Builds Brands',
    description:
      'Discover how a compelling brand video helps businesses build trust, connect with audiences, and tell memorable stories that inspire action.',
  },
  '/tvc-format': {
    title: 'TVC Format: A Guide to TV Commercials',
    description:
      'Explore the TVC format, common durations, script structure, production process, and what makes an effective television commercial.',
  },
  '/video-production-company': {
    title: 'Video Production Company in Ahmedabad: What They Do',
    description:
      'Learn what a video production company in Ahmedabad does, from concept and scripting to filming, editing, and delivering videos for brands.',
  },
  '/single-post': {
    title: 'Ad Film Makers: How Creative Advertising Films Bring Brands to Life',
    description:
      'Behind every memorable campaign is a team turning ideas into powerful stories. See how creative ad film makers bring brands to life.',
  },
};

// Build a Next.js Metadata object for a route: title, description, canonical,
// Open Graph, and Twitter card — all from one place.
export function buildMetadata(path, overrides = {}) {
  const base = PAGE_META[path] || {};
  const title = overrides.title || base.title || SITE_NAME;
  // OG/Twitter need a plain string; unwrap { absolute } form.
  const ogTitle =
    typeof title === 'string' ? title : title.absolute || title.default || SITE_NAME;
  const description = overrides.description || base.description;
  const canonical = overrides.canonical || absoluteUrl(path);
  const imageProp = { images: overrides.images || [DEFAULT_OG_IMAGE] };
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: overrides.ogType || 'website',
      ...imageProp,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      ...imageProp,
    },
  };
}
