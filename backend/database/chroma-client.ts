import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OllamaEmbeddings } from "@langchain/ollama";
import type { Document } from "@langchain/core/documents";
import { wrapSDK } from "langsmith/wrappers"
import "jsr:@std/dotenv/load";

export const LANG_SMITH_API_KEY = Deno.env.get("LANGSMITH_API_KEY") || "";
export const LANG_SMITH_TRACING = Deno.env.get("LANGSMITH_TRACING") || false;
export const LANGSMITH_ENDPOINT= Deno.env.get("LANGSMITH_ENDPOINT") || "https://api.langsmith.ai";
export const LANG_SMITH_PROJECT = Deno.env.get("LANGSMITH_PROJECT") || "LocalVaultAgent";
const OLLAMA_BASE_URL = Deno.env.get("OLLAMA_BASE_URL") || "http://localhost:11434";
const EMBEDDINGS_MODEL = Deno.env.get("EMBEDDINGS_MODEL") || "";
const CHROMA_DB_URL = Deno.env.get("CHROMA_DB_URL") || "http://localhost:8000";


const embeddings = wrapSDK(new OllamaEmbeddings({
  model: EMBEDDINGS_MODEL,
  baseUrl: OLLAMA_BASE_URL,
}));

const vectorStore = wrapSDK(new Chroma(embeddings, {
  collectionName: "local-documents-nomic-invoices",
  url: CHROMA_DB_URL,
  collectionMetadata: {
    "hnsw:space": "cosine",
  },
}));

function flattenMetadata(obj: any, prefix = ""): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj || {})) {
    const flatKey = prefix ? `${prefix}_${key}` : key;
    if (value === null || typeof value === "undefined") continue;
    if (typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenMetadata(value, flatKey));
    } else if (typeof value !== "object") {
      result[flatKey] = value;
    }
  }
  return result;
}

export async function addDocumentsToVectorStore(documents: Document<Record<string, any>>[]) {
  const docsWithFlatMetadata = documents.map(doc => ({
    ...doc,
    metadata: flattenMetadata(doc.metadata),
  }));
  console.log(`Embedding ${docsWithFlatMetadata.length} documents...`);
  const result = await vectorStore.addDocuments(docsWithFlatMetadata); 
  console.log(`Added ${docsWithFlatMetadata.length} embedded documents to vector store.`);
  return result;
}

export async function similaritySearch(query: string, k?: number) { 
  return await vectorStore.similaritySearch(query, k);
}