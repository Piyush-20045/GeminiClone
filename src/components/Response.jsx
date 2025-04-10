import axios from "axios";
import { useState } from "react";
import { assets } from "../assets/assets";

const apikey = import.meta.env.VITE_GEMINI_API_KEY;

export default function Response({ response, setResponse, textAreaRef }) {
  const [question, setQuestion] = useState("");

  const fetchData = async () => {
    try {
      setResponse("...loading");
      const res = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });
      setResponse(res.data.candidates[0].content.parts[0].text.replace(/\*/g, ""));
      setQuestion("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">

      {/* RESPONSE */}
      {response === "" ? null : (
        <pre className="flex p-4 mt-12 md:mx-6  rounded-2xl bg-gray-100 overflow-x-auto whitespace-pre-wrap break-words">
          {response}{" "}
        </pre>
      )}

      {/* TEXTAREA */}
      <div className="flex mt-8 w-full md:ml-18 md:w-4/5 border rounded-2xl bg-gray-100 sticky bottom-0">
        <textarea
          className="flex w-11/12 p-3 outline-none resize-none"
          ref={textAreaRef}
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          placeholder="Ask gemini"
        ></textarea>

        {question === "" ? null : (
          <button
            className="flex p-2 mt-10 ml-4 hover:bg-gray-200 rounded-full"
            onClick={fetchData}
          >
            <img src={assets.send_icon} className="ml-2 w-8 h-8" />
          </button>
        )}
      </div>
      
    </div>
  );
}
