import { urlEndpoints } from "@/endpoint/urlEndpoint";
import CashOutActivity from "./CashOutActivity";
import { getCashOutActivityData } from "@/utils/cashOutActivityUtils";

const CashOutActivityContainer = async () => {
  const response = await getCashOutActivityData(
    `${process.env.BASE_URL}/${urlEndpoints["cashOutActivity"]}`,
  );

  return <CashOutActivity responseData={response} />;
};

export default CashOutActivityContainer;
