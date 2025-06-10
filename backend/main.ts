import { loadLocalDocuments } from "./file-loader/DirectoryLoader.ts";
import { addDocumentsToVectorStore } from "../backend/database/chroma-client.ts";

console.log(await addDocumentsToVectorStore(await loadLocalDocuments()));