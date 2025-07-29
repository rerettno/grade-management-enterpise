// src/components/GradeConfig/ConfigPage.tsx
"use client";

import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import ConfigItem from "./ConfigItem";
import PreviewBox from "./PreviewBox";

export default function ConfigPage() {
  const items = useGradeConfigStore((state) => state.items);
  const setItems = useGradeConfigStore((state) => state.setItems);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updated = [...items];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setItems(updated);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <ConfigItem
          key={item.id}
          item={item}
          index={index}
          moveCard={moveCard}
        />
      ))}
      <PreviewBox />
    </div>
  );
}
