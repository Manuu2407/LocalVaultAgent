import { Document } from "@langchain/core/documents";
import { classificationPromptTemplate } from "./promptTemplates.ts";
import { classify } from "./utils.ts";

export async function classifyDocument(document: Document<Record<string, any>>) {
  const staticParams = {
    classes: `
      - invoice
      - appointment
      - other`,
    classDescription: `
      - invoice:  A document that contains details about a transaction, typically including an invoice number, amounts of money and vendor information.
      - appointment: A document that contains details about a scheduled meeting or event, typically including date and time.
      - other: Any document that does not fit into the above categories.`,
    defaultClass: "other",
    schema: JSON.stringify({
      type: "object",
      properties: {
        classes: {
          type: "array",
          items: { "type": "string" }
        }
      },
      required: ["classes"],
      additionalProperties: false
    }, null, 2),
    exampleOutput: JSON.stringify({
      classes: ["class1", "class2"]
    }, null, 2),
    additionalInstructions: "",
  };
  const promptInput = { ...staticParams, text: document.pageContent };
  const result = await classify(classificationPromptTemplate, promptInput);
  console.log(`Document has been classified into:`, JSON.stringify(JSON.parse(result), null, 2));
  return result;
}