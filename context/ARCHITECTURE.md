# ARCHITECTURE.md: System Architecture & Decision Log

## Architectural Overview

The Data Provenance Audit Trail Generator captures execution manifests for biomedical data processing scripts (e.g., sEMG signal filtering and biomechanical analysis scripts). 

### High-Level Topology
---

## Architectural Decision Records (ADRs)

### ADR-001: Client-Side LocalStorage Persistence
* **Status:** Superseded by ADR-002
* **Date:** September 10, 2026

#### Context
For the initial prototype build (HW3), we required a low-friction mechanism to retain provenance records across session reloads without backend infrastructure complexity.

#### Decision
Store JSON-serialized manifest entries in the browser's `localStorage` engine under key `mgt3745.provenance_manifests.v1`.

#### Consequences
* **Positive:** Zero latency, no infrastructure cost, offline availability.
* **Negative:** Data was limited to a single browser/device and would be lost if browser cache or site storage was cleared.

---

## The Gate, Rerun

| Option | Ease of Build (30%) | Control & Privacy (30%) | Maintenance Burden (20%) | Switching Cost (20%) | Weighted Total |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Build (Cloudflare Worker + D1)** | 8/10 | 9/10 | 8/10 | 7/10 | **8.1** |
| **Buy (Supabase / Firebase BaaS)** | 9/10 | 6/10 | 9/10 | 4/10 | **7.1** |
| **Delegate (Bolt.new / Managed AI)**| 9/10 | 3/10 | 9/10 | 2/10 | **5.8** |

*Note on Switching Cost:* Scored directly from Session B hands-on experience moving data from `localStorage` to Cloudflare D1 via SQL bindings. Modifying two `localStorage` calls into `fetch()` wrappers demonstrated that client-server decoupling carries low operational friction when raw SQL schemas remain standardized.

---

## ADR-002: Cloudflare Worker and D1 Database Persistence

* **Status:** Accepted
* **Supersedes:** ADR-001
* **Date:** September 24, 2026

### Context
HW3 retained provenance manifest logs inside browser `localStorage` as a zero-infrastructure choice. That choice is no longer sufficient, as audit manifests must survive cleared browser caches and support peer verification across multiple client machines.

**The Trust Boundary Crossing:** Manifest data (pipeline name, execution parameters, raw SHA-256 signatures, researcher notes) leaves the user's browser over HTTPS and crosses to Cloudflare Workers and Cloudflare D1 (managed SQLite at the edge) under Cloudflare's Terms of Service and Privacy Policy. I am accountable for maintaining parameterized database queries (`bind()`), managing credentials safely out of the repo, and setting CORS boundary security.

### Decision
We will deploy a serverless edge backend using Cloudflare Workers bound to a Cloudflare D1 SQL database (`mgt3745-entries`) for persistent storage of all execution manifest logs.

### Consequences
* **Positive:** Provenance entries persist permanently across browser clearing, device switches, and multi-user audit queries.
* **Negative (What Got Harder):** Offline use is no longer supported out of the box; network failures or server outages (500/400 errors) now require explicit client-side handling to prevent unhandled console exceptions.
