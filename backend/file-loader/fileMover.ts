import { Document } from "@langchain/core/documents";
import { exists } from "jsr:@std/fs/exists";


const INVOICE_DOCUMENT_PATH = Deno.env.get("INVOICE_DOCUMENT_PATH") || "";
const APPOINTMENT_DOCUMENT_PATH = Deno.env.get("APPOINTMENT_DOCUMENT_PATH") || "";
const OTHER_DOCUMENT_PATH = Deno.env.get("OTHER_DOCUMENT_PATH") || "";

async function moveFile(sourcePath: string, destinationPath: string): Promise<void> {
  try {
    await Deno.rename(sourcePath, destinationPath);
    console.log(`File moved to ${destinationPath}`);
  } catch (error) {
    console.error(`Error moving file from ${sourcePath} to ${destinationPath}:`, error);
    throw error;
  }
}

export async function moveDocumentToCategory(document: Document, category: string): Promise<void> {
  const sourcePath = document.metadata?.source || undefined;
  const title = sourcePath?.split("\\").pop() || "Untitled"; 
  let destinationPath = "";
  switch (category) {
    case "invoice":
      destinationPath = `${INVOICE_DOCUMENT_PATH}/${title}`;
      break;
    case "appointment":
      destinationPath = `${APPOINTMENT_DOCUMENT_PATH}/${title}`;
      break;
    case "other":
      destinationPath = `${OTHER_DOCUMENT_PATH}/${title}`;
      break;
    default:
      throw new Error(`Unknown category: ${category}`);
  }
  if (await exists(sourcePath)) {
    await moveFile(sourcePath, destinationPath);
  } else {
    console.warn(`Source file does not exist: ${sourcePath}`);
  }
}