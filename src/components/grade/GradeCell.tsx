"use client";

import { useRef, useEffect, useState } from "react";
import { useGradeStore } from "@/stores/gradeStore";
import { useGradeMutation } from "@/hooks/userGradeMutation";
import { GradeComponent } from "@/types/grade";

type Props = {
  value: number;
  nim: string;
  component: GradeComponent;
};

export default function GradeCell({ value, nim, component }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const mutation = useGradeMutation();
  const selectedCells = useGradeStore((s) => s.selectedCells);
  const focusedCell = useGradeStore((s) => s.focusedCell);
  const setFocusedCell = useGradeStore((s) => s.setFocusedCell);
  const toggle = useGradeStore((s) => s.toggleCellSelection);
  const updateGrade = useGradeStore((s) => s.updateGrade);
  const clearSelection = useGradeStore((s) => s.clearSelection);

  const isSelected = selectedCells.some(
    (c) => c.nim === nim && c.component === component
  );
  const isFocused =
    focusedCell?.nim === nim && focusedCell.component === component;

  const handleCommit = () => {
    setEditMode(false);
    if (tempValue !== value) {
      mutation.mutate({ nim, component, value: tempValue });
    }
  };

  useEffect(() => {
    if (editMode && isFocused) {
      inputRef.current?.focus();
    }
  }, [editMode, isFocused]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const raw = e.clipboardData?.getData("text")?.trim();
      const number = Number(raw);

      if (!isNaN(number)) {
        selectedCells.forEach((cell) => {
          updateGrade(cell.nim, cell.component, number);
        });
      } else {
        alert("Clipboard tidak valid. Harus angka.");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearSelection();
    };

    window.addEventListener("paste", handlePaste);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("paste", handlePaste);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCells, updateGrade, clearSelection]);

  const handleClick = () => {
    setFocusedCell({ nim, component });
    if (!isSelected) toggle(nim, component);
    else setEditMode(true);
  };

  return (
    <td
      className={`px-4 py-2 text-center cursor-pointer hover:bg-gray-100 ${
        isSelected ? "bg-blue-100 ring-2 ring-blue-400" : ""
      }`}
      onClick={handleClick}
    >
      {editMode ? (
        <input
          ref={inputRef}
          type="number"
          className="w-full text-center border border-gray-300 rounded"
          value={tempValue}
          onChange={(e) => setTempValue(Number(e.target.value))}
          onBlur={handleCommit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommit();
            if (e.key === "Escape") setEditMode(false);
          }}
        />
      ) : mutation.isPending ? (
        <span className="text-gray-400 italic">Syncing...</span>
      ) : (
        value
      )}
    </td>
  );
}
