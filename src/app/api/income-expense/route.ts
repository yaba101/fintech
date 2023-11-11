import incomeExpense from "../../../../data/income-expense.json";

export async function POST() {
  return Response.json(incomeExpense);
}
