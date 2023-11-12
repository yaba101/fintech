import AssetDebtCard from "@/components/AssetDebtCard";
import CashInActivity from "@/components/CashInActivity";
import CashOutActivity from "@/components/CashOutActivity";
import GroupedBarContainer from "@/components/GroupedBarContainer";
import SearchInput from "@/components/SearchInput";
import SideBar from "@/components/SidebarContainer";
import Stats from "@/components/Stats";
import SummaryCard from "@/components/SummaryCard";
import Table from "@/components/Table";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

export const dynamic = "force-dynamic";

type SearchParamsProps = {
  transacFrom: string;
  transacTo: string;
  cashInFrom: string;
  cashInTo: string;
  cashOutFrom: string;
  cashOutTo: string;
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  return (
    <>
      <SideBar>
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
                amount={0}
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
                amount={0}
                signIcon={
                  <MinusIcon className="text-red-600 dark:text-red-600 xs:h-4 xs:w-2 md:h-5 md:w-3" />
                }
              />
            </div>
          </div>
          <div className="mx-auto w-full px-2 xs:-order-4 xs:mt-4 md:w-3/5 lg:order-none lg:mt-12 lg:grid lg:w-1/4 ">
            <SearchInput placeholder="search for account" />
            <SummaryCard />
          </div>
          <div className="mx-auto w-full px-2 xs:-order-2 xs:mt-4 md:w-3/5 lg:order-none lg:-mt-20 lg:w-1/4">
            <CashInActivity
              from={searchParams.cashInFrom}
              to={searchParams.cashInTo}
            />
          </div>
          <div className="w-full px-2 xs:-order-3 lg:order-none lg:-mt-40 lg:w-1/2">
            <GroupedBarContainer />
            <div className="mx-auto mt-10 hidden h-fit w-full xs:order-last lg:order-none lg:block">
              <Table
                from={searchParams.transacFrom}
                to={searchParams.transacTo}
              />
            </div>
          </div>
          <div className="mx-auto h-full w-full px-2 xs:mt-8 md:w-3/5 lg:mt-6 lg:w-1/4">
            <CashOutActivity
              from={searchParams.cashOutFrom}
              to={searchParams.cashOutTo}
            />
          </div>

          <div className="mx-auto mt-8 block h-fit w-full px-2 xs:order-last lg:order-none lg:hidden lg:w-1/2">
            <Table
              from={searchParams.transacFrom}
              to={searchParams.transacTo}
            />
          </div>
        </div>
      </SideBar>
    </>
  );
}
