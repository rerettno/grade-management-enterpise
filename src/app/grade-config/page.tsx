// src/app/grade-config/page.tsx
"use client";

import ConfigPage from "@/components/GradeConfig/ConfigPage";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

export default function GradeConfigPage() {
  return (
    // <DndProvider backend={HTML5Backend}>
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">⚙️ Konfigurasi Komponen Nilai</h1>
      <ConfigPage />
    </main>
    // </DndProvider>
  );
}
