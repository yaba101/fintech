import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
          className="inline-flex justify-between w-32 px-4 py-3 mt-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-700 dark:bg-dark dark:text-gray-100"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          Issac
          {isOpen ? (
            <ChevronDownIcon className="w-3 h-3 mt-1 ml-1 text-end" />
          ) : (
            <ChevronUpIcon className="w-3 h-3 mt-1 ml-1 text-end" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="relative w-32 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg -top-20 dark:bg-dark dark:border-gray-700 max-h-60">
          <div
            className="py-1 0"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className={`block px-4 py-2 text-sm dark:text-gray-100  text-gray-700 w-full text-left hover:bg-gray-100 hover:dark:bg-slate-800 hover:text-gray-900 dark:hover:bg-dark dark:hover:text-gray-100 focus:outline-none `}
              role="menuitem"
            >
              Issac
            </button>
            <hr className="mx-2 text-gray-50" />
            <button
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

export default DropDown;
