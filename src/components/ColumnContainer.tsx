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
    <div className="mx-auto flex flex-row flex-wrap overflow-hidden xl:pl-24 2xl:w-11/12 ">
      <div className="mx-auto w-full px-2 xs:-order-5 md:w-3/5 lg:order-none lg:w-1/4">
        <h1 className="mb-5 hidden scroll-m-20 text-center text-2xl font-bold tracking-tight lg:block lg:text-2xl">
          Availability
        </h1>
        <Card title="Net Worth" text="$45,032.00" buttonText="View Details" />
      </div>
      <div className="h-fit w-full px-2 xs:order-first lg:order-none lg:w-1/2">
        <div className="">
          <h1 className="scroll-m-20 text-center text-2xl font-bold tracking-tight lg:text-2xl">
            Welcome Back, Issac👋!
          </h1>
          <p className="m-0 text-center leading-7 text-gray-400 ">
            Here is {"what's"} up with your finances today
          </p>
        </div>
        <div className="mb-6 mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:mb-0">
          <Stats
            icon={
              <ArrowDownLeftIcon className="text-gray-100 dark:text-gray-100 xs:h-4 xs:w-4 md:h-8 md:w-8" />
            }
            iconBgColor="bg-green-600"
            textBgColor="bg-green-400"
            textColor="text-emerald-400"
            signIcon={
              <PlusIcon className="h-4 w-2 text-green-600 dark:text-green-600" />
            }
          />
          <Stats
            icon={
              <ArrowUpRightIcon className="text-gray-100 dark:text-gray-100 xs:h-4 xs:w-4 md:h-8 md:w-8" />
            }
            iconBgColor="bg-red-600"
            textBgColor="bg-red-400"
            textColor="text-red-400"
            signIcon={
              <MinusIcon className="h-4 w-2 text-red-600 dark:text-red-600" />
            }
          />
        </div>
      </div>
      <div className="mx-auto w-full px-2 xs:-order-4 xs:mt-4 md:w-3/5 lg:order-none lg:mt-12 lg:grid lg:w-1/4 ">
        <SearchInput />
        <AddAccountCard />
      </div>
      <div className="mx-auto w-full space-y-10 px-2 xs:-order-2 xs:mt-4 md:w-3/5 lg:order-none lg:-mt-20 lg:w-1/4">
        <Stats
          icon={
            <ArrowDownLeftIcon className="h-5 w-5 text-gray-100 dark:text-gray-100 md:h-8 md:w-8" />
          }
          iconBgColor="bg-green-600"
          textBgColor="bg-green-400"
          textColor="text-emerald-400"
          signIcon={
            <PlusIcon className="h-4 w-4 text-green-600 dark:text-green-600" />
          }
        />
        <DetailCard data={cashInData} title="Cash in Activity" />
      </div>
      <div className="w-full px-2 xs:-order-3 lg:order-none lg:-mt-40 lg:w-1/2">
        <GroupedBarChart data={bargraphData} />
        <div className="mx-auto mt-10 hidden h-fit w-full xs:order-last lg:order-none lg:block">
          <Table />
        </div>
      </div>
      <div className="mx-auto h-full w-full space-y-10 px-2 xs:mt-8 md:w-3/5 lg:mt-6 lg:w-1/4">
        <Stats
          icon={
            <ArrowUpRightIcon className="h-5 w-5 text-gray-100 dark:text-gray-100 md:h-8 md:w-8" />
          }
          iconBgColor="bg-red-600"
          textBgColor="bg-red-400"
          textColor="text-red-400"
          signIcon={
            <MinusIcon className="h-4 w-4 text-red-600 dark:text-red-600" />
          }
        />
        <DetailCard data={cashOutData} title="Cash out Activity" />
      </div>

      <div className="mx-auto mt-8 block h-fit w-full px-2 xs:order-last lg:order-none lg:hidden lg:w-1/2">
        <Table />
      </div>
    </div>
  );
}
