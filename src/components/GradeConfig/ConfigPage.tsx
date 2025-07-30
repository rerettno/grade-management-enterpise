"use client";

import { useState, useMemo } from "react";
import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import ConfigItem from "./ConfigItem";
import PreviewBox from "./PreviewBox";
import { gradeConfigSchema } from "@/lib/validators/gradeConfigSchema";
import CompareBox from "./CompareBox";

export default function ConfigPage() {
  const items = useGradeConfigStore((state) => state.items);
  const setItems = useGradeConfigStore((state) => state.setItems);
  const saveVersion = useGradeConfigStore((state) => state.saveVersion);
  const rollback = useGradeConfigStore((state) => state.rollback);
  const history = useGradeConfigStore((state) => state.history);
  const saveTemplate = useGradeConfigStore((state) => state.saveTemplate);
  const loadTemplate = useGradeConfigStore((state) => state.loadTemplate);
  const templates = useGradeConfigStore((state) => state.templates);

  const [templateName, setTemplateName] = useState("");

  // Drag & drop handler
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updated = [...items];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setItems(updated);
  };

  // Hitung total
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.percentage, 0),
    [items]
  );

  // Validasi pakai Zod
  const validation = gradeConfigSchema.safeParse({ items });

  // Map error per item
  const itemErrors: Record<number, string[]> = {};
  if (!validation.success) {
    validation.error.issues.forEach((issue) => {
      const path = issue.path;
      if (path.length >= 3 && typeof path[1] === "number") {
        const idx = path[1];
        if (!itemErrors[idx]) itemErrors[idx] = [];
        itemErrors[idx].push(issue.message);
      }
    });
  }

  // Error global (contoh: total bukan 100)
  const globalErrors = total !== 100 ? ["Total harus tepat 100%"] : [];

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <ConfigItem
          key={item.id}
          item={item}
          index={index}
          moveCard={moveCard}
          errors={itemErrors[index] || []}
        />
      ))}

      <div className="mt-4 p-4 border rounded space-y-2">
        <p className="font-semibold transition-colors duration-300">
          🔍 Total persentase:{" "}
          <span className={total === 100 ? "text-green-600" : "text-red-600"}>
            {total}%
          </span>
        </p>

        {globalErrors.map((msg, idx) => (
          <p key={idx} className="text-red-500 text-sm">
            {msg}
          </p>
        ))}

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

      <div className="mt-4 p-4 border rounded space-y-2">
        <p className="font-semibold">💾 Template Konfigurasi</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Nama template"
            className="border p-1 rounded"
          />
          <button
            onClick={() => saveTemplate(templateName)}
            disabled={!templateName}
            className="px-2 py-1 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Simpan Template
          </button>
        </div>
        {Object.keys(templates).length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {Object.keys(templates).map((name) => (
              <button
                key={name}
                onClick={() => loadTemplate(name)}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                Load: {name}
              </button>
            ))}
          </div>
        )}
      </div>

      <PreviewBox />

      <CompareBox />
    </div>
  );
}
