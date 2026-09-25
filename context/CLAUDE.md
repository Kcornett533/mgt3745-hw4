# Canonical Agent Instructions

## Architectural Constraints
* **Stack:** Pure Vanilla JavaScript (ES6+), Cloudflare Workers, Cloudflare D1 SQL.
* **Dependencies:** Minimal required packages (`wrangler`).
* **Storage:** Cloudflare D1 backend managed via `env.DB`.

## Normative Code Rules
1. Never build SQL queries using string concatenation. Always use `prepare(...).bind(...)`.
2. Never store credentials, keys, or passwords anywhere in the repository.
3. Never add a third-party dependency without adding a row to `TOOLS.md`.
4. Gracefully handle failed HTTP responses in the UI. Never allow uncaught console exceptions.
