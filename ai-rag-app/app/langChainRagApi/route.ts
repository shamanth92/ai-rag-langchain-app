import { ragChain } from "../serverFunctions/langChainRagFunctions/generateAnswer";

export async function POST(request: Request) {
  const { question } = await request.json();
  const response = await ragChain.invoke({ question });
  const answer = response.content;

  return new Response(JSON.stringify({ answer }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
