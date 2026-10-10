# Adel Magdy Macknota — Portfolio

Personal portfolio of Adel Magdy Macknota, Full Stack Software Engineer focused on fintech, payments and compliance systems.

Live at [adelmacknota.vercel.app](https://adelmacknota.vercel.app).

## Stack

- React 18, TypeScript, Vite
- Tailwind CSS
- Supabase (auth and storage for the private content dashboard)
- Deployed on Vercel

## Local development

Requires Node.js 20+.

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Project layout

- `src/lib/portfolioData.ts` — all site content (positioning, projects, experience, skills). Edit this file to change copy.
- `src/components/portfolio/` — the public page sections.
- `src/pages/Dashboard.tsx` — private content dashboard at `/dashboard` (sign-in required).
- `public/files/` — the downloadable resume.
- `public/images/work/` — project imagery.

When the content model in `portfolioData.ts` changes, bump `CONTENT_VERSION` so older data saved from the dashboard is ignored.
