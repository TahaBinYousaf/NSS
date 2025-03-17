import { useState } from "react";
import DropDown from "../components/Dropdown";
import RenderWhen from "../components/RenderWhen";
import Label from "../components/Label";
import ProfileImg from "../assets/logo1.png";

export default function Chat({ selectedCategory }) {
  const [location, locationSet] = useState("");
  const [gender, genderSet] = useState("");

  return (
    <div className="container max-w-screen-xl mx-auto py-10 ">
      <div className="flex flex-col justify-between rounded-lg bg-white border-2 border-gray-200 w-full max-h-full h-screen">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
          <Label name="Chat" className="!text-4xl" />
        </div>
        {/** NAME */}
        <div className="flex flex-col w-full gap-3 p-8 overflow-auto">
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <div className="max-w-1/2 bg-gray-300 text-black rounded-md p-4">Hey you there ...</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-end ">
            <div className="max-w-1/2 bg-blue-900 text-white rounded-md p-4">Hey you there ...</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <div className="max-w-1/2 bg-gray-300 text-black rounded-md p-4">Hey you there ...</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-end ">
            <div className="max-w-1/2 bg-blue-900 text-white rounded-md p-4">Hey you there ...</div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <div className="max-w-1/2 bg-gray-300 text-black rounded-md p-4">Hey you there ...</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-end ">
            <div className="max-w-1/2 bg-blue-900 text-white rounded-md p-4">Hey you there ...</div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <div className="max-w-1/2 bg-gray-300 text-black rounded-md p-4">Hey you there ...</div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-end ">
            <div className="max-w-1/2 bg-blue-900 text-white rounded-md p-4">Hey you there ...</div>
          </div>
        </div>

        <div className="flex w-full justify-end gap-8 p-8 border-t-2 border-t-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg" placeholder="Type a message" />
          </div>
          <button className="w-fit flex items-center gap-2 cursor-pointer px-4 md:px-6 py-2 md:py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110">
            <span className="">Send Message</span>
          </button>
        </div>
      </div>
    </div>
  );
}
