# Repository Guide for tradeshift-frontend

## Overview
- **Framework**: React 19 with Vite build tooling.
- **Language**: JavaScript (ES modules).
- **Routing**: React Router DOM v7.
- **Styling**: Tailwind CSS 4.x with PostCSS pipeline.

## Development Scripts
1. `npm run dev` – Start Vite development server with HMR.
2. `npm run build` – Create production build via Vite.
3. `npm run preview` – Preview the production build locally.
4. `npm run lint` – Run ESLint with repository configuration.

## Key Configuration Files
- `vite.config.js` – Vite configuration, including dev server options.
- `tailwind.config.js` – Tailwind CSS configuration (v4 syntax).
- `postcss.config.cjs` – PostCSS plugin setup.
- `eslint.config.js` – ESLint configuration.

## Source Structure
- `src/main.jsx` – Application entry point mounting the React app.
- `src/App.jsx` – Root component establishing routes/layout.
- `src/components/` – Reusable components (Navbar, Sidebar, etc.).
- `src/components/layout/` – Layout-level components (`ShellLayout.jsx`).
- `src/services/api.js` – API helper functions.
- `src/index.css` – Global styles and Tailwind directives.

## Styling Notes
- Tailwind CSS directives (`@tailwind base;`, etc.) live in `src/index.css`.
- For Tailwind 4, ensure `@tailwindcss/postcss` is the PostCSS plugin instead of `tailwindcss`.

## Linting & Formatting
- ESLint is configured via `eslint.config.js` with React Hooks and React Refresh plugins.
- No formatter specified; follow existing code style (2 spaces indentation).

## Additional Tips
- When adding new routes, update the routing table in `App.jsx` and provide corresponding components under `src/components`.
- Components prefer functional React components with hooks.
- Maintain accessibility: use semantic elements and ARIA attributes where appropriate (see `ShellLayout.jsx` for examples).