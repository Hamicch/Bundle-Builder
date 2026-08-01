# Bundle Builder

A multi-step bundle builder for a home security system. Shoppers assemble cameras, a plan, sensors, and extras in a four-step accordion while a live review panel keeps totals in sync. Built with React, TypeScript, and Tailwind from [this Figma design](https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=68-8088).

## Getting started

```bash
git clone <this-repo-url>
cd Bundle-Builder
npm install
npm run dev
```

Open http://localhost:5173.

### Scripts

| Command                | What it does                      |
| ----------------------- | ---------------------------------- |
| `npm run dev`           | Start the dev server               |
| `npm test`              | Run the test suite (Vitest + RTL)  |
| `npm run lint`          | Lint with oxlint                   |
| `npm run format:check`  | Verify Prettier formatting         |
| `npm run typecheck`     | Type-check without emitting        |
| `npm run build`         | Type-check and build for production|
| `npm run preview`       | Serve the production build         |

## How it works

- Quantities live in one store, keyed by `productId:variantId`. A product card's stepper and its matching review-panel line write to that same key, so nothing has to actively push updates between the two.
- Every color option keeps a separate count of its own. Adding 2 to White and then switching a card over to Black leaves the stepper reading 0 for Black, while White's 2 units are still sitting untouched in the review panel.
- On load, a saved snapshot from "Save my system for later" (stored in localStorage) is re-validated against the live catalog before anything renders: unrecognized entries get dropped, quantities get clamped, required items get pinned back to their catalog value, and malformed data is ignored outright.
- Nothing about a product is hardcoded into markup. [`src/data/products.json`](src/data/products.json) defines every step, product, variant, plan, and perk, and the components just render whatever's in there, so a new product is a JSON edit, not a new component.
- Totals ($238.81 crossed out down to $187.89, a $50.92 savings line) fall out of the catalog's own default quantities and prices, and tests pin those exact numbers so they can't silently drift.

## Decisions and tradeoffs

- Checkout has nowhere real to go and the Learn More links don't point anywhere, both by design per the brief. The financing line under the totals is fixed catalog copy rather than a calculated quote.
- Gilroy, the typeface in the design, is a commercial font we don't have a license for. DM Sans fills in ahead of a `Gilroy, 'DM Sans'` stack, so real Gilroy files can slot in later with zero code changes.
- Product photography comes from Wyze's own public storefront. The Figma file is view-only, so nothing could be exported directly from it.
- Frame 1735 is the desktop layout. A second, wider frame (1736) covers the 768 to 1024px range, where the review section relocates beneath the builder and splits into a two-column layout of its own (seal and returns copy on one side, totals and checkout on the other). Anything narrower than that collapses to one column.
- Two conflicting unit prices show up for the Wyze Cam Pan v3, one on its card, one implied by the review line's math. The review line was trusted, since its total is independently checkable against the grand total shown lower in the same panel.
- Only the cameras step ever appears expanded across the design frames we had, so there was no layout reference for steps 2 through 4. They borrow the cameras step's card shape; the plan step swaps in single-select behavior since picking a plan isn't the same as counting units of it.
- Color options render as small solid swatches rather than a cropped product photo, matching the brief's description of a "swatch/thumbnail" more literally.
- Camera/shield/sensor/grid icons come from Lucide rather than hand-matched artwork. They're close enough at this size to the design's icons, and pulling from one bundled set avoids maintaining one-off SVGs for four small glyphs.
- Neither the optional `/api/products` endpoint nor a Docker setup ships with the base app. The brief treats both as bonus, not required, so they're deferred rather than built up front.
