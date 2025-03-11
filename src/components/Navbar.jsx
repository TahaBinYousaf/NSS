import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaPlus, FaTimes, FaApple, FaGoogle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Image1 from "../assets/logo.png";

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() || category) {
      navigate("/search");
    } else {
      navigate("/");
    }
  };

  // Handle category selection
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setDropdownOpen(false);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery(searchQuery.trim()); // Avoid accidental clearing
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuery]);

  // Trigger onSearch when query or category changes
  useEffect(() => {
    onSearch(searchQuery, category);
  }, [searchQuery, category, onSearch]);

  return (
    <>
      <nav className="shadow-md px-4 md:px-8 py-6 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <NavLink to={"/"}>
              <img
                src={Image1}
                alt="Logo"
                className="w-13 md:w-17 cursor-pointer object-contain"
              />
            </NavLink>
            <h1 className="hidden md:block text-3xl">|</h1>
            <h1 className="text-lg italic font-serif">
              Connect with your community
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-4 w-full">
              {/* Interactive Dropdown */}
              <div className="relative w-full md:w-56" ref={dropdownRef}>
                <button
                  className="w-full px-6 py-3 h-16 border border-gray-300 rounded-full flex items-center justify-between focus:outline-none transition-all duration-300"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="listbox"
                >
                  <IoLocationOutline className="text-gray-500 text-2xl" />
                  <span className="text-gray-700 truncate">
                    {category || "Lahore"}
                  </span>
                  <span className="text-gray-500 text-lg">&#9662;</span>
                </button>
                {dropdownOpen && (
                  <ul className="absolute w-full mt-2 bg-white border border-gray-300 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50 transition-all duration-300">
                    {[
                      "Defence Housing Society DHA",
                      "Gulberg",
                      "Model Town",
                      "Johar Town",
                      "Bahria Town",
                      "Garden Town",
                      "PCSIR",
                      "Cantonment Cantt",
                      "Askari Housing Society",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-3 hover:bg-gray-200 cursor-pointer transition"
                        onClick={() => handleCategoryChange(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Search Bar */}
              <div
                className="relative w-full md:w-[500px] absolute top-0"
                ref={searchRef}
              >
                <div className="relative">
                  <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-10 py-3 h-16 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() => setDropdownOpen(false)}
                  />
                  {searchQuery && (
                    <FaTimes
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={clearSearch}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setIsOpen(true)}
              className="cursor-pointer text-sm md:text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 px-4 py-2 rounded-md ml-1"
            >
              Login
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 cursor-pointer px-4 md:px-6 py-2 md:py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110"
            >
              <FaPlus className="font-bold" />
              <span className="">POST</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-[400px] shadow-lg relative mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 font-bold cursor-pointer right-4 text-3xl"
            >
              &times;
            </button>

            <div className="flex justify-center mb-4">
              <img
                src={Image1}
                alt="Logo"
                className="w-14 md:w-18 object-contain"
              />
            </div>

            <h2 className="text-center text-xl font-semibold text-gray-800">
              Login into your account
            </h2>
            <div className="space-y-1 mt-5">
              <input
                type="text"
                id="emailOrUsername"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email or username"
              />
            </div>

            <div className="space-y-1 mt-3">
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
              />
            </div>

            <p className="text-center my-3 text-md cursor-pointer underline">
              Forgot Password?
            </p>

            <button className="w-full cursor-pointer bg-black text-white rounded-full py-2">
              Login
            </button>

            <div className="mt-6 space-y-3">
              <div className="flex items-center my-3">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 cursor-pointer transition">
                <FaApple className="text-xl" />
                Continue with Apple
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 cursor-pointer">
                <FaGoogle className="text-xl" />
                Continue with Google
              </button>
            </div>

            <p className="text-center text-sm mt-4 cursor-pointer hover:underline">
              New to NSS? Create an account
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
