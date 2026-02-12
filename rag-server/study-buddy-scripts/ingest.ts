import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from "path";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const weeksPath = path.join(process.cwd(), "data/weeks");

// Get all week folders (week1, week2, etc.)
const weekFolders = fs.readdirSync(weeksPath);

// Load all PDFs from all weeks with metadata
const allDocuments = [];

for (const weekFolder of weekFolders) {
  const weekPath = path.join(weeksPath, weekFolder);
  const pdfFiles = fs
    .readdirSync(weekPath)
    .filter((file) => file.endsWith(".pdf"));

  for (const pdfFile of pdfFiles) {
    const loader = new PDFLoader(path.join(weekPath, pdfFile));
    const docs = await loader.load();

    // Add week metadata to each document
    docs.forEach((doc) => {
      doc.metadata.week = weekFolder; // e.g., "week1", "week2"
      doc.metadata.fileName = pdfFile;
    });

    allDocuments.push(...docs);
  }
}

console.log("allDocuments: ", allDocuments);

const splitter = new RecursiveCharacterTextSplitter({
  chunkOverlap: 200,
  chunkSize: 1000, // Larger chunks for academic content
});

const chunks = await splitter.splitDocuments(allDocuments);

const cleanedChunks = chunks.map((chunk) => ({
  ...chunk,
  metadata: {
    week: chunk.metadata.week,
    fileName: chunk.metadata.fileName,
    // Only include simple string/number/boolean values
  },
}));

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

await Chroma.fromDocuments(cleanedChunks, embeddings, {
  collectionName: "study-buddy-k8s",
  url: "http://localhost:8000",
});

console.log(
  `Ingested ${cleanedChunks.length} chunks from ${weekFolders.length} weeks`,
);
