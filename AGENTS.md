# AGENTS.md

# Guidance for agentic contributors in this repository.

## Project Snapshot

- German-language Node.js CLI weather application.
- Uses Open-Meteo API (free, no auth) for geocoding + current
  temperature.
- Optional OpenAI API usage for AI-based location resolution.
- Stores city history locally via the `conf` package (data.json).

## Quick Commands

```bash
npm install
npm start              # Run app (tsx --env-file=.env)
npm test               # Run tests (single run)
npm run test:watch     # Run tests in watch mode
npx vitest run src/temperature.test.ts
npm run lint
npm run format
npm run format:check
npm run typecheck      # Typecheck only (tsc, no emit)
```

## Runtime / Environment

- Requires Node.js 20.6+ (for --env-file support).
- `.env` in repo root is expected for `OPENAI_API_KEY` (optional).
- Manual and saved-city flows should work without OpenAI.

## Architecture Overview

- Entry point: `src/main.js` (interactive menu loop).
- Flows: `src/cli/flows/` (stateless, independent modes).
- Services: `src/services/` (API integration + errors; Open-Meteo
  geocoding + forecast endpoint for current temperature).
- Storage: `src/storage/` (persistence via conf).
- UI: `src/ui/` (German locale formatting + error messages).

## Code Style and Conventions

- ES modules are required (`"type": "module"`), always include file
  extensions in local imports (e.g., `./weather.js`, `./temperature.ts`).
- Mixed JS/TS codebase. Most files are `.js`, utilities may be `.ts`.
- TypeScript is strict, no emit. Keep types sound; use explicit types
  on exported functions and public data structures.
- Prettier is the source of truth:
  - single quotes
  - semicolons
  - trailing commas
- ESLint config is minimal; rely on Prettier for formatting.

## Naming and Structure

- Functions: lowerCamelCase; keep names descriptive and action-oriented.
- Errors: use explicit error classes with codes (see services below).
- Files: kebab-case for JS/TS modules (e.g., `ai-location-lookup.js`).
- UI text: always German, user-facing strings only in UI/flows.

## Imports and Module Boundaries

- Use direct relative imports with extensions.
- Avoid circular dependencies between flows, services, and UI.
- Services should not import UI or CLI; they return data or throw errors.
- UI should not call services directly; flows orchestrate them.

## Error Handling Pattern

- Services throw specific error classes:
  - `WeatherServiceError` with `.code` values like `NOT_FOUND`,
    `NETWORK`, `SERVICE_UNAVAILABLE`, `INVALID_RESPONSE`.
  - `LocationResolutionError` with `.code` values like `PERMISSION`,
    `RATE_LIMIT`, `UNKNOWN`.
- Flows catch errors and convert them to user-friendly German messages
  via UI helpers (e.g., `src/ui/weather-error-message.js`).
- Prefer returning `null` for known "no result" cases (e.g. AI returns
  "NULL") rather than throwing.

## Testing Guidelines

- Vitest is the test runner.
- Use AAA pattern (Arrange, Act, Assert).
- Keep tests deterministic and avoid network calls; mock if needed.
- Imports inside tests should use explicit extensions.

## Formatting and Type Safety

- Avoid non-ASCII text in code comments unless necessary; UI strings are
  German and may include non-ASCII characters.
- Use runtime validation when input can be untyped (example in
  `src/temperature.ts`).
- Keep functions small and pure where possible.

## Files to Be Aware Of

- `src/main.js`: CLI loop; keep interaction in German.
- `src/services/weather.js`: Open-Meteo geocoding + forecast
  (`current=temperature_2m`) + error handling.
- `src/services/ai-location-lookup.js`: OpenAI integration and error
  mapping.
- `src/ui/print-weather.ts`: formatted output; `de-DE` locale.
- `src/ui/weather-error-message.js`: centralized error messaging.

## Lint/Format/Typecheck Expectations

- Run `npm run lint` after changes touching JS/TS files.
- Run `npm run format` or `npm run format:check` before final review.
- Run `npm run typecheck` for changes in `.ts` or TS-adjacent logic.
- Run `npm run test` after changes touching JS/TS files.

## Commit Message Rules

- Commit messages must be written in German.
- Commit messages must be shorter than 80 characters.

## Repo-Specific Notes

- `conf` stores data in `data.json` in the project root for this repo.
- The CLI uses `readline-sync` for prompts; keep prompts simple and
  synchronous.
