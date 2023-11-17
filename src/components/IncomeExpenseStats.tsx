import React from "react";

type IncomeExpenseStatsProps = {
  icon: any;
  iconBgColor: string;
  textBgColor: string;
  textColor: string;
  signIcon: any;
  title: string;
  amount: string;
};

const IncomeExpenseStats = ({
  icon,
  iconBgColor,
  textBgColor,
  textColor,
  signIcon,
  title,
  amount,
}: IncomeExpenseStatsProps) => {
  return (
    <div className="flex items-end justify-between rounded-lg bg-gray-50 p-6 shadow-xl dark:bg-dark">
      <div className="flex items-center gap-4">
        <span
          className={`hidden rounded-md p-2 text-gray-600 sm:block ${iconBgColor}`}
        >
          {icon}
        </span>

        <div>
          <p className="whitespace-nowrap text-gray-900 dark:text-gray-300 lg:text-base 2xl:text-xl">
            {title}
          </p>

          <p className="font-medium text-gray-950 dark:text-gray-200 xl:text-lg 2xl:text-2xl">
            ${amount}
          </p>
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
