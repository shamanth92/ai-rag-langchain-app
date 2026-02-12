"use client";
import clsx from "clsx";
import { Hourglass } from "react-loader-spinner";
import { WEEKLYCONTENT } from "../../data/content";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import Markdown from "react-markdown";

export function StudyBuddyLayout() {
  const [chapters, setChapters] = useState(-1);
  const [ragResponse, setRagResponse] = useState<string[]>([]);
  const [queries, setQueries] = useState<string[]>([]);
  const [value, setValue] = useState("option1");
  const [chatHistory, setChatHistory] = useState<
    Array<HumanMessage | AIMessage>
  >([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [queries, ragResponse]);

  type FormData = {
    prompt: string;
  };

  const { register, handleSubmit, reset } = useForm<FormData>();

  const showChapters = (i: number): void => {
    setChapters(i);
  };

  const onSubmit = async (data: FormData): Promise<void> => {
    setQueries([...queries, data.prompt]);
    setRagResponse((prev) => [...prev, ""]);

    const week = WEEKLYCONTENT[chapters].week.toLowerCase().replace(/\s+/g, "");
    const res = await fetch(`/studyBuddyApi`, {
      method: "POST",
      body: JSON.stringify({
        question: data.prompt,
        week: value === "option1" ? week : "",
        chatHistory: chatHistory.map((msg) => ({
          role: msg instanceof HumanMessage ? "user" : "assistant",
          content: msg.content,
        })),
      }),
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    let text = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      text += decoder.decode(value);
      setRagResponse((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = text; // overwrite last stream only
        return updated;
      });
    }

    setChatHistory([
      ...chatHistory,
      new HumanMessage(data.prompt),
      new AIMessage(text),
    ]);
  };

  const startNewChat = () => {
    reset();
    setRagResponse([]);
    setQueries([]);
    setChatHistory([]);
  };

  return (
    <div className="grid grid-cols-[40%_60%] gap-8 mt-5 flex-1 min-h-0">
      {/* LEFT COLUMN (40%) */}
      <div className="flex flex-row gap-4 overflow-y-auto">
        <div>
          {WEEKLYCONTENT.map((content, i) => (
            <div key={content.week} className="p-2">
              <button
                className={clsx(
                  "w-80 h-12 cursor-pointer rounded-md shadow-lg flex items-center justify-start px-4 transition-colors hover:bg-sky-300",
                  chapters === i ? "bg-sky-300" : "bg-white ",
                )}
                onClick={() => showChapters(i)}
              >
                {content.week}: {content.topic}
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 w-full">
          {/* Chapters Display */}
          {chapters !== -1 && (
            <div className="bg-white p-4 w-full h-fit shadow-md rounded-md">
              <p className="text-lg font-bold">Chapters:</p>
              <div className="mt-5">
                {WEEKLYCONTENT[chapters].concepts.map((lesson, j) => (
                  <ul key={j} className="p-1 list-disc ml-4">
                    <li>{lesson}</li>
                  </ul>
                ))}
              </div>
            </div>
          )}

          {chapters !== -1 && (
            <div className="bg-white p-4 w-full h-fit shadow-md rounded-md">
              <p className="font-sans text-lg font-bold">Ask Questions From</p>
              <div className="flex flex-col gap-6 mt-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="example"
                    value="option1"
                    checked={value === "option1"}
                    onChange={() => setValue("option1")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-800">Selected Week</span>
                </label>

                {/* Option 2 */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="example"
                    value="option2"
                    checked={value === "option2"}
                    onChange={() => setValue("option2")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-800">Entire Course</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN (60%) */}
      {chapters !== -1 && (
        <div className="bg-white rounded-md shadow-sm h-full min-h-0 flex flex-col">
          <div className="p-8 flex flex-col gap-4 h-full">
            <div className="flex justify-between">
              <p className="text-lg font-bold">ASK A QUESTION</p>
              {queries.length > 0 && (
                <button
                  className="p-2 text-sm bg-gray-500 text-white font-sans rounded-md cursor-pointer"
                  onClick={() => startNewChat()}
                >
                  New Chat
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between">
                <textarea
                  {...register("prompt", {
                    required: "Prompt is required",
                  })}
                  className="w-4/5 h-24 p-2 border-2 border-gray-400 rounded-md bg-white text-black"
                />
                <button className="w-1/6 p-3 bg-sky-500 rounded-md cursor-pointer">
                  Ask
                </button>
              </div>
            </form>

            <div className="border-gray-400 bg-white border-2 mt-3 rounded-md flex-1 overflow-y-auto scrollbar-none">
              {queries.map((query, i) => (
                <div className="flex flex-col gap-4 p-3" key={query}>
                  <div className="p-4 bg-gray-200 rounded-md w-3/4">
                    <p className="font-sans">{query}</p>
                  </div>
                  {ragResponse[i] && (
                    <div className="p-4 bg-sky-400 text-white rounded-md w-3/4 self-end">
                      <Markdown>{ragResponse[i]}</Markdown>
                    </div>
                  )}
                  {!ragResponse[i] && (
                    <div className="flex justify-center items-center h-full w-full">
                      <Hourglass
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={["#306cce", "#72a1ed"]}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
