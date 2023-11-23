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
    <div className="flex items-end justify-between rounded-lg bg-gray-50 shadow-xl dark:bg-dark xs:p-5 lg:p-3 xl:p-6">
      <div className="flex items-center gap-3">
        <span
          className={`hidden rounded-md p-2 text-gray-600 sm:block ${iconBgColor}`}
        >
          {icon}
        </span>

        <div>
          <p className="whitespace-nowrap font-semibold text-gray-900 dark:text-gray-400 sm:text-xl lg:text-sm xl:text-base 2xl:text-xl">
            {title}
          </p>

          <p className="font-medium text-gray-950 dark:text-gray-200 sm:text-lg md:text-xl lg:text-sm 2xl:text-xl">
            ${amount}
          </p>
        </div>
      </div>

      <div
        className={`inline-flex items-center justify-center  rounded px-1 ${textColor} ${textBgColor} bg-opacity-40`}
      >
        {signIcon}
        <span
          className={`font-medium xs:text-xs lg:text-[0.6rem] 2xl:text-xs ${textColor}`}
        >
          67.81%
        </span>
      </div>
    </div>
  );
};

export default IncomeExpenseStats;
