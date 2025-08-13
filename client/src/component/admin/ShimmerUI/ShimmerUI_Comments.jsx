

const ShimmerUI = () => {
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex items-center justify-between max-w-3xl">
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-4">
          <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="relative h-4/5 mt-4 max-w-3xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-3">
                  <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-3 max-sm:hidden">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-3">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShimmerUI;