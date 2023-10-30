import React from "react";

const AddAccountCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border dark:border-gray-900 mx-3 my-3 dark:bg-dark bg-gray-50">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">
          Account Summary
        </div>
        <div className="my-6">
          <div className="my-5">
            <div className="flex justify-between">
              <span>Savings</span>
              <span className="font-medium text-sm">$597.39</span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span>Checking</span>
              <span className="font-medium text-sm">$15,595</span>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between">
              <span>Investment</span>
              <span className="font-medium text-sm">$129.15</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-3">
          <button className="bg-green-500 hover:bg-green-700 dark:text-white text-sm font-medium py-1 px-4 rounded-lg whitespace-nowrap">
            View All
          </button>
          <button className="bg-violet-500 hover:bg-violet-700 dark:text-white text-sm font-medium py-1 px-4 rounded-lg whitespace-nowrap">
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountCard;

export const SkeletonAddAccountCard = () => {
  return (
    <div
      className="max-w-sm rounded-md overflow-hidden shadow-lg border border-gray-900 mx-3 my-3 animate-pulse"
      style={{ background: "#1d1d41" }}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center mx-auto bg-gray-400 h-6 w-48 rounded"></div>
        <div className="my-6">
          <div className="my-5">
            <div className="flex justify-between space-x-3">
              <div className="bg-gray-400 h-4 w-40 rounded"></div>
              <div className="bg-gray-400 h-4 w-20 rounded"></div>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between space-x-3">
              <div className="bg-gray-400 h-4 w-40 rounded"></div>
              <div className="bg-gray-400 h-4 w-20 rounded"></div>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between space-x-3">
              <div className="bg-gray-400 h-4 w-40 rounded"></div>
              <div className="bg-gray-400 h-4 w-20 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-3">
          <div className="bg-green-400 h-10 w-24 mx-auto rounded"></div>
          <div className="bg-violet-400 h-10 w-28 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  );
};
