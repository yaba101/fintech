"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import IncomeExpenseStats from "./IncomeExpenseStats";
import { ArrowForward, Remove, TrendingDown } from "@mui/icons-material";
import MonthDropDown from "./MonthDropDown";
import { startOfMonth, endOfMonth, format } from "date-fns";
import HalfDonutChart from "./HalfPieChart";
import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { getCashOutActivityData } from "@/utils/cashOutActivityUtils";
import CashActivitySkeleton from "./skeleton/CashActivity";
import StatsSkeleton from "./skeleton/StatsSkeleton";

type CashOutResponse = {
  totalExpense: string;
  fourExpenseCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

export default function CashOutActivity() {
  const title = "Cash Out Activity";
  const CurrentColors = ["#7c1515", "#c8e129", "#6029e1", "#29dee1"];

  const currentDate = new Date();
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  const [selectedFromDate, setSelectedFromDate] =
    useState<Date>(startOfCurrentMonth);
  const [selectedToDate, setSelectedToDate] = useState<Date>(endOfCurrentMonth);
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState({
    totalExpense: "0.00",
    fourExpenseCategories: [],
    succeeded: true,
  });

  const handleMonthSelect = (fromDate: Date, toDate: Date) => {
    setSelectedFromDate(fromDate);
    setSelectedToDate(toDate);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const url = process.env.NEXT_PUBLIC_BASE_URL;
        const fromDate = format(new Date(selectedFromDate), "yyyy-MM-dd");
        const toDate = format(new Date(selectedToDate), "yyyy-MM-dd");
        const data = await getCashOutActivityData(
          `${url}/${urlEndpoints["cashOutActivity"]}`,
          {
            fromDate: fromDate,
            toDate: toDate,
          }
        );
        setCurrentData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedFromDate, selectedToDate]);

  const isCashOut =
    (currentData as CashOutResponse)?.fourExpenseCategories !== undefined;

  let sortedData: { category: string; sum: number }[] = [];
  if (isCashOut) {
    sortedData = (currentData as CashOutResponse).fourExpenseCategories.sort(
      (a, b) => b.sum - a.sum
    );
  }

  const top4Data = sortedData.slice(0, 4);

  return (
    <>
      {loading ? (
        <StatsSkeleton />
      ) : (
        <IncomeExpenseStats
          icon={
            <TrendingDown className=" h-8 w-8 text-gray-100 dark:text-gray-100 lg:h-5 lg:w-5 xl:h-8 xl:w-8 " />
          }
          title="Total Expenses"
          iconBgColor="bg-red-600"
          textBgColor="bg-red-300"
          textColor="text-red-800 dark:text-red-100"
          amount={currentData?.totalExpense}
          signIcon={
            <Remove className="h-3 w-3 font-bold text-red-600 dark:text-red-300" />
          }
        />
      )}
      <div className="my-1 rounded-md border bg-gray-50 p-2 shadow-md dark:border-gray-900 dark:bg-dark dark:text-gray-100">
        {loading ? (
          <CashActivitySkeleton />
        ) : !currentData.succeeded ? (
          <p className="mx-auto text-center text-gray-500 py-10">
            Error occured. Try again.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between py-1">
              <p className="mb-0 font-bold capitalize antialiased dark:text-gray-100 xl:text-lg 2xl:text-xl">
                {title}
              </p>
              <div className="xs:w-32 md:w-36 ">
                <MonthDropDown onSelect={handleMonthSelect} />
              </div>
            </div>
            {top4Data.length === 0 ? (
              <p className="mx-auto text-center text-gray-500 py-10">
                No data available
              </p>
            ) : (
              <>
                <HalfDonutChart colors={CurrentColors} data={top4Data} />
                <ul className="mb-3 flex list-none flex-wrap py-3 lg:-mx-2 xl:-mx-0">
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
                                    0
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
                </ul>
                <div className="mx-auto w-3/4">
                  <Button variant="outline" className="w-full ">
                    <span className="mx-auto whitespace-nowrap text-center lg:text-xs xl:text-sm">
                      View All Activity
                    </span>
                    <ArrowForward className="h-6 w-6 shrink dark:text-gray-100 " />
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
