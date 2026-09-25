# MGT 3745 - HW4: Data Provenance Audit Trail Generator

A lightweight web application for recording, auditing, and persisting data provenance manifests. Built with pure HTML/CSS/JavaScript and backed by a Cloudflare Workers serverless backend with Cloudflare D1 SQL storage.

- **Deployed URL:** [https://mgt3745-hw4.YOUR-SUBDOMAIN.workers.dev/](https://mgt3745-hw4.YOUR-SUBDOMAIN.workers.dev/)
- **HW3 Repository:** [https://github.com/yourusername/mgt3745-hw3](https://github.com/yourusername/mgt3745-hw3)

---

## What It Is

The **Data Provenance Audit Trail Generator** captures execution parameters, input file signatures (SHA-256 hashes), script names, and researcher notes to produce immutable JSON records for scientific peer review. 

In HW3, entries were stored locally in the browser (`localStorage`). For HW4, data leaves the browser client and persists in an edge-managed Cloudflare D1 SQLite database via a serverless Cloudflare Worker API.

---

## See It Work

![Data Provenance Audit Trail Generator Persistence Demo](docs/see-it-work.png)

*The record above demonstrates a provenance manifest entry surviving a browser cache refresh and persisting across independent client sessions via Cloudflare D1.*

---

## How to Run

### Live Web Application
Access the production application directly via your browser or interact with the REST API:
- **Frontend App:** Open `index.html` in any browser or launch via Live Server.
- **REST API Endpoint:** `GET https://mgt3745-hw4.YOUR-SUBDOMAIN.workers.dev/entries`

### Running Locally
1. Clone the repository and install dependencies:
   ```bash
   git clone [https://github.com/yourusername/mgt3745-hw4.git](https://github.com/yourusername/mgt3745-hw4.git)
   cd mgt3745-hw4
   npm install
