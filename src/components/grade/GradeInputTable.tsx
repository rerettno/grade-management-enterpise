"use client";

import { useGradeStore } from "@/stores/gradeStore";
import GradeRow from "./GradeRow";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { GradeComponent } from "@/types/grade";
import { useGradePolling } from "@/hooks/useGradePolling";

export default function GradeInputTable() {
  const students = useGradeStore((s) => s.students);

  const columns: GradeComponent[] = ["Tugas", "Quiz", "UTS", "UAS"];
  useGradePolling(5000); // ← tambahkan ini
  // define urutan kolom
  useKeyboardNavigation(
    students.map((s) => s.nim),
    columns
  );

  return (
    <div className="overflow-x-auto border rounded-lg shadow bg-white mt-6">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="px-4 py-3 font-medium border-b">NIM</th>
            <th className="px-4 py-3 font-medium border-b">Nama Mahasiswa</th>
            <th className="px-4 py-3 font-medium border-b">Tugas (20%)</th>
            <th className="px-4 py-3 font-medium border-b">Quiz (10%)</th>
            <th className="px-4 py-3 font-medium border-b">UTS (30%)</th>
            <th className="px-4 py-3 font-medium border-b">UAS (40%)</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <GradeRow key={s.nim} student={s} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
