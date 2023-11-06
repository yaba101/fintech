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
        isExpanded ? "w-30 space-y-4 " : "w-20"
      }`}
    >
      <nav
        className={` dark:bg-dark  h-full flex flex-col absolute top-0 transition-all duration-300 ease-in-out `}
      >
        <div className="flex items-center justify-between p-4 pb-2">
          <button
            onClick={() => setIsExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg "
          >
            {isExpanded ? (
              <ChevronFirst className="font-bold dark:text-slate-100" />
            ) : (
              <ChevronLast className="font-bold dark:text-slate-100" />
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
            <div className="flex mx-auto dark:text-gray-100 flex-nowrap ">
              <span className="mr-4 font-medium whitespace-nowrap">
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
            <span className="mr-auto font-medium whitespace-nowrap">
              Log Out
            </span>
          </div>
        </ul>

        <div className="flex p-3 border-t">
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
