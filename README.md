# Venue On My Plate — Public Website

The customer-facing venue discovery site for **Venue On My Plate**. Built with
Next.js 15 (App Router), React 19, Tailwind CSS v4 and TypeScript, and running on
a Contabo VPS under PM2. Nginx and HTTPS are planned for the domain phase.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 / React 19 |
| Styling | Tailwind CSS v4, self-hosted Cormorant + Inter |
| Data | Venue On My Plate API (`/api/v1/public/*`) with safe fallbacks |
| Hosting | Contabo VPS, direct IP ports under PM2; Nginx/Let's Encrypt planned |
| CI | GitHub Actions |

## Local development

Requirements: **Node.js 22.5+** and npm 10+.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The site runs at <http://localhost:3100>. Run the API from the separate
`Venue-Workspace` repository at <http://localhost:3101>. For local development,
set these values in `.env.local`:

```env
NEXT_PUBLIC_API_URL=/
API_INTERNAL_URL=http://localhost:3101
NEXT_PUBLIC_SITE_URL=http://localhost:3100
```

Browser requests stay on the website origin (`/api`); Next.js proxies them to
the private API during local development and in the current direct-port
production setup. Nginx will take over that public entry point when HTTPS is
enabled.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Start the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Strict TypeScript check |
| `npm run format:check` | Prettier verification |
| `npm run format` | Format the codebase |

## Production folder structure

```text
VENUEONMYPLATE/
├── src/
│   ├── app/                  # Routes, layouts, metadata, sitemap, robots
│   ├── components/
│   │   ├── chat/             # Concierge chat and social proof
│   │   ├── forms/            # Enquiry, search and FAQ forms
│   │   ├── home/             # Homepage sections
│   │   ├── layout/           # Header, footer and brand lockup
│   │   ├── ui/               # Small reusable primitives
│   │   └── venues/           # Venue, city and editorial cards
│   ├── lib/                  # API client, content, SEO and helpers
│   └── types/                # Shared domain types
├── public/                   # Images, fonts, video and static files
├── scripts/                  # Local asset-generation utilities
├── .github/workflows/        # CI
├── next.config.ts
└── package.json
```

## Environment

```env
# Browser requests use same-origin /api; server reads use the private API.
NEXT_PUBLIC_API_URL=/
API_INTERNAL_URL=http://127.0.0.1:3101
NEXT_PUBLIC_SITE_URL=https://venueonmyplate.in
# Keep 0 for plain HTTP (IP address or local dev). Set 1 behind HTTPS.
CSP_UPGRADE_INSECURE_REQUESTS=0
```

For local development use `API_INTERNAL_URL=http://localhost:3101` and keep
`NEXT_PUBLIC_API_URL=/`. Next.js proxies browser API calls to the private API,
so the site works on `localhost`, a LAN address or a preview host. Environment
files are never committed.

## Content and caching

- Homepage copy, sections, reviews and settings come from the CMS API.
- Public content revalidates every 60 seconds (`next: { revalidate: 60 }`).
- Hardcoded fallbacks keep the site renderable if the API is briefly unavailable.
- Reviews remain hidden until real reviews are published.
- Imported catalogue images use their existing S3 URLs; new admin uploads are
  served from `/uploads/library/<file>` on the same origin.

## Deployment

**Current phase:** website, admin and API run live on the VPS. The production
SQLite database contains the migrated catalogue: 642 venues (232 published,
404 draft, 6 archived), 6,185 media records and 20 enquiries. The public site
serves 232 published venue pages from the API. The legacy Docker Postgres stack
remains running and untouched as a safety copy. Admin runs on port `3102` over
plain HTTP by temporary approval; restrict it or add HTTPS promptly.

- Website: <http://94.136.188.197:3100>
- Admin: <http://94.136.188.197:3102> (temporary HTTP exposure)

This repository is the public website (`VOMP-MAIN`) in the current Contabo
layout:

1. Both repositories are checked out under `/opt/vomp-deploy`:
   `main-website` (this repo) and `admin-backend` (API + admin).
2. Shared env, SQLite data, uploads, logs and backups live in
   `/opt/vomp-deploy/shared`.
3. The website runs on port `3100` under PM2 process `VOMP-MAIN`; the API runs
   privately on `127.0.0.1:3101` and the admin console on `3102`.
4. `/api/*` and `/uploads/*` are proxied by Next.js to the private API.
5. The full guide is
   [`VOMP-DEPLOYMENT-GUIDE.md`](https://github.com/imshivammishra/VOMP-ADMIN/blob/main/deploy/VOMP-DEPLOYMENT-GUIDE.md)
   in the admin repository, and on the server at
   `/opt/vomp-deploy/VOMP-DEPLOYMENT-GUIDE.md`.

Deploy manually:

```bash
cd /opt/vomp-deploy/main-website
git pull --ff-only
bash /opt/vomp-deploy/admin-backend/deploy/scripts/deploy-main.sh
```

The `Deploy website` GitHub Actions workflow does the same after its verify job
passes. It requires the `VPS_HOST`, `VPS_USER` and `VPS_SSH_KEY` repository
secrets. Until HTTPS is configured, keep `CSP_UPGRADE_INSECURE_REQUESTS=0`;
otherwise browsers rewrite CSS/JS requests to HTTPS and the site appears
unstyled.

No Vercel dependency. The production deployment is PM2 on Contabo.

## Health check

`GET /healthz` returns a small JSON payload for uptime monitoring. It is not
cached and does not expose environment values or database details.
