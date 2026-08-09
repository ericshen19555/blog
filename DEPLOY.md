# Deploy SOP

This repo uses two branches:

- `main`: Hexo source, theme, config, posts, GitHub Actions workflow.
- `gh-pages`: generated static HTML/CSS/JS only.

## Normal edit and deploy

1. Work on `main`.
2. Run locally:

   ```powershell
   npm install
   npm run clean
   npm run build
   npm run server
   ```

3. Commit source changes on `main`.
4. Push `main`:

   ```powershell
   git push origin main
   ```

5. GitHub Actions builds `public/`, pushes it to `gh-pages`, and publishes GitHub Pages.

## Roll back website first

Find the last good source commit:

```powershell
git log --oneline --decorate --all
```

Create a rollback commit on `main`:

```powershell
git revert <bad-commit>
git push origin main
```

If several commits need to be rolled back:

```powershell
git revert <oldest-bad-commit>^..<newest-bad-commit>
git push origin main
```

After the push, GitHub Actions redeploys the rolled-back site.

## Emergency rollback of generated branch

Use this only when `gh-pages` itself must be restored immediately:

```powershell
git fetch origin
git push --force-with-lease origin <last-good-gh-pages-commit>:gh-pages
```

For this repo, the known good generated commit from 2026-08-05 was:

```text
28e50ac Site updated: 2026-08-05 22:35:26
```

## Do not do this

Do not deploy generated files to `main`.

`hexo d` now targets `gh-pages`, but the safer daily workflow is still `git push origin main` and let GitHub Actions deploy.
