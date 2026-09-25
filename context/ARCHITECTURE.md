# Architecture

## The Gate: HW4 rerun

Where should entries live now that they must survive a cleared cache?

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---:|---:|---:|---:|
| Cost to start | 4 | 5 (Score: 20) | 2 (Score: 8) | 5 (Score: 20) |
| Cost to maintain | 3 | 5 (Score: 15) | 2 (Score: 6) | 5 (Score: 15) |
| Time to working | 5 | 4 (Score: 20) | 3 (Score: 15) | 5 (Score: 25) |
| Inspectability | 4 | 5 (Score: 20) | 1 (Score: 4) | 4 (Score: 16) |
| Switching cost | 2 | 4 (Score: 8) | 2 (Score: 4) | 2 (Score: 4) |
| Fit to spec | 5 | 5 (Score: 25) | 3 (Score: 15) | 4 (Score: 20) |
| **Weighted total** | | **108** | **52** | **100** |

*Notes on Switching Cost:* Scored 4 for Build based on Session B hands-on experience: migrating away from Cloudflare D1 requires running `wrangler d1 export` to generate a standard SQLite dump and adapting endpoint paths in `worker.js`.

---

## ADR-001: Pure Client-Side Browser Architecture with LocalStorage Persistence
* **Title and date:** ADR-001: Pure Client-Side Browser Architecture with LocalStorage Persistence (September 17, 2026)
* **Status:** Superseded by ADR-002
* **Door / concrete acquisition and execution choice:** Two-way door. The choice to build a pure client-side web application using native ES6 JavaScript and `localStorage` can be reversed or migrated to a backend server architecture later if scale demands it.
* **Context:** Researchers publishing experimental findings require a frictionless method to generate audit trails without exposing raw data files or uploading sensitive algorithm source code to remote servers.
* **Decision:** Implement a pure client-side web application using HTML5, CSS3, and Vanilla JavaScript. State management and manifest persistence rely strictly on browser `localStorage` under key `mgt3745.provenance_manifests.v1`.
* **Consequences and revisit trigger:**
  * **Consequences:** Zero hosting costs, complete user privacy, instantaneous execution (< 5% runtime overhead). Storage capacity constrained to browser quota limits (~5 MB).
  * **Revisit Trigger:** Re-evaluate if user requirements shift to multi-user collaboration or centralized institutional registries.

---

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** Proposed  
**Supersedes:** ADR-001  

### Context
Data entered into the application (script names, execution parameters, SHA-256 hashes, and researcher notes) leaves the user's browser and crosses over to Cloudflare D1 (a serverless SQLite database) hosted by Cloudflare, Inc. under their standard free-tier terms of service. HTTP request metadata (client IP, timestamp, headers) is logged by default. I am accountable for data governance and security compliance.

### Decision
Migrate primary manifest persistence from browser `localStorage` to Cloudflare D1 using Cloudflare Workers for backend API endpoints (`GET /entries` and `POST /entries`).

### Alternatives considered
1. **Retain `localStorage`:** Rejected because data cannot survive cache wipes or sync across devices/reviewers.
2. **Third-Party BaaS (e.g., Supabase):** Rejected due to vendor lock-in, higher setup complexity, and potential data privacy overhead.

### Consequences
* **Negative Consequence:** System availability is now tied to network health and Cloudflare runtime status; offline data logging is no longer natively supported. Multi-user write access creates potential race conditions or concurrent entry ordering conflicts.

### Revisit trigger
Re-evaluate if Cloudflare modifies free-tier quota limits, introducing security regulations requiring on-premise hardware storage, or if offline-first P2P syncing becomes mandatory.
