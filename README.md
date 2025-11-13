# Machakos GreenLoop (Ready-to-deploy)

This is a ready-to-upload ZIP of a React prototype app that links **waste producers, recyclers, community champions, and county government** for Machakos County.
It includes a **Leaflet map demo** with mock pickup points and deployment config for both **Netlify** and **Vercel**.

## What’s inside
- `src/` — React source code (App uses React-Leaflet and mock APIs)
- `public/` — index.html
- `package.json` — includes dependencies (React, react-leaflet, leaflet, Tailwind dev deps)
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup
- `netlify.toml`, `vercel.json` — basic deploy files

## Quick local setup
1. Extract the ZIP.
2. In the project folder, run:
   ```
   npm install
   npm start
   ```
3. Open http://localhost:3000

## Deploy
- **Netlify**: Drag-and-drop the `build` folder after running `npm run build`, or connect a GitHub repo and let Netlify build.
- **Vercel**: Import the GitHub repo, or push this project to GitHub and connect to Vercel.

## Notes
- The app uses Tailwind for styling; devDependencies include Tailwind. If you prefer not to use Tailwind, replace `src/index.css` with custom CSS and remove Tailwind deps.
- Map demo centers on Machakos Town with a few mock pickup markers.
- Replace mock APIs in `src/api.js` with real endpoints to persist data.

If you want, I can also:
- Push this to a GitHub repo for you (I will provide the files; you'll need to create the repo and push).
- Create a Netlify deployment link by uploading the ZIP for you (I cannot interact with Netlify directly).

