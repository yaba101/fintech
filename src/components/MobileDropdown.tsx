import { useState, useRef, useEffect } from "react";

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
          className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-dark dark:text-gray-100"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          Issac
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 max-h-60 w-24 origin-top-right overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-dark">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              //   onClick={() => handleMonthChange(month)}
              className={`block w-full px-4 py-2 text-left  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-100 dark:hover:bg-dark hover:dark:bg-slate-800 dark:hover:text-gray-100 `}
              role="menuitem"
            >
              Issac
            </button>
            <hr className="mx-2 text-gray-50" />
            <button
              //   onClick={() => handleMonthChange(month)}
              className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-100 dark:hover:bg-dark hover:dark:bg-slate-800 dark:hover:text-gray-100 `}
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
