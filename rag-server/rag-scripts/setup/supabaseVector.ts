import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_DATABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

export async function storeEmbeddings({
  tableName,
  embeddings,
  documents,
  metadatas,
}: {
  tableName: string;
  embeddings: number[][];
  documents: string[];
  metadatas: any[];
}) {
  const rows = documents.map((doc, i) => ({
    content: doc,
    embedding: embeddings[i],
    metadata: metadatas[i],
  }));

  const { data, error } = await supabase.from(tableName).insert(rows);

  if (error) {
    throw new Error(`Error inserting embeddings: ${error.message}`);
  }

  return data;
}
