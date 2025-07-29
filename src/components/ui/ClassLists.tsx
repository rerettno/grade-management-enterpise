"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { ClassItem, fetchClasses } from "@/lib/api/fetchClasses";
import { useClassStore } from "@/stores/classStore";
import { useEffect, useRef, useCallback } from "react";

export default function ClassList() {
  // Ambil state Zustand
  const filter = useClassStore((state) => state.filter);
  const updateClassesScore = useClassStore((state) => state.updateClassesScore);

  // React Query v5 - pakai object form
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["classes"],
    queryFn: ({ pageParam }) => fetchClasses(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 6) return undefined;
      return pages.length + 1;
    },
  });

  // Observer: detect element paling bawah
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  // Gabungkan semua page jadi satu array besar
  const classes: ClassItem[] = data?.pages.flat() ?? [];

  // Filter
  const filtered = classes.filter((cls) =>
    cls.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Dummy real-time update tiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      updateClassesScore();
    }, 5000);
    return () => clearInterval(interval);
  }, [updateClassesScore]);

  if (isLoading) return <p>Loading classes...</p>;
  if (error) return <p>Failed to load classes.</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cls, idx) => {
          const card = (
            <div key={cls.id} className="border rounded p-4 shadow">
              <h2 className="font-semibold text-lg">{cls.name}</h2>
              <p className="text-sm text-gray-600">
                Instructor: {cls.instructor}
              </p>
              <p className="text-sm text-gray-600">Semester: {cls.semester}</p>
              <p className="text-sm">Score: {cls.score}</p>
            </div>
          );

          // Taruh ref di item terakhir → trigger load more
          if (idx === filtered.length - 1) {
            return (
              <div
                ref={lastItemRef}
                key={cls.id}
                className="border rounded p-4 shadow"
              >
                <h2 className="font-semibold text-lg">{cls.name}</h2>
                <p className="text-sm text-gray-600">
                  Instructor: {cls.instructor}
                </p>
                <p className="text-sm text-gray-600">
                  Semester: {cls.semester}
                </p>
                <p className="text-sm">Score: {cls.score}</p>
              </div>
            );
          }

          return card;
        })}
      </div>
      {isFetchingNextPage && <p className="mt-4">Loading more...</p>}
    </>
  );
}
