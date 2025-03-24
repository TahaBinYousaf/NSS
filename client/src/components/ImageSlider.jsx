import getImagePath from "@/utils/getImagePath";
import { useState } from "react";

export default function ImageSlider({ images }) {
  const [active, activeSet] = useState(0);
  return (
    <div className="size-full mx-auto">
      <div id="default-carousel" className="relative rounded-lg overflow-hidden shadow-lg" data-carousel="static">
        <div className="relative h-80 md:h-[500px]">
          <div className={`size-full animate-image relative duration-700 ease-in-out"`}>
            <img src={getImagePath(images[active])} className="object-cover size-full" alt="Slide 2" />
          </div>
        </div>

        <button
          onClick={() => active > 0 && activeSet(pre => pre - 1)}
          type="button"
          className="cursor-pointer flex absolute top-1/2 left-3 z-40 items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-gray-300 focus:outline-none transition"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button
          onClick={() => active < images.length - 1 && activeSet(pre => pre + 1)}
          type="button"
          className="cursor-pointer flex absolute top-1/2 right-3 z-40 items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-gray-300 focus:outline-none transition"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
