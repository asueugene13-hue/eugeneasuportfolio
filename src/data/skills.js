import {
  siAndroid,
  siAndroidstudio,
  siCss,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMysql,
  siNodedotjs,
  siReact,
  siSqlite,
} from 'simple-icons'
import {
  BrainCircuit,
  Cloud,
  Cpu,
  Plug,
  Server,
  ShieldCheck,
  SquareCode,
} from 'lucide-react'

// `brand` = simple-icons entry (SVG path + brand colour)
// `icon`  = lucide component for non-brand concepts
const tech = {
  html: { name: 'HTML', brand: siHtml5, about: 'Semantic, accessible page structure — the foundation of every web interface I build.' },
  css: { name: 'CSS', brand: siCss, about: 'Responsive layouts, modern design systems and smooth, performant animations.' },
  js: { name: 'JavaScript', brand: siJavascript, about: 'The core language behind my web front-ends, Node.js back-ends and mobile apps.' },
  react: { name: 'React', brand: siReact, about: 'Component-driven user interfaces for fast, interactive web applications.' },
  rn: { name: 'React Native', brand: siReact, about: 'Cross-platform mobile apps from one codebase — used for Smart Farmer and SafeZone.' },
  node: { name: 'Node.js', brand: siNodedotjs, about: 'Server-side JavaScript for APIs, business logic and backend services.' },
  rest: { name: 'REST APIs', icon: Server, about: 'Designing clean, predictable endpoints that connect apps to their data.' },
  firebase: { name: 'Firebase', brand: siFirebase, about: 'Authentication, real-time data and cloud services for mobile and web apps.' },
  sqlite: { name: 'SQLite', brand: siSqlite, about: 'Lightweight embedded database for local storage and small backends.' },
  mysql: { name: 'MySQL', brand: siMysql, about: 'Relational data modelling and SQL queries for structured application data.' },
  firestore: { name: 'Firebase', brand: siFirebase, about: 'Cloud Firestore and Realtime Database for synced, real-time app data.' },
  android: { name: 'Android Development', brand: siAndroid, about: 'Building and testing apps for the Android devices most people around me use.' },
  flutter: { name: 'Flutter', brand: siFlutter, about: 'Working knowledge of Flutter and Dart for cross-platform UI.' },
  git: { name: 'Git', brand: siGit, about: 'Version control, branching and keeping a clean project history.' },
  github: { name: 'GitHub', brand: siGithub, about: 'Hosting code, collaborating and managing projects in the open.' },
  vscode: { name: 'VS Code', icon: SquareCode, about: 'My everyday editor for web, backend and mobile development.' },
  studio: { name: 'Android Studio', brand: siAndroidstudio, about: 'Emulators, device debugging and native Android tooling.' },
  apis: { name: 'APIs', icon: Plug, about: 'Integrating third-party services such as maps, location and notifications.' },
  security: { name: 'Cybersecurity', icon: ShieldCheck, about: 'Learning secure design, threat awareness and how to protect user data.' },
  cloud: { name: 'Cloud Computing', icon: Cloud, about: 'Exploring cloud infrastructure, deployment and scalable services.' },
  ai: { name: 'Artificial Intelligence', icon: BrainCircuit, about: 'Exploring how AI can power recommendations, analysis and smarter apps.' },
  embedded: { name: 'Embedded Systems', icon: Cpu, about: 'Connecting software to hardware — e.g. future soil sensors for Smart Farmer.' },
}

export const skillGroups = [
  { id: 'frontend', title: 'Frontend', items: [tech.html, tech.css, tech.js, tech.react, tech.rn] },
  { id: 'backend', title: 'Backend', items: [tech.node, tech.rest, tech.firebase] },
  { id: 'databases', title: 'Databases', items: [tech.sqlite, tech.mysql, tech.firestore] },
  { id: 'mobile', title: 'Mobile', items: [tech.rn, tech.android, tech.flutter] },
  { id: 'tools', title: 'Tools', items: [tech.git, tech.github, tech.vscode, tech.studio, tech.apis] },
  { id: 'growing', title: 'Growing Skills', growing: true, items: [tech.security, tech.cloud, tech.ai, tech.embedded] },
]
