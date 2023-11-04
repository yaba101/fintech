"use client";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect } from "react";

const Dropdown = () => {
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
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between sm:w-full xs:w-18 rounded-md border dark:border-gray-700 border-gray-300 dark:bg-dark bg-white px-4 xs:px-1 sm:py-2 xs:py-0.5 text-sm xs:text-xs font-medium dark:text-gray-100 text-gray-700 xs:mr-0.5"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedMonth}
          {isOpen ? (
            <ArrowUpIcon className="w-3 h-3 text-end mt-1 xs:mt-0.5 ml-1" />
          ) : (
            <ArrowDownIcon className="w-3 h-3 text-end mt-1 xs:mt-0.5 ml-1" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 px-3 mt-2 overflow-y-auto origin-top-right bg-white border border-gray-300 rounded-md shadow-lg md:w-48 md:max-h-40 xs:max-h-24 dark:bg-dark dark:border-gray-700">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {months.map((month, index) => (
              <button
                key={index}
                onClick={() => handleMonthChange(month)}
                className={`block px-4 py-2 lg:text-sm xs:text-xs dark:text-gray-100 text-gray-700 w-full text-left hover:bg-gray-100 hover:dark:bg-slate-800 hover:text-gray-900 dark:hover:bg-dark dark:hover:text-gray-100 focus:outline-none ${
                  selectedMonth === month
                    ? "bg-gray-100 text-gray-900 dark:bg-dark dark:text-gray-100 xs:text-xs"
                    : ""
                }`}
                role="menuitem"
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
