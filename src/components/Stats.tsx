export default function Stats({
  icon,
  iconBgColor,
  textBgColor,
  textColor,
  signIcon,
  title,
  amount,
}: {
  icon: any;
  iconBgColor: string;
  textBgColor: string;
  textColor: string;
  signIcon: any;
  title: string;
  amount: string;
}) {
  return (
    <div className="flex flex-grow items-end justify-between rounded-lg bg-gray-50 px-4 py-6 shadow-lg dark:bg-dark sm:px-1 sm:py-4 md:py-6 ">
      <div className="flex xs:gap-2 sm:pl-1 md:gap-4 md:pl-2 lg:pl-1.5 xl:pl-2">
        <span
          className={`rounded-lg ${iconBgColor} my-auto p-2 py-3 dark:text-gray-100   md:p-3`}
        >
          {icon}
        </span>
        <div>
          <p className="whitespace-nowrap font-medium antialiased dark:text-gray-400 sm:text-xs md:text-base 2xl:text-xl">
            {title}
          </p>

          <p className="font-semibold antialiased dark:text-gray-200 sm:text-sm md:text-base 2xl:text-xl">
            ${amount}
          </p>
        </div>
      </div>

      <div
        className={` flex rounded xs:px-1 md:mr-5 lg:mr-2 xl:mr-5  ${textColor} ${textBgColor} bg-opacity-40 `}
      >
        {signIcon}
        <span className="ml-1 font-medium xs:text-xs sm:text-[0.5rem] md:text-sm lg:text-[0.6rem] xl:text-sm ">
          67.81%
        </span>
      </div>
    </div>
  );
}
