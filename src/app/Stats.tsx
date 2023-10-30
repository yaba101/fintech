export default function Stats({
  icon,
  iconBgColor,
  textBgColor,
  textColor,
}: {
  icon: any;
  iconBgColor: string;
  textBgColor: string;
  textColor: string;
}) {
  return (
    <>
      <div className="flex items-end justify-between space-x-6 rounded-lg border dark:border-gray-900 shadow-lg p-4  dark:bg-dark bg-gray-50">
        <div className="flex items-center gap-3">
          <span
            className={`hidden rounded-xl ${iconBgColor} p-2 dark:text-gray-100 sm:block`}
          >
            {icon}
          </span>

          <div>
            <p className="text-sm sm:text-xs dark:text-gray-400 whitespace-nowrap">
              Total Income
            </p>

            <p className="text-lg font-medium dark:text-gray-200">$632.00</p>
          </div>
        </div>

        <div
          className={`flex gap-2 rounded p-1 ${textColor} ${textBgColor} bg-opacity-40`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth=""
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>

          <span className="text-xs font-medium">67.81%</span>
        </div>
      </div>
    </>
  );
}

export const SkeletonStats = () => {
  return (
    <>
      <article
        className="flex items-end justify-between rounded-lg border border-gray-900 p-3 mx-3 animate-pulse"
        style={{ background: "#1d1d41" }}
      >
        <div className="flex items-center gap-4">
          <div className="h-7 w-7 sm:h-11 sm:w-11 bg-gray-400 rounded-xl" />

          <div>
            <div className="text-sm text-gray-400 bg-gray-400 h-4 sm:h-6 w-20 sm:w-28 rounded mb-3" />

            <div className="text-auto sm:text-lg font-medium text-gray-400 bg-gray-400 h-8 sm:h-11 w-32 sm:w-48 rounded" />
          </div>
        </div>

        <div className="inline-flex gap-2 rounded bg-gray-400 p-1 h-8 sm:h-10 w-16 sm:w-20">
          <div className="h-4 sm:h-6 w-4 sm:w-6 bg-gray-400 rounded" />

          <div className="text-xs sm:text-base font-medium bg-gray-400 h-4 sm:h-6 w-12 sm:w-16" />
        </div>
      </article>
    </>
  );
};
