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

- Primary site URL: https://fountain.lol
- Netlify subdomain: https://fountainslop.netlify.app
- Dashboard: https://app.netlify.com/projects/fountainslop
- Team: `makhbeth`
- Site ID: `aa49355c-92d5-4851-9cff-9fe080fa8487`
- Build settings and response headers: `netlify.toml`.

GitHub continuous deployment is connected through the existing Netlify GitHub App installation. Pushes to `main` build with `npm run build` and publish `dist/`. The first Git-based production deployment succeeded on 2026-09-09; the earlier account-credit block no longer prevented that build.

Domain registration is managed from https://app.netlify.com/projects/fountainslop/domain-management . `fountain.lol` is registered and is the sole custom domain assigned to the project. Auto-renewal for the previously mistyped domain `funtainslop.lol` was disabled on 2026-09-09. The previous Sites project remains recorded in `.openai/hosting.json`.


## Source and visit analytics

GitHub: https://github.com/MakhBeth/fountainslop

The analytics integration follows the Cloudflare beacon approach used in `forfettAIro`, but requires a separate public site token to keep the statistics distinct. Create `fountain.lol` in Cloudflare Web Analytics and set `VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN` in your build environment (or an ignored local `.env`). See `.env.example`. This is a public beacon identifier, not an API credential. Rebuild before deploying. Analytics is inactive until a valid token is configured.

Visits are collected only for `fountain.lol` and `fountainslop.netlify.app`. Localhost, branch previews, and the old Sites URL do not send analytics. Fonts remain self-hosted. Reference: https://developers.cloudflare.com/web-analytics/get-started/
