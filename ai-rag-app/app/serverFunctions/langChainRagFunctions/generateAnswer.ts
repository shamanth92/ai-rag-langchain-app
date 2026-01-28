import { ChatOpenAI } from "@langchain/openai";
// import { RunnableSequence } from "@langchain/core/runnables";
import { RunnableLambda } from "@langchain/core/runnables";
import { retriever } from "./retrieve";
import { prompt } from "./prompt";

const llm = new ChatOpenAI({
    model: "gpt-5-mini",
});

// export const ragChain = RunnableSequence.from([
//   async (input) => {
//     const docs = await retriever._getRelevantDocuments(input.question);
//     return {
//       question: input.question,
//       context: docs.map((d) => d.pageContent).join("\n\n"),
//     };
//   },
//   prompt,
//   llm,
// ]);

const retrievalStep = RunnableLambda.from(async (input: { question: string }) => {
    const docs = await retriever._getRelevantDocuments(input.question);
    return {
      question: input.question,
      context: docs.map((d) => d.pageContent).join("\n\n"),
    };
});

export const ragChain = retrievalStep
  .pipe(prompt)
  .pipe(llm);