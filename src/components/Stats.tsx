export default function Stats({
  icon,
  iconBgColor,
  textBgColor,
  textColor,
  signIcon,
}: {
  icon: any;
  iconBgColor: string;
  textBgColor: string;
  textColor: string;
  signIcon: any;
}) {
  return (
    <div className="flex items-end justify-between flex-grow px-4 py-6 rounded-lg shadow-lg md:py-6 sm:py-4 sm:px-1 dark:bg-dark bg-gray-50">
      <div className="flex gap-2 md:gap-4">
        <span
          className={`rounded-lg ${iconBgColor} md:p-3 dark:text-gray-100 my-auto py-3 p-2`}
        >
          {icon}
        </span>

        <div>
          <p className="md:text-xl 2xl:text-2xl sm:text-xs dark:text-gray-400 whitespace-nowrap">
            Total Income
          </p>

          <p className="font-medium md:text-xl 2xl:text-2xl sm:text-sm dark:text-gray-200">
            $632.00
          </p>
        </div>
      </div>

      <div
        className={`flex rounded py-0.5 xs:px-1 ${textColor} ${textBgColor} bg-opacity-40 `}
      >
        {signIcon}
        <span className="md:text-xs font-medium ml-1 xs:text-xs sm:text-[0.6rem] ">
          67.81%
        </span>
      </div>
    </div>
  );
}
