
// client\src\component\admin\ShimmerUI\ShimmerUI_Comments.jsx

const ShimmerUI = () => {
  return (
    <div className="flex-1 pt-5 px-4 sm:pt-12 sm:px-8 bg-blue-50/50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-3xl gap-4">
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-3">
          <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Table Container */}
      <div className="relative mt-4 w-full max-w-3xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="min-w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">
                <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th scope="col" className="px-4 py-3 hidden sm:table-cell">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th scope="col" className="px-4 py-3">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3">
                  <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
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
