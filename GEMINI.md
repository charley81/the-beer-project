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
- [ ] E-commerce functionality (Store).
- [ ] Expanded blog with more content.

## Recent Progress (Auth, Store & UI Refinement)

- [x] **Better Auth Overhaul (Production Ready):**
    - [x] Resolved production `NetworkError` by migrating to relative paths in `auth-client.ts`.
    - [x] Corrected DB provider to `sqlite` in `auth.ts` for Astro DB (LibSQL) compatibility.
    - [x] Implemented global session middleware (`src/middleware.ts`) to populate `Astro.locals`.
    - [x] Added project-wide type safety for auth locals in `src/env.d.ts`.
    - [x] Refactored Favorites page, Main Navigation, and Astro Actions to use the efficient `Astro.locals` pattern.
- [x] **Store Front-End Implementation:**
    - [x] Designed and built the `/store` landing page with premium product cards and OKLCH effects.
    - [x] Implemented dynamic product detail pages at `/products/[slug]`.
    - [x] Created a reusable `StoreButton` component as a placeholder for checkout logic.
- [x] **Codebase Cleanup:**
    - [x] Removed redundant `products/index.astro` in favor of the unified `store.astro`.
    - [x] Deleted unused `api/blog` CRUD endpoint (now using Content Layer).
    - [x] Removed initial Snipcart attempt to prepare for a clean integration.
- [x] **UI Polishing:**
    - [x] Refined "Back to Blog" button with a static, transparent-on-hover style for better consistency.

## Current Status / Next Steps

- [ ] **Step 9: E-commerce Checkout (Snipcart Re-integration):**
    - [ ] Perform a clean integration of Snipcart v3 based on official documentation.
    - [ ] Ensure persistence and reliable event binding across Astro View Transitions.
    - [ ] Implement secure "Add to Cart" logic within the `StoreButton`.
- [ ] **Step 10: User Experience & i18n:**
    - [ ] Add "My Favorites" link to the `UserAuth` dropdown (if not already fully integrated).
    - [ ] Research and implement `astro-i18next` for multi-language support.
