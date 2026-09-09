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

- Site: https://fountainslop.netlify.app
- Dashboard: https://app.netlify.com/projects/fountainslop
- Team: `makhbeth`
- Site ID: `aa49355c-92d5-4851-9cff-9fe080fa8487`
- Build settings and response headers: `netlify.toml`.

The initial Netlify release is a manual production deployment of `dist/`; Git-based continuous deployment is not configured. To publish updates after `npm run build`, use an authenticated Netlify CLI:

```sh
netlify deploy --prod --dir dist --no-build --site aa49355c-92d5-4851-9cff-9fe080fa8487
```

Proposed custom domain: `fountainslop.com` (registration and assignment pending). It can be purchased from this project's Domain management screen, which configures DNS and HTTPS automatically. The previous Sites project remains recorded in `.openai/hosting.json`.
