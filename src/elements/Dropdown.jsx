/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Work from "../assets/work.svg";
import DropArrow from "../assets/down-arrow.svg";

const Dropdown = ({
  options,
  placeholder,
  initailValue,
  handleDropDownValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelecetdValue] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSelect = (value) => {
    setSelecetdValue(value);
    handleDropDownValue(value);
    closeDropdown();
  };
  useEffect(() => {
    if (initailValue !== "") {
      setSelecetdValue(initailValue);
    } else {
      setSelecetdValue(placeholder);
    }
  }, [initailValue, placeholder]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left w-full mt-5">
      <div className="relative w-full">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full flex items-center p-2 space-x-2 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-employee-blue border border-ring-employee-blue rounded"
        >
          <img src={Work} alt="Left Icon" className="w-6 h-6 mr-2" />
          <span
            className={`${
              placeholder === selectedValue ? "text-[#949C9E]" : ""
            }`}
          >
            {selectedValue}
          </span>
          <span className="flex-1">{""}</span>
          <img
            src={DropArrow}
            alt="Right Icon"
            className={`w-4 h-4 transform transition-transform duration-200 ease-in-out`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={{ zIndex: 1 }}
          className=" origin-bottom-right absolute right-0 mt-2 w-full  shadow-lg bg-white  ring-opacity-5 divide-y divide-gray-100"
        >
          <div className="">
            {options?.map((opt, idx) => (
              <span
                key={idx}
                onClick={() => {
                  handleSelect(opt);
                }}
                className=" text-center block  border border-b-[#F2F2F2] px-5 py-2 text-md text-gray-700 hover:bg-gray-100 w-full"
              >
                {opt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
