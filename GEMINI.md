# GEMINI.md

## Project Overview

**The Beer Project** is a personal learning project built with **Astro 6**, **React 19**, and **Tailwind CSS 4**. It serves as a playground for exploring modern web development features including third-party API integration (Open Brewery DB), CRUD functionality, authentication, internationalization, e-commerce, and blogging.

### Key Technologies

- **Framework:** [Astro](https://astro.build/) (v6.0.8)
- **UI Library:** [React](https://react.dev/) (v19.2.0)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.1.17) with OKLCH color space.
- **State/Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Components:** Radix UI primitives and shadcn/ui-inspired components.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (v12.38.0)

## Directory Structure

- `src/pages/`: Contains Astro routes. The blog posts and content are also located here under `blog/`.
- `src/components/`: A mix of `.astro` and `.tsx` (React) components.
  - `ui/`: Lower-level UI primitives (Button, Card, Input, etc.).
  - `ecommerce/`: E-commerce specific components (Snipcart setup, Cart Badge).
- `src/layouts/`: Shared layouts like `base-layout.astro` and `blog-layout.astro`.
- `src/content.config.ts`: Configures the **Astro Content Layer** (specifically the `blog` collection).
- `src/styles/global.css`: Central CSS file using Tailwind 4 `@import` syntax and custom theme variables.

## Building and Running

This project uses `pnpm` (inferred from `pnpm-lock.yaml`).

| Command          | Action                                                  |
| :--------------- | :------------------------------------------------------ |
| `pnpm install`   | Install dependencies.                                   |
| `pnpm dev`       | Start the local development server at `localhost:4321`. |
| `pnpm build`     | Build the production site.                              |
| `pnpm preview`   | Preview the production build locally.                   |
| `pnpm astro ...` | Run Astro CLI commands directly.                        |

## Development Conventions & Collaboration Style

- **Senior Engineer Collaboration:** Gemini acts as a senior engineer, taking responsibility for writing and maintaining the codebase while adhering to industry best practices.
- **Approval Workflow:** Gemini must explain the proposed changes and obtain explicit user approval before creating, editing, or deleting any files.
- **Clear Explanations:** Instead of heavy inline "lesson notes" within the code, Gemini provides comprehensive, high-level explanations of the architecture, logic, and technical decisions in the chat.
- **Senior Developer Standards:** All implementations favor modern, up-to-date design patterns (e.g., Tailwind 4, React 19 primitives, Astro 6 SSR, Service Layers). 
- **Core Principles:** 
    - **Separation of Concerns:** Isolate logic into service layers (`src/lib/api/`), UI into primitives, and layouts into coordinators.
    - **D.R.Y. (Don't Repeat Yourself):** Abstract repetitive logic and styles into reusable utilities or components.
- **TypeScript:** The project is configured with TypeScript (`tsconfig.json`). Ensure strict type safety for all new components and logic.
- **Tailwind 4:** Use modern Tailwind 4 patterns (OKLCH, `@theme` variables).
- **SSR Safety:** Wrap browser-specific APIs in `useEffect` or check `typeof window !== 'undefined'`.
- **Formatting:** Prettier is used for code formatting.

## Planned Features (Roadmap)

- [x] Integration with Open Brewery DB API.
- [x] CRUD functionality for managing blog posts with Astro DB + Turso.
- [x] User authentication with Better-Auth (Sign Up, Login, Logout).
- [x] CRUD functionality for managing beer/brewery favorites.
- [ ] Internationalization (i18n) support.
- [x] E-commerce functionality (Snipcart v3).
- [ ] Expanded blog with more content.

## Recent Progress (Auth, Store & E-commerce Refactor)

- [x] **Better Auth Overhaul (Production Ready):**
    - [x] Resolved production `NetworkError` by migrating to relative paths in `auth-client.ts`.
    - [x] Corrected DB provider to `sqlite` in `auth.ts` for Astro DB (LibSQL) compatibility.
    - [x] Implemented global session middleware (`src/middleware.ts`) to populate `Astro.locals`.
- [x] **Store & Snipcart Integration:**
    - [x] Designed and built the `/store` landing page and dynamic product detail pages.
    - [x] Performed a clean, persistent integration of Snipcart v3 compatible with Astro View Transitions.
    - [x] Resolved critical bugs: production API key injection, hydration mismatches, and zero-quantity refresh errors.
- [x] **Senior Engineering Refactor (E-commerce):**
    - [x] **Separation of Concerns:** Extracted Snipcart infrastructure into `SnipcartSetup.astro`.
    - [x] **D.R.Y. UI:** Created a reusable `CartBadge.tsx` to handle hydration and visibility logic in one place.
    - [x] **UX Improvements:** Implemented a global listener to trigger `sonner` toasts when items are added to the cart.
- [x] **Codebase Cleanup:**
    - [x] Standardized Snipcart environment variable handling in `src/lib/env.ts` (optional at build, required at runtime).

## Current Status / Next Steps

- [ ] **Step 9.5: Snipcart Branding & Polish:**
    - [x] Basic CSS variable theming implemented in `snipcart-theme.css`.
    - [ ] Add specific theme branding (custom icons, advanced layout overrides) to match the site's high-end aesthetic.
    - [ ] Refine micro-interactions (badge "pop" animations).
- [ ] **Step 10: User Experience & i18n:**
    - [ ] Add "My Favorites" link to the `UserAuth` dropdown (if not already fully integrated).
    - [ ] Research and implement `astro-i18next` for multi-language support.
