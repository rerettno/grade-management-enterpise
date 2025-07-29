"use client";

import { useEffect } from "react";
import { useClassStore } from "@/stores/classStore";
import Papa from "papaparse";
import jsPDF from "jspdf";

interface ExportButtonsProps {
  onExportCSVRef?: (fn: () => void) => void;
  onExportJSONRef?: (fn: () => void) => void;
  onExportPDFRef?: (fn: () => void) => void;
}

export default function ExportButtons({
  onExportCSVRef,
  onExportJSONRef,
  onExportPDFRef,
}: ExportButtonsProps) {
  const classes = useClassStore((state) => state.classes);

  const exportCSV = () => {
    const csv = Papa.unparse(
      classes.map((c) => ({
        ID: c.id,
        Name: c.name,
        Instructor: c.instructor,
        Semester: c.semester,
        Score: c.score,
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "classes.csv");
  };

  const exportJSON = () => {
    const json = JSON.stringify(classes, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "classes.json");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Class List", 10, 10);

    let y = 20;
    classes.forEach((c, idx) => {
      doc.setFontSize(10);
      doc.text(
        `${idx + 1}. ${c.name} | Instructor: ${c.instructor} | Semester: ${c.semester} | Score: ${c.score}`,
        10,
        y
      );
      y += 6;
    });

    doc.save("classes.pdf");
  };

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (onExportCSVRef) onExportCSVRef(exportCSV);
    if (onExportJSONRef) onExportJSONRef(exportJSON);
    if (onExportPDFRef) onExportPDFRef(exportPDF);
  }, [onExportCSVRef, onExportJSONRef, onExportPDFRef]);

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={exportCSV}
        className="border px-3 py-1 rounded bg-blue-500 text-white"
      >
        Export CSV
      </button>
      <button
        onClick={exportJSON}
        className="border px-3 py-1 rounded bg-green-500 text-white"
      >
        Export JSON
      </button>
      <button
        onClick={exportPDF}
        className="border px-3 py-1 rounded bg-red-500 text-white"
      >
        Export PDF
      </button>
    </div>
  );
}
