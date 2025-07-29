// src/stores/gradeConfigStore.ts
import { create } from "zustand";

export interface GradeItem {
  id: string;
  name: string;
  percentage: number;
}

interface GradeConfigState {
  items: GradeItem[];
  setItems: (items: GradeItem[]) => void;
}

export const useGradeConfigStore = create<GradeConfigState>((set) => ({
  items: [
    { id: "1", name: "Tugas", percentage: 20 },
    { id: "2", name: "UTS", percentage: 25 },
    { id: "3", name: "UAS", percentage: 30 },
    { id: "4", name: "Kehadiran", percentage: 15 },
    { id: "5", name: "Praktikum", percentage: 10 },
  ],
  setItems: (items) => set({ items }),
}));
