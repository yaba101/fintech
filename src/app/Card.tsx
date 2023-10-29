import React from "react";

const Card = ({ title, text, buttonText }: any) => {
  return (
    <div
      className="max-w-sm mx-auto overflow-hidden shadow-lg border-gray-900 border rounded-lg mb-3"
      style={{ background: "#1d1d41" }}
    >
      <div className="text-center px-6 py-4">
        <h4 className="text-md font-semibold text-gray-100">{title}</h4>
        <p className="text-gray-300 text-xl font-semibold my-3">{text}</p>
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
