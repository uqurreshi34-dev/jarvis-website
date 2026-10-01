# JARVIS Website

A clean, responsive React + TypeScript + Vite website for JARVIS, styled with Tailwind CSS.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- Lucide icons
- `@/*` imports mapped to `./src/*`
- No backend or secrets required

## Start

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run build
```

## Deploy

Push the project to GitHub, then import the repository into Vercel. Vercel detects the Vite build automatically.

## Design

The home page centres a glowing, rotating arc-reactor-style visual inspired by the JARVIS/Iron Man aesthetic. Navigation is responsive with a mobile hamburger menu; feature cards open detailed views; the favicon is a miniature blue reactor; and the first page visit attempts a short procedural mechanical startup sound with a first-interaction fallback for browsers that block autoplay.
