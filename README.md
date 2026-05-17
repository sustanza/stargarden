# 🚀 StarGarden Astro Theme

Welcome to the future, traveler — where the splendor of the Atomic Age meets modern Astro web development. **StarGarden** is your trusty rocket for launching simple, markdown-powered websites into cyberspace with unmatched style and efficiency.

![StarGarden Theme](./src/assets/landing-hero.png)

## 🌐 Live Demo

Experience StarGarden in orbit at [stargarden.pages.dev](https://stargarden.pages.dev/).

## 🛠️ Initiate Launch Sequence

Two launch paths. Pick whichever fits your mission profile.

### Option A — clone via Astro's official starter command

```bash
npm create astro@latest -- --template sustanza/stargarden
```

### Option B — fork or clone manually

```bash
git clone https://github.com/sustanza/stargarden.git my-site
cd my-site
npm install
npm run dev
```

Then open `http://localhost:4321/` in your favorite browser.

## 📁 Project Structure

```
.
├── astro.config.mjs        # Astro config: integrations, markdown plugins, site URL
├── src/
│   ├── consts.ts           # SITE_TITLE + SITE_DESCRIPTION — edit when forking
│   ├── components/         # BaseHead, Navbar, Footer, ThemeToggle, Landing
│   ├── layouts/Layout.astro
│   ├── pages/              # index.astro, posts/, [...slug].astro, robots.txt.ts, rss.xml.ts, 404.astro
│   ├── content.config.ts   # Collection schemas (posts + pages)
│   ├── content/
│   │   ├── posts/          # Co-located markdown + cover images
│   │   └── pages/          # About, Privacy, TOS, FAQ (and your own)
│   ├── assets/             # Logo, hero, icons (inline SVG)
│   ├── plugins/            # remark-reading-time
│   ├── scripts/            # Theme controller
│   └── styles/global.css   # Tailwind + DaisyUI imports, Pagefind overrides
├── public/                 # favicon
├── e2e/                    # Playwright smoke tests
└── __tests__/              # Vitest unit tests
```

## 🛰️ Customization Checklist

When you fork this template, the handful of files you'll edit first:

1. **`src/consts.ts`** — set `SITE_TITLE` and `SITE_DESCRIPTION`.
2. **`astro.config.mjs`** — change `site:` to your deployed URL (drives canonical, RSS, sitemap, robots).
3. **`src/components/Footer.astro`** — swap the placeholder email, YouTube handle, and GitHub link for your own.
4. **`public/favicon.svg`** — replace with your favicon.
5. **`src/content/posts/`** — replace or supplement the demo astronomy posts with your own. Frontmatter schema lives in `src/content.config.ts`.
6. **`src/content/pages/`** — edit `about`, `privacy`, `tos`, `faq`, or add new pages following the same `<slug>/index.md` pattern.

## 🌌 Feature Control Panel

- **Astro 6** with content collections + `astro:assets` image optimization.
- **Tailwind CSS v4 + DaisyUI v5** — light (`corporate`) + dark (`business`) themes, honors `prefers-color-scheme` on first visit, persists user toggle in localStorage.
- **View Transitions** via `<ClientRouter />` for SPA-style navigation.
- **Link prefetch** (hover strategy) for snappy clicks.
- **Pagefind search** indexed at build time; integrated mobile + desktop UI.
- **SEO** via a hand-rolled `BaseHead.astro`: OpenGraph, Twitter Card, canonical, JSON-LD Organization — all emitted on every page.
- **Sitemap + dynamic `robots.txt`** that auto-tracks your `site:` config.
- **RSS feed** at `/rss.xml` with full post HTML and cover-image enclosures.
- **Expressive-code** syntax highlighting with paired light/dark themes that follow DaisyUI's `data-theme`.
- **Reading time** + clickable heading anchors on every post.
- **Vitest** unit tests + **Playwright** end-to-end smoke tests.

## 📜 Available Scripts

| Script                   | What it does                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `npm run dev`            | Astro dev server on `http://localhost:4321/` (Pagefind search will be empty — see below) |
| `npm run build`          | Production build into `dist/`, including Pagefind index                                  |
| `npm run preview`        | Serve the built `dist/`                                                                  |
| `npm run preview:search` | Build + preview in one step — use this to test Pagefind search locally                   |
| `npm run test`           | Run Vitest unit tests                                                                    |
| `npm run test:e2e`       | Run Playwright end-to-end tests (boots dev server)                                       |
| `npm run test:ci`        | Build then run Playwright against the production preview                                 |
| `npm run format`         | Format the repo with Prettier                                                            |
| `npm run format:check`   | Verify formatting without writing — CI gate                                              |

## ⚠️ Known Caveats

### Pagefind search is empty under `npm run dev`

Pagefind indexes built HTML, not source markdown. The search input renders in dev mode but returns no results until you've run `npm run build` at least once. Use `npm run preview:search` to test search locally — it builds and previews in a single step.

### Custom 404 page depends on your host

`src/pages/404.astro` builds to `dist/404.html`. Hosts that auto-serve `404.html` with a 404 status (Cloudflare Pages, Netlify, Vercel) work out of the box. Self-hosted nginx or other static servers may need explicit configuration to return the right status code.

### RSS body images won't resolve in feed readers

The RSS feed at `/rss.xml` ships each post's full rendered HTML in `<content:encoded>` plus an `<enclosure>` for the cover image. The cover image enclosure uses absolute URLs and resolves correctly. **Inline markdown images in post bodies** (e.g. `![alt](./img.png)`) are local-only paths that won't resolve in subscribers' readers — host body images in `public/` with absolute paths or reference them by `https://` URL if you need them in the feed.

## 📡 License

StarGarden flies under the [MIT License](LICENSE). Freedom to innovate, explore, and customize — fully endorsed by your friendly local space authority.

## 🤝 Contributing

See [CONTRIBUTORS.md](./CONTRIBUTORS.md). Issues and PRs welcome.

---

Godspeed, future-makers, and happy exploring!
