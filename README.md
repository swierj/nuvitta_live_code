# NuVitta storefront rebuild

React 18 + Vite storefront and Express catalog API. The first milestone includes 27 original products and four original bundles, category/search filtering, direct product links, and a browser-persisted cart. Original catalog prices and copy are restored; checkout is unavailable.

## Run locally

Node.js 20.11 or later is required. From the repository root:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. The API runs on port 5000; Vite proxies `/api` to it. No credentials or database are required. Stop both processes with Ctrl+C.

```sh
npm test
npm run build
npm start
```

After building, `npm start` serves the storefront and API together at http://localhost:5000. `PORT` overrides the production server port. Development uses port 5000 for the API.

## Working structure

- `client/src/main.jsx` and `Storefront.jsx`: new application and route composition.
- `client/src/components/Store*.jsx`: new navigation and product cards.
- `client/src/features/cart/`: validated preview cart; stores only IDs and quantities.
- `client/src/styles/storefront.css`: botanical green and warm cream design.
- `client/public/images/`: optimized existing brand photography.
- `shared/catalog.json`: imported original catalog served by the API.
- `server/src/`: new catalog API, health endpoint, production route fallback.

The original source remains as a reference and is not imported by the new entry point. The old server and its environment file are not loaded. The previously exposed Stripe test secret still needs rotation; removing it from this rebuild cannot revoke the historical key.

One root lockfile covers both npm workspaces. Next milestones: confirm design and product copy, replace sample photos, add PostgreSQL and private catalog management, then implement server-priced Stripe checkout and verified order persistence. Vite does not prerender product pages; search indexing and hosting configuration remain future work.

To regenerate compressed assets, run `scripts/optimize-assets.py` with Python and Pillow. This is optional for development; optimized images are checked in.

## First preview validation (October 7, 2026)

- Dependency installation completed; all four API/cart tests passed.
- Vite production build passed: about 59 kB gzipped JavaScript and 3 kB gzipped CSS.
- Browser checks passed for uppercase catalog search, bundle category filtering, adding two items, subtotal calculation, removal, cart persistence after refresh, and direct product/bundle refreshes.
- Reviewed homepage and bundle detail at 390 px phone width; mobile navigation opens and closes on navigation.
- Verified the built site resolves a direct product URL through the Express route fallback.
- Preview available on port 5173 while `npm run dev` is running. See `docs/storefront-preview.jpg` for the first homepage pass.
- In this Codex Windows session, installation, local HTTP checks, and Vite file resolution required approved execution outside the sandbox. Normal local terminal usage does not use that sandbox.
