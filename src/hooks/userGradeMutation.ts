import { useMutation } from "@tanstack/react-query";
import { updateStudentGradeAPI } from "@/lib/api/grade";
import { useGradeStore } from "@/stores/gradeStore";
import { GradeComponent, StudentGrade } from "@/types/grade";

type UpdatePayload = {
  nim: string;
  component: GradeComponent;
  value: number;
};

export function useGradeMutation() {
  const updateGrade = useGradeStore.getState().updateGrade;
  const getStudents = useGradeStore.getState;
  const setStudents = useGradeStore.getState().setStudents;

  return useMutation({
    mutationFn: ({ nim, component, value }: UpdatePayload) =>
      updateStudentGradeAPI(nim, component, value),

    // ✅ Optimistic update
    onMutate: async ({ nim, component, value }) => {
      const previous = getStudents().students.map((s) => ({ ...s }));

      updateGrade(nim, component, value);

      return { previous };
    },

    // ❌ Rollback on error
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        setStudents(context.previous);
        console.warn("❌ Update gagal. Rollback nilai sebelumnya.");
      }
    },

    // ✅ Log keberhasilan
    onSuccess: () => {
      console.log("✅ Sync ke server berhasil");
    },
  });
}
