import Categories from "../components/Categories";
import Image1 from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import RenderWhen from "../components/RenderWhen";
import { LuArrowLeft } from "react-icons/lu";
import DropDown from "../components/Dropdown";
import ImagePicker from "../components/ImagePicker";
import Label from "../components/Label";

const adProps = {
  "Item request": {
    heading: "Item's Name*",
    description: "Item's Description*",
    hideCondition: true,
    hidePrice: true,
    hideImages: true,
  },
  Resources: {
    heading: "Name*",
    description: "Description*",
    hideCondition: true,
    resourceType: true,
    hidePrice: true,
  },
  Events: {
    heading: "Name*",
    description: "Description*",
    hideCondition: true,
    hidePrice: true,
  },
  Services: {
    heading: "Service's Name*",
    description: "Service's Description*",
    priceHeading: "Service's Charges*",
    pricePlaceHolder: "Enter charges (PKR)",
    hideCondition: true,
  },
};

export default function PostAd() {
  const navigate = useNavigate();
  const [selectedCategory, selectedCategorySet] = useState(null);
  console.log(selectedCategory);

  return (
    <>
      <Nav />
      <div className="flex flex-col gap-4 py-10 container mx-auto max-w-screen-2xl">
        <div className="flex items-center justify-between gap-4 px-8">
          <button onClick={() => (selectedCategory ? selectedCategorySet("") : navigate("/"))} className="relative z-10 cursor-pointer">
            <LuArrowLeft className="size-8" color="#1c398e" />
          </button>
          <div className="text-4xl text-left font-bold uppercase">Post Your ad</div>
          <div className="flex" />
        </div>
        {selectedCategory ? (
          <div className="p-4">
            <Form selectedCategory={selectedCategory} selectedCategorySet={selectedCategorySet} />
          </div>
        ) : (
          <Categories header="Choose Category" customLinkClick categorySet={selectedCategorySet} adProps={adProps} />
        )}
      </div>
    </>
  );
}

function Nav() {
  return (
    <nav className="shadow-md px-4 md:px-8 py-6 bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full">
          <NavLink to={"/"}>
            <img src={Image1} alt="Logo" className="w-13 md:w-17 cursor-pointer object-contain" />
          </NavLink>
          <h1 className="hidden md:block text-3xl">|</h1>
          <h1 className="text-lg italic font-serif">Connect with your community</h1>
        </div>
      </div>
    </nav>
  );
}

function Form({ selectedCategory, selectedCategorySet, request = false }) {
  const [condition, conditionSet] = useState("");
  const [location, locationSet] = useState("");
  const [showPhoneNo, showPhoneNoSet] = useState(true);
  const changeCategory = () => selectedCategorySet("");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
        {/** CATEGORY */}
        <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
          <Label name="Category*" />
          <div className="flex flex-row justify-between items-center flex-1">
            <div className="flex items-center gap-4">
              <img src={selectedCategory?.imageSrc} className="size-20 rounded-full" />
              <div className="font-bold text-lg">{selectedCategory?.name}</div>
            </div>
            <button onClick={changeCategory} className="text-lg text-blue-500 cursor-pointer">
              Change
            </button>
          </div>
        </div>

        {/** UPLOAD IMAGES */}
        <RenderWhen is={!selectedCategory?.hideImages}>
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Upload Images*" />
            <div className="flex flex-row flex-wrap items-center flex-1 gap-4">
              {Array.from({ length: 11 })
                .fill(0)
                .map((_, index) => {
                  return <ImagePicker cameraIcon={index} />;
                })}
            </div>
          </div>
        </RenderWhen>

        {/** AD DETAILS */}
        <div className="flex flex-col w-full justify-between gap-8 p-8">
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <Label name={selectedCategory?.heading ?? "Ad title*"} />
            <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg" placeholder="Enter title" />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <Label name={selectedCategory?.description ?? "Description*"} />
            <textarea className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg min-h-52 max-h-52 resize-none" placeholder="Enter description" />
          </div>

          <RenderWhen is={selectedCategory?.resourceType}>
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Resource Type*" />
              <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg" placeholder="Enter resource type" />
            </div>
          </RenderWhen>

          <RenderWhen is={!selectedCategory?.hideCondition}>
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Condition*" />
              <DropDown placeholder="Select Condition" value={condition} valueSet={conditionSet} dropDownValues={["New", "Used"]} />
            </div>
          </RenderWhen>

          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <Label name="Location*" />
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

      {/** PRICE */}
      <RenderWhen is={!selectedCategory?.hidePrice}>
        <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
          {/** PRICE */}
          <div className="flex flex-col w-full justify-between gap-8 p-8">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name={selectedCategory?.priceHeading ?? "Price*"} />
              <input
                className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg"
                placeholder={selectedCategory?.pricePlaceHolder ?? "Enter price (PKR)"}
              />
            </div>
          </div>
        </div>
      </RenderWhen>

      <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
        {/** NAME */}
        <div className="flex flex-col w-full justify-between gap-8 p-8 border-b-2 border-b-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <Label name="Name*" />
            <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg" placeholder="Enter name" />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <Label name="Phone Number*" />
            <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg" placeholder="Enter phone number" />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 flex-1 justify-between">
            <Label name="Show my phone number in ads?" />
            <div
              className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all duration-300 ${
                showPhoneNo ? "bg-green-900" : "bg-gray-400"
              }`}
              onClick={() => showPhoneNoSet(pre => !pre)}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  showPhoneNo ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end gap-8 p-8">
          <button className="w-fit flex items-center gap-2 cursor-pointer px-4 md:px-6 py-2 md:py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110">
            <span className="">Post now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
