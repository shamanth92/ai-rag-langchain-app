"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Hourglass } from "react-loader-spinner";

export default function BasicRagPage() {
  const [ragResponse, setRagResponse] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  type FormData = {
    prompt: string;
  };

  const {
    register,
    handleSubmit,
    // formState: { errors },
    // reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setShowSpinner(true);
    setRagResponse("");
    const res = await fetch(`/basicRagApi`, {
      method: "POST",
      body: JSON.stringify({ question: data.prompt }),
    });
    const answerRag = await res.json();
    setRagResponse(answerRag.answer);
    setShowSpinner(false);
  };

  return (
    <div>
      <div className="flex flex-col justify-center font-sans h-20 bg-blue-800 text-white items-center">
        <p className="text-xl">Basic RAG Page</p>
        <p className="text-sm">
          This is a basic Retrieval-Augmented Generation (RAG) page.
        </p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center mt-10 p-3 font-sans">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <textarea
              {...register("prompt")}
              className="w-[40vw] h-60 border-2 border-blue-800 rounded-md bg-white text-black"
            />
            <button
              type="submit"
              className="h-10 text-white bg-blue-800 cursor-pointer rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
        {showSpinner && ragResponse === "" && (
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        )}
        {!showSpinner && ragResponse !== "" && (
          <div className="mt-10 border-2 p-3 rounded-md border-blue-800">
            <p className="text-blue-800 font-sans">
              RAG Response: {ragResponse}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
