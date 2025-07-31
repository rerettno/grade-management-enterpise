"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import ClassList from "@/components/ui/ClassLists";
import ClassAnalytics from "@/components/ui/ClassAnalytics";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <DashboardHeader />
      <ClassAnalytics />
      <ClassList />
    </main>
  );
}
