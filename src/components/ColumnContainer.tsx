import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";
import AddAccountCard from "@/components/SummaryCard";
import Card from "@/components/Card";
import DetailCard from "@/components/DetailCard";
import Stats from "@/components/Stats";
import SearchInput from "@/components/SearchInput";
import Table from "@/components/Table";
import GroupedBarChart, { IGroupedData } from "./GroupedBar";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export type CashProps = {
  value: number;
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
    <div className="flex flex-row flex-wrap mx-auto lg:pl-20 overflow-hidden">
      <div className="w-full px-2 md:w-3/5 mx-auto xl:w-1/4 xs:-order-5 xl:order-none">
        <h1 className="hidden mb-5 text-2xl font-bold tracking-tight text-center scroll-m-20 lg:text-2xl xl:block">
          Availability
        </h1>
        <Card title="Net Worth" text="$45,032.00" buttonText="View Details" />
      </div>
      <div className="w-full px-2 xl:w-1/2 h-fit xs:order-first xl:order-none">
        <div className="">
          <h1 className="text-2xl font-bold tracking-tight text-center scroll-m-20 lg:text-2xl">
            Welcome Back, Issac👋!
          </h1>
          <p className="m-0 leading-7 text-center text-gray-400 ">
            Here is {"what's"} up with your finances today
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 mt-3 mb-6 xl:mb-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
          <Stats
            icon={
              <ArrowDownLeftIcon className="text-gray-100 md:w-8 md:h-8 xs:w-4 xs:h-4 dark:text-gray-100" />
            }
            iconBgColor="bg-green-600"
            textBgColor="bg-green-400"
            textColor="text-emerald-400"
            signIcon={
              <PlusIcon className="text-green-600 w-2 h-4  dark:text-green-600" />
            }
          />
          <Stats
            icon={
              <ArrowUpRightIcon className="text-gray-100 md:w-8 md:h-8 xs:w-4 xs:h-4 dark:text-gray-100" />
            }
            iconBgColor="bg-red-600"
            textBgColor="bg-red-400"
            textColor="text-red-400"
            signIcon={
              <MinusIcon className="text-red-600 w-2 h-4  dark:text-red-600" />
            }
          />
        </div>
      </div>
      <div className="w-full px-2 md:w-3/5 mx-auto lg:grid xl:w-1/4 xl:mt-12 xs:-order-4 xl:order-none xs:mt-4 ">
        <SearchInput />
        <AddAccountCard />
      </div>
      <div className="w-full px-2 xl:w-1/4 xl:-mt-20 xs:-order-2 xl:order-none space-y-10 md:w-3/5 mx-auto xs:mt-4">
        <Stats
          icon={
            <ArrowDownLeftIcon className="text-gray-100 w-5 h-5 md:w-8 md:h-8 dark:text-gray-100" />
          }
          iconBgColor="bg-green-600"
          textBgColor="bg-green-400"
          textColor="text-emerald-400"
          signIcon={
            <PlusIcon className="text-green-600 w-4 h-4 dark:text-green-600" />
          }
        />
        <DetailCard data={cashInData} title="Cash in Activity" />
      </div>
      <div className="w-full px-2 xl:w-1/2 xl:-mt-40 xs:-order-3 xl:order-none">
        <GroupedBarChart data={bargraphData} />
        <div className="hidden xl:block w-full mx-auto h-fit xs:order-last xl:order-none mt-10">
          <Table />
        </div>
      </div>
      <div className="w-full px-2 xl:mt-6 xl:w-1/4 h-full space-y-10 xs:mt-8 md:w-3/5 mx-auto">
        <Stats
          icon={
            <ArrowUpRightIcon className="text-gray-100 w-5 h-5 md:w-8 md:h-8  dark:text-gray-100" />
          }
          iconBgColor="bg-red-600"
          textBgColor="bg-red-400"
          textColor="text-red-400"
          signIcon={
            <MinusIcon className="text-red-600 w-4 h-4 dark:text-red-600" />
          }
        />
        <DetailCard data={cashOutData} title="Cash out Activity" />
      </div>

      <div className="xl:hidden block w-full px-2 mx-auto xl:w-1/2 h-fit xs:order-last xl:order-none mt-8">
        <Table />
      </div>
    </div>
  );
}
