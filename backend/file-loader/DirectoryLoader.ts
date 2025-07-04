import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { BaseDocumentLoader } from "@langchain/core/document_loaders/base";
import { TokenTextSplitter } from "@langchain/textsplitters";
import "jsr:@std/dotenv/load";
import { Document } from "@langchain/core/documents";
import console from "node:console";
import { wrapSDK } from "langsmith/wrappers";

const DOCUMENT_PATHS: Record<string, string> = {
  pool: Deno.env.get("DOCUMENT_POOL_PATH") || "",
  invoice: Deno.env.get("INVOICE_DOCUMENT_PATH") || "",
  appointment: Deno.env.get("APPOINTMENT_DOCUMENT_PATH") || "",
  other: Deno.env.get("OTHER_DOCUMENT_PATH") || "",
};

export async function loadLocalDocuments(type: keyof typeof DOCUMENT_PATHS) {
  const path = DOCUMENT_PATHS[type];
  if (!path) {
    throw new Error(`No path configured for document type: ${type}`);
  }
  console.log(`Loading documents from directory: ${path}...`);
  const loader = wrapSDK(new DirectoryLoader(
    path,
    {
      ".json": (path) => wrapSDK(new JSONLoader(path)),
      ".txt": (path) => wrapSDK(new TextLoader(path)),
      ".csv": (path) => wrapSDK(new CSVLoader(path) as BaseDocumentLoader),
      ".pdf": (path) => wrapSDK(new PDFLoader(path) as BaseDocumentLoader),
    }
  ));
  const documents = await loader.load();
  console.log(`Loaded ${documents.length} documents from ${path}`);
  return documents;
}

export async function chunkDocuments(
  documents: Document<Record<string, any>>[],
  chunkSize: number,
  chunkOverlap: number
) {
  const chunkedDocuments: Document<Record<string, any>>[] = [];
  console.log(`Chunking ${documents.length} documents...`);
  for (const doc of documents) {
    const chunks = await chunk(doc.pageContent, chunkSize, chunkOverlap);
    chunkedDocuments.push(
      ...chunks.map(chunkText => ({
        pageContent: chunkText,
        metadata: doc.metadata,
      }))
    );
  }
  console.log(`Chunked into ${chunkedDocuments.length} documents`);
  return chunkedDocuments;

}

async function chunk(text: string, chunkSize: number, chunkOverlap: number): Promise<string[]> {
  const textSplitter = wrapSDK(new TokenTextSplitter({
    chunkSize,
    chunkOverlap,
  }));
  return await textSplitter.splitText(text);
}