import { extractionPromptTemplate } from "./promptTemplates.ts";
import { extractData } from "./utils.ts";

export async function extractInvoiceData(text: string) {
  const staticParams = {
    type: "invoices",
    schemaDescription: `
        - invoice_no: The invoice number as a string (e.g., "INV-1234").
        - issue_date: The date the invoice was issued, as a string in "YYYY-MM-DD" format.
        - due_date: The due date for payment, as a string in "YYYY-MM-DD" format.
        - currency: The currency code as a string (e.g., "EUR").
        - total_amount: The total amount of the invoice as a number (e.g., 319.50).
        - vendor: The name of the vendor or company issuing the invoice as a string.
        `,
    schema: JSON.stringify(
     {
        invoice_no: { type: "string" },
        issue_date: { type: "string" },
        due_date: { type: "string" },
        total_amount: { type: "number" },
        currency: { type: "string" },
        vendor: { type: "string" }
     }, null, 2),
    additionalInstructions: `
        - If no or multiple currencies are mentioned, prioritize or default to EUR.
        - If total_amounts for different currencies are mentioned, choose the value that belongs to the chosen currency.
        `,
  };
  const promptInput = { ...staticParams, text };
  const result = await extractData(extractionPromptTemplate, promptInput);
  console.log("Extracted invoice data:", JSON.stringify(JSON.parse(result), null, 2));
  return result;
}