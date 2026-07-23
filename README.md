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
git diff --check
```

`npm test` performs a production build before checking the public contract. The site is static; browser JavaScript is limited to the contact form and platform download selector.

## Configuration

- `functions/api/team-demo-requests.ts` exposes the same-origin contact endpoint and forwards validated submissions to the existing Forger service.
- `src/config/releases.ts` contains conservative, typed platform availability metadata.

Deployment is intentionally separate from local validation.
