"use client";

import { useClassStore } from "@/stores/classStore";

export default function DashboardHeader() {
  const filter = useClassStore((state) => state.filter);
  const setFilter = useClassStore((state) => state.setFilter);

  return (
    <div className="mb-4 flex justify-between">
      <h1 className="text-2xl font-semibold">Class Management Dashboard</h1>
      <input
        type="text"
        placeholder="Filter classes..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded px-2 py-1"
      />
    </div>
  );
}
