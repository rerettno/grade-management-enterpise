"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import ClassList from "@/components/ui/ClassLists";
import ExportButtons from "@/components/ui/ExportButtons";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <DashboardHeader />
      <ClassList />
      <ExportButtons />
    </main>
  );
}
