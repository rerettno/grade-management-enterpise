// src/components/GradeConfig/ConfigItem.tsx
"use client";

import type { GradeItem } from "@/stores/gradeConfigStore";
import type { DragItem } from "./types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { DropTargetMonitor, DragSourceMonitor } from "react-dnd";

interface Props {
  item: GradeItem;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export default function ConfigItem({ item, index, moveCard }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: "card",
    hover(draggedItem: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: "card",
    item: { index, id: item.id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center border p-2 rounded shadow gap-4 cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex-1">
        <p className="font-semibold">{item.name}</p>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={item.percentage}
        readOnly
        className="w-32"
      />
      <span>{item.percentage}%</span>
    </div>
  );
}
