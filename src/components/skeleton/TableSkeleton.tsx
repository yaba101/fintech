function TableSkeleton() {
  return (
    <div className="my-3 rounded-md p-4" style={{ background: "#1d1d41" }}>
      <div className="my-3 flex flex-grow items-center justify-between space-x-2 px-2 py-3 ">
        <div className="h-8 w-20 rounded-md bg-gray-300"></div>
        <div className="text-center">
          <div className="ml-7 h-8 w-20 rounded-md bg-gray-300 md:w-24"></div>
        </div>
        <div className="hidden min-w-fit md:block">
          <div className="ml-auto h-8 w-20 rounded-md bg-gray-300 md:w-24"></div>
        </div>
        <div className="ml-auto flex w-1/2 px-1 md:hidden">
          <div className="ml-auto h-8 w-20 rounded-md bg-gray-300 md:w-24"></div>
        </div>
      </div>
      <div className="animate-pulse rounded-md px-4 shadow-xl sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <tbody>
                    {Array(3)
                      .fill(null)
                      .map((_, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-3 pl-4 pr-3 sm:py-2 sm:pl-0">
                            <div className="flex items-center">
                              <div className="h-11 w-11 rounded-full bg-gray-300"></div>
                              <div className="ml-4">
                                <div className="h-6 w-24 rounded-md bg-gray-300 font-medium text-gray-100"></div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <div className="h-6 w-12 rounded-md bg-gray-300 md:w-28"></div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <span className="mt-1 inline-flex h-6 w-11 items-center rounded-md bg-gray-300 px-2 py-2 text-xs font-medium md:w-16"></span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center pb-5">
              <div className="h-8 w-1/5 rounded-md bg-gray-300 text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TableSkeleton;
