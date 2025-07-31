"use client";

import { useEffect } from "react";
import { useGradeStore } from "@/stores/gradeStore";
import GradeInputTable from "@/components/grade/GradeInputTable";
import { StudentGrade } from "@/types/grade";
import AuditLogPanel from "@/components/grade/AuditPanel";

const mockStudents: StudentGrade[] = [
  {
    nim: "240001",
    name: "Ahmad Zulfikar",
    grades: { Tugas: 80, Quiz: 85, UTS: 75, UAS: 88 },
  },
  {
    nim: "240002",
    name: "Bunga Aulia",
    grades: { Tugas: 90, Quiz: 78, UTS: 83, UAS: 92 },
  },
  {
    nim: "240003",
    name: "Charles Sinaga",
    grades: { Tugas: 70, Quiz: 88, UTS: 80, UAS: 86 },
  },
];

export default function GradePage() {
  const setStudents = useGradeStore((s) => s.setStudents);

  useEffect(() => {
    setStudents(mockStudents);
  }, [setStudents]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Input Nilai Mahasiswa</h1>
      <GradeInputTable />
      <AuditLogPanel />
    </div>
  );
}
