// src/components/GradeConfig/ConfigItem.tsx
"use client";

import type { GradeItem } from "@/stores/gradeConfigStore";
import type { DragItem } from "./types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { DropTargetMonitor, DragSourceMonitor } from "react-dnd";
import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import { Box, Typography, Slider, Paper } from "@mui/material";

interface Props {
  item: GradeItem;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  errors: string[];
}
export default function ConfigItem({ item, index, moveCard, errors }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const updatePercentage = useGradeConfigStore(
    (state) => state.updatePercentage
  );

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

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { index, id: item.id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));
  return (
    <Paper
      ref={ref}
      elevation={2}
      sx={{
        p: 2,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box flex={1}>
          <Typography fontWeight="bold">{item.name}</Typography>
        </Box>
        <Slider
          min={0}
          max={100}
          value={item.percentage}
          onChange={(_, value) =>
            updatePercentage(item.id, Array.isArray(value) ? value[0] : value)
          }
          sx={{ width: 120 }}
          size="small"
        />
        <Typography>{item.percentage}%</Typography>
      </Box>
      {errors.length > 0 && (
        <Box color="error.main" fontSize="0.75rem">
          {errors.map((e, idx) => (
            <Typography key={idx} variant="caption" display="block">
              {e}
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
}
