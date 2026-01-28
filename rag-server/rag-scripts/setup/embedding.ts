import OpenAI from "openai";

const client = new OpenAI();

export async function embedTexts(texts: string[]) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  return response.data.map((item) => item.embedding);
}
