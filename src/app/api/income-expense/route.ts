import { NextResponse } from "next/server";
import incomeExpense from "../../../../data/income-expense.json";

export async function POST() {
  const response = NextResponse.json(incomeExpense);

  // Set the cookie with the data from incomeExpense
  response.cookies.set({
    name: "incomeExpense",
    value: JSON.stringify(incomeExpense),
    maxAge: 60 * 60, // Set the max age of the cookie in seconds
    path: "/dashboard",
  });

  return response;
}
