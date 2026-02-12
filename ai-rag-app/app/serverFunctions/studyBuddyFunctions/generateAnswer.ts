import { ChatOpenAI } from "@langchain/openai";
import { RunnableLambda } from "@langchain/core/runnables";
import { getRetrieverForWeek, retriever } from "./retrieve";
import { prompt } from "./prompt";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const llm = new ChatOpenAI({
  model: "gpt-5-mini",
});

export const createRagChainWithMemory = (week?: string) => {
  const currentRetriever = week ? getRetrieverForWeek(week) : retriever;

  const retrievalStep = RunnableLambda.from(
    async (input: {
      question: string;
      chat_history: Array<HumanMessage | AIMessage>;
    }) => {
      const docs = await currentRetriever._getRelevantDocuments(input.question);
      return {
        question: input.question,
        context: docs.map((d) => d.pageContent).join("\n\n"),
        chat_history: input.chat_history,
      };
    },
  );

  return retrievalStep.pipe(prompt).pipe(llm).pipe(new StringOutputParser());
};
