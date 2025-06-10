import { loadLocalDocuments } from "./file-loader/DirectoryLoader.ts";
import { addDocumentsToVectorStore } from "./database/chroma-client.ts";

const documents = await loadLocalDocuments();

console.log(await addDocumentsToVectorStore(documents));