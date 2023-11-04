import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect } from "react";

const MobileDropdown = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setIsOpen(false);
  };

  const handleClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-700 dark:bg-dark dark:text-gray-100"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          Issac
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 w-24 mt-2 overflow-y-auto origin-top-right bg-white border border-gray-300 rounded-md shadow-lg dark:bg-dark dark:border-gray-700 max-h-60">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              //   onClick={() => handleMonthChange(month)}
              className={`block px-4 py-2 text-sm dark:text-gray-100  text-gray-700 w-full text-left hover:bg-gray-100 hover:dark:bg-slate-800 hover:text-gray-900 dark:hover:bg-dark dark:hover:text-gray-100 focus:outline-none `}
              role="menuitem"
            >
              Issac
            </button>
            <hr className="mx-2 text-gray-50" />
            <button
              //   onClick={() => handleMonthChange(month)}
              className={`block px-4 py-2 text-sm dark:text-gray-100 text-gray-700 w-full text-left hover:bg-gray-100 hover:dark:bg-slate-800 hover:text-gray-900 dark:hover:bg-dark dark:hover:text-gray-100 focus:outline-none `}
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDropdown;
