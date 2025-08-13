// client\src\component\admin\ShimmerUI\ShimmerUI_ListBlog.jsx

const ShimmerUI = () => {
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {/* Title shimmer */}
      <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>

      {/* Table container */}
      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                <div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th scope="col" className="px-2 py-4">
                <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th scope="col" className="px-2 py-4">
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="border-y border-gray-300">
                <td className="px-2 py-4">
                  <div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-2 py-4">
                  <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-2 py-4 max-sm:hidden">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-2 py-4 max-sm:hidden">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-2 py-4">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
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
