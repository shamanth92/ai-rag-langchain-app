import OpenAI from "openai";

const client = new OpenAI();

export async function generateAnswer(prompt: string) {
  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: prompt,
  });

  return response.output_text;
}
