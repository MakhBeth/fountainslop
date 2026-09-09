# FountAIn

An interactive ready-made for the generated age. English-language microsite with a procedural Three.js urinal inspired by Marcel Duchamp’s Fountain (1917), satirical locally generated captions, and a deliberately reductive flush button.

## Development

Requires Node.js 22.12+ (tested with 24).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The production site is static: deploy `dist/`. No API keys, model calls, database, or backend are required. All fonts are self-hosted in `public/fonts/`, with their SIL Open Font Licenses included. DM Sans and Instrument Serif are used for the interface; Caveat is used for the handwritten signature on the plinth. Fonts always load locally. Optional Cloudflare Web Analytics loads only on the production hostnames; local development and previews do not send visits. The application does not use cookies or browser storage. The sculpture is an original procedural interpretation, not a museum scan. Historical reference: https://smarthistory.org/marcel-duchamp-fountain/

The Sites project is recorded in `.openai/hosting.json`. Keep its project ID when publishing subsequent versions.

## Netlify production

- Reserved site URL (not live yet): https://fountainslop.netlify.app
- Dashboard: https://app.netlify.com/projects/fountainslop
- Team: `makhbeth`
- Site ID: `aa49355c-92d5-4851-9cff-9fe080fa8487`
- Build settings and response headers: `netlify.toml`.

Initial production deployment is blocked by Netlify: `Account credit usage exceeded - new deploys are blocked until credits are added` (2026-09-09). Both the CLI and official ZIP deploy API returned HTTP 403. No production deploy is live on Netlify yet. Git-based continuous deployment is not configured. Once account credits are restored, publish after `npm run build` with an authenticated Netlify CLI:

```sh
netlify deploy --prod --dir dist --no-build --site aa49355c-92d5-4851-9cff-9fe080fa8487
```

Proposed custom domain: `fountainslop.com` (registration and assignment pending). It can be purchased from this project's Domain management screen, which configures DNS and HTTPS automatically. The previous Sites project remains recorded in `.openai/hosting.json`.


## Source and visit analytics

GitHub: https://github.com/MakhBeth/fountainslop

The analytics integration follows the Cloudflare beacon approach used in `forfettAIro`, but requires a separate public site token to keep the statistics distinct. Create `fountainslop.com` in Cloudflare Web Analytics and set `VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN` in your build environment (or an ignored local `.env`). See `.env.example`. This is a public beacon identifier, not an API credential. Rebuild before deploying. Analytics is inactive until a valid token is configured.

Visits are collected only for `fountainslop.com`, `www.fountainslop.com`, and `fountainslop.netlify.app`. Localhost, branch previews, and the old Sites URL do not send analytics. Fonts remain self-hosted. Reference: https://developers.cloudflare.com/web-analytics/get-started/
