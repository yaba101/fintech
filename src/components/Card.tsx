const Card = ({ title, text, buttonText }: any) => {
  return (
    <div className="py-2 mx-auto mb-3 overflow-hidden border rounded-lg shadow-lg  dark:border-gray-900 dark:bg-dark bg-gray-50">
      <div className="px-6 py-4 text-center">
        <h4 className="font-semibold 2xl:text-2xl dark:text-gray-100">
          {title}
        </h4>
        <p className="my-3 text-xl 2xl:text-2xl font-semibold dark:text-gray-300">
          {text}
        </p>
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
