# Slice Club

A small pizza ordering app for a shared birthday-party tablet. No runtime dependencies, build step, accounts, or backend.

## Run locally

Use Node.js 20 or newer:

```sh
cd /Users/hmtc/Projects/pizza-party
npm start
```

Open http://localhost:4173. On the same Wi-Fi, the tablet can access `http://YOUR-COMPUTER-LAN-IP:4173` while the server is running and the firewall permits it. Plain HTTP on a LAN supports ordering but does not enable offline caching.

## Tablet / offline setup

Publish `index.html`, `style.css`, `app.js`, `art.js`, `store.js`, `sw.js`, `icon.svg`, and `manifest.webmanifest` to an HTTPS static host. Open that URL in Chrome on the Samsung tablet, allow the first load to finish, and use the browser menu to add it to the home screen. Service workers require HTTPS (or localhost); visit once while online before using offline. Reopen the app in airplane mode to verify the cache on the actual tablet before the party.

Orders belong to that browser and URL. Keep using the same browser and address. Clearing browser/site data, private browsing, or moving to another URL can remove or separate saved orders. No names are sent to a server. The Orders screen shows totals and supports edits, confirmed removals, and a confirmed party reset. Duplicate names are allowed; add an initial to distinguish guests.

## Check

`npm test` checks persistence, validation, totals, and storage errors. Test portrait and landscape on the intended tablet, including its on-screen keyboard. The layout supports small screens, but hardware/browser testing is still recommended.

When updating deployed assets, change the cache version in `sw.js`; close existing app tabs to allow the new service worker to activate.

Optional browser regression check: install Playwright (`npm install --save-dev playwright` and `npx playwright install chromium`), then run `node checks/browser.mjs`. It serves app files through request interception and checks ordering, edits, persistence, deletion, and responsive overflow. Offline service-worker behavior must be checked separately over HTTPS.
