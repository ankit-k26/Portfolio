# Ankit Kumar — Portfolio

A React + Tailwind CSS (v4) portfolio, built with Vite.

## Run it locally

```bash
npm install
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deploy — Vercel (recommended, free)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite — no config needed. Click **Deploy**.
4. You'll get a live URL like `ankit-portfolio.vercel.app`. You can attach a custom domain for free under Project Settings → Domains.

## Deploy — Netlify (alternative)

1. Push this folder to a GitHub repo.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.

## Updating your resume

Replace `public/resume.pdf` with a new export any time — the download buttons in the nav and hero always point to `/resume.pdf`, so no code changes needed.

## Project structure

```
├── index.html            # entry HTML, SEO meta tags
├── public/
│   ├── resume.pdf         # downloadable resume
│   └── favicon.svg
├── src/
│   ├── main.jsx           # React root
│   ├── App.jsx            # app wrapper
│   ├── Portfolio.jsx      # the entire portfolio page
│   └── index.css          # Tailwind import
├── vite.config.js
└── package.json
```
