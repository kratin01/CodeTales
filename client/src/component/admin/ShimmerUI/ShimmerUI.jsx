

const ShimmerUI = () => {
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4 mb-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center gap-4 bg-gray-200 p-4 min-w-58 rounded shadow animate-pulse">
            <div className="w-9 h-9 bg-gray-300 rounded"></div>
            <div>
              <div className="w-16 h-6 bg-gray-300 rounded mb-2"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="relative max-w-4xl overflow-x-auto scrollbar-hide">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                {["#", "Blog Title", "Date", "Status", "Actions"].map((header, idx) => (
                  <th key={idx} className={`px-2 py-4 ${idx > 0 && idx < 4 ? "max-sm:hidden" : ""}`}>
                    <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, rowIndex) => (
                <tr key={rowIndex} className="border-y border-gray-300">
                  {["w-12", "w-48", "w-32 max-sm:hidden", "w-24 max-sm:hidden", "w-40"].map((width, cellIndex) => (
                    <td key={cellIndex} className="px-2 py-4">
                      <div className={`${width} h-4 bg-gray-300 rounded animate-pulse`}></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShimmerUI;