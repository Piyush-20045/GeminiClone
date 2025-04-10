import { assets } from "../assets/assets";
import { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Response from "./Response";

function Home() {
  const [response, setResponse] = useState("");
  const textAreaRef = useRef(null);

  const handleNewChat = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }

  return (
    <div className="h-full flex">
      {/* SIDEBAR */}
      <Sidebar onNewChat={handleNewChat}/>

      {/* MAIN */}
      <div className="flex flex-col p-4 md:pl-5 w-full">

        <div className="flex">
          <p className="ml-5 lg:mt-3 text-gray-600 text-xl cursor-pointer">
            <a href="/">Gemini</a>
          </p>
        </div>

        {/* BRAINSTORMING */}
        {response === "" ? (
          <div className="flex gap-2 justify-center mt-12 tab:-ml-39">
            <img src={assets.brainstorm} className="mt-1 w-15 h-14" />
            <div>
              <h2 className="text-3xl">Brainstormer</h2>
              <p className="inline">
                Find inspiration easily. Fresh ideas for parties, gifts,
                businesses and more.
              </p>
            </div>
          </div>
        ) : null}

        {/* BRAINSTORMING PROMPTS */}
        {response === "" ? (
          <div className="hidden lg:flex justify-center gap-2 mt-8 h-40 text-xs md:text-sm font-sans">
            <p className="p-5 w-44 rounded-4xl bg-gray-100 hover:bg-gray-200 ">
              What are some fun picnic ideas for kids?
            </p>
            <p className="p-5 w-44 rounded-4xl bg-gray-100 hover:bg-gray-200 ">
              Help me plan a large family reunion to host at my house.
            </p>
            <p className="p-5 w-44 rounded-4xl bg-gray-100 hover:bg-gray-200 ">
              Affordable and creative gift ideas for my friend’s birthday.
            </p>
            <p className="p-5 w-44 rounded-4xl bg-gray-100 hover:bg-gray-200 ">
              How to decorate an office space to look cosier yet professional?
            </p>
          </div>
        ) : null}

        <Response response={response} setResponse={setResponse} textAreaRef={textAreaRef}/>

        <p className="text-xs text-center text-y-end mt-12">Gemini can make mistakes, so double-check it</p>
      </div>
    </div>
  );
}

export default Home;
