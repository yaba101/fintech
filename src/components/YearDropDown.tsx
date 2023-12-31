"use client";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";

interface YearDropDownProps {
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

function YearDropDown({ selectedYear, onSelectYear }: YearDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleYearChange = (year: number) => {
    onSelectYear(year);
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
          className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-dark dark:text-gray-100 xs:mr-0.5 xs:w-16 xs:px-1 xs:py-0.5 xs:text-xs sm:w-fit"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedYear}
          {isOpen ? (
            <ExpandMore className="ml-1 text-end " />
          ) : (
            <ExpandLess className="ml-1 text-end " />
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
            {years.map((year, index) => (
              <button
                key={index}
                onClick={() => handleYearChange(year)}
                className={`block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-100 dark:hover:bg-dark hover:dark:bg-slate-800 dark:hover:text-gray-100 xs:text-xs lg:text-sm ${
                  selectedYear === year
                    ? "bg-gray-100 text-gray-900 dark:bg-dark dark:text-gray-100 xs:text-xs"
                    : ""
                }`}
                role="menuitem"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default YearDropDown;
