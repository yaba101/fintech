export const getCashInActivityData = async (
  url: RequestInfo,
  body?: { toDate: any; fromDate: any },
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      recentTransactions: [],
      succeeded: false,
    };
  }
};
