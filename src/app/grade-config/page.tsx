// src/app/grade-config/page.tsx
"use client";

import ConfigPage from "@/components/GradeConfig/ConfigPage";

export default function GradeConfigPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">⚙️ Konfigurasi Komponen Nilai</h1>
      <ConfigPage />
    </main>
  );
}
