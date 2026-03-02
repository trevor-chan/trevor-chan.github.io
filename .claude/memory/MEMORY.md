# Portfolio Site Memory

## Stack
- **Framework**: Astro 5 + @astrojs/mdx
- **Node**: v25 via Homebrew (`/opt/homebrew/bin/npm`)
- **Deploy target**: GitHub Pages (trevor-chan.github.io)
- **Font**: Inter (Google Fonts)

## Key Commands
- Dev server: `npm run dev` (localhost:4321)
- Build: `npm run build`

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
└── projects/<slug>/                — video clips (.mp4) go here
```

## Content Collection Schema
Fields: `index`, `name`, `categories`, `thumbnails` (image[]), `videoThumbnails` (string[])
- `template`: 'text' | 'gallery' — **NOTE: 'layout' is reserved by MDX, always use 'template'**
- `draft`: boolean — true excludes from work page; page is still built and accessible

## Adding a New Project
1. Copy `_template-text/` or `_template-gallery/` into a new folder (e.g. `my-project/`)
2. Edit `index.mdx` frontmatter: set index, name, categories, draft: false
3. Add images to the folder and list them under `thumbnails:`
4. For videos: put clip in `public/projects/my-project/`, add path to `videoThumbnails:`
5. The work page auto-discovers it — no other files need to change

## Dynamic Routes
- Slug derived from directory name: `entry.id.split('/')[0]`
- URL: `/projects/<slug>`
- Templates accessible at `/projects/_template-text` etc.

## CSS Custom Properties (BaseLayout)
- `--font`, `--color-bg: #fff`, `--color-text: #0d0d0d`, `--color-line: #b8b8b8`
- `--row-height: 240px`, `--col-left: 220px`, `--gap: 12px`, `--page-pad: 40px`
- `--nav-height: 44px`, `--filter-height: 36px`

## Work Page Design
- Filter bar: WORK (all) / RESEARCH / SOFTWARE / HARDWARE / DESIGN
- Each row: 220px fixed left col (index + name), flex image area right
- Images fade in 0.2s on hover, fade out 1s on leave (pure CSS trick with different transition durations)
- Filtering via JS + `data-hidden` data attribute
- Thumbnails optimized by Astro <Image>; target height 216px (row-height - 24px padding)
- Videos in rows: autoplay muted loop playsinline <video> elements

## Design Notes
- Inspiration: 1of1studio.com — minimal grid, white bg, small clean type
- All text same dark color; underline only for active/selected states
- No hover color changes; underline is sole interactive indicator
