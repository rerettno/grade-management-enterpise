// src/components/GradeConfig/ConfigItem.tsx
"use client";

import type { GradeItem } from "@/stores/gradeConfigStore";

export default function ConfigItem({ item }: { item: GradeItem }) {
  return (
    <div className="flex items-center border p-2 rounded shadow gap-4">
      <div className="cursor-move">≡</div>
      <div className="flex-1">
        <p className="font-semibold">{item.name}</p>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={item.percentage}
        readOnly
        className="w-32"
      />
      <span>{item.percentage}%</span>
    </div>
  );
}
