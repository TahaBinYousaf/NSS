import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostItem = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle category selection
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleNext = async () => {
    if (!category) {
      setError("Please select a category before proceeding.");
      return;
    }
    setError("");

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/posts", {
        title: "My First Post",
        description: "This is a test post",
        category: category,
        location: "Lahore",
      });

      console.log("✅ Post Created:", response.data);

      // Navigate to the next screen and pass the category
      navigate("/post-details", { state: { category } });
    } catch (error) {
      console.error("❌ Error posting:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-center font-semibold">Post Your Ad</h2>
      <p className="text-center mt-3">Choose Your Category</p>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

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
            className={`w-full px-4 py-3 text-left border border-gray-300 rounded-md hover:bg-gray-100 ${
              category === item ? "bg-blue-200" : ""
            }`}
            onClick={() => handleCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-6 py-2 rounded-md disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Posting..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default PostItem;
