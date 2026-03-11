# GEMINI.md

## Project Overview

**The Beer Project** is a personal learning project built with **Astro 5**, **React 19**, and **Tailwind CSS 4**. It serves as a playground for exploring modern web development features including third-party API integration (Open Brewery DB), CRUD functionality, authentication, internationalization, e-commerce, and blogging.

### Key Technologies

- **Framework:** [Astro](https://astro.build/) (v5.18.0)
- **UI Library:** [React](https://react.dev/) (v19.2.0)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.1.17) with OKLCH color space.
- **State/Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Components:** Radix UI primitives and shadcn/ui-inspired components.

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

## Development Conventions

- **TypeScript:** The project is configured with TypeScript (`tsconfig.json`). Ensure type safety for all new components.
- **Tailwind 4:** Use modern Tailwind 4 patterns. Styles are mostly handled via `@apply` in `global.css` or utility classes in components.
- **Content Collections:** The blog uses the Astro 5 `glob` loader. New blog posts should be added as `.md` files in `src/pages/blog/` and must follow the schema defined in `src/content.config.ts`.
- **Component Hybridization:** Use `.astro` components for static parts of the page and `.tsx` (React) components for interactive elements (e.g., forms, search filters). Remember to use the `client:load` or `client:visible` directives in Astro files when interactivity is required.
- **Formatting:** Prettier is used for code formatting (`.prettierrc`).
- **Learning & Documentation Style:** Code should be heavily commented with "lesson notes" that explain the *why* and *how* of the logic, specifically for React 19 and Astro 5 mechanics.
- **SSR Safety:** Always wrap browser-specific APIs (like `window` or `document`) in `useEffect` or check `typeof window !== 'undefined'` to prevent build errors in Astro's server-side rendering.

## Planned Features (Roadmap)

- [x] Integration with Open Brewery DB API.
- [x] CRUD functionality for managing blog posts with Astro DB + Turso.
- [x] User authentication with Better-Auth (Sign Up, Login, Logout).
- [ ] CRUD functionality for managing beer/brewery favorites.
- [ ] Internationalization (i18n) support.
- [ ] E-commerce functionality (Store).
- [ ] Expanded blog with more content.

## Recent Progress (Auth & Architecture)

- [x] Refactored `AuthForm` to use **React 19** `useActionState` and `FormData` for modern, cleaner state management.
- [x] Implemented type-safe environment variable validation using **Zod 4** functional utilities.
- [x] Centralized Brewery API logic into `src/lib/api/brewery.ts`.
- [x] **Navigation Stability:** Fixed header layout jumping by stabilizing the `UserMenu` width and passing the server session from Astro to React to eliminate the "loading flash."
- [x] **Production Auth Fixes:** Resolved "Invalid Origin" errors and Netlify build failures by correctly configuring `baseURL`, `trustedOrigins`, and removing hardcoded secrets from `env.ts`.
- [x] **Auth Form UX:** Implemented a reusable `Alert` component for error feedback and added animated loading spinners to the submit buttons.
- [x] **Password Visibility Toggle:** Added a show/hide password feature in `AuthForm` using Lucide icons.
- [x] **Smart Auth Redirects:** Created a custom `useAuthRedirect` hook to centralize "returnTo" logic and fix SSR errors (window not defined) in `AuthForm` and `UserMenu`.
- [x] **Success Lifecycle:** Implemented a 2-second "Success/Redirecting" delay in `AuthForm` to provide visual feedback before navigation.

## Current Status / Next Steps

- [ ] **SEO Scaling:** Implement a dedicated `SEO.astro` component for better metadata management.
- [ ] **Auth Cleanup:** Complete the consolidation of auth pages and remove `src/pages/signup.astro`.
- [ ] **Favorites Feature:** Start building the CRUD functionality for brewery favorites using Astro DB.
