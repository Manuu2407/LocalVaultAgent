import { chunkDocuments, loadLocalDocuments } from "./file-loader/DirectoryLoader.ts";
import { addDocumentsToVectorStore, similaritySearch } from "./database/chroma-client.ts";
import { extractInvoiceData } from "./LLMs/finance.ts";

// Set these variables to test the worflows
const LOAD_AND_STORE = false;
const SEARCH = false;
const FINANCE = true;

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

if (FINANCE) {
  const documents = await loadLocalDocuments();
  const chunkedDocuments = await chunkDocuments(documents, CHUNK_SIZE, CHUNK_OVERLAP);
  await addDocumentsToVectorStore(chunkedDocuments);

  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    console.log(`Processing invoice ${i + 1} of ${documents.length}...`);
    const extractedData = await extractInvoiceData(doc.pageContent);
    let invoiceData;

    try { invoiceData = JSON.parse(extractedData); } 
    catch {
      console.error("Invalid JSON from extractInvoiceData:", extractedData);
      continue;
    }

    const response = await fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData),
    });

    if (response.ok) {
      console.log(`Extracted data saved to SQL-Database!`);
    } 
    else {
      const error = await response.json();
      console.error("Failed to save extracted data:", error);
    }

  }
}