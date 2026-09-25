# Data Provenance Audit Trail Generator

**HW3 Link:** [https://github.com/YOUR_GITHUB_USERNAME/mgt3745-hw3](https://github.com/YOUR_GITHUB_USERNAME/mgt3745-hw3)

## What It Is
A tool for researchers to capture input file signatures, execution parameters, and pipeline logs to generate immutable JSON provenance manifests for peer review. As of HW4, data now leaves the browser and lives persistently in a Cloudflare D1 SQL database.

## See It Work
![See It Work](docs/see-it-work.png)

## How to Run
**Live URL:** https://mgt3745-hw4.kcornett533.workers.dev/entries

To run locally:
1. Open in GitHub Codespaces.
2. Run `npx wrangler dev` in the terminal to start the backend Worker.
3. Use VS Code Live Server to open `index.html`.

## Status
* **Working:** Form validation, manifest JSON generation, Cloudflare D1 integration (GET/POST endpoints), data persistence across cleared caches.
* **Deferred:** Multi-user concurrent write conflict resolution.

## Project Context Links
1. [PROJECT.md](docs/PROJECT.md)
2. [USERS.md](docs/USERS.md)
3. [FEATURES.md](docs/FEATURES.md)
4. [ARCHITECTURE.md](docs/ARCHITECTURE.md)
5. [TOOLS.md](TOOLS.md)
6. [STYLE.md](STYLE.md)

## AI Use (HW4)
1. **What I asked Copilot to do:** I asked it to convert my `localStorage` logic in `app.js` into network calls (`fetch`) to communicate with my new Cloudflare Worker backend.
2. **What Copilot wrote that I couldn't fully verify:** It generated CORS headers (`Access-Control-Allow-Origin`) in `worker.js` that I didn't fully understand initially.
3. **What I did about it:** I temporarily removed the CORS headers to test what would happen. The browser threw a CORS policy error, confirming they were necessary to permit frontend-backend requests. I then restored them. Additionally, I caught and rejected Copilot's attempt to use string concatenation in SQL, replacing it with `bind()`.
