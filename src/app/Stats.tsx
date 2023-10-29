import {
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowUpIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Stats({ icon, color }: { icon: any; color: string }) {
  return (
    <>
      <article
        className="flex items-end justify-between rounded-lg border border-gray-900  p-3 mx-3 "
        style={{ background: "#1d1d41" }}
      >
        <div className="flex items-center gap-4">
          <span
            className={`hidden rounded-xl ${color} p-2 text-gray-100 sm:block`}
          >
            {icon}
          </span>

          <div>
            <p className="text-sm text-gray-500">Totla Income</p>

            <p className="text-2xl font-medium text-gray-200">$632.00</p>
          </div>
        </div>

        <div className="inline-flex gap-2 rounded bg-green-200 p-1 text-green-600">
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
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>

          <span className="text-xs font-medium"> 67.81% </span>
        </div>
      </article>
    </>
  );
}
