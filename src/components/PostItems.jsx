// src/components/PostItem.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostItem = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // Handle category selection
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleNext = () => {
    if (category) {
      // Navigate to the next screen to post item details (can be a form or another step)
      navigate("/post-details", { state: { category } });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-center font-semibold">Post Your Ad</h2>
      <p className="text-center mt-3">Choose Your Category</p>

      <div className="space-y-3 mt-5">
        {[
          "Defence Housing Society DHA",
          "Gulberg",
          "Model Town",
          "Johar Town",
          "Bahria Town",
          "Garden Town",
          "PCSIR",
        ].map((item, index) => (
          <button
            key={index}
            className="w-full px-4 py-3 text-left border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={() => handleCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostItem;
