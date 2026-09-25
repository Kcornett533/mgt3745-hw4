# TOOLS.md

The ledger of Trust Boundary crossings. One row per external service this repository depends on.

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
|---|---|---|---|---|
| Cloudflare Workers + D1 | Every entry a user types; request metadata (IP, timestamp) logged by Cloudflare | Cloudflare dashboard login; wrangler token inside Codespace | "User provenance entries leave the browser and are stored on D1 under Cloudflare's free-tier terms, in a region I did not choose. I am accountable." | Medium: `wrangler d1 export`, rewrite one Worker script for another server host. |
| GitHub + Codespaces | Source code, commit history, development environment configuration | GitHub account (SSO) | "Source code and commit histories cross to GitHub infrastructure under standard university account terms. I am accountable." | Low: Export repository archive to an alternate git host like GitLab. |
| GitHub Copilot | Repository context and code snippets for completion suggestions | GitHub account | "Repository text and code snippets cross to GitHub Copilot servers under corporate privacy terms to generate code completions. I am accountable." | Low: Disable extension and remove AI agent configuration files. |
| wrangler (npm) | Deployment commands, build scripts, local runtime parameters | Local CLI authentication token (`~/.wrangler`) | "Deployment metadata and SQLite schemas cross to the wrangler CLI tool during local execution under npm maintainer terms. I am accountable." | Low: Execute manual HTTP API deployments via Cloudflare REST endpoints. |

## Revisit triggers
- A new service or npm dependency is added to the repository.
- Cloudflare changes pricing, privacy policies, or storage region bounds.
- A credential or API secret moves location.
