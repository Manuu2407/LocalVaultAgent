import { PromptTemplate } from "@langchain/core/prompts";
import { dataExtractionLlm } from "./model.ts";

export async function extractData(template: PromptTemplate, input: Record<string, any>) {
  const formattedPrompt = await template.format(input);
  const response = await dataExtractionLlm.invoke(formattedPrompt);
  return response.content.toString();
}