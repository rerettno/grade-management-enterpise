// src/stores/gradeConfigStore.ts
import { create } from "zustand";

export interface GradeItem {
  id: string;
  name: string;
  percentage: number;
}

interface GradeConfigState {
  items: GradeItem[];
  history: GradeItem[][];
  setItems: (items: GradeItem[]) => void;
  updatePercentage: (id: string, newPercentage: number) => void;
  saveVersion: () => void;
  rollback: () => void;
}

export const useGradeConfigStore = create<GradeConfigState>((set) => ({
  items: [
    { id: "1", name: "Tugas", percentage: 20 },
    { id: "2", name: "UTS", percentage: 25 },
    { id: "3", name: "UAS", percentage: 30 },
    { id: "4", name: "Kehadiran", percentage: 15 },
    { id: "5", name: "Praktikum", percentage: 10 },
  ],
  history: [],
  setItems: (items) => set({ items }),
  updatePercentage: (id, newPercentage) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, percentage: newPercentage } : item
      ),
    })),
  saveVersion: () =>
    set((state) => ({
      history: [...state.history, JSON.parse(JSON.stringify(state.items))],
    })),
  rollback: () =>
    set((state) => {
      if (state.history.length === 0) return {};
      const lastVersion = state.history[state.history.length - 1];
      return {
        items: lastVersion,
        history: state.history.slice(0, -1),
      };
    }),
}));
