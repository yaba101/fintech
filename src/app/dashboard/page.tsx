import ColumnContainer from "@/components/ColumnContainer";
import SideBar from "@/components/SidebarContainer";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <SideBar>
        <ColumnContainer />
      </SideBar>
    </>
  );
}
