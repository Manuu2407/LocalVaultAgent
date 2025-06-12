# This directory is for backend logic. It uses deno as runtime environment

## If you're working on this directory for the first time:

### install dependencies:
- use ```deno install --allow-scripts``` to install all packages

### install the local embedding model:
- download and install ollama from [Ollama](https://ollama.com/)
- use ```ollama pull nomic-embed-text```


## How to run specific tasks:
- To run ./backend/main.ts use ```deno run dev``` in ./backend
- To start sqlite-server use ```deno task sqlite-server``` in ./backend
- To start chroma-server use ```chroma run --path ./database/chroma-server``` in ./backend
