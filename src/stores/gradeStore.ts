import { create } from "zustand";
import { StudentGrade, GradeComponent } from "@/types/grade";

type SelectedCell = {
  nim: string;
  component: GradeComponent;
};

type AuditLogEntry = {
  nim: string;
  component: GradeComponent;
  oldValue: number;
  newValue: number;
  timestamp: number;
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
  auditLogs: AuditLogEntry[];
  logAudit: (entry: AuditLogEntry) => void;
};

export const useGradeStore = create<GradeState>((set, get) => ({
  students: [],
  selectedCells: [],
  auditLogs: [],

  logAudit: (entry) =>
    set((state) => ({
      auditLogs: [...state.auditLogs, entry],
    })),

  setStudents: (data) => set({ students: data }),

  updateGrade: (nim, component, value) => {
    const { students, logAudit } = get();
    const updatedStudents = students.map((s) => {
      if (s.nim === nim) {
        const oldValue = s.grades[component];
        const newValue = value;

        if (oldValue !== newValue) {
          logAudit({
            nim,
            component,
            oldValue,
            newValue,
            timestamp: Date.now(),
          });
        }

        return {
          ...s,
          grades: { ...s.grades, [component]: newValue },
        };
      }
      return s;
    });

    set({ students: updatedStudents });
  },

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
