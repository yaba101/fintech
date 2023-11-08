import { ArrowRightIcon } from "@heroicons/react/20/solid";
import HalfDonutChart from "@/components/HalfPieChart";
import Dropdown from "./Dropdown";
import { Button } from "./ui/button";
import { CashProps } from "./ColumnContainer";

export default async function DetailCard({
  data,
  title,
}: {
  data: CashProps[];
  title: string;
}) {
  const CurrentColors = ["#146f43", "#2d23c2", "#b3a641", "#eb34b4"];
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const top4Data = sortedData.slice(0, 4);

  return (
    <div className="p-4 my-3 border rounded-md shadow-md dark:text-gray-100 dark:border-gray-900 dark:bg-dark bg-gray-50">
      <div className="flex justify-between border-bottom">
        <div className="flex items-center">
          <p className="mb-0 font-bold xl:text-lg 2xl:text-xl capitalize dark:text-gray-100">
            {title}
          </p>
        </div>
        <Dropdown />
      </div>
      <HalfDonutChart data={top4Data} />
      <div className="flex flex-wrap items-center justify-center mb-3 ">
        {CurrentColors.map((color, index) => (
          <div key={index} className="w-1/2 p-2">
            <div className="flex flex-nowrap items-center justify-center space-x-2">
              <button
                className="w-4 h-4 mr-2 font-medium text-white rounded-full xl:text-xs xs:w-3 xs:h-3 xs:mr-1"
                style={{ background: color }}
              />
              <div className="flex flex-col">
                <h4 className="dark:text-gray-200 xl:text-sm xs:text-sm xs:whitespace-nowrap">
                  {top4Data[index]?.title.toString()}
                </h4>
                <h4 className="dark:text-gray-400 xl:text-xs xs:text-xs xs:pl-1 xs:py-1">
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
      <div className="w-3/4 mx-auto">
        <Button variant="outline" className=" w-full">
          <span className=" whitespace-nowrap mx-auto text-center">
            View All Activity
          </span>
          <ArrowRightIcon className="w-6 h-6 shrink dark:text-gray-100 " />
        </Button>
      </div>
    </div>
  );
}
