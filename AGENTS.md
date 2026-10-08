# NuVitta repository instructions

## Integration workflow

The primary integration checkout is `C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code`, on branch `codex/nuvitta-rebuild`. The original checkout at `C:/Users/Jacob/OneDrive/NewVitta/nuvitta_live_code` remains on `main`. Combine and validate rebuild work in the integration branch before any separately authorized release or deployment.

Contributing worktrees must use their own `codex/<task>` branch based on the latest integration branch. Commit in the contributing checkout and push that feature branch to `origin`; do not write files directly into the integration checkout or push directly to `codex/nuvitta-rebuild` or `main`. Git commits are shared locally across worktrees, so an integration merge can use the local feature branch without a network fetch. For remotely pushed work, fetch the named branch before reviewing it.

Before handing off, run `npm test` and require all five current regression tests to pass: catalog API and missing-product responses; imported catalog fidelity and image references; recovery from broken cart storage; invalid/duplicate cart-entry filtering; cart limits and removal. If the suite grows, run the entire suite rather than limiting it to five tests. Also run `npm run build` and verify the behavior affected by the change. Add relevant tests when new behavior warrants them; do not manufacture tests merely to meet a count. Include the branch, commit SHA, scope, and validation results in the handoff.

Integration uses three additional validation gates on the combined candidate: (1) the complete `npm test` suite, (2) `npm run build`, and (3) browser smoke checks of the catalog, a product detail page, and add/update/remove cart behavior, including the incoming feature. Review the diff and resolve conflicts deliberately. Accept and merge the complete proposed change only when it is within the requested scope and all gates pass; otherwise fix and revalidate or report the specific blocker. Never discard unrelated local edits to make a merge succeed. Start from a clean, committed integration checkout, validate the merged candidate, and commit the merge only after validation. After acceptance, push `codex/nuvitta-rebuild` to `origin`. The owner has authorized this integration workflow; it does not authorize deployment, merging into `main`, or live payments.

These instructions travel with the repository commit. Existing contributing worktrees must bring in that baseline before starting further work. A Git push does not itself wake this chat: integration runs when this chat is active and given the branch/handoff, or through an explicitly configured automation.

The active rebuild starts at client/src/main.jsx and server/src/index.cjs. Old source files are reference material and must not be imported into the new application without review.

Use the root npm workspaces and root lockfile. Run npm test and npm run build after functional changes. Keep prices in integer cents. Preview carts store product IDs and quantities only. Product content in shared/catalog.json is imported from shared/original-catalog.json. Preserve original prices and text unless the owner requests changes. Historical review text is not verified-purchase data.

Design direction: botanical green, warm cream, and clean responsive layouts. Reuse existing brand assets where appropriate; keep new delivered imagery optimized.

Do not use historical Stripe keys or browser-posted prices for payments. Database, private product administration, checkout, verified webhooks, and order persistence are upcoming milestones. No deployment or live payments are part of this initial preview.
