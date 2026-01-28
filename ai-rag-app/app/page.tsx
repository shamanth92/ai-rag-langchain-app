import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex justify-center font-sans h-20 bg-blue-800 text-white items-center">
        <p className="text-xl">
          AI RAG (Retrieval Augmented Generation) Application
        </p>
      </div>
      <div className="font-sans flex justify-center  items-center mt-10">
        <div className="flex gap-4 flex-col justify-center  items-center bg-blue-800 text-white p-10 rounded-md">
          <p className="text-xl">Ask Anything, Get Accurate Answers.</p>
          <p className="text-sm">
            Leverage custom documents to find precise, reliable information.
          </p>
        </div>
      </div>
      <div className="p-4 mt-10 font-sans flex justify-center  items-center">
        <div className="bg-blue-800 p-10 rounded-md border-2 border-black">
          <p className="text-xl text-white">RAG Apps:</p>
          <p className="text-sm text-white">
            Click on each to explore the RAG capabilities.
          </p>
          <button className="m-4 p-4 bg-sky-500 text-white rounded-md cursor-pointer">
            <Link href="/basicRag">Basic RAG Page</Link>
          </button>
          <button className="m-4 p-4 bg-sky-500 text-white rounded-md cursor-pointer">
            <Link href="/langChainRag">LangChain RAG Page</Link>
          </button>
          <button className="m-4 p-4 bg-sky-500 text-white rounded-md cursor-pointer">
            <Link href="/studyBuddy">Study Buddy</Link>
          </button>
          <button className="m-4 p-4 bg-sky-500 text-white rounded-md cursor-pointer">
            <Link href="/travelPlanner">Travel Planner</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
