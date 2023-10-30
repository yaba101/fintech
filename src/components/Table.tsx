import {
  ArrowLeftCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/20/solid";
import ArrowDownCircleIcon from "@heroicons/react/24/outline/esm/ArrowDownCircleIcon";
import DatePicker from "./DatePicker";
import SearchInput from "./SearchInput";

const Item = [
  {
    name: "AT&T",
    title: "Feb 19 Apr 2023",
    role: "$200",
    icon: <ArrowDownCircleIcon />,
    textColor: "text-red-600",
  },
  {
    name: "ConEdison",
    title: "Feb 19 Apr 2023",
    role: "$200",
    icon: <BuildingLibraryIcon />,
    textColor: "text-red-600",
  },
  {
    name: "Pay Check",
    title: "Feb 19 Apr 2023",
    role: "$4343.00",
    icon: <ArrowLeftCircleIcon />,
    textColor: "text-green-600",
  },
];

export default function Table() {
  return (
    <div className="rounded-md dark:bg-dark w-full bg-gray-50 shadow-lg">
      <div className="flex my-3 py-3 items-center flex-grow">
        <h4 className="mr-5 text-medium font-medium tracking-tight lg:text-medium text-center whitespace-nowrap px-2">
          Recent Transactions
        </h4>
        <DatePicker />
        <div className="px-2">
          <SearchInput />
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 shadow-xl rounded-md ">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody>
                  {Item.map((item) => (
                    <tr key={item.name}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0">
                            {item.icon}
                          </div>
                          <div className="ml-4">
                            <div
                              className={`font-medium dark:text-gray-100 ${item.textColor}`}
                            >
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className={`${item.textColor}`}>{item.title}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ${item.textColor}`}
                        >
                          {item.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center pb-5">
              <button className="bg-green-500 hover:bg-green-700 text-white font-medium py-1 px-4 rounded-lg">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="rounded-md p-4 my-3" style={{ background: "#1d1d41" }}>
      <div className="flex my-3 items-center shadow-xl animate-pulse">
        <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
        <div className="h-8 w-40 bg-gray-300 rounded-md ml-7"></div>
        {/* <div className="w-20 bg-gray-300 ml-2 rounded-md"></div> */}
        <div className="w-full">
          <div className="h-8 w-48 bg-gray-300 rounded-md ml-auto"></div>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 shadow-xl rounded-md animate-pulse">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody>
                  {Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 bg-gray-300 rounded-full"></div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-100 bg-gray-300 w-24 h-6 rounded-md"></div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="bg-gray-300 w-24 h-6 rounded-md"></div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-gray-300 w-16 h-6"></span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center pb-5 ">
              <div className="bg-gray-300 w-32 h-8 rounded-md text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
