"use client";
import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";
import AddAccountCard from "@/components/SummaryCard";
import Card from "@/components/Card";
import DetailCard from "@/components/DetailCard";
import Stats from "@/components/Stats";
import SearchInput from "@/components/SearchInput";
import Table from "@/components/Table";
import GroupedBarChart, { IGroupedData } from "./GroupedBar";
import DetailCardSkeleton from "./skeleton/DetailCardSkeleton";
import { Suspense, useTransition } from "react";

type CashProps = {
  color: string;
  title: string;
};

export default function Column({
  bargraphData,
  cashInData,
  cashOutData,
}: {
  bargraphData: IGroupedData[];
  cashInData: CashProps[];
  cashOutData: CashProps[];
}) {
  return (
    <div className="flex flex-row ">
      <div className="flex flex-col md:flex-row mx-auto overflow-y-hidden lg:space-x-4">
        <div className="column-2 flex-grow h-full my-2 rounded-md">
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl text-center mb-5 hidden lg:block">
            Availability
          </h1>
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl text-center lg:hidden sm:block">
            Welcome Back, Issac👋!
          </h1>
          <p className="leading-7 text-center mb-3 text-gray-400 lg:hidden sm:block">
            Here is {"what's"} up with your finances today
          </p>
          <div className="block lg:hidden mb-3">
            <SearchInput />
          </div>
          <Card title="Net Worth" text="$45,032.00" buttonText="View Details" />

          <Stats
            icon={
              <ArrowDownLeftIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
            }
            iconBgColor="bg-green-600"
            textBgColor="bg-green-300"
            textColor="text-emerald-400"
          />

          <DetailCard colors={cashInData} title="Cash in Activity" />
        </div>
        <div className="column-3 flex-grow h-full my-2 rounded-md ">
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl text-center hidden lg:block">
            Welcome Back, Issac👋!
          </h1>
          <p className="leading-7 text-center m-0 text-gray-400 hidden lg:block">
            Here is {"what's"} up with your finances today
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-1 sm:gap-6 lg:grid-cols-2">
            <Stats
              icon={
                <ArrowDownLeftIcon className="h-6 w-6 text-gray-100 dark:text-gray-100" />
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

          <GroupedBarChart data={bargraphData} />
          <Table />
        </div>

        <div className="column-2 flex-grow h-full  my-8 rounded-md  ">
          <div className="hidden lg:block">
            <SearchInput />
          </div>
          <AddAccountCard />
          <Stats
            icon={
              <ArrowUpRightIcon className="h-6 w-6 shrink-0 text-gray-100 dark:text-gray-100" />
            }
            iconBgColor="bg-red-600"
            textBgColor="bg-red-400"
            textColor="text-red-400"
          />
          <DetailCard colors={cashOutData} title="Cash out Activity" />
        </div>
      </div>
    </div>
  );
}
