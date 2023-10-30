import React from "react";

const Card = ({ title, text, buttonText }: any) => {
  return (
    <div className=" mx-auto overflow-hidden shadow-lg dark:border-gray-900 border rounded-lg mb-3 dark:bg-dark bg-gray-50">
      <div className="text-center px-6 py-4">
        <h4 className="text-md font-semibold dark:text-gray-100">{title}</h4>
        <p className="dark:text-gray-300 text-xl font-semibold my-3">{text}</p>
      </div>
      <div className="text-center py-2">
        <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;

export const SkeletonCard = () => {
  return (
    <div
      className="max-w-sm mx-auto overflow-hidden shadow-lg border-gray-900 border rounded-lg mb-3 animate-pulse"
      style={{ background: "#1d1d41" }}
    >
      <div className="flex justify-center items-center flex-col px-6 py-4">
        <div className="bg-gray-500 h-4 w-24 mb-4 rounded " />
        <div className="bg-gray-400 h-8 w-32 mb-4 rounded" />
      </div>
      <div className="text-center py-2">
        <div className="bg-gray-500 h-10 w-24 mx-auto rounded"></div>{" "}
        {/* Button Skeleton */}
      </div>
    </div>
  );
};
