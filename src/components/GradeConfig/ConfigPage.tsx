// src/components/GradeConfig/ConfigPage.tsx
"use client";

import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import ConfigItem from "./ConfigItem";
import PreviewBox from "./PreviewBox";
import { useMemo } from "react";
import { gradeConfigSchema } from "@/lib/validators/gradeConfigSchema";

export default function ConfigPage() {
  const items = useGradeConfigStore((state) => state.items);
  const setItems = useGradeConfigStore((state) => state.setItems);
  const saveVersion = useGradeConfigStore((state) => state.saveVersion);
  const rollback = useGradeConfigStore((state) => state.rollback);
  const history = useGradeConfigStore((state) => state.history);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updated = [...items];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setItems(updated);
  };

  // ✅ Hitung total
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.percentage, 0),
    [items]
  );

  // ✅ Validasi pakai Zod
  const validation = gradeConfigSchema.safeParse({ items });
  const isValidTotal = total === 100;

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <ConfigItem
          key={item.id}
          item={item}
          index={index}
          moveCard={moveCard}
        />
      ))}

      <div className="mt-4 p-4 border rounded">
        <p className="font-semibold transition-colors duration-300">
          🔍 Total persentase:{" "}
          <span className={isValidTotal ? "text-green-600" : "text-red-600"}>
            {total}%
          </span>
        </p>

        {!isValidTotal && (
          <p className="text-red-500 text-sm">Total harus tepat 100%</p>
        )}
        {!validation.success && (
          <p className="text-red-500 text-sm">
            Data tidak valid: {validation.error.message}
          </p>
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={saveVersion}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Simpan Versi
          </button>
          <button
            onClick={rollback}
            disabled={history.length === 0}
            className="px-3 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
          >
            Rollback
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Total versi tersimpan: {history.length}
        </p>
      </div>
      <PreviewBox />
    </div>
  );
}
