# Jefferson Germino — Portfolio

A cinematic, interactive portfolio built with React, TypeScript, GSAP, Framer Motion, Lenis smooth scroll, and React Three Fiber.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

The build output goes to `dist/` — deploy that folder to any static host (Vercel, Netlify, Cloudflare Pages, Azure Static Web Apps, GitHub Pages, etc).

## Stack

- **React 19 + TypeScript + Vite** — app shell and build tooling
- **Tailwind CSS v4** — styling, design tokens defined in `src/index.css`
- **Framer Motion** — scroll-triggered reveals, layout animation, the role-cycling hero text
- **GSAP + ScrollTrigger** — split-text character/word reveals
- **Lenis** — smooth inertial scrolling
- **React Three Fiber + drei** — the abstract 3D object in the hero
- **lucide-react** — iconography

## Project structure

```
src/
  components/
    layout/       Navbar, chapter progress rail, footer
    sections/      One file per page section (Hero, About, Skills, Experience,
                    AutomationShowcase, CloudShowcase, Projects, Contact)
    ui/            Reusable pieces: buttons, cards, split-text, the node-graph
                    diagram used by both the automation and cloud sections
  three/           React Three Fiber hero object
  data/            content.ts — all copy, projects, skills, timeline, and the
                    node/edge data that drives both animated diagrams
  hooks/           useLenis, useMousePosition, useReducedMotion
  lib/             small utilities (cn, clamp, lerp, mapRange)
```

## Customizing

Almost everything you'll want to change lives in **`src/data/content.ts`**:

- `profile` — name, location, contact info, cycling role titles, tagline
- `stats` — the animated counters in About
- `skillCategories` — the six skill dashboard cards
- `experience` — timeline entries
- `projects` — the four project case studies (the one marked `featured: true`
  gets the large centerpiece card)
- `automationNodes` / `automationEdges` — the AI workflow diagram
- `azureServices` / `azureEdges` — the cloud architecture diagram

To swap in a real resume, drop a PDF at `public/resume.pdf` — the hero's
Resume button already links there.

Social links (`profile.socials`) are placeholders — update them with your
real GitHub and LinkedIn URLs.

## Accessibility

- Respects `prefers-reduced-motion` (disables Lenis smooth scroll and shortens
  animation durations)
- Visible focus rings on all interactive elements
- Semantic landmarks (`header`, `main`, `section`, `footer`) and `aria-label`s
  on icon-only controls and diagrams

## Notes

- The custom cursor is disabled automatically on touch devices.
- The 3D hero object lazy-loads (code-split) so it doesn't block the initial
  page render; it's the largest JS chunk in the build, which is expected for
  a Three.js scene.
