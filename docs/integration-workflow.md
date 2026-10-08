# NuVitta integration baseline

Integration checkout: `C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code`

Integration branch: `codex/nuvitta-rebuild`

Remote: `origin` (`https://github.com/swierj/nuvitta_live_code.git`)

## Contributor handoff

Bring the integration baseline into an existing checkout without overwriting uncommitted work. Create a dedicated `codex/<task>` branch based on the integration branch. Run the complete `npm test` suite (currently five tests), production build, and relevant feature checks. Commit and push that feature branch. Hand off its name, exact commit SHA, changes, and results to this chat.

## Integration acceptance

Review the incoming diff from a clean integration checkout. Prepare the combined candidate, then run the full regression suite, production build, and browser smoke checks. If checks pass, commit the merge and push the integration branch. Resolve failures before acceptance. Do not deploy or merge into `main` without separate authorization. Follow AGENTS.md for the full policy.

Pushing does not automatically notify or wake this chat. Provide the branch here when ready for integration. No background polling or automatic GitHub trigger has been configured.

## Baseline validation

- Five existing regression tests passed.
- Production build passed.
- Catalog displayed all 31 products; AHA Facial Toner detail displayed the original content and controls.
- Browser cart check caught a missing MAX_QUANTITY import. Corrected the import and verified add, quantity increase, recalculated subtotal, and removal. Restored the original cart contents after the check.
- The cleaned `_cdx.png` images remain separate copies; website references still use the original photos.

The baseline includes the current storefront rebuild, catalog restoration, product gallery, image copies, and integration instructions, so contributors can branch from a complete runnable version.
