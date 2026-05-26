# AGENTS.md — 大明风华

Pure static HTML/CSS/JS website (Ming Dynasty history knowledge base, zh-CN). No build system, no package manager, no tests.

## Project structure

```
index.html            — home page
css/style.css         — all styles (Google Fonts: Noto Serif SC, Ma Shan Zheng)
js/main.js            — scroll fade-in, nav highlight, back-to-top button
pages/                — sub-pages (emperors, events, culture, figures)
```

## Key facts

- **No dev server needed** — open any `.html` file directly in a browser.
- **All CSS in a single file** (`css/style.css`). No CSS preprocessor.
- **JS is vanilla** (no framework). Entrypoint: `js/main.js` — loaded via `<script>` in each page.
- **Page URLs are relative.** `index.html` references `pages/foo.html`; sub-pages reference siblings (`events.html`) and parent (`../index.html`).
- **Nav highlight** is done client-side via `window.location.pathname` in `main.js`.
- **Language** is zh-CN throughout.
- **Single commit** on `main` — there is no release or deploy automation.
- **.gitignore** only covers `.DS_Store`, swap files.

## Constraints

- Do not introduce a build step, framework, or package manager unless asked.
- New pages go under `pages/` and follow the same `<header>` + `<main class="container">` + footer layout.
- Use relative paths for all CSS/JS/page links.
