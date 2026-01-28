import { ChromaClient } from "chromadb";

const chroma = new ChromaClient({
  host: "localhost",
  port: 8000,
});

export async function retrieveChunks(
  queryEmbedding: number[],
  topK = 4
) {
  const collection = await chroma.getCollection({
    name: "phase2-rag",
    // embeddingFunction: null, // IMPORTANT
  });

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: topK,
  });

  return results.documents?.[0] || [];
}
