# Vercel preview setup

The rebuild is configured as one Vite project with one Node function for the existing Express catalog API. Keep the root directory at `./`, install with `npm ci`, build with `npm run build`, and publish `client/dist`. `vercel.json` selects Vite explicitly. API requests are routed before static files; remaining page URLs load the SPA. The app needs no payment keys or database variables for this preview.

## Create the project from the correct checkout

The web import screen currently selects the old `main` branch. Use Vercel CLI linking to create a project without deploying that branch. Run these yourself in PowerShell (these setup commands have NOT been executed by the agent):

```powershell
Set-Location 'C:\Users\Jacob\.codex\worktrees\7c78\nuvitta_live_code'
npx vercel login
npx vercel link
```

During linking, select your intended Vercel team, create a new project named `nuvitaglo-preview` (or link that project if already created), use the current directory `./`, and retain the settings supplied by `vercel.json`. Do not choose multi-service deployment or import the historical apps. `.vercel/` is ignored by Git.

After linking, enable Vercel Authentication in the project's Deployment Protection settings for previews. Project creation does not itself make a protected deployment. Review protection settings before publishing or sharing. To connect automatic Git builds, use the project's Settings → Git to connect `swierj/nuvitta_live_code`, or run `npx vercel git connect https://github.com/swierj/nuvitta_live_code.git`. Keep production tracking `main`; use the rebuild branch for preview deployments. Once account setup and protection are confirmed, a CLI deployment from this checkout (`npx vercel`, without `--prod`) publishes a preview of the rebuild. Alternatively, use Deployments → Create Deployment with `codex/nuvitta-rebuild` after Git is connected. Confirm the selected Git reference before deploying. Share via Vercel's Share function with an authorized shareable link.

The owner has not yet completed Vercel project linking or protection. No hosted deployment was created during this task. Hosting routing and function packaging need verification on the first real preview; local validation does not substitute for that check. For this business project, use an appropriate commercial plan rather than Hobby's personal/noncommercial plan.

References: [CLI linking](https://vercel.com/docs/cli/link), [Git connection](https://vercel.com/docs/cli/git), [branch deployments](https://vercel.com/docs/git), [deployment protection](https://vercel.com/docs/deployment-protection), [Vite hosting](https://vercel.com/docs/frameworks/frontend/vite).

## Validation and command log

All six regression tests passed, including a new test of the exported Vercel handler. Production build passed. A temporary local server used that handler to serve the production build. Browser verified a directly opened product route, catalog, and cart add/increase/remove ($27 → $54 → empty). Temporary tab and server were closed; the owner's localhost:5173 tab and cart were unchanged. No hosted Vercel build was run.

The previously local Makeup Cleansing Oil card correction and its existing screenshot are included in this commit. All edits used the file patch tool. Browser tool saved the production preview screenshot.

Commands actually run during this task, in `C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code`:

```powershell
git status --short
git branch --show-current
Get-Content AGENTS.md
Get-Content server/src/index.cjs
Get-Content client/package.json
rg --files -g '*vercel*' -g AGENTS.md -g '!**/node_modules/**'
Get-Content server/src/app.test.cjs
Get-Content package.json
Get-Content .gitignore
Get-Content server/src/app.cjs
npm test
npm run build
git diff --check
git diff --stat
Get-Content vercel.json
node -e "require('./api/index.js').listen(5101, '127.0.0.1', () => console.log('Vercel entry smoke server: http://127.0.0.1:5101'))"
git fetch origin
git rev-list --left-right --count HEAD...origin/codex/nuvitta-rebuild
git status --short
```

The temporary server was stopped with Ctrl+C through the terminal tool (exit 1 on interruption, expected). Tests and build ran once each. Remote integration matched HEAD before committing. Git acceptance commands and their results are reported in the chat response:

```powershell
git add .gitignore vercel.json api/index.js server/src/app.test.cjs client/src/components/StoreProductCard.jsx docs/makeup-cleansing-oil-card-fix.png docs/vercel-local-build-preview.png docs/vercel-preview-setup.md
git diff --cached --check
git commit -m "Configure Vercel rebuild previews and fix cleansing oil card"
git push origin HEAD:refs/heads/codex/nuvitta-rebuild
git status --short
git log -1 --oneline
git rev-list --left-right --count HEAD...origin/codex/nuvitta-rebuild
```

## Files in this change

- [vercel.json](C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code/vercel.json): build and routing configuration.
- [api/index.js](C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code/api/index.js): Express function entry without a port listener.
- [.gitignore](C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code/.gitignore): ignore local Vercel metadata.
- [server/src/app.test.cjs](C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code/server/src/app.test.cjs): server entry regression coverage.
- [client/src/components/StoreProductCard.jsx](C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code/client/src/components/StoreProductCard.jsx): previously authorized bottle crop fix.
- [docs/makeup-cleansing-oil-card-fix.png](C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code/docs/makeup-cleansing-oil-card-fix.png): existing crop fix preview, committed now.
- [docs/vercel-local-build-preview.png](C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code/docs/vercel-local-build-preview.png): local production catalog check.
- [docs/vercel-preview-setup.md](C:/Users/Jacob/.codex/worktrees/7c78/nuvitta_live_code/docs/vercel-preview-setup.md): this setup guide and task log.
