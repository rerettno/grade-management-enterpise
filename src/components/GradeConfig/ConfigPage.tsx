// src/components/GradeConfig/ConfigPage.tsx
"use client";

import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import ConfigItem from "./ConfigItem";
import PreviewBox from "./PreviewBox";

export default function ConfigPage() {
  const items = useGradeConfigStore((state) => state.items);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ConfigItem key={item.id} item={item} />
      ))}
      <PreviewBox />
    </div>
  );
}
