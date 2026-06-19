# CareerHub

A career-management dashboard built with React — track job applications through a kanban pipeline, build a resume with a live preview, and (soon) get AI-assisted resume/interview help.

## Features

### Done
- **Login / Signup** — email + password with validation, mocked Google OAuth, mode toggle, loading state
- **Protected routes** — logged-out users are redirected to the login page; logging in redirects into the app
- **Dashboard** — stat cards, pipeline breakdown chart (Recharts), recent activity feed
- **Job Tracker** — kanban board (Saved → Applied → Interview → Offer → Rejected), add/edit modal, delete confirmation, detail view, move jobs forward/backward, search + status filter chips, stats bar
- **Resume Builder** — tabbed editor (Contact, Summary, Skills, Experience) with a live preview pane
- **Settings** — profile editing, theme toggle, reset resume / clear all jobs
- **Light/dark theme** — switchable via CSS custom properties, persisted across sessions

### Planned
- Job Search (browse + save listings into the tracker)
- Interview Coach (AI mock interview chat)
- Contacts
- AI Tools — resume analyzer/enhancer, cover letter generator, tailored resume per job, all via the Anthropic API

## Tech stack

- [React 19](https://react.dev) + [Vite](https://vitejs.dev)
- [React Router 7](https://reactrouter.com) for routing and protected routes
- [Recharts](https://recharts.org) for the dashboard chart
- Context API + `useReducer` for global job state (`AppContext` / `JobReducer`)
- Custom hooks: `useLocalStorage` (persists theme/user/resume), `useDebounce` (search input)

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint       # run ESLint
```

## Project structure

```
src/
  components/      # Job Tracker UI (board, card, modals, filters, stats)
  context/         # AppContext — global jobs/resume/theme/user state
  hooks/           # useLocalStorage, useDebounce
  layoutes/        # DashboardLayout (sidebar + page outlet)
  pages/           # One component per route
  routes/          # AppRoutes, ProtectedRoute
  styles/          # Per-feature CSS, theme variables in global.css
  utils/           # Constants (nav, columns, seed data), JobReducer
```