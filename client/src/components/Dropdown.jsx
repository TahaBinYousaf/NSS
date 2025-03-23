import { useEffect, useRef, useState } from "react";

export default function DropDown({ name = "", value, valueSet, dropDownValues = [], placeholder = "", error, errorMsg, validation = false, formikSet = null }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle category selection
  const handleCategoryChange = selectedCategory => {
    if (validation) {
      formikSet(selectedCategory);
    } else {
      valueSet(selectedCategory);
    }
    setDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <input
        name={name}
        value={value}
        readOnly
        aria-expanded={dropdownOpen}
        onClick={() => setDropdownOpen(prev => !prev)}
        className={`flex-1 w-full border-2  rounded-md p-4 text-lg ${!error ? "border-gray-400" : "border-red-500"}`}
        placeholder={placeholder}
      />
      {dropdownOpen && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-300 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50 transition-all duration-300">
          {dropDownValues?.map((item, index) => (
            <li key={index} className="px-4 py-3 hover:bg-gray-200 cursor-pointer transition" onClick={() => handleCategoryChange(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
      {validation && error && <div className="text-sm text-red-500">{errorMsg}</div>}
    </div>
  );
}
