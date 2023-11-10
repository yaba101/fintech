import ColumnContainer from "@/components/ColumnContainer";
import SideBar from "@/components/SidebarContainer";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const dynamic = "force-dynamic";

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error while fetching data:", error);
    return [];
  }
};

export default async function Home() {
  const barGraphPromise = fetchData(`${process.env.URL}/api/barchart`);
  const cashInPromise = fetchData(`${process.env.URL}/api/cashin`);
  const cashOutPromise = fetchData(`${process.env.URL}/api/cashout`);

  const [bargraphData, cashInData, cashOutData] = await Promise.all([
    barGraphPromise,
    cashInPromise,
    cashOutPromise,
  ]);

  return (
    <>
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
