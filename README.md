# Forger Teams website

Static bilingual product site for [teams.forger.cloud](https://teams.forger.cloud).

## Routes

- English: `/`
- Spanish: `/es/`

## Local development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

## Validation

```sh
npm test
npm run build
npm run typecheck
npm audit --audit-level=high
git diff --check
```

`npm test` performs a production build before checking the public contract. The site is static; browser JavaScript is limited to the contact form and platform download selector.

## Edge deployment

- `wrangler.jsonc` deploys the build as Cloudflare Worker static assets on the `teams.forger.cloud` custom domain.
- `worker/index.ts` handles only `/api/team-demo-requests`; all public site requests stay on the static asset path.
- `src/lib/team-demo-proxy.mjs` validates contact submissions and forwards them to the existing Forger service without logging personal data.
- `src/config/releases.ts` contains conservative, typed platform availability metadata.

Deploy the validated production build with `npm run deploy`.
