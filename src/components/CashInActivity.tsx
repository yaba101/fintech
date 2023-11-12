import { ArrowRightIcon } from "@heroicons/react/20/solid";
import HalfDonutChart from "@/components/HalfPieChart";
import { Button } from "./ui/button";
import { CashInResponseSchema, fetchData } from "@/utils/cashActivitiesUtils";
import Stats from "./Stats";
import { ArrowDownLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DatePickerWithRange } from "./DatePicker";
import { parse } from "date-fns";

type RequestBody = {
  toDate: Date | null;
  fromDate: Date | null;
};

type CashInResponse = {
  totalIncome: number;
  fourIncomeCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

export default async function CashInActivity({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  const title = "Cash In Activity";
  const url = "/api/cash-in-activity";

  const fromDate = from ? parse(from, "dd/MM/yy", new Date()) : null;
  const toDate = to ? parse(to, "dd/MM/yy", new Date()) : null;

  const requestBody: RequestBody = {
    fromDate,
    toDate,
  };

  const response = await fetchData<CashInResponse>(
    `${process.env.URL}${url}`,
    requestBody,
    CashInResponseSchema,
  );

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
      <Stats
        icon={
          <ArrowDownLeftIcon className="h-5 w-5 text-gray-100 dark:text-gray-100 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
        }
        title="Total Income"
        iconBgColor="bg-[#27674a]"
        textBgColor="bg-green-400"
        textColor="text-emerald-400"
        amount={response?.totalIncome!}
        signIcon={
          <PlusIcon className="font-bold text-green-600 dark:text-green-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
        }
      />
      <div className="my-1 rounded-md border bg-gray-50 p-4 shadow-md dark:border-gray-900 dark:bg-dark dark:text-gray-100">
        <div className="border-bottom flex justify-between">
          <div className="flex flex-wrap items-center">
            <p className="mb-0 font-bold capitalize antialiased dark:text-gray-100 xl:text-lg 2xl:text-xl">
              {title}
            </p>
          </div>
          <div className="hidden xl:block">
            <DatePickerWithRange fromParam="cashInFrom" toParam="cashInTo" />
          </div>
        </div>
        <div className="block py-4 xl:hidden">
          <DatePickerWithRange fromParam="cashInFrom" toParam="cashInTo" />
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
            <ArrowRightIcon className="h-6 w-6 shrink dark:text-gray-100 " />
          </Button>
        </div>
      </div>
    </>
  );
}
