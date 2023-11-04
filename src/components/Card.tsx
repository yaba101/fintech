const Card = ({ title, text, buttonText }: any) => {
  return (
    <div className="mx-auto mb-3 overflow-hidden border rounded-lg shadow-lg dark:border-gray-900 dark:bg-dark bg-gray-50">
      <div className="px-6 py-4 text-center">
        <h4 className="font-semibold text-md dark:text-gray-100">{title}</h4>
        <p className="my-3 text-xl font-semibold dark:text-gray-300">{text}</p>
      </div>
      <div className="py-2 text-center">
        <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-700">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;

export const SkeletonCard = () => {
  return (
    <div
      className="max-w-sm mx-auto mb-3 overflow-hidden border border-gray-900 rounded-lg shadow-lg animate-pulse"
      style={{ background: "#1d1d41" }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-4">
        <div className="w-24 h-4 mb-4 bg-gray-500 rounded " />
        <div className="w-32 h-8 mb-4 bg-gray-400 rounded" />
      </div>
      <div className="py-2 text-center">
        <div className="w-24 h-10 mx-auto bg-gray-500 rounded"></div>{" "}
        {/* Button Skeleton */}
      </div>
    </div>
  );
};
