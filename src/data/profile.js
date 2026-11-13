/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — edit this file to personalise the site.
 * ─────────────────────────────────────────────────────────────
 *
 * Any link left as an empty string ('') is shown as a disabled
 * "Coming soon" control, so the site never contains broken links.
 */

export const profile = {
  name: 'Eugene Clent',
  initials: 'EC',
  role: 'Software Developer & Computer Science Student',
  location: 'Ghana',
  tagline: 'Building Technology for Real-World Problems.',
  availableForOpportunities: true,

  // Public contact email, e.g. 'you@example.com'. Used for the Email link
  // and as the contact-form fallback (opens the visitor's mail app).
  email: 'asueugene15@gmail.com',

  social: {
    github: 'https://github.com/asueugene13-hue',
    linkedin: '', // e.g. 'https://www.linkedin.com/in/your-profile'
    whatsapp: 'https://wa.me/233550465332',
  },

  // GitHub username for the live developer-activity section.
  // When empty, the section shows "Connect GitHub to display live development activity."
  githubUsername: 'asueugene13-hue',

  // Optional form backend (e.g. a Formspree endpoint: 'https://formspree.io/f/xxxxxxx').
  // When set, the contact form POSTs JSON here. When empty, the form falls back to
  // opening the visitor's email app (if `email` is set).
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',

  // Spline scene export URL (Spline → Export → Code → React). Set in .env.
  splineScene: import.meta.env.VITE_SPLINE_SCENE_URL || '',
  // Optional lighter scene for phones. When empty, phones get the built-in
  // lightweight animated globe instead of the full 3D scene.
  splineSceneMobile: import.meta.env.VITE_SPLINE_SCENE_URL_MOBILE || '',
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]
