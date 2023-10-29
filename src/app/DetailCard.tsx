import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { data } from "../../data";
import HalfDonutChart from "./HalfPieChart";
import Drop from "./Drop";

export default function DetailCard({
  colors,
  title,
}: {
  colors: any[];
  title: string;
}) {
  return (
    <div
      className="max-w-lg p-4 shadow-md dark:bg-gray-900 dark:text-gray-100 border border-gray-900 rounded-md mx-3 my-3"
      style={{ background: "#1d1d41" }}
    >
      <div className="flex justify-between border-bottom">
        <div className="flex items-center">
          <p className="mb-0 capitalize dark:text-gray-100 font-bold">
            {title}
          </p>
        </div>
        <a rel="noopener noreferrer" href="#">
          <Drop />
        </a>
      </div>

      <HalfDonutChart data={data} width={350} height={400} colors={colors} />
      <div className="flex justify-between -mt-28 mb-3">
        <div className="flex items-center ml-4">
          <button
            className=" text-white font-medium rounded-full w-4 h-4 mr-2"
            style={{ background: colors[0].color.toString() }}
          />
          <h4 className="text-gray-300">{colors[0].title.toString()}</h4>
        </div>
        <div className="flex items-center">
          <button
            className=" hover-bg-blue-700 text-white font-medium rounded-full w-4 h-4 mr-2"
            style={{ background: colors[1].color.toString() }}
          />
          <h4 className="text-gray-300">{colors[1].title.toString()}</h4>
        </div>
      </div>
      <div className="flex justify-between mb-6 ml-6">
        <span className="ml-1 text-gray-500">57%</span>
        <span className="ml-1 text-gray-500">67%</span>
      </div>

      <button className="flex items-center justify-between border border-gray-100 text-white font-semibold py-2 px-10 rounded-xl w-full ">
        <span className="text-center px-10">View All Activity</span>
        <ArrowRightIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-400" />
      </button>
    </div>
  );
}
