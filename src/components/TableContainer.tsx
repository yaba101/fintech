import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { getRecentTransactionData } from "@/utils/tableUtils";
import Table from "./Table";

const TableContainer = async () => {
  const response = await getRecentTransactionData(
    `${process.env.BASE_URL}/${urlEndpoints["transaction"]}`,
  );

  return <Table responseData={response} />;
};

export default TableContainer;
