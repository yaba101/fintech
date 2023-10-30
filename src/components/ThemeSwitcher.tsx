"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [currentTheme, setCurrentTheme] = useState(
    typeof window !== "undefined"
      ? window.localStorage.getItem("theme") ?? "light"
      : "light"
  );

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      setCurrentTheme(storedTheme);
    }
  }, [setTheme]);

  return (
    <div className="space-x-3 mt-0.5">
      <div
        className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        onClick={toggleTheme}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-full w-full rounded-md "
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute mx-auto h-5 w-10 rounded-full transition-colors duration-200 ease-in-out ${
            currentTheme === "dark" ? "bg-indigo-600" : "bg-gray-200"
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${
            currentTheme === "dark" ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
