// src/components/GradeConfig/PreviewBox.tsx
"use client";

import { useGradeConfigStore } from "@/stores/gradeConfigStore";

export default function PreviewBox() {
  const items = useGradeConfigStore((state) => state.items);

  // Data dummy score per komponen (misalnya skor asli 80)
  const dummyScores: Record<string, number> = {
    "1": 80,
    "2": 75,
    "3": 85,
    "4": 90,
    "5": 88,
  };

  // Hitung nilai akhir per komponen & total
  const results = items.map((item) => {
    const rawScore = dummyScores[item.id] ?? 0;
    // Kalkulasi: score * (percentage / 100)
    const finalScore = (rawScore * item.percentage) / 100;
    return {
      name: item.name,
      rawScore,
      percentage: item.percentage,
      finalScore: Math.round(finalScore), // dibulatkan
    };
  });

  const total = results.reduce((sum, r) => sum + r.finalScore, 0);

  return (
    <div className="p-4 border rounded mt-4">
      <h3 className="font-semibold mb-2">🧮 Pratinjau Hitung (dummy)</h3>
      <ul className="space-y-1">
        {results.map((r, idx) => (
          <li key={idx} className="flex justify-between text-sm">
            <span>
              {r.name}: skor {r.rawScore} × {r.percentage}%
            </span>
            <span className="font-mono">{r.finalScore}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 font-semibold">⭐ TOTAL: {total}</p>
    </div>
  );
}
