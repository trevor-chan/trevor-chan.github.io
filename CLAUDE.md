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
- **Deploy target:** GitHub Pages (trevor-chan.github.io)
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
├── components/Nav.astro            — sticky header
└── pages/
    ├── index.astro                 — work page (getCollection + Image)
    ├── about.astro                 — about page
    └── projects/[...slug].astro    — dynamic project routes
public/
├── TrevorChanHeadshot.jpg
├── TrevorChanCV.pdf
└── projects/<slug>/                — video clips and large GIFs go here
```

## Content Collection Schema

Defined in `src/content/config.ts`. Fields:

| Field             | Type                                            | Notes                                        |
| :---------------- | :---------------------------------------------- | :------------------------------------------- |
| `index`           | string                                          | Display order, zero-padded (e.g. `"03"`)     |
| `name`            | string                                          | Display name on work page and project header |
| `categories`      | `('research'\|'software'\|'hardware'\|'design')[]` | Used for filter bar                       |
| `thumbnails`      | `image()[]`                                     | Co-located images, Astro-optimized           |
| `videoThumbnails` | `string[]`                                      | Public paths to `.mp4` clips                 |
| `template`        | `'text' \| 'gallery'`                           | **Never use `layout` — reserved by MDX**     |
| `draft`           | boolean                                         | `true` hides from work page; page still built |

## Adding a New Project

1. Copy `_template-text/` or `_template-gallery/` → rename to project slug
2. Edit `index.mdx` frontmatter: set `index`, `name`, `categories`, `draft: false`
3. Add images to the folder and list under `thumbnails:`
4. For videos: put `.mp4` in `public/projects/<slug>/`, add path to `videoThumbnails:`
5. Work page auto-discovers it — no other files change

**GIFs:** If a GIF exceeds Sharp's pixel limit, place it in `public/projects/<slug>/` and embed it inline in MDX with a plain `<img>` tag rather than listing it in `thumbnails:`.

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
--gap: 12px
--page-pad: 40px
--nav-height: 44px
--filter-height: 36px
```

## Work Page Design

- Filter bar: WORK (all) / RESEARCH / SOFTWARE / HARDWARE / DESIGN
- Each row: 220px fixed left col (index + name), flex image area right
- Images fade in 0.2s on hover, fade out 2s on leave (pure CSS: two different `transition` declarations)
- Filtering via JS + `data-hidden` attribute on `.row` elements
- Thumbnails rendered at 2× display height (432px source → 216px display) for retina sharpness
- Videos in rows: `<video autoplay muted loop playsinline>`

## Design Notes

- Inspiration: 1of1studio.com — minimal grid, white background, small clean type
- All text same dark color; underline only for active/selected states
- No hover color changes on rows
- No favicon

## Working with Claude

When building or designing web components, pages, or layouts, use the `frontend-design` skill (via the Skill tool) to ensure high design quality and consistency.
