import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ArrowUpLeft } from "lucide-react";

export default function Stats({
  icon,
  iconBgColor,
  textBgColor,
  textColor,
  signIcon,
}: {
  icon: any;
  iconBgColor: string;
  textBgColor: string;
  textColor: string;
  signIcon: any;
}) {
  return (
    <>
      <div className="flex flex-grow items-end justify-between space-x-6 rounded-lg border dark:border-gray-900 shadow-lg py-4 px-3 dark:bg-dark bg-gray-50">
        <div className="flex items-center gap-3">
          <span
            className={`hidden rounded-lg ${iconBgColor} p-3 dark:text-gray-100 sm:block`}
          >
            {icon}
          </span>

          <div>
            <p className="text-sm sm:text-xs dark:text-gray-400 whitespace-nowrap">
              Total Income
            </p>

            <p className="text-lg font-medium dark:text-gray-200">$632.00</p>
          </div>
        </div>

        <div
          className={`flex gap-1 rounded py-0.5  ${textColor} ${textBgColor} bg-opacity-40`}
        >
          {signIcon}

          <span className="text-xs font-medium">67.81%</span>
        </div>
      </div>
    </>
  );
}
