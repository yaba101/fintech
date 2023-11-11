import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid";
import AddAccountCard from "@/components/SummaryCard";
import AssetDebtCard from "@/components/AssetDebtCard";
import CashActivity from "@/components/CashActivity";
import Stats from "@/components/Stats";
import SearchInput from "@/components/SearchInput";
import Table from "@/components/Table";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import GroupedBarContainer from "./GroupedBarContainer";

export default async function Column() {
  return (
    <div className="mx-auto flex flex-row flex-wrap overflow-hidden xl:pl-24 2xl:w-11/12 ">
      <div className="mx-auto w-full px-2 xs:-order-5 md:w-3/5 lg:order-none lg:w-1/4">
        <h1 className="mb-5 hidden scroll-m-20 text-center text-2xl font-bold tracking-tight lg:block lg:text-2xl">
          Availability
        </h1>
        <AssetDebtCard title="Net Worth" buttonText="View Details" />
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
            title="Total Income"
            icon={
              <ArrowDownLeftIcon className="text-gray-100 dark:text-gray-100 xs:h-4 xs:w-4 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
            }
            iconBgColor="bg-[#27674a]"
            textBgColor="bg-green-400"
            textColor="text-emerald-400"
            signIcon={
              <PlusIcon className="text-green-600 dark:text-green-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
            }
          />
          <Stats
            icon={
              <ArrowUpRightIcon className="text-gray-100 dark:text-gray-100 xs:h-4 xs:w-4 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
            }
            title="Total Expenses"
            iconBgColor="bg-red-600"
            textBgColor="bg-red-400"
            textColor="text-red-400"
            signIcon={
              <MinusIcon className="text-red-600 dark:text-red-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
            }
          />
        </div>
      </div>
      <div className="mx-auto w-full px-2 xs:-order-4 xs:mt-4 md:w-3/5 lg:order-none lg:mt-12 lg:grid lg:w-1/4 ">
        <SearchInput placeholder="search for account" />
        <AddAccountCard />
      </div>
      <div className="mx-auto w-full px-2 pt-10 xs:-order-2 xs:mt-4 md:w-3/5 lg:order-none lg:-mt-20 lg:w-1/4">
        <Stats
          icon={
            <ArrowDownLeftIcon className="h-5 w-5 text-gray-100 dark:text-gray-100 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
          }
          title="Total Income"
          iconBgColor="bg-[#27674a]"
          textBgColor="bg-green-400"
          textColor="text-emerald-400"
          signIcon={
            <PlusIcon className="font-bold text-green-600 dark:text-green-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
          }
        />
        <CashActivity title="Cash in Activity" url="/api/cash-in-activity" />
      </div>
      <div className="w-full px-2 xs:-order-3 lg:order-none lg:-mt-40 lg:w-1/2">
        <GroupedBarContainer />
        <div className="mx-auto mt-10 hidden h-fit w-full xs:order-last lg:order-none lg:block">
          <Table />
        </div>
      </div>
      <div className="mx-auto h-full w-full px-2 pt-10 xs:mt-8 md:w-3/5 lg:mt-6 lg:w-1/4">
        <Stats
          icon={
            <ArrowUpRightIcon className="h-5 w-5 text-gray-100 dark:text-gray-100 md:h-8 md:w-8 lg:h-5 lg:w-5 xl:h-8 xl:w-8" />
          }
          title="Total Expenses"
          iconBgColor="bg-red-600"
          textBgColor="bg-red-400"
          textColor="text-red-400"
          signIcon={
            <MinusIcon className="font-bold text-red-600 dark:text-red-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
          }
        />
        <CashActivity title="Cash out Activity" url="/api/cash-out-activity" />
      </div>

      <div className="mx-auto mt-8 block h-fit w-full px-2 xs:order-last lg:order-none lg:hidden lg:w-1/2">
        <Table />
      </div>
    </div>
  );
}
