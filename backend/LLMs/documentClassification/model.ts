import { ChatOllama } from "@langchain/ollama";
import { wrapSDK } from "langsmith/wrappers";
import "jsr:@std/dotenv/load";

const DATA_CLASSIFICATION_MODEL = Deno.env.get("DATA_CLASSIFICATION_MODEL") || "qwen3:8b";

export const dataClassificationLlm = wrapSDK(new ChatOllama({
  model: DATA_CLASSIFICATION_MODEL,
  temperature: 0,
  maxRetries: 2,
  format: "json"
}));