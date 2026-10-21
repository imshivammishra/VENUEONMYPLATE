# Venue On My Plate — Public Website

The customer-facing venue discovery site for **Venue On My Plate**. Built with
Next.js 15 (App Router), React 19, Tailwind CSS v4 and TypeScript, and designed
to run on a Contabo VPS behind Nginx + PM2.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 / React 19 |
| Styling | Tailwind CSS v4, self-hosted Cormorant + Inter |
| Data | Venue On My Plate API (`/api/v1/public/*`) with safe fallbacks |
| Hosting | Contabo VPS, Nginx reverse proxy, PM2, Let's Encrypt |
| CI | GitHub Actions |

## Local development

Requirements: **Node.js 22.5+** and npm 10+.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The site runs at <http://localhost:3000>. Run the API from the separate
`Venue-Workspace` repository at <http://localhost:8081>. For local development,
set these values in `.env.local`:

```env
NEXT_PUBLIC_API_URL=/
API_INTERNAL_URL=http://localhost:8081
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Browser requests stay on the website origin (`/api`); Next.js proxies them to
the private API during local development, and Nginx does the same in
production.

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
API_INTERNAL_URL=http://127.0.0.1:8081
NEXT_PUBLIC_SITE_URL=https://venueonmyplate.in
```

For local development use `API_INTERNAL_URL=http://localhost:8081` and keep
`NEXT_PUBLIC_API_URL=/`. Next.js proxies browser API calls to the private API,
so the site works on `localhost`, a LAN address or a preview host. Environment
files are never committed.

## Content and caching

- Homepage copy, sections, reviews and settings come from the CMS API.
- Public content revalidates every 60 seconds (`next: { revalidate: 60 }`).
- Hardcoded fallbacks keep the site renderable if the API is briefly unavailable.
- Reviews remain hidden until real reviews are published.
- Uploaded media is served from `/uploads/library/<file>` on the same origin.

## Deployment

This repository is deployed with `Venue-Workspace`:

1. Clone both repositories on the VPS.
2. Follow [`Venue-Workspace/deploy/README.md`](../Venue-Workspace/deploy/README.md).
3. The website listens on `127.0.0.1:3000`; Nginx terminates TLS for
   `dev.venueonmyplate.com` (staging) or `venueonmyplate.in` (production).
4. `/api/*` and `/uploads/*` are proxied to the API on `127.0.0.1:8081`.
   The staging API host is `dev.api.venueonmyplate.com`.

No Vercel dependency. The production deployment is Nginx + PM2 on Contabo.

## Health check

`GET /healthz` returns a small JSON payload for uptime monitoring. It is not
cached and does not expose environment values or database details.
