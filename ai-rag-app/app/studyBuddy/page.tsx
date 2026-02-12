import { StudyBuddyLayout } from "../components/studyBuddyLayout";

export default function LangChainRagPage() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-300 font-sans">
      {/* Header */}
      <div className="h-18 min-h-18 bg-white shadow-md items-center flex pl-10 border-gray-100 border-b">
        <p className="text-xl">Study Buddy RAG App</p>
      </div>

      {/* Main Content - Added pr-5 to the container below */}
      <div className="flex-1 p-5 pr-15 overflow-hidden flex flex-col">
        <p className="text-lg font-extrabold uppercase">SELECT A WEEK</p>
        <StudyBuddyLayout />
      </div>
    </div>
  );
}
