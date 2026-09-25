# Features and Specification

## Context
Researchers publishing novel methodologies face pushback proving the validity of data to reviewers ([JOB-01](USERS.md), [JOB-02](USERS.md)). Currently, authors must either spend 10+ hours manually assembling raw files, execution logs, and READMEs before initial submission ([INT-01](USERS.md)), or risk publication delays of several weeks conducting external validation reruns when reviewers challenge custom parameters ([INT-02](USERS.md)).

## EARS Requirements
* **Ubiquitous:** The system shall record parameter entries and digital file signatures into Cloudflare D1 SQL database.
* **Event-driven:** When a user clicks the export button on a saved record, the system shall generate and download a structured JSON manifest file.
* **Unwanted:** IF a submission contains a `fileSignature` that is not exactly 64 hexadecimal characters, THEN THE SYSTEM SHALL reject the request with HTTP status 400 and return a message stating "fileSignature must be exactly 64 hexadecimal characters".

---

## Verification Table


| Acceptance Statement | Test Method | Result | Notes |
| :--- | :--- | :--- | :--- |
| System generates unique `MAN-` IDs. | Create 3 entries, inspect DOM array. | PASS | IDs generated accurately. |
| System validates 64-char hex signatures. | Enter a 63-char string and submit. | PASS | Form rejects input successfully. |
| Data survives browser cache clear. | Clear site data, refresh page. | PASS | *(Formerly CANNOT TEST YET)* Now fetches directly from D1 database via Worker. |
| Network is down / offline. | Turn off Wi-Fi, attempt POST. | PASS | UI displays error badge without throwing console crash. |
| Server returns 400 Bad Request. | Submit empty payload via cURL. | PASS | Worker returns 400 validation error correctly. |
| Server returns 500 error. | Force script error on worker. | CANNOT TEST YET | Do not yet know how to reliably simulate a server crash from the client side. |
| Second client writes to same table. | Two users submit simultaneously. | DEFERRED | Real-time conflict resolution is deferred as per ADR-002. |
