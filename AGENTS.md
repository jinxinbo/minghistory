# AGENTS.md — 大明风华

Pure static HTML/CSS/JS website (Ming Dynasty history knowledge base, zh-CN). No build system, no package manager, no tests.

## Project structure

```
index.html                    — home page (hero + search + timeline + nav cards)
css/style.css                 — all styles (Google Fonts: Noto Serif SC, Ma Shan Zheng)
js/main.js                    — scroll fade-in, nav highlight, back-to-top, search
pages/
  emperors.html               — 16 emperors with info cards
  events.html                 — timeline of major events by era
  culture.html                — culture, technology, architecture, thought
  figures.html                — political, military, intellectual, literary figures
  government.html             — 官制: Grand Secretariat, Six Ministries, Censorate, exams, law
  economy.html                — 经济: agriculture, trade, silver, overseas commerce
  military.html               — 军事: garrison system, nine border garrisons, navy, firearms
  thought.html                — 思想: Neo-Confucianism, Wang Yangming, Taizhou school, Western learning
  references.html             — 参考文献: primary sources, modern scholarship, online resources
```

## Key facts

- **No dev server needed** — open any `.html` directly in a browser.
- **All CSS in a single file** (`css/style.css`). No CSS preprocessor.
- **JS is vanilla** (no framework). Loaded via `<script src="../js/main.js">` in each page.
- **10-link navigation bar** is repeated identically on every page. `main.js` highlights the current page via `window.location.pathname`.
- **Search** (client-side, hardcoded index in `main.js`) works on every page. Search result URLs auto-adapt based on whether the page is at root or in `pages/`.
- **Citation system**: `<sup class="ref">[n]</sup>` inline citations link to a `<div class="refs-list">` at page bottom with numbered bibliography entries.
- **Cross-links**: every page ends with a `<div class="related-links">` section linking to sibling pages.
- **Language** is zh-CN throughout.
- **Deployed on GitHub Pages** at `https://jinxinbo.github.io/minghistory/`. Legacy builder: push to `main` → site auto-updates in minutes.
- **.gitignore** only covers `.DS_Store`, swap files.

## Style conventions

- Section headers: `<h2 class="section-title">`
- Deeper text blocks: `<div class="info-box">`
- Last-updated marker: `<div class="last-updated">最后更新：2026 年 5 月</div>` after page-subtitle
- New pages go under `pages/` following the same `<header>` + `<main class="container">` + footer layout.
- All paths are relative. New page nav entries must match across ALL HTML files.
- Do not introduce a build step, framework, or package manager.
