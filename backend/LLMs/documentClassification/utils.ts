import { PromptTemplate } from "@langchain/core/prompts";
import { dataClassificationLlm } from "./model.ts";

export async function classify(template: PromptTemplate, input: Record<string, any>) {
  const formattedPrompt = await template.format(input);
  const response = await dataClassificationLlm.invoke(formattedPrompt);
  return response.content.toString();
}