import { ChromaClient } from "chromadb";

const chroma = new ChromaClient({
  host: "localhost",
  port: 8000,
});

async function check() {
  const collection = await chroma.getCollection({
    name: "phase2-rag",
  });

  const count = await collection.count();
  console.log("Vector count:", count);
}

check();
