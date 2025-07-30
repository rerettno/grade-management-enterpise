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
  templates: Record<string, GradeItem[]>;
  setItems: (items: GradeItem[]) => void;
  updatePercentage: (id: string, newPercentage: number) => void;
  saveVersion: () => void;
  rollback: () => void;
  saveTemplate: (name: string) => void;
  loadTemplate: (name: string) => void;
}

export const useGradeConfigStore = create<GradeConfigState>((set, get) => ({
  items: [
    { id: "1", name: "Tugas", percentage: 20 },
    { id: "2", name: "UTS", percentage: 25 },
    { id: "3", name: "UAS", percentage: 30 },
    { id: "4", name: "Kehadiran", percentage: 15 },
    { id: "5", name: "Praktikum", percentage: 10 },
  ],
  history: [],
  templates: {},

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
  rollback: () => {
    const { history } = get();
    if (history.length === 0) return;

    const newHistory = [...history];
    const lastVersion = newHistory.pop();
    if (!lastVersion) return;

    set({
      items: lastVersion,
      history: newHistory,
    });
  },

  saveTemplate: (name) =>
    set((state) => ({
      templates: {
        ...state.templates,
        [name]: JSON.parse(JSON.stringify(state.items)),
      },
    })),
  loadTemplate: (name) => {
    const tmpl = get().templates[name];
    if (tmpl) {
      set({ items: JSON.parse(JSON.stringify(tmpl)) });
    }
  },
}));
