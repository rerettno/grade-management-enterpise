"use client";

import { useGradeStore } from "@/stores/gradeStore";
import { format } from "date-fns";

export default function AuditLogPanel() {
  const logs = useGradeStore((s) => s.auditLogs);

  if (logs.length === 0) {
    return (
      <div className="text-gray-500 text-sm italic mt-4">
        Belum ada aktivitas perubahan nilai.
      </div>
    );
  }

  return (
    <div className="mt-6 border rounded-lg bg-white shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Audit Log</h2>
      <ul className="space-y-2 max-h-72 overflow-y-auto text-sm">
        {logs
          .slice()
          .reverse()
          .map((log, index) => (
            <li key={index} className="border-b pb-2">
              <div className="text-gray-700">
                <span className="font-medium">{log.nim}</span> →{" "}
                <span className="text-blue-600">{log.component}</span>:{" "}
                <span className="line-through text-red-500">
                  {log.oldValue}
                </span>{" "}
                →{" "}
                <span className="text-green-600 font-medium">
                  {log.newValue}
                </span>
              </div>
              <div className="text-gray-400 text-xs">
                {format(new Date(log.timestamp), "dd MMM yyyy, HH:mm:ss")}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
