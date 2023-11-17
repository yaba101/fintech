import React from "react";
type SidebarItemProps = {
  icon: any;
  text: string;
  active: boolean;
  alert: boolean;
  isExpanded: boolean;
  children?: React.ReactNode;
};

const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  isExpanded,
  children,
}: SidebarItemProps) => {
  return (
    <li
      className={`
        group relative my-1 flex cursor-pointer items-center
        rounded-md px-3 py-2
        font-medium transition-colors
        
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
          className={`overflow-hidden whitespace-nowrap text-gray-900 transition-all duration-300  ease-in-out dark:text-gray-100 ${
            isExpanded ? "ml-3 w-32" : "w-0"
          }`}
        >
          {text}
        </h4>
      </div>
      <div className="mx-auto">{children}</div>
      {alert && (
        <div
          className={`absolute right-2 h-2 w-2 rounded bg-indigo-200 ${
            isExpanded ? "" : "top-2"
          }`}
        />
      )}
    </li>
  );
};

export default SidebarItem;
