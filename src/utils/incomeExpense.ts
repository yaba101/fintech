export const getIncomeExpenseData = async (
  url: string,
  body: { year: number }
) => {
  try {
    const { year } = body;

    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        year,
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
      incomeExpense: [],
      succeeded: false,
    };
  }
};
