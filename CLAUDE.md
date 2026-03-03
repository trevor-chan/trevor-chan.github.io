# Trevor Chan — Personal Portfolio Website

## About

Personal portfolio site for Trevor Chan, a researcher with experience across:
- Medical imaging and AI
- Robotics and simulation
- Mechanical engineering
- Biological research
- Architecture and design

## Site Structure

Two main pages plus per-project pages:

1. **Work** (`/`) — full-width list of project rows with hover-reveal thumbnails and category filter
2. **About** (`/about`) — short bio, photo, and contact links
3. **Project pages** (`/projects/<slug>`) — one per project directory, auto-generated

## Tech Stack

- **Framework:** Astro 5 + @astrojs/mdx
- **Node:** v25 via Homebrew (`/opt/homebrew/bin/npm`)
- **Deploy target:** GitHub Pages (trevor-chan.github.io) via GitHub Actions
- **Font:** Inter (Google Fonts)
- **Image optimization:** Astro `<Image>` / Sharp (build-time WebP conversion)

## Key Commands

```
npm run dev      # dev server at localhost:4321
npm run build    # production build to ./dist/
```

## File Structure

```
src/
├── content/
│   ├── config.ts                   — collection schema (single source of truth)
│   └── projects/
│       ├── _template-text/         — text layout template (draft: true)
│       ├── _template-gallery/      — gallery layout template (draft: true)
│       └── <slug>/
│           ├── index.mdx           — frontmatter + prose content
│           └── *.jpg / *.png       — co-located images (Astro-optimized)
├── layouts/
│   ├── BaseLayout.astro            — HTML shell, global CSS, CSS vars
│   ├── ProjectLayoutText.astro     — text+image project page
│   └── ProjectLayoutGallery.astro  — description + auto image grid
├── components/Nav.astro            — fixed header
└── pages/
    ├── index.astro                 — work page (getCollection + Image)
    ├── about.astro                 — about page
    └── projects/[...slug].astro    — dynamic project routes
public/
├── TrevorChanHeadshot.jpg
├── TrevorChanCV.pdf
└── projects/<slug>/                — video clips and large GIFs go here
.github/
└── workflows/deploy.yml            — GitHub Actions workflow for Pages deployment
```

## Content Collection Schema

Defined in `src/content/config.ts`. Fields:

| Field             | Type                                            | Notes                                                       |
| :---------------- | :---------------------------------------------- | :---------------------------------------------------------- |
| `priority`        | number                                          | Higher = shown earlier; display index computed at build time |
| `name`            | string                                          | Display name on work page and project header                |
| `categories`      | `('research'\|'software'\|'hardware'\|'design')[]` | Used for filter bar                                      |
| `thumbnails`      | `image()[]`                                     | Co-located images, Astro-optimized                          |
| `captions`        | `string[]`                                      | Per-thumbnail captions (HTML supported via `set:html`)      |
| `imageScales`     | `number[]`                                      | Per-thumbnail scale factors (0 = full width, 0–1 = scaled)  |
| `videoThumbnails` | `string[]`                                      | Public paths to `.mp4` clips                                |
| `videoPositions`  | `number[]`                                      | Interleave position for each video (index after which it appears) |
| `template`        | `'text' \| 'gallery'`                           | **Never use `layout` — reserved by MDX**                    |
| `draft`           | boolean                                         | `true` hides from work page; page still built               |

## Adding a New Project

1. Copy `_template-text/` or `_template-gallery/` → rename to project slug
2. Edit `index.mdx` frontmatter: set `priority`, `name`, `categories`, `draft: false`
3. Add images to the folder and list under `thumbnails:`
4. Add captions under `captions:` (HTML tags like `<b>`, `<i>`, `<sub>` are supported)
5. For videos: put `.mp4` in `public/projects/<slug>/`, add path to `videoThumbnails:`
6. To interleave videos with images, use `videoPositions:` (e.g. `[2]` places the first video after the 3rd image)
7. Work page auto-discovers it — no other files change

**GIFs:** If a GIF exceeds Sharp's pixel limit, place it in `public/projects/<slug>/` and embed it inline in MDX with a plain `<img>` tag rather than listing it in `thumbnails:`.

**PDFs:** Sharp does not support PDF files. Convert to PNG/JPG before adding as thumbnails.

## Priority-Based Indexing

Projects are sorted by `priority` (descending) on the work page. The display index (e.g. "00", "01") is computed automatically at build time based on sorted position. Higher priority = lower index number = shown first.

## Dynamic Routes

- Slug derived from directory name: `entry.id.split('/')[0]`
- URL pattern: `/projects/<slug>`
- Draft pages still get built and are accessible by URL

## CSS Custom Properties (BaseLayout.astro)

```css
--font: 'Inter', sans-serif
--color-bg: #ffffff
--color-text: #0d0d0d
--color-line: #b8b8b8
--row-height: 240px
--col-left: 220px
--gap: 0px
--page-pad: 40px
--nav-height: 44px
--nav-gap: 36px
--nav-total: calc(var(--nav-height) + var(--nav-gap))
--filter-height: 36px
```

## Work Page Design

- Filter bar: WORK (all) / RESEARCH / SOFTWARE / HARDWARE / DESIGN
- Each row: 220px fixed left col (index + name), flex image area right
- Images default to 10% opacity + grayscale; fade in 0.2s to full color on hover, fade out 1.5s on leave
- Filtering via JS + `data-hidden` attribute on `.row` elements
- Thumbnails rendered at 2× display height (432px source → 216px display) for retina sharpness
- Videos in rows: `<video autoplay muted loop playsinline>`

## Header Layout

- Nav and filter bar use `position: fixed` (not sticky) to prevent scroll jitter
- `--nav-gap` creates an opaque white gap between the nav and filter/project headers
- Nav extends its height to cover the gap: `height: calc(var(--nav-height) + var(--nav-gap))` with `padding-bottom: var(--nav-gap)`

## Design Notes

- Inspiration: 1of1studio.com — minimal grid, white background, small clean type
- All text same dark color; underline only for active/selected states
- No hover color changes on rows
- No favicon
- Captions support inline HTML (rendered via `set:html`); use Unicode for math symbols (∇, α, θ, etc.)

## Deployment

Deployed via GitHub Actions (`.github/workflows/deploy.yml`) using `withastro/action@v5`. In GitHub repo settings, Pages source must be set to "GitHub Actions" (not branch-based).

## Working with Claude

When building or designing web components, pages, or layouts, use the `frontend-design` skill (via the Skill tool) to ensure high design quality and consistency.
