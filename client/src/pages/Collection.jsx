import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import config from "@/config/config";
import { useGetPostsByCategoryQuery } from "@/services/nodeApi";
import Loader from "@/components/Loader";
import { PostCard } from "@/components/PostCard";

const Collection = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  if (!config.CATEGORIES.includes(category)) {
    navigate("/");
    return null;
  }

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [filterOption, setFilterOption] = useState("desc");

  const { data, isLoading, isFetching, refetch } = useGetPostsByCategoryQuery({
    category,
    option: filterOption,
  });

  const handleFilterChange = option => {
    setFilterOption(option === filterOption ? "Featured" : option);
    refetch();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 py-10 px-4">
      {/* Filter sidebar */}
      <div className="min-w-[200px] mt-16 sm:min-w-[250px]">
        <p
          onClick={() => setFilterMenuOpen(!filterMenuOpen)}
          className="ml-6 text-2xl mt-[-45px] mb-10 font-semibold flex items-center cursor-pointer gap-2 transition duration-300 ease-in-out sm:hidden"
        >
          Filter
          <IoIosArrowForward className={`pt-1 transform ${filterMenuOpen ? "rotate-90" : ""} transition-transform duration-300`} />
        </p>

        <div className={`p-4 mt-4 border border-gray-300 transition-all duration-300 ease-in-out ${filterMenuOpen ? "" : "hidden sm:block"}`}>
          <p className="mb-3 text-lg font-semibold text-gray-800">SORT BY</p>
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="filterOption"
                className="accent-[#090909] w-4 h-4"
                checked={filterOption === "desc"}
                onChange={() => handleFilterChange("desc")}
              />
              <span>Date - new to old</span>
            </label>
            <hr className="border-t border-gray-300" />

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="filterOption"
                className="accent-[#090909] w-4 h-4"
                checked={filterOption === "asc"}
                onChange={() => handleFilterChange("asc")}
              />
              <span>Date - old to new</span>
            </label>
          </div>
        </div>
      </div>

      {/* Items display */}
      <div className="flex-1 relative min-h-[400px]">
        <div className="mb-10">
          <h1 data-aos="fade-right" className="uppercase sm:text-5xl text-3xl font-semibold mt-5 sm:text-left">
            {category}
          </h1>
        </div>
        <div className="mt-[80px] sm:mt-8 mb-5 flex flex-wrap gap-4  px-4 sm:px-0">
          {isLoading || isFetching ? (
            <Loader />
          ) : data?.posts?.length > 0 ? (
            data?.posts?.map((item, index) => (
              <div data-aos="fade-right" key={index} className="flex w-full sm:w-[48%] md:w-[31%] lg:w-[23%] pb-2 bg-white rounded-lg">
                <PostCard item={item} />
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-500 py-10 absolute top-1/2 -translate-y-1/2">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
