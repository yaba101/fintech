import React from "react";

const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  isExpanded,
  children,
}: {
  icon: any;
  text: string;
  active: boolean;
  alert: boolean;
  isExpanded: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        
        ${
          active
            ? "bg-[#5e54e6] text-gray-200"
            : "hover-bg-indigo-50 text-gray-400"
        }
    `}
    >
      {icon}

      <div className="flex">
        <h4
          className={`overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap  dark:text-gray-100 text-gray-900 ${
            isExpanded ? "w-32 ml-3" : "w-0"
          }`}
        >
          {text}
        </h4>
      </div>
      <div className="mx-auto">{children}</div>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-200 ${
            isExpanded ? "" : "top-2"
          }`}
        />
      )}
    </li>
  );
};

export default SidebarItem;
