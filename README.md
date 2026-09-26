# Ahmed Abdelwahed — Portfolio

My personal portfolio: machine-learning, NLP and data projects, each with a short case study.
Built to grow — **adding a project means adding one Markdown file**, no code or redesign.

![Next.js](https://img.shields.io/badge/Next.js_16-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-000000?logo=framer&logoColor=white)

**Lighthouse (mobile):** Performance 96–97 · Accessibility 100 · Best Practices 100 · SEO 100

## Features

- **Home** — hero with a glass terminal that types out `profile.json`, a bento grid of featured projects, experience, grouped certifications, about (education, timeline, skills) and contact.
- **Projects** — every project, filterable by tag (ML, NLP, Data, Apps…).
- **Case studies** — problem, approach, results, screenshots, code link, plus a "Try it live" button and demo video when `demoUrl` / `demoVideo` are set.
- **Certifications** — live Credly badges (refreshed daily) merged with a local list of other certificates, de-duplicated and grouped by topic.
- **⌘K / Ctrl+K command menu** — jump to any page or project, copy my email, toggle the theme.
- **Light and dark mode** — remembered per visitor, with no flash on reload.
- **Tasteful motion** — page-load and scroll reveals, card hover lift, a chart that draws itself. All of it respects the OS "reduce motion" setting.
- **Accessible and fast** — keyboard navigable, skip link, screen-reader labels, static pages, no layout shift.
- **SEO** — per-page titles and descriptions, a generated share image, sitemap, robots.txt and structured data.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. Other commands:

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload |
| `npm run build` | Production build (also checks every content file) |
| `npm start` | Serve the production build |
| `npm run lint` | Check the code for common mistakes |

## Add a project

1. Copy `content/projects/_template.md` and rename it, e.g. `my-new-project.md`.
   The filename becomes the URL: `/projects/my-new-project`.
2. Put screenshots in `public/projects/my-new-project/`.
3. Fill in the fields. The template explains each one. Set `featured: true` to show it on the home page.
4. Commit and push. Vercel redeploys automatically.

The new project appears on `/projects`, gets its own case-study page, shows up in the ⌘K menu and the sitemap, and updates the counts in the hero terminal.
If a required field is missing or an image path is wrong, the build stops with a message naming the file.

## Edit other content

| What | Where |
|---|---|
| Name, title, intro, email, links, about, experience, education, skills, timeline | `src/lib/site.ts` |
| Certificates not on Credly (add new ones here) | `content/certifications.json` |
| Awards (optional photo in `public/awards/`) | `content/awards.json` |
| Credly fallback (used only if Credly is unreachable) | `content/credly-fallback.json` |
| CV — the "Download CV" buttons appear once this file exists | `public/cv.pdf` |
| Colours, glass effect, fonts | `src/app/globals.css` (design tokens at the top) |

## Project structure

```
content/
  projects/*.md          one file per project (Markdown + frontmatter)
  certifications.json    Credly fallback
public/projects/<slug>/  project screenshots
src/
  app/                   pages, layout, share image, icons, sitemap, robots
  components/            UI (nav, cards, command menu, animations…)
  lib/                   content loaders and site settings
```

## Design

Apple-like minimal with a developer feel. Warm off-white background (`#F6F6F4`), solid white cards with 32px corners, and a near-black accent (`#1D1D1F`).
Geist for text, Geist Mono for labels and code.
**Liquid glass** (backdrop blur + saturate, a thin white border and an inset highlight) is used only on the controls layer: the nav, buttons, the ⌘K menu and the terminal card.
Chromium browsers also get SVG refraction; other browsers get a frosted fallback.
Cobalt (`#2F5BFF`) appears only as the glow behind glass and in terminal code highlighting.

## Deploy

Hosted on [Vercel](https://vercel.com). Every push to `main` deploys automatically.
The site address is detected from Vercel. For a custom domain, set the `NEXT_PUBLIC_SITE_URL` environment variable (e.g. `https://example.com`).

## Contact

[ahmed@ajxlabs.com](mailto:ahmed@ajxlabs.com) · [LinkedIn](https://www.linkedin.com/in/ahmedabdlwhd/) · [GitHub](https://github.com/AhmedAbdlwhd)
