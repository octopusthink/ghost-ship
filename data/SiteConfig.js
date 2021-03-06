const config = {
  // Set to your site's language/locale.
  language: 'en-US',
  // Site title.
  siteTitle: 'Ghost Ship Gatsby Starter',
  // Short site title for homescreen (PWA/Progressive Web Apps).
  // Staying under 12 characters will prevent any truncation on phone screens.
  siteTitleShort: 'Ghost Ship',
  // Alternative site title for SEO.
  siteTitleAlt: 'Ghost Ship: Stranded on an island with but your wits and React',
  // Logo used for SEO and manifest.
  siteLogo: '/logos/logo-1024.png',
  // Domain of your website without pathPrefix.
  siteUrl: 'https://yourdomain.com',
  // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  pathPrefix: '/',
  // Website description used for RSS feeds/meta description tag. 170 char.
  siteDescription:
    'Ghost ship is a Gatsby starter that offers blogging, optimised images, a portfolio, and more.',
  // Path to the RSS file.
  siteRss: '/blog/rss.xml',
  twitter: '@tweettweet',
  // Copyright string for the footer of the website and RSS feed.
  copyright: `Copyright © ${new Date().getFullYear()}. Your name here.`,
  // Fallback image used when sharing to social sites.
  defaultImage: '/og-images/default.png',
  imageHeight: '630',
  imageWidth: '1200',

  /* ------------ Blog Settings ------------ */
  blogTitle: 'Our Blog',
  blogDescription: 'The blog of Ghost Ship, famed for its speed.',
  blogSummary:
    'AKA our blog, in which we talk about spooky ships and fast websites. It is quite the good time!',
  blogUrl: '/blog/',
  dateFormat: 'D MMMM YYYY',
  enableBlogAuthors: true,
  enableBlogTags: true,
  postsPerPage: 10,
  // When enabled this prefixes slugs with `date` data for the node, if set.
  // `useDatesInSlugs: false` -> `/blog/my-post/`
  // `useDatesInSlugs: true`  -> `/blog/2019-05-09-my-post/`
  useDatesInSlugs: true,

  /* ------------ Matamo Tracking Settings ------------ */
  matomoOptions: {
    siteId: null,
    matomoUrl: 'https://your.matomoserver.com',
    siteUrl: 'https://yourdomain.com',
    requireConsent: false,
    // Removes the need for cookie notices and is less creepy! :-)
    disableCookies: true,
  },

  /* ------------ Visual Appearance Settings ------------ */
  // Replace this with a Nautilus Theme object.
  // See: https://nautilus.octopusthink.com
  nautilusTheme: null, // require('./theme'),
  // Site width is total width of your site including headers, footers, and backgrounds, expressed in a value CSS understands.
  siteWidth: '128rem',
  // Content width is the width of content (ie, paragraphs and blocks of text), expressed in a CSS value.
  contentWidth: '64rem',
};

/* ------------ You shouldn't need to edit this! ------------ */
// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = '';
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`;

module.exports = config;
