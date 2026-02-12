import { createRagChainWithMemory } from "../serverFunctions/studyBuddyFunctions/generateAnswer";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const chatHistory: Array<HumanMessage | AIMessage> = [];

export async function POST(request: Request) {
  const { question, chatHistory, week } = await request.json();

  const chain = createRagChainWithMemory(week);

  // Convert plain objects back to Message objects
  const formattedHistory = chatHistory.map((msg: any) =>
    msg.role === "user"
      ? new HumanMessage(msg.content)
      : new AIMessage(msg.content),
  );

  console.log("formattedHistory: ", formattedHistory);

  const stream = await chain.stream({
    question,
    chat_history: formattedHistory,
  });

  // Create a ReadableStream for streaming response
  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
