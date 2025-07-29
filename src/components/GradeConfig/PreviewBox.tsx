// src/components/GradeConfig/PreviewBox.tsx
"use client";

export default function PreviewBox() {
  return (
    <div className="border rounded p-4 mt-4">
      <h2 className="font-semibold mb-2">🧮 Pratinjau Hitung (dummy)</h2>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>Komponen 1: 18</li>
        <li>Komponen 2: 20</li>
        <li>Komponen 3: 27</li>
        <li>Komponen 4: 12</li>
        <li>Komponen 5: 9</li>
      </ul>
      <p className="font-bold mt-2">⭐ TOTAL: 86</p>
    </div>
  );
}
