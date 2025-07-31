import { create } from "zustand";
import { ClassItem } from "@/lib/api/fetchClasses";

interface ClassStore {
  filter: string;
  setFilter: (filter: string) => void;
  classes: ClassItem[];
  setClasses: (classes: ClassItem[]) => void;
  updateClassesScore: () => void;
}

export const useClassStore = create<ClassStore>((set, get) => ({
  filter: "",
  setFilter: (filter) => set({ filter }),
  classes: [],
  setClasses: (classes) => set({ classes }),
  updateClassesScore: () => {
    const current = get().classes;
    set({
      classes: current.map((c) => ({
        ...c,
        score: c.score + Math.floor(Math.random() * 3) - 1, // naik turun 1–2 point
      })),
    });
  },
}));
