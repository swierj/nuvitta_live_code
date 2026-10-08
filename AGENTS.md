# NuVitta repository instructions

## Integration workflow

The primary integration checkout is `C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code`, on branch `codex/nuvitta-rebuild`. The original checkout at `C:/Users/Jacob/OneDrive/NewVitta/nuvitta_live_code` remains on `main`. Combine and validate rebuild work in the integration branch before any separately authorized release or deployment.

### Integration authority and contributor boundaries

Only the agent operating in the designated integration checkout above (the owner's `worktree-main` chat) is authorized by this workflow to accept feature branches, merge changes into `codex/nuvitta-rebuild`, or push that integration branch. Determine the role from the actual checkout path and branch, not the chat title. Other worktrees are contributors. They may merge the integration branch into their own feature branch to sync, but must not merge their feature work into the integration branch, perform an integration merge from another checkout, write into the integration checkout, or push to `codex/nuvitta-rebuild` or `main`. Do not use force pushes, branch deletion, or broad push commands such as `git push --all` or `git push --mirror` in this workflow.

Contributors must verify their current branch and push destination before pushing. Push explicitly with `git push -u origin HEAD:refs/heads/codex/<task>`, replacing `<task>` with their own feature branch name and confirming it is not `nuvitta-rebuild`. Hand off that branch name and the exact commit SHA. The integration agent fetches the specified feature branch from `origin`, verifies its commit and diff, and validates the combined candidate before acceptance. Check AGENTS.md changes explicitly during review; preserve the current integration policy and do not accept stale instructions that remove or weaken it unintentionally. Stop and report an unexpected remote integration-branch change rather than overwriting it or incorporating it without review.

These are agent instructions, not Git access controls. A direct push to the integration branch can change it without a merge. Enforcement requires repository-side restrictions; a worktree identity does not create a separate GitHub identity or permission boundary.

Before handing changes off to the integration checkout (`codex/nuvitta-rebuild`), sync your feature branch with `origin/codex/nuvitta-rebuild`. Run the full `npm test` suite, `npm run build`, and checks relevant to your changes. If validation passes, commit and push your own `codex/<task>` branch to `origin`. Report the branch name, commit SHA, scope, and validation results to the owner for handoff to the integration chat. Do not copy files into the integration checkout or push directly to `codex/nuvitta-rebuild` or `main`. If validation cannot finish, report the blocker and incomplete checks.

Contributing branches should start from the latest integration branch. Preserve unfinished changes before syncing: commit them on the feature branch first, then merge the integration branch. Git commits are shared locally across worktrees, so an integration merge can use the local feature branch without a network fetch. For remotely pushed work, fetch the named branch before reviewing it.

Before handing off, run `npm test` and require all five current regression tests to pass: catalog API and missing-product responses; imported catalog fidelity and image references; recovery from broken cart storage; invalid/duplicate cart-entry filtering; cart limits and removal. If the suite grows, run the entire suite rather than limiting it to five tests. Also run `npm run build` and verify the behavior affected by the change. Add relevant tests when new behavior warrants them; do not manufacture tests merely to meet a count. Include the branch, commit SHA, scope, and validation results in the handoff.

Integration uses three additional validation gates on the combined candidate: (1) the complete `npm test` suite, (2) `npm run build`, and (3) browser smoke checks of the catalog, a product detail page, and add/update/remove cart behavior, including the incoming feature. Review the diff and resolve conflicts deliberately. Accept and merge the complete proposed change only when it is within the requested scope and all gates pass; otherwise fix and revalidate or report the specific blocker. Never discard unrelated local edits to make a merge succeed. Start from a clean, committed integration checkout, validate the merged candidate, and commit the merge only after validation. After acceptance, push `codex/nuvitta-rebuild` to `origin`. The owner has authorized this integration workflow; it does not authorize deployment, merging into `main`, or live payments.

These instructions travel with the repository commit. Existing contributing worktrees must bring in that baseline before starting further work. A Git push does not itself wake this chat: integration runs when this chat is active and given the branch/handoff, or through an explicitly configured automation.

## Final response reporting

After each user-requested task, include in the final response:

- Commands actually run during that task, including inspection, validation, and Git commands. Show the commands in code blocks, identify the working directory when relevant, and briefly report results or failures. Group repeated identical commands and state how many times they ran. Redact credentials and sensitive values; never expose secrets to satisfy this rule.
- Clickable links to every file created or modified during that task, using absolute paths in the current worktree, with a brief description of the change. For deleted files, list their paths and state that they were deleted. Do not claim unrelated existing changes as your own. For large file sets, provide a linked manifest containing every changed file and direct links to the main files. Link generated artifacts and show image previews when useful. If no files changed or no commands ran, say so.
- Validation performed and its outcome, plus commit and push status when applicable. File-editing or browser tool actions are not shell commands; summarize those actions separately when they materially affect the result. Do not invent commands for changes made through tools.

## Instruction discovery in each worktree

Each worktree has its own copy of AGENTS.md; changing this file in one checkout does not update the others. At the start of work, identify the current checkout and branch, read its root AGENTS.md, and check for any applicable nested instructions. After syncing with the integration branch, reread AGENTS.md even in an existing chat. If this file is missing or its integration policy is outdated, preserve local work and bring in the current integration instructions before continuing. Treat the version committed on `codex/nuvitta-rebuild` as the shared policy; do not maintain conflicting local workflow copies. This file describes the contributor role and the integration role: contributors validate and push their feature branch; this integration checkout validates the combined candidate, accepts the merge, and pushes the integration branch.

The active rebuild starts at client/src/main.jsx and server/src/index.cjs. Old source files are reference material and must not be imported into the new application without review.

Use the root npm workspaces and root lockfile. Run npm test and npm run build after functional changes. Keep prices in integer cents. Preview carts store product IDs and quantities only. Product content in shared/catalog.json is imported from shared/original-catalog.json. Preserve original prices and text unless the owner requests changes. Historical review text is not verified-purchase data.

Design direction: botanical green, warm cream, and clean responsive layouts. Reuse existing brand assets where appropriate; keep new delivered imagery optimized.

Do not use historical Stripe keys or browser-posted prices for payments. Database, private product administration, checkout, verified webhooks, and order persistence are upcoming milestones. No deployment or live payments are part of this initial preview.
