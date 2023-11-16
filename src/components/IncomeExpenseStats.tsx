import React from "react";

const IncomeExpenseStats = ({
  icon,
  iconBgColor,
  textBgColor,
  textColor,
  signIcon,
  title,
  amount,
}: {
  icon: any;
  iconBgColor: string;
  textBgColor: string;
  textColor: string;
  signIcon: any;
  title: string;
  amount: string;
}) => {
  return (
    <div className="flex items-end justify-between rounded-lg  bg-gray-50 p-6 dark:bg-dark">
      <div className="flex items-center gap-4">
        <span
          className={`hidden rounded-md p-2 text-gray-600 sm:block ${iconBgColor}`}
        >
          {icon}
        </span>

        <div>
          <p className="text-xl text-gray-300">{title}</p>

          <p className="text-2xl font-medium text-gray-100">${amount}</p>
        </div>
      </div>

      <div
        className={`inline-flex items-center justify-center gap-2 rounded px-1 ${textColor} ${textBgColor} bg-opacity-40`}
      >
        {signIcon}
        <span className={`text-xs font-medium ${textColor}`}> 67.81% </span>
      </div>
    </div>
  );
};

export default IncomeExpenseStats;
