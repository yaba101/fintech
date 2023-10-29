import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { data } from "../../data";
import AddAccountCard from "./AddAccountCard";
import Card from "./Card";
import DetailCard from "./DetailCard";
import Stats from "./Stats";
import DatePicker from "@/components/DatePicker";
import SearchInput from "@/components/SearchInput";
import Table from "@/components/Table";
import ArrowTopRightOnSquareIcon from "@heroicons/react/20/solid/esm/ArrowTopRightOnSquareIcon";
const colors = [
  { color: "#146f43", title: "Salary" },
  { color: "#2d23c2", title: "Profit" },
];
const colors2 = [
  { color: "#cf3747", title: "Rent" },
  { color: "#bf6a74", title: "Subscription" },
];
export default function Column() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col md:flex-row w-11/12 space-x-1">
        <div className="column-2 flex-grow w-auto h-full my-2 rounded-md">
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl text-center mb-5">
            Availability
          </h1>
          <Card title="Net Worth" text="$45,032.00" buttonText="View Details" />

          <Stats
            icon={
              <ArrowDownLeftIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
            }
            color="bg-green-600"
          />
          <DetailCard colors={colors} title="Cash in Activity" />
        </div>
        <div className="column-3 flex-grow w-full h-full my-2 rounded-md">
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl text-center">
            Welcome Back, Issac👋!
          </h1>
          <p className="leading-7 text-center m-0 text-gray-400">
            Here is {"what's"} up with your finances today
          </p>
          <div className="flex mt-5 flex-grow w-full">
            <Stats
              icon={
                <ArrowDownLeftIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
              }
              color="bg-green-600"
            />
            <Stats
              icon={
                <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
              }
              color="bg-red-600"
            />
          </div>
          <Table />
        </div>

        <div className="column-3 flex-grow w-auto h-full  my-8 rounded-md">
          <SearchInput />
          <AddAccountCard />
          <Stats
            icon={
              <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
            }
            color="bg-red-600"
          />
          <DetailCard colors={colors2} title="Cash out Activity" />
        </div>
      </div>
    </div>
  );
}
