const LoadingSkeleton = ({ type = 'card', count = 4 }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="h-48 skeleton" />
            <div className="p-4">
              <div className="h-4 w-16 skeleton rounded mb-2" />
              <div className="h-5 w-3/4 skeleton rounded mb-2" />
              <div className="h-4 w-full skeleton rounded mb-3" />
              <div className="flex justify-between">
                <div className="h-6 w-20 skeleton rounded" />
                <div className="h-10 w-24 skeleton rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="w-20 h-20 skeleton rounded-lg" />
            <div className="flex-1">
              <div className="h-5 w-1/3 skeleton rounded mb-2" />
              <div className="h-4 w-1/4 skeleton rounded" />
            </div>
            <div className="h-10 w-28 skeleton rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'banner') {
    return (
      <div className="relative h-64 md:h-80 skeleton">
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="h-8 w-2/3 skeleton rounded mb-3" />
          <div className="h-4 w-1/2 skeleton rounded mb-4" />
          <div className="flex gap-3">
            <div className="h-8 w-24 skeleton rounded-full" />
            <div className="h-8 w-32 skeleton rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
