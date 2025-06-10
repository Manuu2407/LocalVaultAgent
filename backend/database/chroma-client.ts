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

export async function addDocumentsToVectorStore(documents: Document<Record<string, any>>[]) {;
  return await vectorStore.addDocuments(documents); 
}