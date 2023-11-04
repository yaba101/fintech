"use client";
import React, { createContext, useContext, useState } from "react";

interface ExpandContextType {
  isExpanded: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ExpandContext = createContext<ExpandContextType | undefined>(
  undefined
);

const ExpandProvider = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <ExpandContext.Provider
      value={{ isExpanded, handleMouseEnter, handleMouseLeave, setIsExpanded }}
    >
      {children}
    </ExpandContext.Provider>
  );
};

export default ExpandProvider;
