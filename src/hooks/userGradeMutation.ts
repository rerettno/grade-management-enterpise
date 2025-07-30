import { useMutation } from "@tanstack/react-query";
import { updateStudentGradeAPI } from "@/lib/api/grade";
import { useGradeStore } from "@/stores/gradeStore";
import { GradeComponent, StudentGrade } from "@/types/grade";

type GradeState = {
  students: StudentGrade[];
  updateGrade: (nim: string, component: GradeComponent, value: number) => void;
  setStudents: (data: StudentGrade[]) => void;
};

type UpdatePayload = {
  nim: string;
  component: GradeComponent;
  value: number;
};

export function useGradeMutation() {
  const updateGrade = useGradeStore((s: GradeState) => s.updateGrade);
  const students = useGradeStore((s: GradeState) => s.students);
  const setStudents = useGradeStore((s: GradeState) => s.setStudents);

  return useMutation({
    mutationFn: ({ nim, component, value }: UpdatePayload) =>
      updateStudentGradeAPI(nim, component, value),

    onMutate: async (payload: UpdatePayload) => {
      const previous = [...students];
      updateGrade(payload.nim, payload.component, payload.value);
      return { previous };
    },

    onError: (_err, _payload, context) => {
      console.warn("❌ Update gagal, rollback...");
      if (context?.previous) {
        setStudents(context.previous);
      }
    },

    onSuccess: () => {
      console.log("✅ Sync berhasil");
    },
  });
}
