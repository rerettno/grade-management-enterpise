// src/types/grade.ts
export type GradeComponent = "Tugas" | "Quiz" | "UTS" | "UAS";

export type StudentGrade = {
  nim: string;
  name: string;
  grades: Record<GradeComponent, number>;
};
