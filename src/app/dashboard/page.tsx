"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import ClassList from "@/components/ui/ClassLists";
import ExportButtons from "@/components/ui/ExportButtons";
import ClassAnalytics from "@/components/ui/ClassAnalytics";

export default function DashboardPage() {
  const [exportCSV, setExportCSV] = useState<() => void>(() => () => {});
  const [exportJSON, setExportJSON] = useState<() => void>(() => () => {});
  const [exportPDF, setExportPDF] = useState<() => void>(() => () => {});

  return (
    <main className="p-6">
      <DashboardHeader />
      <ClassAnalytics />
      <ClassList />
    </main>
  );
}
