import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_DATABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

export async function retrieveChunks(queryEmbedding: number[], topK = 4) {
  const { data, error } = await supabase.rpc("match_basicrag", {
    query_embedding: queryEmbedding,
    match_count: topK,
  });

  if (error) {
    console.error("Supabase retrieval error:", error);
    return [];
  }

  return data?.map((row: any) => row.content) || [];
}
