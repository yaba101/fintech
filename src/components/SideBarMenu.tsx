import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import {
  ChevronFirst,
  ChevronLast,
  LogOut,
  Moon,
  MoreVertical,
} from "lucide-react";
import React, { Children, useContext, useEffect, useState } from "react";
import SidebarItem from "./SideBarItem";
import ThemeSwitcher from "./ThemeSwitcher";
import { ExpandContext } from "@/components/ExpandProvider";

const SideBarMenu = ({ children }: { children: React.ReactNode[] }) => {
  const {
    isExpanded = false,
    handleMouseEnter = () => {},
    handleMouseLeave = () => {},
    setIsExpanded = () => {},
  } = useContext(ExpandContext) || {};

  useEffect(() => {
    const sidebarContainer = document.getElementById("sidebar-container");

    if (sidebarContainer) {
      sidebarContainer.addEventListener("mouseenter", handleMouseEnter);
      sidebarContainer.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sidebarContainer) {
        sidebarContainer.removeEventListener("mouseenter", handleMouseEnter);
        sidebarContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  const renderChildren = Children.map(children, (child, index) =>
    React.cloneElement(child as any, { key: index, isExpanded })
  );

  return (
    <div
      id="sidebar-container"
      className={`h-screen dark:bg-dark relative transition-all duration-300 ease-in-out  ${
        isExpanded ? "w-30 space-y-4" : "w-20"
      }`}
    >
      <nav
        className={` dark:bg-dark  h-full flex flex-col shadow-sm absolute top-0 transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* <BuildingOffice2Icon
            className={`overflow-hidden transition-all duration-300 ease-in-out dark:text-gray-100 text-gray-900 ${
              expanded ? "w-32" : "w-0"
            }`}
          /> */}
          <button
            onClick={() => setIsExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg "
          >
            {isExpanded ? (
              <ChevronFirst className="dark:text-slate-100 font-bold" />
            ) : (
              <ChevronLast className="dark:text-slate-100 font-bold" />
            )}
          </button>
        </div>
        <ul className="flex-1 px-3 space-y-5">
          {renderChildren}

          <div
            className={`flex justify-between items-center overflow-hidden  ${
              isExpanded ? "xl:w-40 lg:w-44" : "w-0"
            }`}
          >
            <SidebarItem
              key="Dark Mode"
              icon={<Moon size={0} />}
              active={false}
              alert={false}
              text={"Dark Mode"}
            />
            <div className="flex dark:text-gray-100 flex-nowrap mx-auto ">
              <span className="whitespace-nowrap mr-4 font-medium">
                Dark Mode
              </span>
              <ThemeSwitcher />
            </div>
          </div>
          <div
            className={`flex justify-between items-center overflow-hidden ${
              isExpanded ? "" : "w-0"
            }`}
          >
            <SidebarItem
              key="Logout"
              icon={<LogOut size={20} />}
              active={false}
              alert={false}
              text={"Log Out"}
            />
            <span className="whitespace-nowrap font-medium mr-auto">
              Log Out
            </span>
          </div>
        </ul>

        <div className="border-t flex p-3">
          <BuildingOffice2Icon className="w-10 h-10 rounded-md" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "xl:w-32 lg:w-44 ml-3" : "w-0"
            }`}
          >
            <MoreVertical size={20} className="ml-auto cursor-pointer" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBarMenu;
