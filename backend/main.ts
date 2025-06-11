import { chunkDocuments, loadLocalDocuments } from "./file-loader/DirectoryLoader.ts";
import { addDocumentsToVectorStore, similaritySearch } from "./database/chroma-client.ts";


// Set these variables to test the worflows
const LOAD_AND_STORE = false;
const SEARCH = true;

// Similarity search parameters
const SEARCH_QUERY = "";
const kNN = 5;

// Chunking parameters
const CHUNK_SIZE = 150;
const CHUNK_OVERLAP = 25;

if (LOAD_AND_STORE) {
    const documents = await loadLocalDocuments();

    const chunkedDocuments = await chunkDocuments(documents, CHUNK_SIZE, CHUNK_OVERLAP);

    const result = await addDocumentsToVectorStore(chunkedDocuments);
    console.log("Added documents to vector store:", result);
    }

if (SEARCH) {
    const searchResult = await similaritySearch(SEARCH_QUERY, kNN);
    console.log("Search result:", searchResult);
}