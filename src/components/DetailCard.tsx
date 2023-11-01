import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { data } from "../../data";
import HalfDonutChart from "@/components/HalfPieChart";
import Dropdown from "./Dropdown";

export default async function DetailCard({
  colors,
  title,
}: {
  colors: any[];
  title: string;
}) {
  return (
    <div className="p-4 shadow-md dark:text-gray-100 border dark:border-gray-900 rounded-md  my-3 dark:bg-dark bg-gray-50">
      <div className="flex justify-between border-bottom">
        <div className="flex items-center">
          <p className="mb-0 capitalize dark:text-gray-100 font-bold">
            {title}
          </p>
        </div>
        <Dropdown />
      </div>
      <div className=" -mx-3">
        <HalfDonutChart data={data} width={350} height={400} colors={colors} />
      </div>
      <div className="flex justify-between -mt-28 mb-3">
        <div className="flex items-center ml-5">
          <button
            className=" text-white font-medium rounded-full w-4 h-4 mr-2"
            style={{ background: colors[0]?.color?.toString() }}
          />
          <h4 className="dark:text-gray-200">{colors[0]?.title.toString()}</h4>
        </div>
        <div className="flex items-center">
          <button
            className=" hover-bg-blue-700 text-white font-medium rounded-full w-4 h-4 mr-2"
            style={{ background: colors[1]?.color?.toString() }}
          />
          <h4 className="dark:text-gray-200">{colors[1]?.title?.toString()}</h4>
        </div>
      </div>
      <div className="flex justify-between mb-6 ml-6">
        <span className="ml-1 dark:text-gray-400">57%</span>
        <span className="ml-1 dark:text-gray-400">67%</span>
      </div>

      <button className="flex items-center justify-between border dark:border-gray-100 dark:text-white font-semibold py-2 px-10 rounded-xl w-full ">
        <span className="text-center px-10 whitespace-nowrap">
          View All Activity
        </span>
        <ArrowRightIcon className="h-6 w-6 shrink dark:text-gray-100 " />
      </button>
    </div>
  );
}
