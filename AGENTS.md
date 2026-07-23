# AGENTS

## Source of Truth

This repository owns the public Forger Teams website served from `https://teams.forger.cloud`.

The workspace root `AGENTS.md` defines cross-repository coordination and safety. This file defines the site-specific contract.

## Product Boundary

Forger Teams is a separate enterprise desktop application. The site must not present it as a route, plan, or feature inside personal Forger.

The English route is `/`. The Spanish route is `/es/`. Both routes keep the same section order, meaning, calls to action, form behavior, download states, and metadata contract.

## Content and Claims

- Lead with operational outcomes and graphical tools for employees.
- Explain employee-owned agents and the shared company foundation together.
- State that supported provider accounts remain subject to the provider plan, availability, charges, and limits.
- State that task content may be sent to the selected provider when needed.
- Do not claim compliance certifications, universal auditing, fixed storage capacity, public build availability, or security properties without current evidence from the owning repository.
- Keep current release availability in `src/config/releases.ts`. Treat it as conservative public metadata, not release automation.

## Implementation

- Astro builds the site as static HTML served through Cloudflare Workers Static Assets.
- Shared content lives in `src/content.ts`; update English and Spanish together.
- Reusable presentation lives in `src/components/`.
- Canonicals and structured data live in `src/layouts/BaseLayout.astro`.
- Form submission uses the same-origin Worker endpoint. It validates the public payload, maps the locale to the established source value, and forwards it to the existing Forger endpoint without logging personal data.
- JavaScript is limited to download selection and form submission behavior.
- Use system fonts and local assets. Do not add remote font or tracking dependencies.
- Keep focus states, semantic labels, live status regions, AA contrast, and reduced-motion behavior intact.

## Validation

Run `npm test`, `npm run typecheck`, `npm audit --audit-level=high`, and `git diff --check` before handoff. Tests verify localization parity, search metadata, assets, form and download contracts, provider boundaries, motion, edge routing, and absence of legacy `/teams` canonicals.

Do not deploy, publish, tag, commit, or push without explicit authorization.
