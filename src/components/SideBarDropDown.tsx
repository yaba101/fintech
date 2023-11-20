import { ExpandLess, ExpandMore } from "@mui/icons-material";
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
          className="mt-2 inline-flex w-32 justify-between rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-dark dark:text-gray-100"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          Issac
          {isOpen ? (
            <ExpandMore className="ml-1 mt-1 h-3 w-3 text-end" />
          ) : (
            <ExpandLess className="ml-1 mt-1 h-3 w-3 text-end" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="relative -top-20 max-h-60 w-32 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-dark">
          <div
            className="0 py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className={`block w-full px-4 py-2 text-left  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-100 dark:hover:bg-dark hover:dark:bg-slate-800 dark:hover:text-gray-100 `}
              role="menuitem"
            >
              Issac
            </button>
            <hr className="mx-2 text-gray-50" />
            <button
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

export default DropDown;
