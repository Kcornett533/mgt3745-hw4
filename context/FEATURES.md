# Features and Specification

## Context
Researchers publishing novel methodologies face pushback proving the validity of data to reviewers ([JOB-01](USERS.md), [JOB-02](USERS.md)). Currently, authors must either spend 10+ hours manually assembling raw files, execution logs, and READMEs before initial submission ([INT-01](USERS.md)), or risk publication delays of several weeks conducting external validation reruns when reviewers challenge custom parameters ([INT-02](USERS.md)).

## EARS Requirements
* **Ubiquitous:** The system shall record parameter entries and digital file signatures into Cloudflare D1 SQL database.
* **Event-driven:** When a user clicks the export button on a saved record, the system shall generate and download a structured JSON manifest file.
* **Unwanted:** IF a submission contains a `fileSignature` that is not exactly 64 hexadecimal characters, THEN THE SYSTEM SHALL reject the request with HTTP status 400 and return a message stating "fileSignature must be exactly 64 hexadecimal characters".

---

## Verification Table

| Statement | HW3 verdict | HW4 verdict | Reason |
|---|---|---|---|
| Save a valid entry | PASS | PASS | Form submits and persists entry to Cloudflare D1 via POST /entries. |
| Reject empty entry | PASS | PASS | Worker returns 400 if required fields are missing. |
| Survive cleared cache | CANNOT TEST YET | PASS | Tested: cleared site data and opened in incognito window; entries persisted. |
| Server unreachable | N/A | PASS | Simulated by disabling network interface; UI displays red warning badge "SERVER UNREACHABLE". |
| Server returns 500 | N/A | PASS | Verified by removing DB binding in local dev; returns "server error" without throwing console exception. |
| Server returns 400 | N/A | PASS | Tested by submitting a 10-char hash; Worker returns status 400 and displays inline error. |
| Second client writes to the same table | N/A | DEFERRED | Deferred per ADR-002: multi-client conflict resolution out of single-user MVP scope. |
