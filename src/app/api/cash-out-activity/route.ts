import cashOutActivity from "../../../../data/cash-out-activity.json";

export async function POST() {
  return Response.json(cashOutActivity);
}
