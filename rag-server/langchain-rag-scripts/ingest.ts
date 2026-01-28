import { TextLoader } from "@langchain/classic/document_loaders/fs/text"
import path from "path";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const docsPath = path.join(process.cwd(), "data/docs");

const files = fs.readdirSync(docsPath);

const loaders = files.map((file) => new TextLoader(path.join(docsPath, file)));

const documents = (await Promise.all(loaders.map(loader => loader.load()))).flat();

const splitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 100,
    chunkSize: 500,
});

const chunks = await splitter.splitDocuments(documents);

const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small"
});

await Chroma.fromDocuments(chunks, embeddings, {
    collectionName: "phase3-rag",
    url: "http://localhost:8000"
});