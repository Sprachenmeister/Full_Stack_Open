## New Note Diagram

```mermaid
sequenceDiagram
    participant browser
    participant server@{ "type" : "bundary" }

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa 
    server->>browser: HTML document

```
