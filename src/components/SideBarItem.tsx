import React from "react";

const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  isExpanded,
}: {
  icon: any;
  text: string;
  active: boolean;
  alert: boolean;
  isExpanded?: boolean;
}) => {
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        
        ${
          active
            ? "bg-indigo-600 text-gray-200"
            : "hover-bg-indigo-50 text-gray-400"
        }
    `}
    >
      {icon}
      <h4
        className={`overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap  dark:text-gray-100 text-gray-900 ${
          isExpanded ? "w-32 ml-3" : "w-0"
        }`}
      >
        {text}
      </h4>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-200 ${
            isExpanded ? "" : "top-2"
          }`}
        />
      )}
      {!isExpanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all duration-300 ease-in-out
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
