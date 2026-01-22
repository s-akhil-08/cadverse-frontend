// components/Skeleton.tsx
import React from 'react';

export const SkeletonCard = () => (
  <div className="animate-pulse space-y-6">
    {/* Title skeleton */}
    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>

    {/* Before/After grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {[1, 2].map((i) => (
        <div key={i} className="space-y-6">
          {/* Image containers */}
          <div className="grid grid-cols-2 gap-6">
            <div className="relative group">
              <div className="bg-gray-200 dark:bg-gray-700 border-4 border-gray-100 dark:border-gray-700 rounded-lg p-4 shadow-lg">
                <div className="aspect-square bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                <div className="mt-3 h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20 mx-auto"></div>
              </div>
            </div>
            <div className="relative group">
              <div className="bg-gray-200 dark:bg-gray-700 border-4 border-gray-100 dark:border-gray-700 rounded-lg p-4 shadow-lg">
                <div className="aspect-square bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                <div className="mt-3 h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Feedback card skeleton */}
          <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4 border-2 border-gray-200 dark:border-gray-700">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 4 }: { count?: number }) => (
  <div className="space-y-24">
    {Array.from({ length: Math.ceil(count / 2) }).map((_, i) => (
      <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-pulse">
        <SkeletonCard />
        {count > 1 && <SkeletonCard />}
      </div>
    ))}
  </div>
);