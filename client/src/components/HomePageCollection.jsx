import React from "react";
import { NavLink } from "react-router-dom";
import { PostCard } from "./PostCard";
import { useGetPostsByCategoryQuery } from "@/services/nodeApi";
import Loader from "@/components/Loader";

const HomePageCollection = ({ category, limit }) => {
  const { data, isLoading } = useGetPostsByCategoryQuery({
    category,
    limit,
  });

  if (!isLoading && (!data || data?.posts?.length === 0)) return null;

  return (
    <div className="my-10 px-4">
      <div className="flex flex-col  sm:gap-0 gap-5 sm:flex-row sm:justify-between items-center sm:items-start">
        <h1 data-aos="fade-right" className="text-3xl uppercase font-semibold text-center sm:text-left">
          {category}
        </h1>
        <NavLink to={`/collection/${category}`}>
          <button
            data-aos="fade-left"
            className="cursor-pointer px-8 py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110"
          >
            VIEW ALL
          </button>
        </NavLink>
      </div>

      <div className={`relative min-h-72 mt-[80px] sm:mt-8 mb-5 flex flex-wrap gap-4  ${data?.posts?.length < 3 ? "jstify-start xl:ml-10" : "justify-center"}`}>
        {isLoading ? (
          <Loader />
        ) : (
          data?.posts?.map((item, index) => (
            <div data-aos="fade-right" key={index} className="w-full sm:w-[48%] md:w-[31%] flex lg:w-[23%] pb-2 bg-white rounded-lg">
              <PostCard item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePageCollection;
