"use client";

import { useEffect } from "react";
import { GradeComponent } from "@/types/grade";
import { useGradeStore } from "@/stores/gradeStore";

export function useKeyboardNavigation(
  nimList: string[],
  columns: readonly GradeComponent[]
) {
  const focusedCell = useGradeStore((s) => s.focusedCell);
  const setFocusedCell = useGradeStore((s) => s.setFocusedCell);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("Key pressed:", e.key);
      if (!focusedCell) return;

      const rowIndex = nimList.indexOf(focusedCell.nim);
      const colIndex = columns.indexOf(focusedCell.component);

      let nextRow = rowIndex;
      let nextCol = colIndex;

      switch (e.key) {
        case "ArrowDown":
          nextRow++;
          break;
        case "ArrowUp":
          nextRow--;
          break;
        case "ArrowRight":
          nextCol++;
          break;
        case "ArrowLeft":
          nextCol--;
          break;
        default:
          return;
      }

      if (
        nextRow >= 0 &&
        nextRow < nimList.length &&
        nextCol >= 0 &&
        nextCol < columns.length
      ) {
        setFocusedCell({
          nim: nimList[nextRow],
          component: columns[nextCol],
        });
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedCell, setFocusedCell, nimList, columns]);
}
