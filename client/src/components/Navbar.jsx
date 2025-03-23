import { useState, useEffect, useRef, useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaPlus, FaTimes } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";
import Image1 from "../assets/logo.png";
import RenderWhen from "./RenderWhen";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Forget from "../auth/Forget";
import Profile from "../auth/Profile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slice/authSlice";
import DefaultAvatar from "@/assets/default-avatar.jpg";
import getImagePath from "@/utils/getImagePath";

const Navbar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [modalType, modalTypeSet] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [profileModalOpen, profileModalOpenSet] = useState(false);
  const { user, isLoggedIn } = useSelector(state => state.auth);

  // Handle search input changes
  const handleSearch = e => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() || category) {
      navigate("/search");
    } else {
      navigate("/");
    }
  };

  // Handle category selection
  const handleCategoryChange = selectedCategory => {
    setCategory(selectedCategory);
    setDropdownOpen(false);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = event => {
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

  const { pathname } = useLocation();

  // Fix for the useMemo dependency issue - using useMemo for hideNavbarForPages
  const hideNavbarForPages = useMemo(() => ["/post-ad", "/reset-password"], []);

  // Now we can safely use hideNavbarForPages in another useMemo
  const hideNavbar = useMemo(() => hideNavbarForPages.includes(pathname), [pathname, hideNavbarForPages]);

  return hideNavbar ? null : (
    <>
      <nav className="shadow-md px-4 md:px-8 py-6 bg-white">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full">
            <NavLink to={"/"}>
              <img src={Image1} alt="Logo" className="w-13 md:w-17 cursor-pointer object-contain" />
            </NavLink>
            <h1 className="hidden md:block text-3xl">|</h1>
            <h1 className="text-lg italic font-serif">Connect with your community</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-4 w-full">
              {/* Interactive Dropdown */}
              <div className="relative w-full md:w-56" ref={dropdownRef}>
                <button
                  className="w-full px-6 py-3 h-16 border border-gray-300 rounded-full flex items-center justify-between focus:outline-none transition-all duration-300"
                  onClick={() => setDropdownOpen(prev => !prev)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="listbox"
                >
                  <IoLocationOutline className="text-gray-500 text-2xl" />
                  <span className="text-gray-700 truncate">{category || "Lahore"}</span>
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
                      <li key={index} className="px-4 py-3 hover:bg-gray-200 cursor-pointer transition" onClick={() => handleCategoryChange(item)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-[500px] absolute top-0" ref={searchRef}>
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
                    <FaTimes className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={clearSearch} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/** PHOTO */}
          <div className="flex items-center gap-1 md:gap-4 mt-4 md:mt-0 flex-row-reverse ml-4 md:ml-0 md:flex-row">
            {isLoggedIn ? (
              <div className="relative">
                <div className="flex items-center gap-1" aria-expanded={profileModalOpen} onClick={() => profileModalOpenSet(pre => !pre)}>
                  <button className="relative cursor-pointer size-16 hover:bg-gray-200 rounded-full overflow-hidden ml-1">
                    <img src={user?.profileImage ? getImagePath(user?.profileImage) : DefaultAvatar} className="size-full object-cover" alt="Profile" />
                  </button>
                  <IoIosArrowDown className={`${profileModalOpen ? "" : "rotate-180"} size-5`} />
                </div>
                {profileModalOpen && <ProfileDropdown open={profileModalOpen} openSet={profileModalOpenSet} logout={() => dispatch(logout())} />}
              </div>
            ) : (
              <button
                onClick={() => modalTypeSet("Login")}
                className="cursor-pointer text-sm md:text-lg font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 px-4 py-2 rounded-md ml-1"
              >
                Login
              </button>
            )}

            <button
              onClick={() => (isLoggedIn ? navigate("/post-ad") : modalTypeSet("Login"))}
              className="flex items-center gap-2 cursor-pointer px-4 md:px-6 py-2 md:py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110"
            >
              <FaPlus className="font-bold" />
              <span className="">POST</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <RenderWhen is={modalType === "Login"}>
        <Login modalTypeSet={modalTypeSet} />
      </RenderWhen>

      {/* Signup Modal */}
      <RenderWhen is={modalType === "Signup"}>
        <Signup modalTypeSet={modalTypeSet} />
      </RenderWhen>

      {/* Forget Modal */}
      <RenderWhen is={modalType === "Forget"}>
        <Forget modalTypeSet={modalTypeSet} />
      </RenderWhen>

      {/* Profile Modal */}
      <RenderWhen is={modalType === "Profile"}>
        <Profile modalTypeSet={modalTypeSet} />
      </RenderWhen>
    </>
  );
};

// Add PropTypes validation for Navbar
Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

function ProfileDropdown({ open, openSet, logout }) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  // Updated Logout Function
  const onLogout = () => {
    logout();
    openSet(false);
    navigate("/"); // Changed from "/App" to "/" as the main page is typically the root route
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        openSet(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSet]);

  if (!open) return null; // Ensure dropdown only renders when open

  return (
    <div
      ref={dropdownRef}
      className="absolute bg-white rounded-md border border-gray-200 py-4 w-96 left-1/2 -translate-x-2/3 z-50 shadow-2xl mt-2 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4 mx-4">
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer size-16 hover:bg-gray-200 rounded-full overflow-hidden ml-1">
            <img src={user?.profileImage ? getImagePath(user?.profileImage) : DefaultAvatar} alt="Profile" className="size-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div>Hello,</div>
            <div className="text-2xl font-bold">{user?.name}</div>
          </div>
        </div>
        <button onClick={() => navigate("/edit-profile")} className="w-full border border-gray-300 hover:border-black rounded-md cursor-pointer p-4 font-bold">
          View and edit your profile
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <div className="border-t border-gray-200" />
        <div className="flex flex-col gap-4">
          <button className="w-full p-4 font-bold hover:bg-gray-100">My Ads</button>
        </div>
        <div className="border-t border-gray-200" />
      </div>
      <div className="mx-4">
        <button
          onClick={onLogout}
          className="w-full border border-gray-300 bg-gradient-to-r from-blue-500 to-black text-white rounded-md cursor-pointer p-4 font-bold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// Add PropTypes validation for ProfileDropdown
ProfileDropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  openSet: PropTypes.func.isRequired,
  isLoggedInSet: PropTypes.func.isRequired,
};

export default Navbar;
