import { ChromaClient } from "chromadb";
const client = new ChromaClient({path: "http://localhost:8000"});

export async function getOrCreateCollection(name: string) {
  return await client.getOrCreateCollection({
    name
  });
}