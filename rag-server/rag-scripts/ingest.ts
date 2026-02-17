import "dotenv/config";
import path from "path";
import { readDocuments } from "./setup/readDocs.ts";
import { chunkText } from "./setup/chunk.ts";
import { embedTexts } from "./setup/embedding.ts";
import { storeEmbeddings } from "./setup/supabaseVector.ts";

async function ingest() {
  const docsPath = path.join(process.cwd(), "data/docs");
  const documents = readDocuments(docsPath);

  const allChunks: string[] = [];
  const metadatas: any[] = [];

  documents.forEach((doc) => {
    const chunks = chunkText(doc.text);
    chunks.forEach((chunk, index) => {
      allChunks.push(chunk);
      metadatas.push({
        source: doc.id,
        chunkIndex: index,
      });
    });
  });

  const embeddings = await embedTexts(allChunks);

  await storeEmbeddings({
    tableName: process.env.TABLE_NAME_BASIC!,
    embeddings,
    documents: allChunks,
    metadatas,
  });

  console.log("✅ Ingestion complete", allChunks);
}

ingest();
