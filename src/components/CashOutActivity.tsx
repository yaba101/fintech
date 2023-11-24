"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import IncomeExpenseStats from "./IncomeExpenseStats";
import { ArrowForward, Remove, TrendingDown } from "@mui/icons-material";
import MonthDropDown from "./MonthDropDown";
import { formatCurrency } from "@/utils/moneyFormat";
import { startOfMonth, endOfMonth } from "date-fns";
import HalfDonutChart from "./HalfPieChart";

type CashOutResponse = {
  totalExpense: string;
  fourExpenseCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

export default function CashOutActivity({
  responseData,
}: {
  responseData: any;
}) {
  const title = "Cash Out Activity";
  const CurrentColors = ["#7c1515", "#c8e129", "#6029e1", "#29dee1"];

  const currentDate = new Date();
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(
    startOfCurrentMonth,
  );
  const [selectedToDate, setSelectedToDate] = useState<Date | null>(
    endOfCurrentMonth,
  );

  const handleMonthSelect = (fromDate: Date, toDate: Date) => {
    setSelectedFromDate(fromDate);
    setSelectedToDate(toDate);
  };

  const filteredCashOutActivity = responseData.filter(
    (activity: { activityDate: string | number | Date }) => {
      const activityDate = new Date(activity.activityDate);

      return (
        (!selectedFromDate || activityDate >= new Date(selectedFromDate)) &&
        (!selectedToDate || activityDate <= new Date(selectedToDate))
      );
    },
  );

  const sortedCashOutActivity = filteredCashOutActivity.sort(
    (a: { sum: number }, b: { sum: number }) => b.sum - a.sum,
  );

  const fourExpenseCategories = sortedCashOutActivity.slice(0, 4);

  const totalExpense = fourExpenseCategories.reduce(
    (total: any, category: { sum: any }) => total + category.sum,
    0,
  );

  const formattedTotalExpense = formatCurrency(totalExpense);

  const responseObject = {
    totalExpense: formattedTotalExpense,
    fourExpenseCategories,
    succeeded: true,
  };

  const isCashOut =
    (responseObject as CashOutResponse)?.fourExpenseCategories !== undefined;

  let sortedData: { category: string; sum: number }[] = [];
  if (isCashOut) {
    sortedData = (responseObject as CashOutResponse).fourExpenseCategories.sort(
      (a, b) => b.sum - a.sum,
    );
  }

  const top4Data = sortedData.slice(0, 4);

  return (
    <>
      <IncomeExpenseStats
        icon={
          <TrendingDown className=" h-8 w-8 text-gray-100 dark:text-gray-100 lg:h-5 lg:w-5 xl:h-8 xl:w-8 " />
        }
        title="Total Expenses"
        iconBgColor="bg-red-600"
        textBgColor="bg-red-300"
        textColor="text-red-800 dark:text-red-100"
        amount={responseObject?.totalExpense}
        signIcon={
          <Remove className="h-3 w-3 font-bold text-red-600 dark:text-red-300" />
        }
      />
      <div className="my-1 rounded-md border bg-gray-50 p-2 shadow-md dark:border-gray-900 dark:bg-dark dark:text-gray-100">
        <div className="flex flex-wrap items-center justify-between py-1">
          <p className="mb-0 font-bold capitalize antialiased dark:text-gray-100 xl:text-lg 2xl:text-xl">
            {title}
          </p>
          <div className="flex-shrink-0 ">
            <MonthDropDown onSelect={handleMonthSelect} />
          </div>
        </div>
        <HalfDonutChart colors={CurrentColors} data={top4Data} />
        <ul className="mb-3 flex list-none flex-wrap py-3 lg:-mx-2 xl:-mx-0">
          {top4Data.length === 0 ? (
            <p className="mx-auto text-center text-gray-500">
              No data available
            </p>
          ) : (
            <>
              {top4Data.map((item, index) => (
                <li key={index} className="w-full">
                  {isNaN(item.sum) ? null : (
                    <div className="flex space-x-2 p-1">
                      <button
                        className={` h-3 w-3 rounded-full font-medium text-white lg:h-2 lg:w-2 xl:h-3 xl:w-3 ${
                          index > 0 ? "sm:mt-2" : ""
                        }`}
                        style={{ background: CurrentColors[index] }}
                      />
                      <div className="flex space-x-2">
                        <h4 className="text-sm antialiased dark:text-gray-200 lg:text-xs 2xl:text-base">
                          {item.category.toString()}
                        </h4>
                        <h4 className="text-xs antialiased dark:text-gray-400 lg:text-[0.6rem] xl:text-sm">
                          {(
                            (item.sum /
                              sortedData.reduce(
                                (acc, item) => acc + item.sum,
                                0,
                              )) *
                            100
                          ).toFixed(2)}
                          %
                        </h4>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </>
          )}
        </ul>

        <div className="mx-auto w-3/4">
          <Button variant="outline" className="w-full ">
            <span className="mx-auto whitespace-nowrap text-center lg:text-xs xl:text-sm">
              View All Activity
            </span>
            <ArrowForward className="h-6 w-6 shrink dark:text-gray-100 " />
          </Button>
        </div>
      </div>
    </>
  );
}
