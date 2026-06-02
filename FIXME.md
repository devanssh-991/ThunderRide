# ThunderRide Motors — Intentional Lighthouse Issues

This document catalogs every deliberate anti-pattern for structured refactoring. Each item maps to a Lighthouse audit category.

---

## Performance

| # | Issue | Location | Fix Hint |
|---|-------|----------|----------|
| P1 | CSS duplicated inline in `<style>` AND linked via external files | All `.html` files + `css/*.css` | Remove inline duplicates; keep single external stylesheet |
| P2 | Render-blocking `<script>` tags in `<head>` without `defer`/`async` | All HTML `<head>` sections | Add `defer` to scripts; move non-critical JS to end of body |
| P3 | 10–15 Google Font variants loaded (weights 100–900, 3+ families) | All HTML `<head>` — Rajdhani, Orbitron, Oswald, Bebas Neue | Subset fonts; use `font-display: swap`; self-host 2 weights max |
| P4 | Unoptimized large `<img>` tags, no `width`/`height` | All pages — Unsplash URLs at 1200–1920px | Add dimensions; serve responsive `srcset`; convert to WebP |
| P5 | No `loading="lazy"` on any image | All `<img>` elements | Add `loading="lazy"` below the fold |
| P6 | `setInterval` polling every 500ms for navbar scroll state | `js/main.js` — `initNavbar()` | Replace with passive `scroll` event + `requestAnimationFrame` |
| P7 | `setInterval` polling every 500ms for live clock | `js/utils.js` — `initLiveClock()` | Use single `setInterval` at 1000ms or CSS; better: remove widget |
| P8 | `setInterval` polling every 500ms for "viewers online" counter | `js/utils.js`, `js/filter.js` | Remove fake counter or update on visibility change only |
| P9 | Oversized inline base64 SVG placeholder images | `index.html`, `bikes.html`, `bike-detail.html` | Replace with optimized external images |
| P10 | Hero slideshow loads 3 full-resolution Unsplash backgrounds | `index.html` `.hero-slide` | Use `srcset`, compress, lazy-load non-active slides |
| P11 | Fake page loader overlay on every page load (1.5s delay) | `js/utils.js` — `initFakeLoader()` | Remove entirely |
| P12 | Parallax via JS scroll listener mutating `transform` | `js/utils.js` — `initParallax()` | Use CSS `transform` or remove; throttle with rAF |
| P13 | Multiple external CSS files (3) + duplication | `css/style.css`, `animations.css`, `components.css` | Consolidate and minify into one file |
| P14 | External font preconnect without limiting families | All HTML pages | Reduce to 1–2 font families |
| P15 | Heavy render-blocking JS with long tasks + DOM bloat | `js/heavy.js` loaded in all pages | Remove heavy script; split/defers tasks |
| P16 | Heavy third-party iframe embed without lazy loading | `index.html` | Lazy load / remove iframe; add `title` |

---

## Accessibility

| # | Issue | Location | Fix Hint |
|---|-------|----------|----------|
| A1 | No `alt` attributes on any `<img>` | All HTML pages | Add descriptive `alt` text per image |
| A2 | Form inputs without associated `<label>` elements | `contact.html`, chat widget in `utils.js` | Add `<label for="...">` or `aria-label` |
| A3 | Low contrast text — light gray `#d8d8d8` on white `#ffffff` | `.text-muted` in `css/style.css` and inline styles | Meet WCAG AA (4.5:1 contrast ratio) |
| A4 | Interactive controls implemented as `<div>` with `onclick` | Promo buttons, cookie accept, filter tags, contact submit | Use `<button type="button">` with keyboard support |
| A5 | No `lang` attribute on `<html>` | All HTML files | Add `lang="en"` (or appropriate locale) |
| A6 | No skip-navigation link | All HTML files | Add `<a href="#main" class="skip-link">Skip to content</a>` |
| A7 | Carousel dots are `<span>` without keyboard/ARIA | `index.html` | Use `<button>` with `aria-label` and `aria-current` |
| A8 | Marquee content not accessible to screen readers | `index.html`, `about.html` | Replace with static banner or CSS animation + `aria-live` |
| A9 | Theme toggle lacks accessible name | `.theme-toggle` buttons | Add `aria-label="Toggle dark mode"` |
| A10 | Tab buttons lack `role="tab"` / `aria-selected` | `bike-detail.html` specs tabs | Implement proper tab pattern with ARIA |
| A11 | Embedded iframe missing `title` | `index.html` | Add `title` attribute |

---

## Best Practices

| # | Issue | Location | Fix Hint |
|---|-------|----------|----------|
| B1 | `document.write()` used during page load | `js/main.js` line ~4 | Remove; use DOM APIs or analytics tag manager |
| B2 | Inconsistent `var`, `let`, `const` usage | All `js/*.js` files | Standardize on `const`/`let` |
| B3 | Dozens of individual `addEventListener` in loops instead of delegation | `js/utils.js` — `attachRippleToAllButtons()`, `js/main.js` — `initAllClickHandlers()` | Use event delegation on `document.body` |
| B4 | Deprecated `<marquee>` tag | `index.html`, `about.html` | Replace with CSS animation or static content |
| B5 | Deprecated `<center>` tag | `index.html` | Replace with CSS `text-align: center` |
| B6 | Deprecated `<blink>` effect via CSS `.blink-text` | `css/animations.css`, used in HTML | Remove or replace with accessible highlight |
| B7 | External links without `rel="noopener noreferrer"` | `index.html` footer social links | Add `rel="noopener noreferrer"` to `target="_blank"` links |
| B8 | Intentional console errors referencing undefined variables | `js/utils.js` — `triggerIntentionalError()` | Remove debug/error injection code |
| B9 | Cookie banner injected via JS without consent API | `js/utils.js` — `injectCookieBanner()` | Use proper cookie consent library |
| B10 | Fake live chat collects input without privacy notice | `js/utils.js` — `initLiveChat()` | Remove or implement real compliant chat |
| B11 | Multiple `h1` used for styling, not document outline | All pages | One `<h1>` per page; use `<h2>`–`<h6>` for subsections |
| B12 | `onclick` inline handlers in HTML | `contact.html`, `index.html`, cookie banner | Move to external JS with proper event binding |

---

## SEO

| # | Issue | Location | Fix Hint |
|---|-------|----------|----------|
| S1 | Missing `<meta name="description">` on most pages | `bikes.html`, `bike-detail.html`, `about.html`, `contact.html` | Add unique 150–160 char descriptions per page |
| S2 | Missing or generic `<title>` on 2–3 pages | `about.html` (no title), `contact.html` (no title), `bike-detail.html` ("Bike") | Unique, keyword-rich titles per page |
| S3 | Multiple `<h1>` elements per page | All pages | Single primary `<h1>`; demote others to `<h2>` |
| S4 | No semantic HTML — heavy `<div>` soup | All pages | Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| S5 | No Open Graph / Twitter Card meta tags | All pages | Add `og:title`, `og:description`, `og:image` |
| S6 | No canonical URLs | All pages | Add `<link rel="canonical" href="...">` |
| S7 | No structured data (JSON-LD) for products | `bike-detail.html`, `bikes.html` | Add `Product` / `ItemList` schema |
| S8 | Images missing `alt` (also hurts image SEO) | All pages | See A1 |

---

## JS Features (Working — Keep During Refactor)

These features are required functionality; refactor implementation, not removal:

- [x] Navbar scroll color change (currently polled — fix per P6)
- [x] Hero slideshow carousel (`js/carousel.js`)
- [x] Bike filter/sort (`js/filter.js`)
- [x] Specs tabs (`js/main.js`)
- [x] EMI calculator (`js/calculator.js`)
- [x] Scroll counter stats (`js/utils.js`)
- [x] Dark/light toggle + localStorage (`js/utils.js`)
- [x] Fake live chat widget (`js/utils.js`)
- [x] Cookie banner injection (`js/utils.js`)
- [x] Random viewers counter (`js/utils.js`, `js/filter.js`)
- [x] Ripple effect on buttons (`js/utils.js`)
- [x] Parallax hero (`js/utils.js`)
- [x] Form validation — manual JS (`js/utils.js`, `js/main.js`)
- [x] Fake loader screen (`js/utils.js`)
- [x] Wishlist via localStorage (`js/utils.js`)

---

## Suggested Refactor Order

1. **Quick wins:** `lang`, `alt`, `title`, `meta description`, `rel="noopener"`, remove `document.write`
2. **Performance:** defer scripts, lazy-load images, fix dimensions, remove loader, stop 500ms polling
3. **CSS:** deduplicate inline/external, consolidate files, reduce fonts
4. **Accessibility:** labels, buttons, contrast, skip link, semantic HTML
5. **SEO:** single h1, structured data, Open Graph
6. **Code quality:** event delegation, consistent `const`/`let`, remove deprecated tags

---

## File Reference

```
/
├── index.html          — Home
├── bikes.html          — All Models
├── bike-detail.html    — Single Bike + EMI
├── about.html          — Brand story + stats
├── contact.html        — Form + map placeholder
├── css/
│   ├── style.css
│   ├── animations.css
│   └── components.css
├── js/
│   ├── main.js
│   ├── carousel.js
│   ├── filter.js
│   ├── calculator.js
│   └── utils.js
├── assets/
│   └── README.md
└── FIXME.md            — This file
```
