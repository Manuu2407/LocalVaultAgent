import { ChatOllama } from "@langchain/ollama";
import { wrapSDK } from "langsmith/wrappers";
import "jsr:@std/dotenv/load";

const DATA_EXTRACTION_MODEL = Deno.env.get("DATA_EXTRACTION_MODEL") || "qwen3:8b";

export const dataExtractionLlm = wrapSDK(new ChatOllama({
  model: DATA_EXTRACTION_MODEL,
  temperature: 0,
  maxRetries: 2,
  format: "json"
}));