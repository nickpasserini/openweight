# OpenWeight (installable web app)

Static files only. No build step, no server, no accounts. Works offline after the first load.

## Files

- `index.html` the whole app
- `manifest.webmanifest`, `icons/` install name and icons
- `sw.js` service worker (offline cache)
- `fonts/` Archivo and Big Shoulders Display, self-hosted (SIL Open Font License)
- `_headers` Cloudflare Pages cache rules (GitHub Pages ignores it)

## Deploy

**Cloudflare Pages (direct upload, about 2 minutes)**
1. Cloudflare dashboard > Workers & Pages > Create > Pages > Upload assets.
2. Name the project `openweight`, drag in this folder, deploy.
3. Or from a terminal in this folder: `npx wrangler pages deploy . --project-name openweight`

**GitHub Pages**
1. Create a repo and push these files to the root of `main`.
2. Settings > Pages > Build and deployment > Deploy from a branch > `main` / `(root)`.
3. The app is at `https://<you>.github.io/<repo>/`. Every path in the app is relative, so the sub-path works.

Serve it over HTTPS (both hosts do). Service workers do not run over plain http, except on localhost.

## Install on your phone

- iPhone: open the URL in Safari > Share > Add to Home Screen.
- Android: open it in Chrome > menu > Install app.

## Move your existing log

1. In the current version: Setup > Save a backup file.
2. In the new app: the first screen has "Restore from a backup file" (or paste the text). Choose the file, then "Replace with this backup".

Your data is stored in the phone's browser storage for this app only. There is no sync between devices, so save a backup file now and then. Setup shows the date of the last one.

## Updating

Edit the files, change `CACHE = "openweight-v1"` in `sw.js` to `v2`, and redeploy. The app refreshes itself in the background and shows the new version the next time you open it (sometimes the launch after that).

## Programs and training days

Setup has two program choices: the 3-day linear progression (Day A / Day B) and a 4-day split (squat and press, deadlift and bench, alternating heavy and volume days). Pick the weekdays you train; the schedule dates follow them, so Sunday/Tuesday/Thursday works as well as Monday/Wednesday/Friday. Switching programs after you have logged sets archives the old log first.

## Privacy

The deployed URL is public to anyone who has the link. This public build contains no personal lift history: `REF` is empty and `OPENER` holds generic starting weights (edit them in Setup). Your logged sets stay on your phone only (use Setup > backup to move them).
