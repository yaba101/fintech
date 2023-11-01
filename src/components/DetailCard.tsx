import { ArrowRightIcon } from "@heroicons/react/20/solid";
import HalfDonutChart from "@/components/HalfPieChart";
import Dropdown from "./Dropdown";
import { Button } from "./ui/button";

export default async function DetailCard({
  colors,
  title,
}: {
  colors: any[];
  title: string;
}) {
  const CurrentColors = ["#146f43", "#2d23c2", "#b3a641", "#eb34b4"];
  const sortedData = [...colors].sort((a, b) => b.value - a.value);

  const top4Data = sortedData.slice(0, 4);

  return (
    <div className="p-4 shadow-md dark:text-gray-100 border dark:border-gray-900 rounded-md my-3 dark:bg-dark bg-gray-50">
      <div className="flex justify-between border-bottom">
        <div className="flex items-center">
          <p className="mb-0 capitalize dark:text-gray-100 font-bold">
            {title}
          </p>
        </div>
        <Dropdown />
      </div>
      <div className="min-w-fit text-center">
        <HalfDonutChart data={top4Data} width={360} height={400} />
      </div>
      <div className="flex flex-wrap justify-center items-center -mt-28 mb-3 ">
        {CurrentColors.map((color, index) => (
          <div key={index} className="w-1/2 p-2 ">
            <div className="flex items-center justify-center space-x-2">
              <button
                className="text-white font-medium rounded-full w-4 h-4 mr-2"
                style={{ background: color }}
              />
              <h4 className="dark:text-gray-200">
                {top4Data[index]?.title.toString()}
              </h4>
              <h4 className="dark:text-gray-400 text-sm">
                {(
                  (top4Data[index]?.value /
                    top4Data.reduce((acc, item) => acc + item.value, 0)) *
                  100
                ).toFixed(2)}
                %
              </h4>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        <span className="text-center px-10 whitespace-nowrap">
          View All Activity
        </span>
        <ArrowRightIcon className="h-6 w-6 shrink dark:text-gray-100 " />
      </Button>
    </div>
  );
}
