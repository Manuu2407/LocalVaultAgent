import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { BaseDocumentLoader } from "@langchain/core/document_loaders/base";
import "jsr:@std/dotenv/load";

const directory = Deno.env.get("DOCUMENT_POOL_PATH") || "";

export async function loadDocuments() {
  const loader = new DirectoryLoader(
    directory,
    {
      ".json": (path) => new JSONLoader(path),
      ".txt": (path) => new TextLoader(path),
      ".csv": (path) => new CSVLoader(path) as BaseDocumentLoader,
      ".pdf": (path) => new PDFLoader(path) as BaseDocumentLoader,
    }
  );
  return await loader.load();
}