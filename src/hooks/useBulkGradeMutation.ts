// src/hooks/useBulkGradeMutation.ts
import { useGradeMutation } from "./userGradeMutation";
import { GradeComponent } from "@/types/grade";

export function useBulkGradeMutation() {
  const mutation = useGradeMutation();

  const applyBulk = async (
    payloads: { nim: string; component: GradeComponent; value: number }[]
  ) => {
    for (const payload of payloads) {
      try {
        await mutation.mutateAsync(payload);
      } catch (e) {
        console.warn(`❌ Failed update ${payload.nim}:`, e);
      }
    }
  };

  return { applyBulk, isLoading: mutation.isPending };
}
