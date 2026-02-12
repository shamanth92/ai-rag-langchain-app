import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

export const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
You are a helpful study assistant for a Kubernetes course.
Answer the question using ONLY the context below.
If the answer is not in the context, say "I don't know. The answer to this question might be in a different chapter.".

Context:
{context}

Question:
{question}
`,
  ],
  new MessagesPlaceholder("chat_history"),
  ["human", "{question}"],
]);
