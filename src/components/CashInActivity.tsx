import HalfDonutChart from "@/components/HalfPieChart";
import { Button } from "./ui/button";
import { endOfMonth, parse, startOfMonth } from "date-fns";
import IncomeExpenseStats from "./IncomeExpenseStats";
import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { Add, ArrowForward, TrendingUp } from "@mui/icons-material";
import { formatCurrency } from "@/utils/moneyFormat";
import MonthDropDown from "./monthDropdown";

type RequestBody = {
  toDate: Date | null;
  fromDate: Date | null;
};

type CashInResponse = {
  totalIncome: string;
  fourIncomeCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

const getCashInActivityData = async (
  url: RequestInfo,
  body: { toDate: any; fromDate: any },
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const remoteData = await response.json();
    const { fromDate, toDate } = body;

    const filteredCashInActivity = remoteData.filter(
      (activity: { activityDate: string | number | Date }) => {
        const activityDate = new Date(activity.activityDate);

        return (
          (!fromDate || activityDate >= new Date(fromDate)) &&
          (!toDate || activityDate <= new Date(toDate))
        );
      },
    );

    const sortedCashInActivity = filteredCashInActivity.sort(
      (a: { sum: number }, b: { sum: number }) => b.sum - a.sum,
    );

    const fourIncomeCategories = sortedCashInActivity.slice(0, 4);

    const totalIncome = fourIncomeCategories.reduce(
      (total: any, category: { sum: any }) => total + category.sum,
      0,
    );

    const formattedTotalIncome = formatCurrency(totalIncome);

    const responseObject = {
      totalIncome: formattedTotalIncome,
      fourIncomeCategories,
      succeeded: true,
    };
    return responseObject;
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      recentTransactions: [],
      succeeded: false,
    };
  }
};

export default async function CashInActivity({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  const title = "Cash In Activity";

  const currentDate = new Date();
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  const fromDate = from
    ? parse(from, "yyyy-MM-dd", new Date())
    : startOfCurrentMonth;
  const toDate = to ? parse(to, "yyyy-MM-dd", new Date()) : endOfCurrentMonth;

  const requestBody: RequestBody = {
    fromDate,
    toDate,
  };

  const response = (await getCashInActivityData(
    `${process.env.BASE_URL}/${urlEndpoints["cashInActivity"]}`,
    requestBody,
  )) as CashInResponse;

  const CurrentColors = ["#146f43", "#2d23c2", "#b3a641", "#eb34b4"];
  const isCashIn =
    (response as CashInResponse)?.fourIncomeCategories !== undefined;

  let sortedData: { category: string; sum: number }[] = [];
  if (isCashIn) {
    sortedData = (response as CashInResponse).fourIncomeCategories.sort(
      (a, b) => b.sum - a.sum,
    );
  }

  const top4Data = sortedData.slice(0, 4);

  return (
    <>
      <IncomeExpenseStats
        icon={
          <TrendingUp className=" h-8 w-8 text-gray-100 dark:text-gray-100 lg:h-5 lg:w-5 xl:h-8 xl:w-8 " />
        }
        title="Total Income"
        iconBgColor="bg-[#27674a]"
        textBgColor="bg-green-300"
        textColor="text-green-700 dark:text-green-200"
        amount={response?.totalIncome!}
        signIcon={
          <Add className="h-3 w-3 font-bold text-green-500 dark:text-green-300" />
        }
      />

      <div className="my-1 rounded-md border bg-gray-50 p-4 shadow-md dark:border-gray-900 dark:bg-dark dark:text-gray-100">
        <div className="flex flex-wrap items-center justify-between py-1">
          <p className="mb-0 font-bold capitalize antialiased dark:text-gray-100 xl:text-lg 2xl:text-xl">
            {title}
          </p>
          <div className="flex-shrink-0 ">
            {/* <DatePickerWithRange fromParam="cashInFrom" toParam="cashInTo" /> */}
            <MonthDropDown fromParam="cashInFrom" toParam="cashInTo" />
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
