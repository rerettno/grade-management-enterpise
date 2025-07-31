import { create } from "zustand";
import { StudentGrade, GradeComponent } from "@/types/grade";

type SelectedCell = {
  nim: string;
  component: GradeComponent;
};

type GradeState = {
  students: StudentGrade[];
  selectedCells: SelectedCell[];
  updateGrade: (nim: string, component: GradeComponent, value: number) => void;
  setStudents: (data: StudentGrade[]) => void;
  toggleCellSelection: (nim: string, component: GradeComponent) => void;
  clearSelection: () => void;
  applyBulkValue: (value: number) => void;
  focusedCell: SelectedCell | null;
  setFocusedCell: (coord: SelectedCell | null) => void;
};

export const useGradeStore = create<GradeState>((set, get) => ({
  students: [],
  selectedCells: [],

  setStudents: (data) => set({ students: data }),

  updateGrade: (nim, component, value) =>
    set((state) => ({
      students: state.students.map((s) =>
        s.nim === nim
          ? {
              ...s,
              grades: { ...s.grades, [component]: value },
            }
          : s
      ),
    })),

  toggleCellSelection: (nim, component) => {
    const selected = get().selectedCells;
    const exists = selected.find(
      (c) => c.nim === nim && c.component === component
    );
    const newSelected = exists
      ? selected.filter((c) => !(c.nim === nim && c.component === component))
      : [...selected, { nim, component }];
    set({ selectedCells: newSelected });
  },

  clearSelection: () => set({ selectedCells: [] }),

  applyBulkValue: (value) => {
    const { selectedCells, updateGrade } = get();
    selectedCells.forEach(({ nim, component }) => {
      updateGrade(nim, component, value);
    });
  },
  focusedCell: null,
  setFocusedCell: (coord) => set({ focusedCell: coord }),
}));
