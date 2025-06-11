import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import type { Document } from "@langchain/core/documents";
import "jsr:@std/dotenv/load";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const LANG_SMITH_API_KEY = Deno.env.get("LANGSMITH_API_KEY") || "";
const LANG_SMITH_TRACING = Deno.env.get("LANGSMITH_TRACING") || false;
const EMBEDDINGS_MODEL = Deno.env.get("EMBEDDINGS_MODEL") || "";
const CHROMA_DB_URL = Deno.env.get("CHROMA_DB_URL") || "";

const embeddings = new OpenAIEmbeddings({
  model: EMBEDDINGS_MODEL,
  openAIApiKey: OPENAI_API_KEY,
});

const vectorStore = new Chroma(embeddings, {
  collectionName: "local-documents",
  url: CHROMA_DB_URL,
  collectionMetadata: {
    "hnsw:space": "cosine",
  },
});

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
  return await vectorStore.addDocuments(docsWithFlatMetadata);
}
