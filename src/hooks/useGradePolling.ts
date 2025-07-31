// hooks/useGradePolling.ts
import { useEffect } from "react";
import { fetchGradesAPI } from "@/lib/api/grade";
import { useGradeStore } from "@/stores/gradeStore";

export function useGradePolling(intervalMs = 5000) {
  const setStudents = useGradeStore((s) => s.setStudents);

  useEffect(() => {
    const tick = async () => {
      const data = await fetchGradesAPI();
      setStudents(data);
    };

    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [setStudents, intervalMs]);
}
