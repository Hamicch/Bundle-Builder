# Bundle Builder

[![CI](https://github.com/Hamicch/Bundle-Builder/actions/workflows/ci.yml/badge.svg)](https://github.com/Hamicch/Bundle-Builder/actions/workflows/ci.yml)

A multi-step bundle builder for a home security system. Shoppers assemble cameras, a plan, sensors, and extras in a four-step accordion while a live review panel keeps totals in sync. Built with React, TypeScript, and Tailwind from [this Figma design](https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=68-8088).

## Getting started

```bash
git clone https://github.com/Hamicch/Bundle-Builder.git
cd Bundle-Builder
npm install
```

### 1. Frontend

Runs entirely on its own, no backend required:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 2. Backend (optional)

A small Express server can serve the same catalog over HTTP. The frontend
picks it up automatically when it's reachable and falls back to its local
copy otherwise, so this step can be skipped. In a second terminal:

```bash
npm run server
```

By default the frontend looks for it at `http://localhost:3001`. Copy
`.env.example` to `.env` if you need to point it somewhere else.

### 3. Docker (optional, replaces steps 1 and 2)

`docker compose up` builds and runs the frontend (behind nginx) and the API
as separate containers in one step, with nginx proxying `/api` straight to
the backend container:

```bash
docker compose up
```

Open [http://localhost:8080](http://localhost:8080).

### Scripts

| Command                | What it does                        |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start the frontend dev server       |
| `npm run server`       | Start the bonus API server          |
| `npm test`             | Run the test suite (Vitest + RTL)   |
| `npm run lint`         | Lint with oxlint                    |
| `npm run format:check` | Verify Prettier formatting          |
| `npm run typecheck`    | Type-check without emitting         |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Serve the production build          |

## How it works

- The catalog lives in [`src/data/products.json`](src/data/products.json): steps, products, variants, pricing, plan, and perks. Components render from that data, so adding a product means editing JSON, not JSX.
- A single store (reducer + context) keys every quantity by `productId:variantId`. Card steppers and review-panel steppers read and write the same keys, so they stay in sync without any extra logic.
- Each color variant tracks its own count. Add 2 White, switch the card to Black, and the stepper reads 0 while White keeps its own line in the review panel.
- "Save my system for later" snapshots the state to localStorage. On return, the snapshot is checked against the current catalog (unknown items dropped, quantities clamped, required items pinned, corrupt data ignored) before it hydrates.
- The seeded totals ($238.81 struck through, $187.89 final, $50.92 saved) come from the catalog defaults and are pinned by tests.

## Decisions and tradeoffs

- Checkout has nowhere real to go and the Learn More links don't point anywhere, both by design per the brief. The financing line under the totals is fixed catalog copy rather than a calculated quote.
- Gilroy, the typeface in the design, is a commercial font we don't have a license for. DM Sans fills in ahead of a `Gilroy, 'DM Sans'` stack, so real Gilroy files can slot in later with zero code changes.
- Frame 1735 is the desktop layout. A second, wider frame (1736) covers the 768 to 1024px range, where the review section relocates beneath the builder and splits into a two-column layout of its own (seal and returns copy on one side, totals and checkout on the other). Anything narrower than that collapses to one column.
- Two conflicting unit prices show up for the Wyze Cam Pan v3, one on its card, one implied by the review line's math. The review line was trusted, since its total is independently checkable against the grand total shown lower in the same panel.
- Only the cameras step ever appears expanded across the design frames we had, so there was no layout reference for steps 2 through 4. They borrow the cameras step's card shape; the plan step swaps in single-select behavior since picking a plan isn't the same as counting units of it.
- Color options render as small solid swatches rather than a cropped product photo, matching the brief's description of a swatch/thumbnail more literally.
- Camera/shield/sensor/grid icons come from Lucide rather than hand-matched artwork. They're close enough at this size to the design's icons, and pulling from one bundled set avoids maintaining one-off SVGs for four small glyphs.
- The bonus API is a genuinely separate Node/Express service rather than a platform-specific function, so it deploys anywhere and isn't tied to how the frontend is hosted. It's optional by design: the frontend never depends on it being up, it just upgrades to live data when it is.
