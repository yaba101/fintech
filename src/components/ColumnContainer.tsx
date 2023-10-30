import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";
import AddAccountCard from "./SummaryCard";
import Card from "./Card";
import DetailCard from "./DetailCard";
import Stats from "./Stats";
import SearchInput from "@/components/SearchInput";
import Table from "@/components/Table";
import GroupedBarChart, { IGroupedData } from "./GroupedBar";
const colors = [
  { color: "#146f43", title: "Salary" },
  { color: "#2d23c2", title: "Profit" },
];
const colors2 = [
  { color: "#cf3747", title: "Rent" },
  { color: "#bf6a74", title: "Subscription" },
];
const GROUPED_BAR_CHART_DATA: IGroupedData[] = [
  { label: "January", values: [60, 80] },
  { label: "February", values: [160, 200] },
  { label: "March", values: [60, 40] },
  { label: "April", values: [80, 120] },
  { label: "May", values: [90, 100] },
  { label: "June", values: [70, 110] },
  { label: "July", values: [50, 70] },
  { label: "August", values: [40, 60] },
];

export default function Column() {
  return (
    <div className="flex flex-row ">
      <div className="flex flex-col md:flex-row w-11/12">
        <div className="column-2 flex-grow h-full my-2 rounded-md px-1.5">
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl text-center mb-5 ">
            Availability
          </h1>
          <Card title="Net Worth" text="$45,032.00" buttonText="View Details" />

          <Stats
            icon={
              <ArrowDownLeftIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
            }
            iconBgColor="bg-green-600"
            textBgColor="bg-green-300"
            textColor="text-emerald-400"
          />

          <DetailCard colors={colors} title="Cash in Activity" />
        </div>
        <div className="column-3 flex-grow w-full h-full my-2 rounded-md mx-1">
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl text-center">
            Welcome Back, Issac👋!
          </h1>
          <p className="leading-7 text-center m-0 text-gray-400">
            Here is {"what's"} up with your finances today
          </p>
          <div className="flex mt-5 space-x-1 flex-grow flex-1">
            <Stats
              icon={
                <ArrowDownLeftIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
              }
              iconBgColor="bg-green-600"
              textBgColor="bg-green-400"
              textColor="text-emerald-400"
            />
            <Stats
              icon={
                <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
              }
              iconBgColor="bg-red-600"
              textBgColor="bg-red-400"
              textColor="text-red-400"
            />
          </div>

          <div className="w-full">
            <GroupedBarChart data={GROUPED_BAR_CHART_DATA} />
            <Table />
          </div>
        </div>

        <div className="column-3 flex-grow  h-full my-8 rounded-md px-1.5 ">
          <SearchInput />
          <AddAccountCard />
          <Stats
            icon={
              <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
            }
            iconBgColor="bg-red-600"
            textBgColor="bg-red-400"
            textColor="text-red-400"
          />
          <DetailCard colors={colors2} title="Cash out Activity" />
        </div>
      </div>
    </div>
  );
}
