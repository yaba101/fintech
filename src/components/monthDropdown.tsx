"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { format, startOfMonth, endOfMonth, getMonth } from "date-fns";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface MonthDropDownProps {
  onSelect: (fromDate: Date, toDate: Date) => void;
}

function MonthDropDown({ onSelect }: MonthDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    getMonth(new Date()),
  );
  const [isPending, startTransition] = useTransition();

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setIsOpen(false);

    const newFromDate = new Date();
    newFromDate.setMonth(month, 1);

    const newToDate = new Date();
    newToDate.setFullYear(newFromDate.getFullYear(), month + 1, 0);

    startTransition(() => {
      onSelect(startOfMonth(newFromDate), endOfMonth(newToDate));
    });
  };

  const monthNames = [
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-1 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-dark dark:text-gray-100"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedMonth !== null ? monthNames[selectedMonth] : "Select Month"}
          {isOpen ? (
            <ExpandMore className="ml-1 text-end" />
          ) : (
            <ExpandLess className="ml-1 text-end" />
          )}
          {isPending && (
            <div role="loading">
              <svg
                aria-hidden="true"
                className="ml-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 origin-top-right overflow-y-auto rounded-md border border-gray-300 bg-white px-1 shadow-lg dark:border-gray-700 dark:bg-dark xs:max-h-24 md:max-h-40 md:w-48">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {months.map((monthIndex) => (
              <button
                key={monthIndex}
                onClick={() => handleMonthChange(monthIndex)}
                className={`block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-100 dark:hover:bg-dark hover:dark:bg-slate-800 dark:hover:text-gray-100`}
                role="menuitem"
              >
                {monthNames[monthIndex]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthDropDown;
