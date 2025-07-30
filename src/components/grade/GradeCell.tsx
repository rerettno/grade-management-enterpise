"use client";

import { useEffect, useState } from "react";
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
  const mutation = useGradeMutation();

  const selected = useGradeStore((s) =>
    s.selectedCells.some((c) => c.nim === nim && c.component === component)
  );
  const selectedCells = useGradeStore((s) => s.selectedCells);
  const updateGrade = useGradeStore((s) => s.updateGrade);
  const toggle = useGradeStore((s) => s.toggleCellSelection);
  const clearSelection = useGradeStore((s) => s.clearSelection);

  const handleCommit = () => {
    setEditMode(false);
    if (tempValue !== value) {
      mutation.mutate({ nim, component, value: tempValue });
    }
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const raw = e.clipboardData?.getData("text")?.trim();
      const pastedValue = Number(raw);

      if (!isNaN(pastedValue)) {
        selectedCells.forEach(({ nim, component }) => {
          updateGrade(nim, component, pastedValue);
        });
      } else {
        alert("Clipboard tidak valid. Harus angka.");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearSelection();
      }
    };

    window.addEventListener("paste", handlePaste);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("paste", handlePaste);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCells, updateGrade, clearSelection]);

  return (
    <td
      className={`px-4 py-2 text-center cursor-pointer hover:bg-gray-100 ${
        selected ? "bg-blue-100 ring-2 ring-blue-400" : ""
      }`}
      onClick={(e) => {
        if (e.shiftKey) {
          toggle(nim, component);
        } else {
          setEditMode(true);
        }
      }}
    >
      {editMode ? (
        <input
          autoFocus
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
