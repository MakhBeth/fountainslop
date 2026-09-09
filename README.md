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

The production site is static: deploy `dist/`. No API keys, model calls, database, or backend are required. Fonts are fetched from Google Fonts, with system fallbacks. The sculpture is an original procedural interpretation, not a museum scan. Historical reference: https://smarthistory.org/marcel-duchamp-fountain/

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
