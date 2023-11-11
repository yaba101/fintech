import cashInActivity from "../../../../data/cash-in-activity.json";

export async function POST() {
  return Response.json(cashInActivity);
}
