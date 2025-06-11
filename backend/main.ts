import { loadLocalDocuments } from "./file-loader/DirectoryLoader.ts";
import { addDocumentsToVectorStore, similaritySearch } from "./database/chroma-client.ts";


// Set these variables to test the worflows
const LOAD_AND_STORE = false;
const SEARCH = true;

const SEARCH_QUERY = "";
const kNN = 2;

if (LOAD_AND_STORE) {
    const documents = await loadLocalDocuments();

    const result = await addDocumentsToVectorStore(documents);
    console.log("Added documents to vector store:", result);
    }

if (SEARCH) {
    const searchResult = await similaritySearch(SEARCH_QUERY, kNN);
    console.log("Search result:", searchResult);
}