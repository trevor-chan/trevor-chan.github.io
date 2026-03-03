# Trevor Chan — Portfolio

Personal portfolio site built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions.

## Commands

Run from the repo root:

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm run dev`     | Start local dev server at localhost:4321  |
| `npm run build`   | Build production site to `./dist/`        |
| `npm run preview` | Preview the production build locally      |

---

## Adding a New Project

Each project lives in its own directory under `src/content/projects/`. The work page and project routes are auto-generated — no other files need to change.

### 1. Create the project directory

Copy one of the template directories as a starting point:

```
src/content/projects/_template-text/    ← text + interspersed images layout
src/content/projects/_template-gallery/ ← description + auto image grid layout
```

Rename the copy to your project slug (e.g. `my-project`). The directory name becomes the URL: `/projects/my-project`.

### 2. Edit the frontmatter in `index.mdx`

```yaml
---
priority: 80                         # higher = shown earlier on work page
name: "My Project"                   # display name
categories: ["research", "design"]   # any of: research, software, hardware, design
thumbnails:                          # images shown on hover in the work page row
  - "./image-01.jpg"                 # path relative to this file
  - "./image-02.png"
captions:                            # optional per-thumbnail captions (HTML supported)
  - "First image caption with <b>bold</b> text"
  - ""
imageScales:                         # optional per-thumbnail scale (0 = full width, 0-1 = scaled)
  - 0
  - 0.6
videoThumbnails:                     # short silent video clips shown in the work page row
  - "/projects/my-project/clip.mp4"  # public path (see "Adding video thumbnails" below)
videoPositions: [0]                  # place first video after the 1st image (optional)
template: "text"                     # "text" or "gallery"
draft: false                         # true = excluded from work page, page still accessible
---
```

> **Note:** `layout` is a reserved MDX frontmatter key — always use `template` instead.

### 3. Add images

Place image files (`.jpg`, `.png`, `.jpeg`) in the project directory alongside `index.mdx`. Astro optimizes them at build time — no manual resizing needed. List each one under `thumbnails:` in the frontmatter.

**To skip optimization** (e.g. for animated GIFs that exceed Sharp's pixel limit), place the file in `public/projects/<slug>/` instead and reference it with a plain `<img>` tag in the MDX body rather than in `thumbnails:`.

**PDFs** are not supported by Sharp — convert to PNG/JPG before adding as thumbnails.

### 4. Write the content

- **`text` template:** Write freely in MDX — headings, paragraphs, and inline images are all supported. Captions support inline HTML (`<b>`, `<i>`, `<sub>`, etc.) and are rendered via `set:html`.
- **`gallery` template:** The MDX body is for the description only. Images listed under `thumbnails:` are auto-laid-out in a 2-column grid below.

---

## Adding Videos to a Project Page

For inline video on the project page, store the file in `public/projects/<slug>/` and embed it in the MDX body:

```mdx
<video autoplay muted loop playsinline>
  <source src="/projects/my-project/clip.mp4" type="video/mp4" />
</video>
```

---

## Adding Video Thumbnails (Work Page)

Short looping clips can be shown in the work page row alongside static thumbnails. Store the `.mp4` in `public/projects/<slug>/` and list the public path under `videoThumbnails:` in the frontmatter:

```yaml
videoThumbnails:
  - "/projects/my-project/clip.mp4"
```

To control where videos appear relative to images, use `videoPositions:`:

```yaml
videoPositions: [2]   # places the first video after the 3rd image (0-indexed)
```

The clip will autoplay muted and loop in the row. Keep clips short (2–5 seconds) for a smooth experience.

---

## Priority-Based Indexing

Projects are ordered on the work page by their `priority` field (highest first). The display index ("00", "01", etc.) is computed automatically at build time. To reorder projects, simply change their `priority` values — no manual index management needed.

---

## Project Directory Structure

```
src/
├── content/
│   ├── config.ts                    — collection schema (edit to change frontmatter fields)
│   └── projects/
│       ├── _template-text/          — text layout template (draft: true)
│       ├── _template-gallery/       — gallery layout template (draft: true)
│       └── <slug>/
│           ├── index.mdx            — frontmatter + prose content
│           └── *.jpg / *.png        — co-located images (Astro-optimized)
├── layouts/
│   ├── BaseLayout.astro             — HTML shell, global CSS, CSS custom properties
│   ├── ProjectLayoutText.astro      — text + image project page layout
│   └── ProjectLayoutGallery.astro   — description + auto image grid layout
├── components/
│   └── Nav.astro                    — fixed header
└── pages/
    ├── index.astro                  — work page (getCollection + Image)
    ├── about.astro                  — about page
    └── projects/[...slug].astro     — dynamic project routes
public/
├── TrevorChanHeadshot.jpg
├── TrevorChanCV.pdf
└── projects/<slug>/                 — video clips and large GIFs go here
.github/
└── workflows/deploy.yml             — GitHub Actions workflow for Pages deployment
```

## CSS Custom Properties

Defined in `BaseLayout.astro` and available site-wide:

| Property          | Value     | Purpose                              |
| :---------------- | :-------- | :----------------------------------- |
| `--color-bg`      | `#ffffff` | Page background                      |
| `--color-text`    | `#0d0d0d` | Primary text                         |
| `--color-line`    | `#b8b8b8` | Row separators and borders           |
| `--row-height`    | `240px`   | Work page row height                 |
| `--col-left`      | `220px`   | Fixed-width index + name column      |
| `--gap`           | `0px`     | Gap between thumbnail images         |
| `--page-pad`      | `40px`    | Horizontal page padding              |
| `--nav-height`    | `44px`    | Nav bar height                       |
| `--nav-gap`       | `36px`    | Gap between nav and secondary header |
| `--nav-total`     | computed  | `nav-height + nav-gap`               |
| `--filter-height` | `36px`    | Filter bar / project header height   |

## Deployment

Deployed via GitHub Actions using `withastro/action@v5`. In the GitHub repo settings, set Pages source to **GitHub Actions** (not branch-based). A `.nojekyll` file is included to prevent Jekyll processing.
