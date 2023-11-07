"use client";
import React, { createContext, useState } from "react";

interface SidebarContextType {
  isExpanded: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

const ExpandProvider = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <SidebarContext.Provider
      value={{ isExpanded, handleMouseEnter, handleMouseLeave, setIsExpanded }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default ExpandProvider;
