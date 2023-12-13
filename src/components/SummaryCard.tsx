import { urlEndpoints } from "@/endpoint/urlEndpoint";
import { formatCurrency } from "@/utils/moneyFormat";

interface Account {
  name: string;
  mask: string;
  currentBalance: number;
  availableBalance: number;
  subType: string;
  type: string;
}

interface BalanceLevel {
  [key: string]: number | null;
}

interface AccountType {
  accounts: Account[];
  totalBalanceTypeLevel: number | null;
  totalBalanceSubTypeLevel: BalanceLevel | null;
}

interface PlaidData {
  CREDIT: AccountType | null;
  firstName: string | null;
  LOAN: AccountType | null;
  DEPOSITORY: AccountType | null;
  INVESTMENT: AccountType | null;
  succeeded: boolean;
}
const getData = async (url: string): Promise<PlaidData> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      return {
        INVESTMENT: {
          totalBalanceTypeLevel: null,
          accounts: [],
          totalBalanceSubTypeLevel: null,
        },
        CREDIT: null,
        DEPOSITORY: {
          accounts: [],
          totalBalanceSubTypeLevel: {
            CD: null,
            CHECKING: null,
            MONEY_MARKET: null,
            SAVINGS: null,
          },
          totalBalanceTypeLevel: 0,
        },
        firstName: null,
        LOAN: null,
        succeeded: false,
      };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error occured. Try again.:", error);
    return {
      CREDIT: null,
      firstName: null,
      LOAN: null,
      DEPOSITORY: null,
      INVESTMENT: null,
      succeeded: false,
    };
  }
};
const SummaryCard = async () => {
  const { DEPOSITORY, INVESTMENT, succeeded } = await getData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${urlEndpoints["accounts"]}`
  );

  return (
    <div className="my-3 overflow-hidden rounded border bg-gray-50 shadow-lg dark:border-gray-900 dark:bg-dark">
      <div className="px-6 py-4">
        <div className="mx-auto mb-2 text-center text-xl font-bold antialiased">
          Account Summary
        </div>

        {!succeeded ? (
          <>
            <p className=" antialiased text-center mx-auto dark:text-gray-500 sm:text-sm md:text-base h-28 flex justify-center items-center">
              Error occured. Try again.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto my-6 w-3/4">
              <div className="my-5 ">
                <div className="flex justify-between">
                  <span className="antialiased sm:text-sm md:text-lg lg:text-sm">
                    Savings
                  </span>
                  <span className="text-sm font-medium antialiased sm:text-sm md:text-lg lg:text-sm">
                    $
                    {formatCurrency(
                      DEPOSITORY?.totalBalanceSubTypeLevel?.SAVINGS
                    )}
                  </span>
                </div>
              </div>
              <div className="my-5">
                <div className="flex justify-between">
                  <span className="antialiased sm:text-sm md:text-lg lg:text-sm">
                    Checking
                  </span>
                  <span className="text-sm font-medium antialiased sm:text-sm md:text-lg lg:text-sm">
                    $
                    {formatCurrency(
                      DEPOSITORY?.totalBalanceSubTypeLevel?.CHECKING
                    )}
                  </span>
                </div>
              </div>
              <div className="my-5">
                <div className="flex justify-between">
                  <span className="antialiased sm:text-sm md:text-lg lg:text-sm">
                    Investment
                  </span>
                  <span className="text-sm font-medium antialiased sm:text-sm md:text-lg lg:text-sm">
                    ${formatCurrency(INVESTMENT?.totalBalanceTypeLevel)}
                  </span>
                </div>
              </div>
              <div className="my-5 ">
                <div className="flex justify-between xs:space-x-2.5">
                  <button className="whitespace-nowrap rounded-lg bg-[#27674a] px-2 py-1 font-medium text-white  hover:bg-[#133425] xs:text-sm lg:text-xs">
                    View All
                  </button>
                  <button className="whitespace-nowrap rounded-lg bg-[#5e54e6] px-2 py-1 font-medium text-white hover:bg-[#4941b3] xs:text-sm lg:text-xs">
                    Add Account
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
