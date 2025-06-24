import { PromptTemplate } from "@langchain/core/prompts";


/* Template for extracting structured data from OCR text.
When using this template, ensure that the `type`, `schemaDescription`, `text`, `schema`, and `additionalInstructions` are provided in the input.
The `type` should be a string that describes the type of document (e.g., "invoices", "receipts", etc.).
The `schemaDescription` should be a string that describes the fields in the JSON schema.
The `text` should be the OCR text from which you want to extract data.
The `schema` should be a JSON schema string that defines the structure of the expected output.
The `additionalInstructions` should be a string that provides any additional instructions for the extraction process.
*/
export const extractionPromptTemplate = PromptTemplate.fromTemplate(`
You are an expert at extracting structured data from {type}.
Given the following OCR text, extract the relevant fields and output them as a JSON object that matches the provided JSON schema.

The JSON object must have the following fields:
{schemaDescription}

OCR Text:
"""
{text}
"""

Instructions:
- Carefully read the OCR text and extract the values for each field in the schema.
{additionalInstructions}
- If a field is missing or not found, set its value to null.
- Only output the JSON object, nothing else.

JSON-Schema:
{schema}
`);