// src/lib/api/fetchGrades.ts
import { GradeComponent, StudentGrade } from "@/types/grade";

let counter = 0;

// Dummy grades yang berubah tiap polling
export async function fetchMockGrades(): Promise<StudentGrade[]> {
  counter++;
  return [
    {
      nim: "123",
      name: "Ali",
      grades: {
        Tugas: 80 + (counter % 5),
        Quiz: 70,
        UTS: 75,
        UAS: 90,
      },
    },
    {
      nim: "456",
      name: "Budi",
      grades: {
        Tugas: 60,
        Quiz: 85,
        UTS: 77 + (counter % 3),
        UAS: 88,
      },
    },
  ];
}
