import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const vectorStore = await Chroma.fromExistingCollection(embeddings, {
  collectionName: "study-buddy-k8s",
  url: "http://localhost:8000",
});

// Function to get retriever filtered by week
export const getRetrieverForWeek = (week: string) => {
  return vectorStore.asRetriever({
    k: 4,
    filter: { week: week }, // Filter by week metadata
  });
};

// Default retriever (searches all weeks)
export const retriever = vectorStore.asRetriever({ k: 4 });
