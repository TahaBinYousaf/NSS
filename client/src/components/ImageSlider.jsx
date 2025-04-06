import getImagePath from "@/utils/getImagePath";
import { useState } from "react";
import PropTypes from 'prop-types';

export default function ImageSlider({ images }) {
  const [active, activeSet] = useState(0);
  
  // If no images or empty array, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="size-full mx-auto">
        <div id="default-carousel" className="relative rounded-lg overflow-hidden shadow-lg" data-carousel="static">
          <div className="relative h-80 md:h-[500px]">
            <div className="size-full flex items-center justify-center bg-gray-100">
              <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
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

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};
