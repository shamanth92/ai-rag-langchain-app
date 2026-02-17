import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const supabaseClient = createClient(
  process.env.SUPABASE_DATABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: process.env.TABLE_NAME_LANGCHAIN!,
});

export const retriever = vectorStore.asRetriever({ k: 4 });
