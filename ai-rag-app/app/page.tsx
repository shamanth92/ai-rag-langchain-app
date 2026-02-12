import Link from "next/link";
import FeaturesComponent from "./components/features";

export default function Home() {
  const FEATURES: Array<{ title: string; link: string }> = [
    { title: "Basic RAG Page", link: "/basicRag" },
    { title: "LangChain RAG Page", link: "/langChainRag" },
    { title: "K8s Study Buddy", link: "/studyBuddy" },
  ];

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
          {FEATURES.map((feature) => (
            <FeaturesComponent
              title={feature.title}
              link={feature.link}
              key={feature.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
