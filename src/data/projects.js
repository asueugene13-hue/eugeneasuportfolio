/**
 * Project content.
 *
 * `stage` drives the status track in the project detail view:
 *   'concept' | 'planning' | 'development' | 'completed'
 * `statusLabel` is the exact text shown on the badge.
 *
 * Links: leave `github` / `demo` as '' until a real URL exists —
 * the UI then shows a disabled "Coming soon" button instead of a broken link.
 *
 * `challenges` describe the real engineering problems each system has to solve.
 * Edit them as you learn more while building.
 */

export const STAGES = [
  { id: 'concept', label: 'Concept' },
  { id: 'planning', label: 'Planning' },
  { id: 'development', label: 'In Development' },
  { id: 'completed', label: 'Completed' },
]

export const projects = [
  {
    id: 'smart-farmer',
    flagship: true,
    name: 'Smart Farmer',
    subtitle: 'Ghana Smart Agriculture Platform',
    accent: '#34d399',
    visual: 'farm',
    stage: 'development',
    statusLabel: 'Actively in Development',
    description:
      'A modern digital agriculture platform designed to support farmers and agricultural businesses in Ghana through technology, digital marketplaces, farm management tools, and intelligent agricultural services.',
    problem:
      'Many farmers in Ghana struggle to find trusted agricultural inputs, veterinary products, equipment and services in one place — and often have no simple way to know the exact size of their own farmland.',
    solution:
      'Smart Farmer brings marketplaces for produce, agro-pharmacy, veterinary pharmacy and equipment together with farmer-focused tools, including a GPS system that measures a farm simply by walking its boundary.',
    features: [
      'Agricultural marketplace',
      'Agriculture pharmacy',
      'Veterinary pharmacy',
      'Farming equipment marketplace',
      'Agricultural services',
      'Farmer-focused product discovery',
      'GPS farm location tools',
      'Farm boundary measurement',
    ],
    gps: {
      intro:
        'The farmer walks around the boundary of their farm while the app tracks their location and automatically records boundary points.',
      steps: [
        { title: 'Track GPS movement', text: 'Location updates are captured continuously as the farmer walks the edge of the land.' },
        { title: 'Identify boundary points', text: 'Meaningful points are recorded along the path to describe the shape of the farm.' },
        { title: 'Create a farm polygon', text: 'The recorded points are joined into a closed polygon representing the farm.' },
        { title: 'Calculate land area', text: 'The polygon’s approximate area is calculated from its geographic coordinates.' },
        { title: 'Display on a map', text: 'The finished boundary is drawn on an interactive map the farmer can review.' },
      ],
    },
    future: [
      'Soil testing integration',
      'Embedded hardware integration',
      'Agricultural analytics',
      'AI-powered farming recommendations',
      'Fraud prevention',
      'Farmer verification',
    ],
    tech: ['React Native', 'GPS', 'Maps', 'Firebase', 'APIs', 'AI', 'Embedded Systems'],
    challenges: [
      'Phone GPS readings drift by several metres, so boundary points need filtering and smoothing before the area is calculated.',
      'Area has to be computed from latitude/longitude on a curved surface, not a flat grid, to stay accurate.',
      'Many farms have weak mobile coverage, so tracking must keep working offline and sync later.',
      'Building trust in a marketplace means verifying sellers and protecting farmers from fraud.',
    ],
    links: { github: '', demo: '' },
  },
  {
    id: 'safezone',
    name: 'SafeZone',
    subtitle: 'Community Safety Network',
    accent: '#f87171',
    visual: 'safety',
    stage: 'development',
    statusLabel: 'In Development',
    description:
      'A smart community safety application designed to help people stay informed about safety incidents happening around them.',
    problem:
      'News about nearby crimes, accidents and fires often spreads slowly and informally, leaving people unaware of risks in the areas they live and travel through.',
    solution:
      'SafeZone lets communities report incidents live and shows them on an interactive safety map, with location-based alerts and severity indicators so people can react quickly.',
    features: [
      'Live incident reporting',
      'Interactive safety maps',
      'Location-based alerts',
      'Crime notifications',
      'Accident reports',
      'Fire alerts',
      'Severity indicators',
      'Community reporting',
      'Safety information',
    ],
    future: [
      'AI-powered incident analysis',
      'Government and emergency service integration',
      'Predictive safety insights',
      'Smart notifications',
    ],
    tech: ['React Native', 'Maps', 'Firebase', 'Notifications', 'APIs', 'AI'],
    challenges: [
      'Preventing false or duplicate reports while still letting anyone report quickly.',
      'Sending alerts only to people near an incident without draining battery on constant location tracking.',
      'Keeping the map responsive as the number of real-time incidents grows.',
    ],
    links: { github: '', demo: '' },
  },
  {
    id: 'smart-university',
    name: 'Smart University Portal',
    subtitle: 'Academic Management Platform',
    accent: '#60a5fa',
    visual: 'university',
    stage: 'concept',
    statusLabel: 'Concept / Development',
    description:
      'A modern university technology platform designed to improve student and academic management.',
    problem:
      'Students, lecturers and administrators often juggle separate systems — or paper — for learning, attendance, hostels and academic records.',
    solution:
      'One portal with dedicated dashboards for students, lecturers and administrators, combining learning, attendance, hostel management and AI-powered quizzes.',
    features: [
      'Learning Management System',
      'Student dashboard',
      'Hostel management',
      'AI-powered quizzes',
      'Attendance management',
      'Lecturer tools',
      'Administrator dashboard',
      'Class monitoring',
      'Academic management',
    ],
    tech: ['React', 'React Native', 'Node.js', 'Databases', 'APIs', 'AI'],
    challenges: [
      'Designing role-based access so students, lecturers and admins each see only what they should.',
      'Making attendance tracking reliable and hard to fake.',
      'Generating useful quiz questions with AI while keeping them accurate.',
    ],
    links: { github: '', demo: '' },
  },
  {
    id: 'real-estate',
    name: 'Real Estate Marketplace',
    subtitle: 'Trusted Property Discovery',
    accent: '#fbbf24',
    visual: 'estate',
    stage: 'concept',
    statusLabel: 'Development Concept',
    description:
      'A modern real estate platform designed to improve property discovery and increase trust in online property listings.',
    problem:
      'Finding property online is slow and risky — listings are scattered, details are incomplete, and fake listings make it hard to know who to trust.',
    solution:
      'A searchable marketplace with rich property information, agent profiles and verification features, plus AI-assisted concepts for detecting likely scams.',
    features: [
      'Property listings',
      'Advanced property search',
      'Filters',
      'Property information',
      'Agent profiles',
      'Property management',
      'AI-assisted scam detection concepts',
      'Verification features',
    ],
    tech: ['React', 'Node.js', 'Databases', 'APIs', 'AI'],
    challenges: [
      'Defining a verification process for agents and listings that is strict but practical.',
      'Spotting scam patterns in listings without wrongly flagging honest sellers.',
      'Fast, flexible search across many filters and locations.',
    ],
    links: { github: '', demo: '' },
  },
  {
    id: 'davi-special',
    name: 'Davi Special',
    subtitle: 'Ghanaian Food & Restaurant Platform',
    accent: '#fb923c',
    visual: 'food',
    stage: 'development',
    statusLabel: 'In Development',
    description:
      'A digital restaurant and food ordering platform focused on Ghanaian food experiences.',
    problem:
      'Local restaurants and food vendors often take orders by phone or in person, which makes ordering, tracking and managing deliveries harder for everyone.',
    solution:
      'An ordering platform with customer accounts, vendor and restaurant management, delivery management and an admin dashboard — built around Ghanaian food.',
    features: [
      'Food ordering',
      'Customer accounts',
      'Vendor management',
      'Admin dashboard',
      'Delivery management',
      'Restaurant management',
      'Future online payment integration',
    ],
    tech: ['Node.js', 'MySQL', 'APIs', 'Web Development'],
    challenges: [
      'Modelling orders, vendors, menus and deliveries cleanly in a relational database.',
      'Keeping order status in sync between customers, vendors and delivery.',
      'Preparing the system for secure online payment integration.',
    ],
    links: { github: '', demo: '' },
  },
  {
    id: 'logitrack',
    name: 'LogiTrack / HaulTrack',
    subtitle: 'Logistics & Transportation Management',
    accent: '#a78bfa',
    visual: 'logistics',
    stage: 'development',
    statusLabel: 'Development',
    description:
      'A logistics platform designed to help manage transportation and shipment operations.',
    problem:
      'Shipment and transport operations are hard to coordinate when information lives in notebooks, calls and spreadsheets.',
    solution:
      'A backend-driven platform for managing shipments and transportation workflows, with REST APIs and a structured database at its core.',
    features: [
      'Shipment management',
      'Logistics tracking',
      'Transportation workflows',
      'Backend APIs',
      'Database management',
    ],
    tech: ['Node.js', 'SQLite', 'REST APIs', 'Web Technologies'],
    challenges: [
      'Modelling a shipment’s lifecycle as clear, auditable status changes.',
      'Designing REST endpoints that stay consistent as workflows grow.',
    ],
    links: { github: '', demo: '' },
  },
]
