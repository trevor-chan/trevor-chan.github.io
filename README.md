# Trevor Chan — Portfolio

Personal portfolio site built with [Astro](https://astro.build) and deployed to GitHub Pages.

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
index: "21"                          # display order on work page (zero-padded string)
name: "My Project"                   # display name
categories: ["research", "design"]  # any of: research, software, hardware, design
thumbnails:                          # images shown on hover in the work page row
  - "./image-01.jpg"                 # path relative to this file
  - "./image-02.png"
videoThumbnails:                     # short silent video clips shown in the work page row
  - "/projects/my-project/clip.mp4"  # public path (see "Adding video thumbnails" below)
template: "text"                     # "text" or "gallery"
draft: false                         # true = excluded from work page, page still accessible
---
```

> **Note:** `layout` is a reserved MDX frontmatter key — always use `template` instead.

### 3. Add images

Place image files (`.jpg`, `.png`, `.jpeg`) in the project directory alongside `index.mdx`. Astro optimizes them at build time — no manual resizing needed. List each one under `thumbnails:` in the frontmatter.

**To skip optimization** (e.g. for animated GIFs that exceed Sharp's pixel limit), place the file in `public/projects/<slug>/` instead and reference it with a plain `<img>` tag in the MDX body rather than in `thumbnails:`.

### 4. Write the content

- **`text` template:** Write freely in MDX — headings, paragraphs, and inline images (`![caption](./image.jpg)`) are all supported.
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

The clip will autoplay muted and loop in the row. Keep clips short (2–5 seconds) for a smooth experience.

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
│   └── Nav.astro                    — sticky header
└── pages/
    ├── index.astro                  — work page (getCollection + Image)
    ├── about.astro                  — about page
    └── projects/[...slug].astro     — dynamic project routes
public/
├── TrevorChanHeadshot.jpg
├── TrevorChanCV.pdf
└── projects/<slug>/                 — video clips and large GIFs go here
```

## CSS Custom Properties

Defined in `BaseLayout.astro` and available site-wide:

| Property          | Value     | Purpose                          |
| :---------------- | :-------- | :------------------------------- |
| `--color-bg`      | `#ffffff` | Page background                  |
| `--color-text`    | `#0d0d0d` | Primary text                     |
| `--color-line`    | `#b8b8b8` | Row separators and borders       |
| `--row-height`    | `240px`   | Work page row height             |
| `--col-left`      | `220px`   | Fixed-width index + name column  |
| `--gap`           | `12px`    | Gap between thumbnail images     |
| `--page-pad`      | `40px`    | Horizontal page padding          |
| `--nav-height`    | `44px`    | Sticky nav height                |
| `--filter-height` | `36px`    | Filter bar height                |
