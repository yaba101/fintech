"use client";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect } from "react";

const MonthDropDown = () => {
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
          className="xs:w-18 inline-flex justify-between rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-dark dark:text-gray-100 xs:mr-0.5 xs:px-1 xs:py-0.5 xs:text-xs sm:w-full sm:py-2"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedMonth}
          {isOpen ? (
            <ArrowUpIcon className="ml-1 mt-1 h-3 w-3 text-end xs:mt-0.5" />
          ) : (
            <ArrowDownIcon className="ml-1 mt-1 h-3 w-3 text-end xs:mt-0.5" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 origin-top-right overflow-y-auto rounded-md border border-gray-300 bg-white px-3 shadow-lg dark:border-gray-700 dark:bg-dark xs:max-h-24 md:max-h-40 md:w-48">
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
                className={`block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-100 dark:hover:bg-dark hover:dark:bg-slate-800 dark:hover:text-gray-100 xs:text-xs lg:text-sm ${
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

export default MonthDropDown;