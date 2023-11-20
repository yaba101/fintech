import React, { useContext, useEffect } from "react";
import SidebarItem from "./SideBarItem";
import ThemeSwitcher from "./ThemeSwitcher";
import { SidebarContext } from "@/components/SidebarProvider";
import {
  Business,
  FirstPage,
  LastPage,
  Logout,
  MoreVert,
} from "@mui/icons-material";

const SideBarMenu = ({ children }: { children: React.ReactNode }) => {
  const {
    isExpanded = false,
    handleMouseEnter = () => {},
    handleMouseLeave = () => {},
    setIsExpanded = () => {},
  } = useContext(SidebarContext) || {};

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

  return (
    <div
      id="sidebar-container"
      className={`relative h-screen transition-all duration-300 ease-in-out dark:bg-dark   ${
        isExpanded ? "w-30 space-y-4 " : "w-20"
      }`}
    >
      <nav
        className={` absolute  top-0 flex h-full flex-col px-2 transition-all duration-300 ease-in-out  dark:bg-dark ${
          isExpanded ? "shadow shadow-slate-500" : ""
        } `}
      >
        <div className="flex items-center justify-between p-4 pb-2">
          <button
            onClick={() => setIsExpanded((curr) => !curr)}
            className="rounded-lg p-1.5 "
          >
            {isExpanded ? (
              <FirstPage className="font-bold dark:text-slate-100" />
            ) : (
              <LastPage className="font-bold dark:text-slate-100" />
            )}
          </button>
        </div>
        <ul className="flex-1 space-y-5 px-3">
          {children}
          <div
            className={`flex items-center justify-between overflow-hidden  ${
              isExpanded ? "lg:w-44 xl:w-40" : "w-0"
            }`}
          >
            <ThemeSwitcher />
          </div>
          <div
            className={`flex items-center justify-between overflow-hidden ${
              isExpanded ? "" : "w-0"
            }`}
          >
            <SidebarItem
              icon={<Logout />}
              active={false}
              alert={false}
              text={"Log Out"}
              isExpanded={isExpanded}
            />
          </div>
        </ul>

        <div className="flex border-t p-3">
          <Business className="h-10 w-10 rounded-md" />
          <div
            className={`flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "ml-3 lg:w-44   xl:w-32" : "w-0"
            }`}
          >
            <MoreVert className="ml-auto cursor-pointer" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBarMenu;
