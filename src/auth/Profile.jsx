import { useState } from "react";
import DropDown from "../components/Dropdown";
import RenderWhen from "../components/RenderWhen";
import Label from "../components/Label";
import ProfileImg from "../assets/logo1.png";

export default function Profile({ selectedCategory }) {
  const [location, locationSet] = useState("");
  const [gender, genderSet] = useState("");

  return (
    <div className="container max-w-screen-xl mx-auto py-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
          {/** EDIT PROFILE HEADING */}
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Edit Profile" className="!text-4xl" />
          </div>

          {/** UPLOAD IMAGES */}
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Profile Photo*" />
            <div className="flex flex-row flex-wrap items-center flex-1 gap-4">
              <div className="relative cursor-pointer size-28 hover:bg-gray-200 rounded-full overflow-hidden ml-1">
                <img src={ProfileImg} className="size-full object-cover" />
              </div>
              <button className="cursor-pointer text-lg font-bold bg-blue-900 text-white p-3 rounded-md">Upload Photo</button>
            </div>
          </div>

          {/** DETAILS */}
          <div className="flex flex-col w-full justify-between gap-8 p-8">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name={"Name"} />
              <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg" placeholder="Enter Name" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name={"Date of birth"} />
              <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg" placeholder="DD/MM/YYYY" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Gender" />
              <DropDown placeholder="Select Gender" value={gender} valueSet={genderSet} dropDownValues={["Male", "Female", "Prefer not to say"]} />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name={"About Me"} />
              <textarea
                className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg min-h-52 max-h-52 resize-none"
                placeholder="About me (optional)"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Location" />
              <DropDown
                placeholder="Select Location"
                value={location}
                valueSet={locationSet}
                dropDownValues={[
                  "Defence Housing Society DHA",
                  "Gulberg",
                  "Model Town",
                  "Johar Town",
                  "Bahria Town",
                  "Garden Town",
                  "PCSIR",
                  "Cantonment Cantt",
                  "Askari Housing Society",
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Contact Information" className="!text-3xl w-full" />
          </div>
          {/** NAME */}
          <div className="flex flex-col w-full justify-between gap-8 p-8 border-b-2 border-b-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Phone Number" />
              <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg" placeholder="Phone number" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Email" />
              <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg" placeholder="Email" />
            </div>
          </div>

          <div className="flex w-full justify-end gap-8 p-8">
            <button className="w-fit flex items-center gap-2 cursor-pointer px-4 md:px-6 py-2 md:py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110">
              <span className="">Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
