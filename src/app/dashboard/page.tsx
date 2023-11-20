import AssetDebtStats from "@/components/AssetDebtStats";
import CashInActivity from "@/components/CashInActivity";
import CashOutActivity from "@/components/CashOutActivity";
import GroupedBarContainer from "@/components/GroupedBarContainer";
import NetWorthCard from "@/components/NetWorthCard";
import SearchInput from "@/components/SearchInput";
import SideBar from "@/components/SidebarContainer";
import SummaryCard from "@/components/SummaryCard";
import Table from "@/components/Table";
import AssetDebtStatsSkeleton from "@/components/skeleton/AssetDebtStatsSkeleton";
import CashActivitySkeleton from "@/components/skeleton/CashActivity";
import GroupedBarChartSkeleton from "@/components/skeleton/GroupedBarSkeleton";
import NetWorthCardSkeleton from "@/components/skeleton/NetWorthSkeleton";
import SummaryCardSkeleton from "@/components/skeleton/SkeletonSummaryCard";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Suspense } from "react";

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
            <Suspense fallback={<NetWorthCardSkeleton />}>
              <NetWorthCard title="Net Worth" buttonText="View Details" />
            </Suspense>
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
              <Suspense fallback={<AssetDebtStatsSkeleton />}>
                <AssetDebtStats />
              </Suspense>
            </div>
          </div>
          <div className="mx-auto w-full px-2 xs:-order-4 xs:mt-4 md:w-3/5 lg:order-none lg:mt-12 lg:grid lg:w-1/4 ">
            <Suspense fallback={<SummaryCardSkeleton />}>
              <SearchInput placeholder="search for account" />
              <SummaryCard />
            </Suspense>
          </div>
          <div className="mx-auto w-full px-2 xs:-order-2 xs:mt-4 md:w-3/5 lg:order-none lg:-mt-20 lg:w-1/4">
            <Suspense fallback={<CashActivitySkeleton />}>
              <CashInActivity
                from={searchParams.cashInFrom}
                to={searchParams.cashInTo}
              />
            </Suspense>
          </div>
          <div className="w-full xs:-order-3 xs:px-0 md:px-2 lg:order-none lg:-mt-40 lg:w-1/2">
            <Suspense fallback={<GroupedBarChartSkeleton />}>
              <GroupedBarContainer />
            </Suspense>
            <div className="mx-auto mt-10 hidden h-fit w-full xs:order-last lg:order-none lg:block">
              <Suspense fallback={<TableSkeleton />}>
                <Table
                  from={searchParams.transacFrom}
                  to={searchParams.transacTo}
                />
              </Suspense>
            </div>
          </div>
          <div className="mx-auto h-full w-full px-2 xs:mt-8 md:w-3/5 lg:mt-6 lg:w-1/4">
            <Suspense fallback={<CashActivitySkeleton />}>
              <CashOutActivity
                from={searchParams.cashOutFrom}
                to={searchParams.cashOutTo}
              />
            </Suspense>
          </div>

          <div className="mx-auto mt-8 block h-fit w-full px-2 xs:order-last lg:order-none lg:hidden lg:w-1/2">
            <Suspense fallback={<TableSkeleton />}>
              <Table
                from={searchParams.transacFrom}
                to={searchParams.transacTo}
              />
            </Suspense>
          </div>
        </div>
      </SideBar>
    </>
  );
}
