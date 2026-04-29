## New Note In Single Page App Diagram

```mermaid
sequenceDiagram

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>browser: HTML document

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: the css file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>browser: the JavaScript file (for single page app)
    
    browser-->server: The browser starts executing the JavaScript code that fetches the JSON from the server.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: all notes metadata (content, date...)

    browser-->server: The browser executes the callback function that renders the notes.

    browser-->server: New note *Save Button pressed*

    browser->>server: GET new_note_spa JSON file
    server-->>browser: Status code 201
    server-->browser: This time, the server does not ask for a redirect, it stays on the same page.


```
