# AgriGov AI

AgriGov AI is an agriculture administration platform built for farmers and government officers. It combines a modern React + Vite frontend with Supabase authentication and role-based access to deliver a streamlined experience for scheme applications, grievance reporting, and AI-assisted decision support.

## Key Features

- Farmer and officer role-based access control
- Supabase authentication with session persistence
- Landing page with scheme details and AI capability overview
- Document validation, fraud detection, field verification, grievance classification, forecasting, and decision support workflows
- Multi-language support with a language switcher
- Toast notifications and live status feedback
- Responsive UI built with Tailwind CSS, Radix UI and custom components

## Technology Stack

- React 19
- Vite
- TypeScript
- @tanstack/react-router
- @tanstack/react-start
- Supabase
- Tailwind CSS 4
- Radix UI
- Framer Motion
- Lucide React icons
- Zod validation

## Repository Structure

- `src/` — main application source code
  - `components/` — reusable UI components and admin widgets
  - `integrations/supabase/` — Supabase client and types
  - `lib/` — domain logic, auth, internationalization, notifications, and helper functions
  - `routes/` — app routes and page components
- `public/` — static assets
- `server.js` — Node server wrapper for production preview
- `tsconfig.json` — TypeScript configuration
- `vite.config.ts` — Vite configuration
- `package.json` — scripts and dependencies
- `supabase/` — Supabase database migrations and config

## Prerequisites

- Node.js 20+ recommended
- npm (or Bun if preferred)
- Supabase project with `user_roles` table and authentication configured

## Environment Variables

Create a `.env` file at the project root and set the following values:

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>

# Optional for server-side execution
SUPABASE_URL=<your-supabase-url>
SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>
PORT=8080
```

The Supabase client falls back to `process.env` for server-side rendering, but the Vite variables are required for client-side runtime.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:4173` (or the port reported by Vite).

If you prefer Bun:

```bash
bun install
bun run dev
```

## Available Scripts

- `npm run dev` — Start Vite development server
- `npm run build` — Build the production app
- `npm run build:dev` — Build with development mode
- `npm run preview` — Preview the production build locally
- `npm run start` — Start the Node server from `server.js` after building
- `npm run lint` — Run ESLint
- `npm run format` — Run Prettier

## Production Build

```bash
npm run build
npm run preview
```

For the Node preview server:

```bash
npm run build
npm run start
```

The build output is emitted to `dist/`.

## Deployment Notes

- The project uses `@lovable.dev/vite-tanstack-config` for Vite configuration.
- `vite.config.ts` is intentionally minimal because the shared config handles React, Tailwind, TanStack, Cloudflare plugin integration, and alias resolution.
- Supabase auth state is managed in `src/lib/auth.tsx`, including role resolution from `user_roles`.
- The root route providers include authentication, internationalization, and notifications.

## Customization

- Update landing content and scheme cards in `src/routes/index.tsx`
- Add or modify routes in `src/routes/`
- Extend Supabase data models and migrations in `supabase/migrations/`
- Add UI components under `src/components/`

## Notes

- This repo is currently private and configured as a prototype/demo environment.
- If you add custom hooks, ensure they remain compatible with the TanStack Start SSR/CSR rendering model.
- Keep translations and language keys in `src/lib/i18n.tsx`.

---

## Contact

For questions about this project or to request updates, please refer to the repository owner or team managing the AgriGov AI deployment.
