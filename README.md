# Quick Scan Logistieke Ketenvolwassenheid

Een statische quickscan met scoring, adviesnarratief en PDF-export.

## Ontwikkelcommando's

- **Linten:** `npm run lint`
- **Formatteren (Prettier):** `npm run format`
- **Formattering controleren:** `npm run format:check`
- **Testen (unit/component):** `npm test`
- **Build voor Pages/static hosting:** `npm run build` (plaatst `index.html` en `app.js` in `dist/`)

## CI/CD

- **Lint/Test workflow:** draait bij elke push en pull request.
- **Deploy workflow:** bouwt en publiceert naar GitHub Pages wanneer `main` wordt bijgewerkt (of handmatig via workflow dispatch).
