# This directory is for backend logic. It uses deno as runtime environment

## If you're working on this directory for the first time:

### install dependencies:
- use ```deno install``` to install all packages

### install the local LLMs:
- download and install ollama from [Ollama](https://ollama.com/)
- use ```ollama pull nomic-embed-text``` and ```ollama pull qwen3:8b```


## How to run specific tasks:
- To run ./backend/main.ts use ```deno run dev``` in ./backend
- To start sqlite-server use ```deno run sqlite-server``` in ./backend
- To start chroma-server use ```chroma run --path ./database/chroma-server``` in ./backend
