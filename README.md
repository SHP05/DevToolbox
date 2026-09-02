# Dev Utilities

A frontend-only Developer Utilities web app. Everything runs locally in the
browser — there is no backend, database, authentication, AI, or external API
calls of any kind.

Currently implemented:

- ✅ **Text Comparator** — compare two blocks of text with line-level
  add/remove/change highlighting, ignore-whitespace and ignore-case options,
  swap/clear/copy.

Planned (scaffolded as "coming soon" placeholders, routes already wired up):

- ⏳ JSON Formatter
- ⏳ SQL Formatter
- ⏳ Regex Tester

## Tech stack

- React + TypeScript + Vite
- Material UI (v7)
- React Router
- CodeMirror (`@uiw/react-codemirror`)
- `diff` (jsdiff) for the text comparison engine
- Vitest + React Testing Library for unit/component tests
- Playwright for end-to-end tests

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the unit/component test suite once (Vitest) |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:e2e` | Run the Playwright end-to-end tests |
| `npm run lint` | Lint the codebase |

## Running the end-to-end tests

Playwright needs its browser binaries downloaded once per machine:

```bash
npx playwright install chromium
npm run test:e2e
```

`test:e2e` automatically builds/serves the app on `http://localhost:4173`
(via `vite preview`) before running the tests — you don't need to start the
dev server yourself.

## Project structure

```text
src/
├── app/                  # App shell: router config, theme-mode context
├── components/
│   ├── common/           # Reusable, tool-agnostic UI (ToolLayout, CodeEditor,
│   │                      # CopyButton, ClearButton, EditorPanel, ComingSoon)
│   └── layout/            # Sidebar, TopBar, AppLayout (page chrome)
├── features/
│   ├── text-comparator/   # components / hooks / services / types
│   ├── json-formatter/    # (scaffolded, not yet implemented)
│   ├── sql-formatter/     # (scaffolded, not yet implemented)
│   └── regex-tester/      # (scaffolded, not yet implemented)
├── hooks/                 # App-wide hooks (e.g. useCopyToClipboard)
├── constants/             # Route + nav definitions
├── theme/                 # MUI theme factory (light/dark)
└── types/                 # Shared TypeScript types
tests/e2e/                 # Playwright specs
```

Each feature keeps its own `components/`, `hooks/`, `services/`, and `types/`
folders, separating UI from processing logic. Shared, reusable pieces (editor,
copy/clear buttons, page layout) live under `src/components/common` so new
utilities can be built without duplicating code.

## Adding the next utility

The routing, sidebar, and layout are already wired up for all four tools —
`/json-formatter`, `/sql-formatter`, and `/regex-tester` currently render a
"coming soon" placeholder (`src/components/common/ComingSoon.tsx`). To add a
utility:

1. Flesh out its `src/features/<name>/` folder (types → services → hooks →
   components), following the Text Comparator as a reference.
2. Swap its `<ComingSoon />` route in `src/app/App.tsx` for the real page.
3. Mark it `enabled: true` in `src/constants/routes.ts` so the sidebar link
   becomes clickable.
