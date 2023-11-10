import { ArrowRightIcon } from "@heroicons/react/20/solid";
import HalfDonutChart from "@/components/HalfPieChart";
import { Button } from "./ui/button";
import { CashProps } from "./ColumnContainer";
import MonthDropDown from "./MonthDropDown";
import { z, ZodError } from "zod";

type CashOutResponse = {
  totalExpense: number;
  fourExpenseCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

type CashInResponse = {
  totalIcome: number;
  fourIncomeCategories: { category: string; sum: number }[];
  succeeded: boolean;
};

type RequestBody = {
  toDate: Date;
  fromDate: Date;
};

const CashOutResponseSchema = z.object({
  totalExpense: z.number(),
  fourExpenseCategories: z.array(
    z.object({
      category: z.string(),
      sum: z.number(),
    }),
  ),
  succeeded: z.boolean(),
});

const CashInResponseSchema = z.object({
  totalIcome: z.number(),
  fourIncomeCategories: z.array(
    z.object({
      category: z.string(),
      sum: z.number(),
    }),
  ),
  succeeded: z.boolean(),
});

const RequestBodySchema = z.object({
  toDate: z.date(),
  fromDate: z.date(),
});

const validateResponse = <T,>(
  data: unknown,
  schema: z.ZodType<T, any, any>,
): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Error while validating response data:", error.errors);
    } else {
      console.error("Error while validating response data:", error);
    }
    return {} as T;
  }
};

const fetchData = async <T,>(
  url: string,
  body: RequestBody,
): Promise<T | undefined> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "force-cache",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return validateResponse(
      responseData,
      CashOutResponseSchema.or(CashInResponseSchema),
    ) as T;
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {} as T;
  }
};

export default async function CashActivity<T>({
  data,
  title,
  url,
}: {
  data: CashProps[];
  title: string;
  url: string;
}) {
  const currentDate = new Date();
  const fromDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const toDate = currentDate;

  const response = await fetchData<CashOutResponse | CashInResponse>(
    `${process.env.URL}${url}`,
    {
      fromDate,
      toDate,
    },
  );

  const CurrentColors = ["#146f43", "#2d23c2", "#b3a641", "#eb34b4"];
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const top4Data = sortedData.slice(0, 4);

  return (
    <div className="my-3 rounded-md border bg-gray-50 p-4 shadow-md dark:border-gray-900 dark:bg-dark dark:text-gray-100">
      <div className="border-bottom flex justify-between">
        <div className="flex items-center">
          <p className="mb-0 font-bold capitalize antialiased dark:text-gray-100 xl:text-lg 2xl:text-xl">
            {title}
          </p>
        </div>
        <MonthDropDown />
      </div>
      <HalfDonutChart data={top4Data} />
      <div className="mb-3 flex flex-wrap items-center justify-center ">
        {CurrentColors.map((color, index) => (
          <div key={index} className="w-1/2 p-2">
            <div className="flex flex-nowrap items-center justify-center space-x-2">
              <button
                className="mr-2 h-4 w-4 rounded-full font-medium text-white xs:mr-1 xs:h-3 xs:w-3 xl:text-xs"
                style={{ background: color }}
              />
              <div className="flex flex-col">
                <h4 className="antialiased dark:text-gray-200 xs:whitespace-nowrap xs:text-sm xl:text-sm">
                  {top4Data[index]?.title.toString()}
                </h4>
                <h4 className="antialiased dark:text-gray-400 xs:py-1 xs:pl-1 xs:text-xs xl:text-xs">
                  {(
                    (top4Data[index]?.value /
                      top4Data.reduce((acc, item) => acc + item.value, 0)) *
                    100
                  ).toFixed(2)}
                  %
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto w-3/4">
        <Button variant="outline" className="tran w-full">
          <span className="mx-auto whitespace-nowrap text-center">
            View All Activity
          </span>
          <ArrowRightIcon className="h-6 w-6 shrink dark:text-gray-100 " />
        </Button>
      </div>
    </div>
  );
}
