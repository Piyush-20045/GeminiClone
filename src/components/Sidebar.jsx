import { assets } from "../assets/assets";
import { useState } from "react";

function Sidebar({onNewChat}) {
  const [Open, SetOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col gap-4 bg-gray-100 lg:p-3 sticky top-0 z-10">
      
      {/* DESKTOP MENUICON */}
      <div
        onClick={() => SetOpen((prev) => !prev)}
        className="hover:bg-gray-200 w-12 rounded-4xl cursor-pointer"
      >
        <img src={assets.menu_icon} className="w-6 m-3" />
      </div>

      <div>
        {/* NEW CHAT BUTTON and RECENTS */}
        <div className="mt-3">
          <button onClick={onNewChat} className="flex gap-2 h-10 px-4 py-2 bg-gray-200 cursor-pointer rounded-xl hover:bg-gray-300">
            <img src={assets.plus_icon} className="w-4 cursor-pointer" />
            {Open ? <p className=" font-bold text-gray-500">New Chat</p> : null}
          </button>

          <div className="mt-7 mx-3 flex flex-col gap-1 text-gray-900 text-sm">
            {Open ? <p>Recents</p> : null}
            {Open ? (
              <p className="mt-1 flex gap-1">
                <img src={assets.message_icon} className="w-5 h-6" /> what is
                react js and node
              </p>
            ) : null}
            {Open ? (
              <p className="mt-1 flex gap-1">
                <img src={assets.message_icon} className="w-5 h-6" /> what is react
              </p>
            ) : null}
          </div>
        </div>

        {/* OPTIONS */}
        <div className="ml-1 h-full w-full flex justify-end flex-col w-full text-gray-800">
          <div className="flex gap-3 cursor-pointer hover:bg-gray-200 rounded-4xl p-2 w-11/12">
            <img src={assets.question_icon} className="w-6" />
            {Open ? <p>Help</p> : null}
          </div>
          <div className="flex gap-3 cursor-pointer hover:bg-gray-200 rounded-4xl p-2 w-11/12">
            <img src={assets.history_icon} className="w-6" />
            {Open ? <p>Activity</p> : null}
          </div>
          <div className="flex gap-3 cursor-pointer hover:bg-gray-200 rounded-4xl p-2 w-11/12">
            <img src={assets.setting_icon} className="w-6" />
            {Open ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
