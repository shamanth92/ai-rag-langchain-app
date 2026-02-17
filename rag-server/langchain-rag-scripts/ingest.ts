import "dotenv/config";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import path from "path";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

const docsPath = path.join(process.cwd(), "data/docs");

const files = fs.readdirSync(docsPath);

const loaders = files.map((file) => new TextLoader(path.join(docsPath, file)));

const documents = (
  await Promise.all(loaders.map((loader) => loader.load()))
).flat();

const splitter = new RecursiveCharacterTextSplitter({
  chunkOverlap: 100,
  chunkSize: 500,
});

const chunks = await splitter.splitDocuments(documents);

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const supabaseClient = createClient(
  process.env.SUPABASE_DATABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

await SupabaseVectorStore.fromDocuments(chunks, embeddings, {
  client: supabaseClient,
  tableName: process.env.TABLE_NAME_LANGCHAIN!,
});
