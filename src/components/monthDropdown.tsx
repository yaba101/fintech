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
