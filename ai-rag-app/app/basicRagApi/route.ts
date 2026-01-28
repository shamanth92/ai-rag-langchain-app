import { embedQuestion } from "../serverFunctions/ragFunctions/embedQuestion";
import { retrieveChunks } from "../serverFunctions/ragFunctions/retrieve";
import { buildRagPrompt } from "../serverFunctions/ragFunctions/buildPrompt";
import { generateAnswer } from "../serverFunctions/ragFunctions/generateAnswer";

export async function POST(request: Request) {
  const { question } = await request.json();
  const queryEmbedding = await embedQuestion(question);
  const chunks = await retrieveChunks(queryEmbedding);
  const prompt = buildRagPrompt(chunks as string[], question);
  const answer = await generateAnswer(prompt);

  return new Response(JSON.stringify({ answer }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
