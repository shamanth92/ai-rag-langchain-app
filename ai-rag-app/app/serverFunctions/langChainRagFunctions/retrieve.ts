import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small"
});

const vectorStore = await Chroma.fromExistingCollection(embeddings, {
    collectionName: "phase3-rag",
    url: "http://localhost:8000"
});

export const retriever = vectorStore.asRetriever({ k: 4 })