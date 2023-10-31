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
          className="inline-flex justify-between w-full rounded-md border dark:border-gray-700 border-gray-300 dark:bg-dark bg-white px-4 py-2 text-sm font-medium dark:text-gray-100 text-gray-700"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          Issac
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white dark:bg-dark border dark:border-gray-700 border-gray-300 overflow-y-auto max-h-60">
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
            <hr className="text-gray-50 mx-2" />
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
