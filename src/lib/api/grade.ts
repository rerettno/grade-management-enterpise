import { StudentGrade } from "@/types/grade";

const mockGrades: StudentGrade[] = [
  {
    nim: "22001",
    name: "Andi",
    grades: { Tugas: 80, Quiz: 70, UTS: 75, UAS: 85 },
  },
  {
    nim: "22002",
    name: "Budi",
    grades: { Tugas: 90, Quiz: 80, UTS: 85, UAS: 88 },
  },
];

// Sudah ada:
export async function updateStudentGradeAPI(
  nim: string,
  component: string,
  value: number
) {
  console.log(`[API] Updating ${component} for ${nim} to ${value}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.85) {
        resolve({ success: true });
      } else {
        reject(new Error("Simulated network error"));
      }
    }, 600);
  });
}

// Tambahkan ini:
export async function fetchGradesAPI(): Promise<StudentGrade[]> {
  // Simulasikan perubahan server
  const index = Math.floor(Math.random() * mockGrades.length);
  const comp = ["Tugas", "Quiz", "UTS", "UAS"][
    Math.floor(Math.random() * 4)
  ] as keyof StudentGrade["grades"];
  const rand = Math.floor(Math.random() * 40 + 60); // nilai 60–100
  mockGrades[index].grades[comp] = rand;

  return structuredClone(mockGrades);
}
