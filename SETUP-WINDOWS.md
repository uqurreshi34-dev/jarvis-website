# JARVIS Website — Windows Setup

## 1. Clean install

1. Stop the old Vite dev server in Cursor with `Ctrl+C`.
2. Delete the old `jarvis-website` project folder.
3. Extract this ZIP to a new folder such as:

```text
C:\Users\uqrre\Projects\jarvis-website
```

Use your actual Windows username if it differs.

4. In Cursor choose **File → Open Folder** and open the extracted `jarvis-website` folder itself.

## 2. Install and run

Open Cursor's integrated terminal and run:

```powershell
npm install
npm run dev
```

Open the `http://localhost:5173/` URL Vite prints.

The first visit attempts the mechanical startup sound. Browsers can block page-load audio; the website retries on the first click, tap or key press.

## 3. Production check

Run:

```powershell
npm run build
```

A successful build ends with a Vite `built in ...` message and no TypeScript errors.

## 4. GitHub

Create an **empty** GitHub repository named `jarvis-website`.

Then, in the project folder:

```powershell
git init
git branch -M main
git add .
git commit -m "feat: create JARVIS website"
git remote add origin https://github.com/YOUR-USERNAME/jarvis-website.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## 5. Vercel

In Vercel:

1. **Add New → Project**
2. Import the `jarvis-website` GitHub repository.
3. Keep the detected Vite settings.
4. Deploy.

No environment variables are required for the current site.

## 6. Important project notes

- Source imports use the `@/*` alias, mapped to `./src/*`.
- `vite.config.ts` uses Vite's `tsconfigPaths` support, so no Node path-resolution code is required.
- The site is a presentation layer only; it contains no JARVIS API keys, desktop secrets or local sensor credentials.
- The arc-reactor-style favicon is `public/favicon.svg`.
