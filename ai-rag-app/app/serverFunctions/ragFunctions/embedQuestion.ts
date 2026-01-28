import OpenAI from "openai";

const client = new OpenAI();

export async function embedQuestion(question: string) {
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });

  return response.data[0].embedding;
}
