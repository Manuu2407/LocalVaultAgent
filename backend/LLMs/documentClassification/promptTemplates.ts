import { PromptTemplate } from "@langchain/core/prompts";


/* Template for extracting structured data from OCR text.
When using this template, ensure that the `classes`, `classDescription`, `text`, `schema`, `exampleOutput`, `defaultClass` and `additionalInstructions` are provided in the input.
The `cllasses` should be a list of classes that the document can be classified into.
The `classDescription` should provide a brief description of each class.
The `text` should be the OCR text that needs to be classified.
The `schema` should be a JSON schema that defines the structure of the output.
The `exampleOutput` should be an example of the expected output in JSON format.
The `defaultClass` should be the class to use if the document does not match any of the provided classes.
The `additionalInstructions` can be used to provide any additional instructions for the classification task.
*/
export const classificationPromptTemplate = PromptTemplate.fromTemplate(`
You are an document classification assistant.
Given the following OCR text, classify the document into one or multiple of the given classes and output the classification as a JSON object that matches the provided JSON schema.

class-names: 
{classes}

class-description:
{classDescription}

OCR Text:
"""
{text}
"""
JSON-Schema:
{schema}

Output-Example:
{exampleOutput}

Instructions:
- Carefully read the OCR text and understand the content.
- Classify the document into one or multiple of the provided classes.
- If the document does not match any of the classes, choose {defaultClass} as default.
- Do not return an empty JSON object.
- Output the classification as a JSON object that matches the provided JSON schema.
- Only output the JSON object, nothing else.
{additionalInstructions}
`);