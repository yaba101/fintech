import { format } from "date-fns";

export const getCashOutActivityData = async (
  url: string,
  body: { toDate: any; fromDate: any }
) => {
  try {
    const { toDate, fromDate } = body;
    const parsedFromDate = fromDate
      ? format(new Date(fromDate), "yyyy-MM-dd")
      : null;
    const parsedToDate = toDate ? format(new Date(toDate), "yyyy-MM-dd") : null;
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        fromDate: parsedFromDate,
        toDate: parsedToDate,
      }),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const remoteData = await response.json();
    return remoteData;
  } catch (error) {
    console.error("Error occured. Try again.:", error);
    return {
      totalExpense: "0.00",
      fourExpenseCategories: [],
      succeeded: false,
    };
  }
};
