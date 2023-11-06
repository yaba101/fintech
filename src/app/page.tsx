import SideBar from "./sidebar";
import ColumnContainer from "@/components/ColumnContainer";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const dynamic = "force-dynamic";

async function getBarGraphData() {
  // await delay(2000);
  const response = await fetch(process.env.URL + "/api/barchart", {
    method: "GET",
    cache: "no-store",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return [];
}

async function getCashInData() {
  // await delay(2000);
  const response = await fetch(process.env.URL + "/api/cashin", {
    method: "GET",
    cache: "no-store",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return [];
}

async function getCashOutData() {
  // await delay(2000);
  const response = await fetch(process.env.URL + "/api/cashout", {
    method: "GET",
    cache: "no-store",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return [];
}

export default async function Home() {
  const bargraphData = await getBarGraphData();
  const cashInData = await getCashInData();
  const cashOutData = await getCashOutData();
  await delay(6000);

  return (
    <>
      {/* <div className="mx-auto w-96">
        <Suspense fallback={<DetailCardSkeleton />}>
          <DetailCard colors={cashInData} title="Cash in Activity" />
        </Suspense>
      </div> */}
      <SideBar>
        <ColumnContainer
          bargraphData={bargraphData}
          cashInData={cashInData}
          cashOutData={cashOutData}
        />
      </SideBar>
    </>
  );
}
