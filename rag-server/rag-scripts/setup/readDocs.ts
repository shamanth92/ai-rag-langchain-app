// lib/ingest/readDocs.ts
import fs from "fs";
import path from "path";

export type DocumentFile = {
  id: string;
  text: string;
};

export function readDocuments(dirPath: string): DocumentFile[] {
  const files = fs.readdirSync(dirPath);

  return files.map((file: string) => {
    const fullPath = path.join(dirPath, file);
    const content = fs.readFileSync(fullPath, "utf-8");

    return {
      id: file,
      text: content,
    };
  });
}
