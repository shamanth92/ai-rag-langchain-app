import { ChromaClient } from "chromadb";

export const chroma = new ChromaClient({
  host: "localhost",
  port: 8000,
});

export async function storeEmbeddings({
  collectionName,
  embeddings,
  documents,
  metadatas,
}: {
  collectionName: string;
  embeddings: number[][];
  documents: string[];
  metadatas: any[];
}) {
  const collection = await chroma.getOrCreateCollection({
    name: collectionName,
    embeddingFunction: null,
  });

  const ids = metadatas.map((m) => `${m.source}::chunk-${m.chunkIndex}`);

  await collection.add({
    ids,
    embeddings,
    documents,
    metadatas,
  });
}
