import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useGetPostsByCategoryQuery } from "@/services/nodeApi";
import { PostCard } from "@/components/PostCard";
import Loader from "@/components/Loader";
import PropTypes from "prop-types";

const MainCollection = ({ category, location, searchQuery }) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedLocation, setSelectedLocation] = useState(location || "");
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");

  // Update selectedLocation when location prop changes
  useEffect(() => {
    console.log("MainCollection - Location prop changed:", location);
    setSelectedLocation(location || "");
  }, [location]);

  // Update selectedCategory when category prop changes
  useEffect(() => {
    console.log("MainCollection - Category prop changed:", category);
    setSelectedCategory(category || "");
  }, [category]);

  // Update searchTerm when searchQuery prop changes
  useEffect(() => {
    console.log("MainCollection - Search query changed:", searchQuery);
    setSearchTerm(searchQuery || "");
  }, [searchQuery]);

  console.log("MainCollection - Current state:", { selectedLocation, selectedCategory, searchTerm });

  const { data, isLoading, refetch } = useGetPostsByCategoryQuery({
    category: selectedCategory || "Items for sale",
    limit: "all",
    option: "desc",
    location: selectedLocation,
    searchQuery: searchTerm
  });

  useEffect(() => {
    console.log("API Response:", data);
    refetch();
  }, [selectedLocation, selectedCategory, searchTerm, refetch]);

  const handleFilter = e => {
    const category = e.target.value;
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  // Filter posts by search query if needed
  const filteredPosts = data?.posts?.filter(post => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title?.toLowerCase().includes(searchLower) ||
      post.description?.toLowerCase().includes(searchLower)
    );
  });

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

        <div className={`${filterMenuOpen ? "block" : "hidden"} sm:block`}>
          <p className="mb-3 mt-6 text-lg font-semibold text-gray-800">CATEGORIES</p>
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#090909] w-4 h-4"
                checked={selectedCategory === "Items for sale"}
                onChange={() => handleFilter({ target: { value: "Items for sale" } })}
              />
              <span>Items for sale</span>
            </label>
            <hr className="border-t border-gray-300" />
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#090909] w-4 h-4"
                checked={selectedCategory === "Items for rent"}
                onChange={() => handleFilter({ target: { value: "Items for rent" } })}
              />
              <span>Items for rent</span>
            </label>
            <hr className="border-t border-gray-300" />
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#090909] w-4 h-4"
                checked={selectedCategory === "Items to share"}
                onChange={() => handleFilter({ target: { value: "Items to share" } })}
              />
              <span>Items to share</span>
            </label>
            <hr className="border-t border-gray-300" />
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#090909] w-4 h-4"
                checked={selectedCategory === "Items request"}
                onChange={() => handleFilter({ target: { value: "Items request" } })}
              />
              <span>Items request</span>
            </label>
            <hr className="border-t border-gray-300" />
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#090909] w-4 h-4"
                checked={selectedCategory === "Services"}
                onChange={() => handleFilter({ target: { value: "Services" } })}
              />
              <span>Services</span>
            </label>
            <hr className="border-t border-gray-300" />
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#090909] w-4 h-4"
                checked={selectedCategory === "Events"}
                onChange={() => handleFilter({ target: { value: "Events" } })}
              />
              <span>Events</span>
            </label>
            <hr className="border-t border-gray-300" />
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#090909] w-4 h-4"
                checked={selectedCategory === "Resources"}
                onChange={() => handleFilter({ target: { value: "Resources" } })}
              />
              <span>Resources</span>
            </label>
            <hr className="border-t border-gray-300" />
          </div>
        </div>
      </div>

      {/* Items display */}
      <div className="flex-1">
        <div className="mb-10">
          <h1 data-aos="fade-right" className="sm:text-5xl text-3xl ml-7 font-semibold mt-5 sm:text-left">
            {selectedCategory ? selectedCategory.toUpperCase() : "ALL PRODUCTS"}
            {selectedLocation && ` in ${selectedLocation}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </h1>
        </div>
        <div className="mt-[80px] sm:mt-8 mb-5 flex flex-wrap gap-4 justify-center px-4 sm:px-0">
          {isLoading ? (
            <Loader />
          ) : filteredPosts?.length > 0 ? (
            filteredPosts.map((item, index) => (
              <div data-aos="fade-right" key={index} className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] pb-2 bg-white rounded-lg">
                <PostCard item={item} />
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-500 py-10">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

MainCollection.propTypes = {
  category: PropTypes.string,
  location: PropTypes.string,
  searchQuery: PropTypes.string
};

export default MainCollection;
