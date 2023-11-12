import { NextResponse } from "next/server";
import incomeExpense from "../../../../data/income-expense.json";

export async function POST() {
  const response = NextResponse.json(incomeExpense);

  response.cookies.set({
    name: "incomeExpense",
    value: JSON.stringify(incomeExpense),
    maxAge: 60 * 60,
    path: "/dashboard",
  });

  return response;
}
