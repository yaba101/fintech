"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { DarkMode, LightMode } from "@mui/icons-material";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-1 px-1 md:pr-1.5 py-3 xs:py-1 md:py-1.5 transition-colors relative z-10";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [selected, setSelected] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setSelected(storedTheme);
        setTheme(storedTheme);
      }
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setSelected(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className={`transition-color grid h-fit place-content-center gap-2 xs:px-4 xl:px-0`}
    >
      <SliderToggle selected={selected} toggleTheme={toggleTheme} />
    </div>
  );
};

const SliderToggle = ({
  selected,
  toggleTheme,
}: {
  selected: string;
  toggleTheme: () => void;
}) => {
  return (
    <div className="relative flex w-fit items-center rounded-full border border-gray-400 dark:border-gray-500 ">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => toggleTheme()}
      >
        <LightMode
          className={`relative z-10 h-4 w-4 text-lg md:text-sm  ${
            selected === "light" ? "text-yellow-400" : ""
          }`}
        />

        <span className="relative z-10 font-semibold">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => toggleTheme()}
      >
        <DarkMode className="relative z-10 h-4 w-4 text-lg md:text-sm" />
        <span
          className={`} relative z-10 font-semibold ${
            selected === "dark" ? "text-white" : "text-slate-800"
          }`}
        >
          Dark
        </span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
