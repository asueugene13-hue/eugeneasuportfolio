# Eugene Clent — Portfolio

Personal portfolio of Eugene Clent, Computer Science student and software developer from Ghana.

Built with **React 19** and **Vite**, with an optional Spline 3D hero (a lightweight animated globe is shown when no scene is configured).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview
```

## Deploy (Vercel / Netlify)

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

### Optional environment variables

Copy `.env.example` to `.env` (or add these in your host's dashboard):

| Variable | Purpose |
|---|---|
| `VITE_SPLINE_SCENE_URL` | Spline scene for the hero on desktop |
| `VITE_SPLINE_SCENE_URL_MOBILE` | Lighter Spline scene for phones |
| `VITE_CONTACT_ENDPOINT` | Custom form endpoint (defaults to FormSubmit → the email in `src/data/profile.js`) |

## Editing content

- Profile, email and social links: `src/data/profile.js`
- Projects: `src/data/projects.js`
- Skills: `src/data/skills.js`
