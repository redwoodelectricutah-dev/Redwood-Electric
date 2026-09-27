# Redwood Electric — company site

Marketing site for **Redwood Electric** (James Hewitt, Utah County). It is separate from the quote configurator.

- Company site: https://redwoodelectricutah-dev.github.io/Redwood-Electric/
- Quote configurator (do not change that repo from here): https://redwoodelectricutah-dev.github.io/Redwood-Electric-Sales/

## Pages

| Page | What it is |
| --- | --- |
| Home | Full-bleed hero, trust line, services, real job photos, link to the configurator, training doorway |
| About | Who runs the shop, how a job goes, service area |
| Portfolio | Filterable gallery of real install photos |
| Services | Electrical, home theater, UniFi/security, data racks, Loxone, basement finishing |
| Contact | Email and a note form that opens the visitor’s mail app |
| Training Portal | Crew entry with empty slots for lessons, photos, video, and quizzes |

The logo file `public/brand/redwood-electric-logo-ORIGINAL.jpg` is the original lockup, byte-for-byte (it is PNG data in a `.jpg` name). Portfolio images are resized copies of the real job photos for page weight — not generated stand-ins.

## Run locally

```bash
npm install
npm run dev
```

Vite serves the site at http://127.0.0.1:43217.

```bash
npm run build
npm run preview
```

The production build uses base path `/Redwood-Electric/` so project Pages resolves assets.

## GitHub Pages

The sales configurator’s live site is served from a `gh-pages` branch (GitHub’s own “pages build and deployment”). A custom Actions workflow exists there too, and those runs have failed, so this repo treats **`gh-pages` as the reliable publish** and keeps `.github/workflows/pages.yml` as the same Actions option the sales repo has.

Project Pages URL, once the public repo exists and Pages is set to the `gh-pages` branch (root):

https://redwoodelectricutah-dev.github.io/Redwood-Electric/

```bash
npm run build
# From a clean checkout of the built files:
git checkout --orphan gh-pages
# copy dist contents to the branch root, commit, push
```

The production build already uses base path `/Redwood-Electric/`.

## Training content

Edit `src/training-content.js`. Each module accepts `lesson`, `photos`, `video`, and `quiz`. Empty fields stay visible as empty slots. There is no login and no grade storage.
