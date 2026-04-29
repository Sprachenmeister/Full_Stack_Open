## New Note Diagram

```mermaid
sequenceDiagram
    participant Server@{ "type" : "bundary" }
    participant Browser

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa 
    server->>browser: HTML document

```
