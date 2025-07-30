"use client";

import { useState } from "react";
import { useGradeConfigStore } from "@/stores/gradeConfigStore";

export default function CompareBox() {
  const currentItems = useGradeConfigStore((s) => s.items);
  const templates = useGradeConfigStore((s) => s.templates);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const selectedItems = selectedTemplate ? templates[selectedTemplate] : [];

  return (
    <div className="mt-4 p-4 border rounded space-y-2">
      <p className="font-semibold">🔍 Compare Tool</p>

      <select
        value={selectedTemplate || ""}
        onChange={(e) => setSelectedTemplate(e.target.value || null)}
        className="border p-1 rounded"
      >
        <option value="">Pilih template...</option>
        {Object.keys(templates).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {selectedTemplate && (
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="font-semibold">Current</p>
            <ul className="space-y-1">
              {currentItems.map((item) => (
                <li key={item.id} className="text-sm">
                  {item.name}: {item.percentage}%
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">Template: {selectedTemplate}</p>
            <ul className="space-y-1">
              {selectedItems.map((item) => (
                <li
                  key={item.id}
                  className={`text-sm ${
                    currentItems.find((c) => c.id === item.id)?.percentage !==
                    item.percentage
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {item.name}: {item.percentage}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
