# unique-chill
# Unique Chill — PWA

BLE controller for the Unique Portables UGP-45L fridge/freezer.
Runs fully offline on Android (Chrome) after a single install.

---

## File structure

```
unique-chill-pwa/
├── index.html          ← The app (all logic self-contained)
├── manifest.json       ← PWA manifest (name, icons, display mode)
├── sw.js               ← Service worker (offline cache)
└── icons/
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-192.png
    ├── icon-512.png
    └── apple-touch-icon.png
```

---

## Deploy to GitHub Pages (one-time setup)

1. Create a new **public** repository on GitHub — e.g. `unique-chill`

2. Upload all files maintaining the exact folder structure above:
   - `index.html` → root
   - `manifest.json` → root
   - `sw.js` → root
   - `icons/` folder with all 5 PNGs → root

3. In the repo → **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main` / `master`, folder `/ (root)`
   - Click **Save**

4. Wait ~60 seconds. Your app will be live at:
   `https://YOUR-USERNAME.github.io/unique-chill/`

---

## Install on your phone (do this once with any signal)

1. Open Chrome on your Android phone
2. Navigate to your GitHub Pages URL
3. Chrome will show a banner — **"Add to Home screen"**
   (or tap the ⋮ menu → "Add to Home screen")
4. Tap **Add**

The app is now installed on your home screen. Chrome downloads
and caches every file at install time.

**After this, you never need internet again.** The app launches
directly from your phone's local cache. BLE is local radio —
no network involved.

---

## Usage notes

- **Requires Chrome on Android** — Web Bluetooth is not supported
  in Firefox or Safari. Chrome is the only browser that supports
  Web Bluetooth on Android.
- The app polls the fridge every 5 seconds when connected.
- Temperature history is saved to localStorage on the device
  and persists between sessions.
- Themes, nickname, and unit preference are also saved locally.

---

## Updating the app

When you make changes to `index.html`:
1. Upload the new `index.html` to GitHub
2. Bump the cache version in `sw.js` → change `unique-chill-v1`
   to `unique-chill-v2` (or any new string)
3. The next time the phone has any internet connection,
   Chrome will automatically fetch the update in the background.
   Relaunch the app to get the new version.

If you don't bump the SW version, Chrome may serve the old cached
version indefinitely.
