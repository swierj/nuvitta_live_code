# NuVitta code review and rebuild plan

Reviewed October 7, 2026. Repository: https://github.com/swierj/nuvitta_live_code

Snapshot: `main`, commit `7bb7513e044dda343e4af1c9d8b1ec6c00e419b0` (March 6, 2025).

This review covers the React application, styling, Express server, package manifests, deployment configuration, and the separately hosted catalog referenced by the application. The actual local checkout was confirmed clean at the same commit as the earlier review copy. An existing-dependency frontend build was attempted; its outcome is recorded below. No dependencies were installed, no payment requests were made, and no source code, commits, branches, or remotes were changed. Current hosting and Stripe dashboard configuration remain unverified. This is a source and build review, not a browser visual or live-payment audit.

Actual repository: `C:\Users\Jacob\OneDrive\NewVitta\nuvitta_live_code`.

The NuVitta project now uses the actual checkout as its primary folder. This existing chat retains its original working directory, so commands explicitly target the checkout. This report is stored in the repository at `docs/nuvitta-review-and-rebuild-plan.md`.

## Recommendation

Build a fresh implementation on a modernization branch of the existing Git repository, retaining React, routing, Express, and Stripe Checkout. Preserve the category/card/detail/bundle architecture and selectively reuse sound components and optimized assets. Start with three example products and one bundle; the full historical catalog is optional because the owner is rewriting content. PostgreSQL, a private product editor, image uploads, and paid-order persistence are part of the new requirements. The server currently provides a payment integration, but not a complete order-management backend.

## Assessment of the original work

The original component boundaries are sensible: cards, product details, catalog filters, cart, navigation, and checkout are separated. Context and reducers are a reasonable solution at this scale; replacing them with a global state library is not inherently necessary. Integer-cent pricing and use of Stripe's embedded UI are useful foundations.

The main maintenance issue is inconsistent ownership. Server rules live in the cart, catalog data lives in a separate repository, and deployment instructions describe several different hosting models. Some components are unfinished or obsolete, and defensive handling is missing on important routes. These explain why selectively rebuilding is preferable to copying every file and updating package versions.

## Current folder and development setup

`client/` and `server/` are a sensible split and can remain. The root package should orchestrate the two applications, not declare a third conflicting set of application dependencies.

- Root has no project scripts and duplicates frontend/backend dependencies.
- Client is named `server` in its package metadata; give the packages distinct names.
- Client `dev` invokes `concurrently`, which is not declared there, and references a nonexistent client `devStart` script. Define one dependable development command at the root.
- Backend hardcodes port 5000; the new server should use the host-provided port with a local fallback.
- Client proxy routes local requests to port 5000, while the production plan must explicitly route the API.
- Client `.htaccess` targets Apache. It is not the route-fallback configuration Render needs.
- GitHub Pages scripts and the domain homepage setting should be replaced with the chosen Render deployment configuration.
- README installation instructions do not reproduce the project; rewrite them around locked installs, required runtime, environment variables, database setup, development, build, and deployment.
- Dependency folders already exist locally, so a successful build using them would not establish that a fresh locked install works.
- No repository-specific AGENTS.md was found in the listed project files. Add concise working instructions when development starts.
- The checkout is under OneDrive. A conventional development directory outside sync is preferable for dependencies and generated build files; relocate only after the owner agrees to a concrete path.

## Baseline build

The existing `client` build passed using its already-installed dependencies, with unused-code and accessibility warnings. Generated JavaScript was approximately 102.51 kB gzipped; this excludes the large images. The toolchain also reported an outdated browser compatibility dataset and an undeclared Babel plugin dependency in Create React App. No workaround packages were installed. Build output was written to the ignored `client/build/` folder. This is not a clean-install verification and does not prove correct browser or checkout behavior.

## Existing implementation

- React 18 with Create React App / react-scripts 5.
- React Router 6 for home, catalog, product, about, contact, cart, checkout, and checkout return pages.
- styled-components 5 in the client; a conflicting version 6 declaration exists at the repository root.
- React Context and reducers for catalog, filtering, cart, and mobile navigation.
- Cart persistence in localStorage.
- Product data and product images referenced from a separate GitHub Pages repository, `swierj/nuvitta_api_test`.
- The linked catalog contains 31 entries: 27 individual products and 4 bundles.
- Express 4 with two Stripe endpoints: create checkout session and retrieve session status.
- Embedded Stripe Checkout using a test publishable key.
- A HeroTofu contact form endpoint.

## Launch-critical findings

1. **A Stripe test secret is tracked in the public repository.** `server/.env` contains a populated `sk_test_` secret. Rotate it in Stripe, remove the environment file from tracking, add environment files to gitignore, and retain an example containing variable names only. Removing the current file does not remove copies in Git history. Do not copy the existing key into the refreshed project.
2. **The browser controls the charged prices and shipping.** `server/server.js:28` uses `item.price`; line 40 uses the posted shipping amount. A caller can submit altered values. Accept product IDs and quantities, validate them, and resolve prices and shipping from trusted server-side configuration. Validate bundle and stock availability as well.
3. **No reliable paid-order workflow exists in this repo.** There is no webhook handler, order persistence, inventory tracking, or fulfillment workflow. Add signature-verified Stripe webhooks and an idempotent paid-order process so retries do not duplicate orders or stock deductions. Confirm payment status before fulfillment; support delayed-payment outcomes if those methods are enabled.
4. **The return page clears the cart before confirming completion.** `client/src/pages/ReturnPage.js:25` clears it after any parsed session response, including an open session. Preserve the cart until the appropriate success condition and show recoverable errors.
5. **Direct product-page loads can crash.** `client/src/pages/SingleProductPage.js:47` indexes `products[id - 1]` and then reads `product.bundle`, while guarding unrelated single-product loading flags. On refresh the catalog is initially empty. Resolve by actual ID, use catalog loading/error state, and handle missing IDs.
6. **Tax messaging does not match the server configuration.** The cart says tax is calculated at checkout, but the session creation code contains neither automatic tax nor tax-rate configuration. Verify the intended tax setup and implement it before relying on that message.
7. **Checkout and status failures lack handling.** The server has no explicit async error handling or request validation; `customer_details.email` is accessed without a null guard. Client checkout failures can leave a blank view. Add validation, controlled errors, and retry guidance.

Stripe's fulfillment documentation: https://docs.stripe.com/checkout/fulfillment

## Storefront and maintenance findings

- Free-shipping copy says $100+, but `CartContext.js:83` uses `> 10000`, charging shipping at exactly $100. Put the rule on the server and share consistent display behavior.
- Add-to-cart permits zero quantities; cart increments have no upper bound. `CartItem` dispatches removal during rendering. Enforce valid quantities in reducer/actions and on the server.
- localStorage JSON is parsed without error handling or shape validation. Old or malformed cart data can prevent startup; stored prices can become stale.
- Search lowercases product names but does not lowercase the query, so uppercase queries can fail unexpectedly.
- The linked catalog repeats Stripe price IDs across different products. The existing server ignores those IDs; do not switch to using them without validating or rebuilding the mappings.
- Bundle detail components show only a title/rating and a reviews heading, despite richer bundle data in the catalog.
- Product gallery and magnification functionality are commented out. The main image state also needs to update when navigating to a different product in the same component.
- Reviews are static catalog data. There is no submission, moderation, or verified-purchase workflow in this repository.
- The home page imports `BundleImg`, which the components index does not export. The installed-dependency build passed and reported this import as unused; it is cleanup, not a demonstrated build blocker.
- An unused `CheckoutButton` lacks the useState import and recursively renders itself. Remove obsolete checkout code.
- Root/client/server dependency declarations overlap and disagree. Client includes backend packages and a dev script referencing absent tools/scripts. Consolidate scripts and dependency ownership.
- The client has GitHub Pages deployment scripts, while checkout expects same-origin Express endpoints. The committed server environment serves `../client` rather than a production build and points returns to localhost. Define one coherent production deployment, including browser-route fallback and API routing.
- No checked-in application tests or CI configuration were found. Prioritize checkout validation, webhook retry behavior, product deep links, cart persistence, and shipping thresholds when adding verification.

## Experience and content

- The homepage renders a roughly 16 MB bundle image. Total source assets are roughly 248 MB, including many design variants; that total is not the page download size. Compress actually rendered assets and provide appropriately sized formats.
- Cart layout uses two columns and an 8rem gap without a mobile adjustment; product details use seven tabs with 4rem gaps. Review these layouts at phone widths.
- Several icon-only controls lack accessible labels. Mobile navigation lacks explicit focus management and Escape handling; contact inputs rely on placeholders rather than labels.
- The HTML description and app manifest retain Create React App defaults. Add product-specific metadata, share previews, and product structured data; decide whether catalog pages need prerendering or server rendering.
- Homepage mission/vision/background sections contain placeholder text. The return/refund policy is only a heading. The contact email link points to `munuvitta.com` while its text says `mynuvitta.com`.
- Preserve the founder story, ingredients, usage guidance, skin-type information, and routine bundles. Make these easier to discover and keep product copy consistent with current formulations and approved brand descriptions.

## Rebuilding inside this repository

Use a branch such as `modernization`; keep `main` as the original reference until the new app is ready. The old implementation is already preserved at commit `7bb7513e044dda343e4af1c9d8b1ec6c00e419b0`. Optionally give that commit a local reference tag for convenience. Do not rewrite history or force-push it as part of the rebuild. The exposed test key must be revoked independently of how the old code is preserved.

Replace the existing `client/` and `server/` progressively on the branch. Review old files through Git or a separate reference checkout. Avoid an actively built `legacy/` directory containing all the old dependencies and images. A second GitHub repository is unnecessary unless the owner wants the old prototype maintained independently.

Suggested final organization:

```text
nuvitta_live_code/
  client/
    src/
      components/       # shared interface pieces
      features/
        catalog/        # cards, categories, search, detail pages
        cart/
        checkout/
        admin/          # private product and order interfaces
      pages/            # home, about, contact
      lib/              # API calls and small helpers
      styles/
    public/
    package.json
  server/
    src/
      routes/           # public catalog, admin, checkout, Stripe webhook
      services/         # pricing, orders, storage, identity
      middleware/      # permissions, validation, errors
      db/
    migrations/
    seeds/              # three products plus one bundle
    .env.example        # names and safe examples only
    package.json
  docs/
  AGENTS.md
  .gitignore
  package.json          # shared development/build scripts
  package-lock.json     # one lockfile if npm workspaces are adopted
```

This is a target structure, not a requirement to create empty folders in advance. Keep the first implementation small. If we adopt npm workspaces, migrate the old nested lockfiles deliberately; do not mix workspace and independent-install models.

## Data and operations design

- Stable product IDs and URL slugs, independent of catalog ordering.
- Categories as managed records; preserve current categories as examples, not immutable business rules.
- Product fields for name, price in cents, description, size, ingredients, directions, skin-type tags, publication status, and media references.
- Bundles reference products and quantities, with explicit bundle pricing. Preserve which items were purchased in the order.
- Orders and order items retain purchased names, quantities, prices, and relevant shipping/tax details even when products are later edited or archived.
- Archive products from sale rather than removing records required by historical orders.
- Store uploaded images in object storage, not Render's temporary local filesystem.
- Define whether stock must be enforced before implementing reservations or deductions; avoid assuming a payment alone guarantees inventory availability.
- A protected product editor supplies drafts, publish/archive, photo upload, category selection, and clear validation. A database provider's console is not the intended interface for the owner's mom.
- Cloudflare Access is an optional additional gate for the admin hostname; the server must still enforce admin permissions and prevent access through the direct hosting address. Protect management API routes too. Keep storefront and Stripe webhook routes outside the interactive admin gate.

## Suggested implementation sequence

1. Attach the correct repo as primary, revoke the old test key, and start the modernization branch. Record the baseline and implementation decisions.
2. Establish clean React/Vite and Express applications with reliable scripts and safe example environment files. Verify a fresh install and build. React migration guidance: https://react.dev/blog/2025/02/14/sunsetting-create-react-app
3. Define the catalog model and build one complete example product path: listing, category filter, direct detail URL, and cart. Add the other examples and a bundle. Set the rendering approach before making search-indexing promises; Vite alone does not generate product HTML per route.
4. Add PostgreSQL persistence, media storage, admin identity and permissions, and a working product editor. Confirm that publishing and archiving update the public store correctly.
5. Implement server-authoritative checkout and verified, idempotent payment-to-order handling. Verify altered-price requests, invalid quantities, duplicate webhook delivery, failed/open sessions, and successful orders in Stripe test mode.
6. Complete the mobile design, content, galleries, bundle details, accessibility, image optimization, and search/share metadata. Validate in a browser; source inspection alone cannot establish visual quality.
7. Prepare Render staging, backups, environment separation, checkout error monitoring, domain routing, and admin gate. Launch only after end-to-end verification with the intended Stripe account and fulfillment workflow.

The first deliverable should be a running storefront foundation with a small sample catalog, a predictable folder setup, and explicit boundaries for the forthcoming database and checkout. Do not copy historical credentials, browser-controlled payment rules, or static review data into the new production system by default.
