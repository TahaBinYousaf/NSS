import { useEffect, useRef, useState } from "react";

export default function DropDown({ value, valueSet, dropDownValues = [], placeholder = "" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle category selection
  const handleCategoryChange = selectedCategory => {
    valueSet(selectedCategory);
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
        value={value}
        readOnly
        aria-expanded={dropdownOpen}
        onClick={() => setDropdownOpen(prev => !prev)}
        className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg"
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
    </div>
  );
}
