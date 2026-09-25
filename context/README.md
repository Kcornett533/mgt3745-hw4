# Data Provenance Audit Trail Generator

## What

HW3 repository: [https://github.com/mgt3745-hw3](https://github.com/YOUR-USERNAME/mgt3745-hw3)

Academic research labs face publication delays when reviewers challenge custom execution parameters ([PROJECT.md](docs/PROJECT.md), [FEATURES.md](docs/FEATURES.md)). This application enables researchers to record digital file signatures and parameter logs to export verifiable JSON provenance manifests. In HW4, data moves from browser local storage to a remote Cloudflare D1 SQLite database to ensure records persist across browser sessions and cache wipes ([ARCHITECTURE.md](docs/ARCHITECTURE.md)).

## See It Work

![See it work](docs/see-it-work.gif)

```mermaid
flowchart LR
  A[Page loads] --> B[GET /entries]
  B --> C[render]
  D[User submits] --> E[POST /entries]
  E -->|201| B
  E -->|400| F[showError]
  B -->|network fails| F
