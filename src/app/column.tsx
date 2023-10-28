export default function Column() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col md:flex-row w-11/12 space-x-3">
        <div className="column-2 w-full md:w-6/12 h-96 border-2 border-dashed md:mx-2 my-2 rounded-md"></div>
        <div className="column-3 w-full md:w-5/12 h-96 border-2 border-dashed md:mx-2 my-2 rounded-md"></div>
        <div className="column-3 w-full md:w-5/12 h-96 border-2 border-dashed md:mx-2 my-2 rounded-md"></div>
      </div>
    </div>
  );
}
