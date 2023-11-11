import cashInActivity from "../../../../data/cash-in-activity.json";
import { cookies } from "next/headers";

export async function POST() {
  const cookiesStore = cookies();
  cookiesStore.set("cash-in-activity", JSON.stringify(cashInActivity), {});
  return Response.json(cashInActivity);
}
