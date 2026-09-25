Markdown
# TOOLS.md: The Trust Boundary Ledger

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
| :--- | :--- | :--- | :--- | :--- |
| **Cloudflare Workers & D1** | Receives manifest data (pipeline names, params, signatures), IP addresses, and request metadata. | `wrangler.toml` (holds public DB ID, no secrets). | Manifest data leaves the browser over HTTPS to Cloudflare under their terms of service; I am accountable for parameterizing SQL. | **Medium**. Requires exporting SQLite data and rewriting API endpoints for a new host. |
| **GitHub & Codespaces** | Source code and terminal activity/environment state. | GitHub OAuth login. | My source code crosses to Microsoft/GitHub servers under their terms; I am accountable for not committing secrets. | **Low**. Can clone to a local VS Code setup. |
| **GitHub Copilot** | Editor context, file contents, and prompts. | VS Code extension login. | My code context crosses to Microsoft/OpenAI APIs under their terms; I am accountable for verifying generated code like `fetch` wrappers. | **Low**. Disable the extension. |
| **Wrangler (npm)** | Build pipeline and deployment processes. | Browser-based Cloudflare OAuth. | Deployment commands cross to Cloudflare via npm package execution; I am accountable for verifying package versions. | **High**. Would require manual API calls to Cloudflare's deployment endpoints. |
