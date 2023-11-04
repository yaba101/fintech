import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";
import AddAccountCard from "@/components/SummaryCard";
import Card from "@/components/Card";
import DetailCard from "@/components/DetailCard";
import Stats from "@/components/Stats";
import SearchInput from "@/components/SearchInput";
import Table from "@/components/Table";
import GroupedBarChart, { IGroupedData } from "./GroupedBar";
import DetailCardSkeleton from "./skeleton/DetailCardSkeleton";
import { Suspense } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

type CashProps = {
  color: string;
  title: string;
};

export default async function Column({
  bargraphData,
  cashInData,
  cashOutData,
}: {
  bargraphData: IGroupedData[];
  cashInData: CashProps[];
  cashOutData: CashProps[];
}) {
  return (
    <div className="flex flex-col mx-auto overflow-x-hidden lg:pl-24 2xl:flex-row xl:flex-row xl:space-x-3 2xl:space-x-8 ">
      <div className="flex-grow h-full my-2 rounded-md column-2 lg:space-y-5 xl:w-1/6">
        <h1 className="hidden mb-5 text-2xl font-bold tracking-tight text-center scroll-m-20 lg:text-2xl xl:block">
          Availability
        </h1>
        <h1 className="text-2xl font-bold tracking-tight text-center scroll-m-20 lg:text-2xl xl:hidden lg:block">
          Welcome Back, Issac👋!
        </h1>
        <p className="mb-3 leading-7 text-center text-gray-400 xl:hidden lg:block">
          Here is {"what's"} up with your finances today
        </p>
        <div className="block mb-3 xl:hidden">
          <SearchInput />
        </div>
        <Card title="Net Worth" text="$45,032.00" buttonText="View Details" />

        <Stats
          icon={
            <ArrowDownLeftIcon className="w-6 h-6 text-gray-100 shrink-0 dark:text-gray-100" />
          }
          iconBgColor="bg-green-600"
          textBgColor="bg-green-300"
          textColor="text-emerald-400"
          signIcon={
            <PlusIcon className="w-4 h-4 text-green-600 shrink-0 dark:text-green-600" />
          }
        />

        <DetailCard colors={cashInData} title="Cash in Activity" />
      </div>
      <div className="flex-grow my-2 rounded-md column-2 xl:w-2/5">
        <h1 className="hidden text-2xl font-bold tracking-tight text-center scroll-m-20 lg:text-2xl xl:block">
          Welcome Back, Issac👋!
        </h1>
        <p className="hidden m-0 leading-7 text-center text-gray-400 xl:block">
          Here is {"what's"} up with your finances today
        </p>
        <div className="lg:space-y-5">
          <div className="grid grid-cols-1 gap-2 mt-3 sm:grid-cols-1 sm:gap-6 lg:grid-cols-2">
            <Stats
              icon={
                <ArrowDownLeftIcon className="w-6 h-6 text-gray-100 dark:text-gray-100" />
              }
              iconBgColor="bg-green-600"
              textBgColor="bg-green-400"
              textColor="text-emerald-400"
              signIcon={
                <PlusIcon className="w-4 h-4 text-green-600 shrink-0 dark:text-green-600" />
              }
            />
            <Stats
              icon={
                <ArrowUpRightIcon className="w-6 h-6 text-gray-100 shrink-0 dark:text-gray-100" />
              }
              iconBgColor="bg-red-600"
              textBgColor="bg-red-400"
              textColor="text-red-400"
              signIcon={
                <MinusIcon className="w-4 h-4 text-red-600 shrink-0 dark:text-red-600" />
              }
            />
          </div>

          <GroupedBarChart data={bargraphData} />
          <Table />
        </div>
      </div>

      <div className="2xl:flex 2xl:flex-row 2xl:space-x-8 xl:w-1/4">
        <div className="flex-grow my-12 rounded-md column-3 2xl:space-y-5">
          <div className="hidden xl:block">
            <SearchInput />
          </div>
          <AddAccountCard />
          <Stats
            icon={
              <ArrowUpRightIcon className="w-6 h-6 text-gray-100 dark:text-gray-100" />
            }
            iconBgColor="bg-red-600"
            textBgColor="bg-red-400"
            textColor="text-red-400"
            signIcon={
              <MinusIcon className="w-4 h-4 text-red-600 dark:text-red-600" />
            }
          />
          <DetailCard colors={cashOutData} title="Cash out Activity" />
        </div>
      </div>
    </div>
  );
}
