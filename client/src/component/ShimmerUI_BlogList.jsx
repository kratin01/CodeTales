

const ShimmerUI = () => {
  return (
    <div>
      <div className="flex justify-center gap-8 my-10 relative">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-20 h-7 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="w-full rounded-lg overflow-hidden shadow animate-pulse">
            <div className="aspect-video bg-gray-200"></div>
            <div className="p-5">
              <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
              <div className="w-48 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerUI;