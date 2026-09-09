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

Pushes to `main` run `.github/workflows/deploy.yml`, which calls a Netlify build hook stored in the GitHub Actions secret `NETLIFY_BUILD_HOOK`. The workflow can also be run manually from GitHub Actions. Netlify checks out `main` using the existing GitHub App connection, builds with `npm run build`, and publishes `dist/`. The workflow confirms that Netlify accepted the trigger; build and publication status are shown in the Netlify dashboard. The hook URL is a credential and must not be committed or printed in logs.

Domain registration is managed from https://app.netlify.com/projects/fountainslop/domain-management . `fountain.lol` is registered and is the sole custom domain assigned to the project. Its TLS certificate covers `fountain.lol` and `*.fountain.lol`; HTTP redirects to HTTPS (verified on 2026-09-09). Auto-renewal for the previously mistyped domain `funtainslop.lol` was disabled on 2026-09-09. The previous Sites project remains recorded in `.openai/hosting.json`.


## Source and visit analytics

GitHub: https://github.com/MakhBeth/fountainslop

The analytics integration follows the Cloudflare beacon approach used in `forfettAIro`, with a separate public site token for `fountain.lol` to keep the statistics distinct. `VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN` is configured in Netlify's production build environment. This is a public beacon identifier, not an API credential. See `.env.example` for other environments; analytics stays inactive when the variable is missing. Rebuild after changing the token.

Visits are collected only for `fountain.lol` and `fountainslop.netlify.app`. Localhost, branch previews, and the old Sites URL do not send analytics. Fonts remain self-hosted. Reference: https://developers.cloudflare.com/web-analytics/get-started/
