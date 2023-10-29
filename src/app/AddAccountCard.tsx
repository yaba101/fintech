import React from "react";

const AddAccountCard = () => {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-900 mx-3 my-3"
      style={{ background: "#1d1d41" }}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">
          Account Summary
        </div>
        <div className="my-6">
          <div className="my-5">
            <div className="flex justify-between">
              <span>Savings</span>
              <span className="font-bold">$597.39</span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span>Checking</span>
              <span className="font-bold">$15,595</span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span>Investment</span>
              <span className="font-bold">$129.15</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="bg-green-500 hover:bg-green-700 text-white font-medium py-1 px-4 rounded-lg">
            View All
          </button>
          <button className="bg-violet-500 hover:bg-violet-700 text-white font-medium py-1 px-4 rounded-lg">
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountCard;
