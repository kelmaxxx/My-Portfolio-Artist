# Kelma Artist Portofolio

Personal portfolio for my concept and character art — and a project for learning React + JavaScript along the way. UI was designed by Claude (Anthropic), then built out into a real Vite + React app.

Live preview locally:

```bash
npm install
npm run images   # one-time: convert source PNGs to WebP
npm run dev      # http://localhost:5173
```

---

## Stack

- **React 18** — UI library. I'm using function components and hooks (`useState`) only — no classes, no Redux, no router.
- **Vite 5** — dev server + production bundler. Fast hot reload, simple config.
- **Plain JavaScript** — no TypeScript yet (will likely add later as I get comfortable).
- **Inline styles + a small CSS file** — colors and most styling live on the JSX, so the theme toggle can flip them with one state change. The CSS file handles responsive layout swaps (things inline styles can't do, like media queries).
- **sharp** — only used as a build-time tool to compress PNGs into WebP.

No CSS framework, no design system library — everything is hand-rolled to match the painting's palette.

---

## Project structure

```
src/
  main.jsx              # React entry point, mounts <App> into #root
  App.jsx               # Top-level component, owns the dark/light theme state
  theme.js              # Color tokens (MN_DARK / MN_LIGHT) + grain background
  index.css             # Global resets + responsive media queries

  components/
    Header.jsx          # Logo, nav, "taking work" pill, theme toggle
    Hero.jsx            # Fullbleed sunset painting + caption
    Archive.jsx         # Section §I — the gallery grid
    Commission.jsx      # Section §II — tier cards, status board, terms, CTAs
    Footer.jsx          # "Let's make something luminous" + links
    ThemeToggle.jsx     # Moon/sun button

  data/
    works.js            # List of paintings shown in the archive
    tiers.js            # Commission tier definitions (price, description, sample)
    status.js           # Slot counts, contact email, social links

public/
  assets/               # Source PNGs + generated WebP variants (served as /assets/*)
  favicon.svg

scripts/
  optimize-images.mjs   # Run via `npm run images`

_originals/             # My uncompressed source PNGs — gitignored
```

---

## Scripts

| Command           | What it does |
|-------------------|--------------|
| `npm run dev`     | Start Vite dev server with hot reload at `localhost:5173`. |
| `npm run build`   | Production bundle into `dist/`. |
| `npm run preview` | Serve the built `dist/` locally to test the production output. |
| `npm run images`  | Regenerate WebP variants from PNGs in `public/assets/`. Produces a full-size and a `@mobile` version of each. |

---

## How to update content

You should be able to update most of the site without touching component code. The three data files own everything mutable:

### Add a new painting

1. Drop the PNG into `public/assets/` (e.g. `kelma-04-river.png`).
2. Run `npm run images` to generate the WebP variants.
3. Open `src/data/works.js` and add an entry:

   ```js
   {
     n: '004',
     title: 'River, evening',
     year: 2026,
     img: '/assets/kelma-04-river',   // no extension — components add .webp
     span: { cols: 'span 3', rows: 'span 4' },  // desktop grid placement
   }
   ```

   `span` controls how the tile sits in the 6-column desktop grid. On mobile each tile takes the full row regardless.

### Change commission status

Edit `src/data/status.js`:

```js
export const status = {
  open: 2,         // slots currently open
  slots: 4,        // total slots per month
  waitlist: 1,
  waitlistMax: 2,
  takingWork: true, // flips the green pulse in the header
  // ...
};
```

### Update email / socials

Same file — `contact`, `socials`, `galleries`, `shop` arrays.

### Change a tier's price or description

`src/data/tiers.js` — each tier has price, description, included items, sample image, and turnaround time in one place.

---

## How the theme toggle works

The dark/light state lives in `App.jsx`:

```js
const [isDark, setIsDark] = useState(true);
const mn = isDark ? MN_DARK : MN_LIGHT;
```

`mn` is a plain object of CSS color strings (`mn.bg`, `mn.ink`, `mn.accent`, etc.) passed down to every component. Components read those values in their inline `style` props. Flipping `isDark` re-renders everything with the other palette — no CSS classes, no `:root` variables.

This is why most styling is inline rather than in a CSS file. It's the simplest way to make every color theme-reactive.

---

## How responsiveness works

Two techniques:

1. **`clamp(min, fluid, max)` in inline styles.** Used for font sizes and horizontal padding:

   ```js
   fontSize: 'clamp(56px, 11vw, 144px)'
   ```

   The text smoothly scales between 56px (phone) and 144px (large desktop) with no breakpoints.

2. **CSS class overrides in `src/index.css`.** Used for layout swaps that `clamp` can't do — like turning a 3-column grid into a 1-column stack. Components have `className="k-tier-row"` (or similar) on the affected wrappers; the CSS reassigns `grid-template-columns` at `max-width: 720px` with `!important` (needed because inline styles otherwise win the cascade).

---

## Image pipeline

Browser-friendly WebP files are too small in size to serve as 6 MB PNGs. The script (`scripts/optimize-images.mjs`) reads each PNG and writes two WebP siblings:

- `kelma-XX.webp` — full quality, max 2400px wide
- `kelma-XX@mobile.webp` — smaller, max 900px wide

Components use a `<picture>` element so the browser picks the right one based on viewport:

```html
<picture>
  <source srcset="/assets/kelma-02-sunset@mobile.webp" media="(max-width: 720px)" type="image/webp" />
  <source srcset="/assets/kelma-02-sunset.webp" type="image/webp" />
  <img src="/assets/kelma-02-sunset.png" alt="" />
</picture>
```

The `.png` is the universal fallback for browsers that don't support WebP (very rare in 2026, mostly there for social media link previews).

---

## Deploying (when I'm ready)

Not set up yet. The plan is Vercel:

1. Push this repo to GitHub.
2. Import the repo on vercel.com — Vercel auto-detects Vite.
3. (Optional) Add a custom domain.

Build command and output directory are the Vite defaults, so no config file needed.

---

## Things I learned building this

- Inline styles + a `mn` object passed as a prop is a clean pattern for theming in React when you don't want CSS-in-JS libraries.
- `clamp()` is incredibly powerful for fluid typography — saves you from writing 4 breakpoints worth of font sizes.
- The browser's `<picture>` element does the heavy lifting for responsive images — no JS, no resize listeners.
- Splitting a long single-file component into smaller ones (`midnight.jsx` → `src/components/*`) makes it way easier to find things and avoid duplicating data.
- Vite + React with no build configuration is the gentlest way into modern frontend.

