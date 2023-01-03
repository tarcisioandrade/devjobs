import React from "react";

const Skeleton = () => {
  const sixSkeletons = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex flex-col gap-4 mt-10" data-testid="skeleton">
      {sixSkeletons.map((item) => (
        <div
          key={item}
          className="h-28 bg-gray-800 rounded animate-pulse p-4 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded bg-gray-600 "></div>
            <div className="flex flex-col gap-4">
              <div className="h-2 w-[228px] bg-gray-600 rounded"></div>
              <div className="h-2 w-[228px] bg-gray-600 rounded"></div>
              <div className="h-2 w-[228px] bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="hidden md:flex  items-center gap-4">
            <div className="h-6 w-12 rounded bg-gray-600"></div>
            <div className="h-6 w-12 rounded bg-gray-600"></div>
            <div className="h-6 w-12 rounded bg-gray-600"></div>
          </div>
          <div className="hidden md:block h-2 w-[120px] bg-gray-600 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
