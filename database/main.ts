import { getOrCreateCollection } from "./chroma-client.ts";

console.log(await getOrCreateCollection("local_documents"));