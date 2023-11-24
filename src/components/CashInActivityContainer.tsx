import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { getCashInActivityData } from "@/utils/cashInActivityUtils";
import CashInActivity from "./CashInActivity";

const CashInActivityContainer = async () => {
  const response = await getCashInActivityData(
    `${process.env.BASE_URL}/${urlEndpoints["cashInActivity"]}`,
  );

  return <CashInActivity responseData={response} />;
};

export default CashInActivityContainer;
