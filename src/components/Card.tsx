const Card = ({ title, text, buttonText }: any) => {
  return (
    <div className="mx-auto mb-3 overflow-hidden rounded-lg border bg-gray-50 py-2 shadow-lg dark:border-gray-900 dark:bg-dark">
      <div className="px-6 py-4 text-center">
        <h4 className="font-semibold antialiased dark:text-gray-100 2xl:text-2xl">
          {title}
        </h4>
        <p className="my-3 text-xl font-semibold antialiased dark:text-gray-300 2xl:text-2xl">
          {text}
        </p>
      </div>
      <div className="py-2 text-center">
        <button className="rounded-lg bg-[#27674a] px-4 py-2 font-semibold text-white antialiased hover:bg-green-700">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
