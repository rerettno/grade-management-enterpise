"use client";

import { useState, useMemo } from "react";
import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import ConfigItem from "./ConfigItem";
import PreviewBox from "./PreviewBox";
import CompareBox from "./CompareBox";
import { gradeConfigSchema } from "@/lib/validators/gradeConfigSchema";

import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Stack,
} from "@mui/material";

export default function ConfigPage() {
  const items = useGradeConfigStore((state) => state.items);
  const setItems = useGradeConfigStore((state) => state.setItems);
  const saveVersion = useGradeConfigStore((state) => state.saveVersion);
  const rollback = useGradeConfigStore((state) => state.rollback);
  const history = useGradeConfigStore((state) => state.history);
  const saveTemplate = useGradeConfigStore((state) => state.saveTemplate);
  const loadTemplate = useGradeConfigStore((state) => state.loadTemplate);
  const templates = useGradeConfigStore((state) => state.templates);

  const [templateName, setTemplateName] = useState("");

  // Drag & drop handler
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updated = [...items];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, removed);
    setItems(updated);
  };

  // Hitung total
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.percentage, 0),
    [items]
  );

  // Validasi Zod
  const validation = gradeConfigSchema.safeParse({ items });

  // Error per item
  const itemErrors: Record<number, string[]> = {};
  if (!validation.success) {
    validation.error.issues.forEach((issue) => {
      const path = issue.path;
      if (path.length >= 3 && typeof path[1] === "number") {
        const idx = path[1];
        if (!itemErrors[idx]) itemErrors[idx] = [];
        itemErrors[idx].push(issue.message);
      }
    });
  }

  // Error global
  const globalErrors = total !== 100 ? ["Total harus tepat 100%"] : [];

  return (
    <Box className="space-y-4">
      {items.map((item, index) => (
        <ConfigItem
          key={item.id}
          item={item}
          index={index}
          moveCard={moveCard}
          errors={itemErrors[index] || []}
        />
      ))}

      {/* Card: summary + version control */}
      <Card variant="outlined">
        <CardContent className="space-y-2">
          <Typography variant="h6">
            🔍 Total persentase:{" "}
            <span className={total === 100 ? "text-green-600" : "text-red-600"}>
              {total}%
            </span>
          </Typography>

          {globalErrors.map((msg, idx) => (
            <Typography key={idx} color="error" variant="body2">
              {msg}
            </Typography>
          ))}

          <Stack direction="row" spacing={2} className="mt-2 flex-wrap">
            <Button variant="contained" color="primary" onClick={saveVersion}>
              Simpan Versi
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={rollback}
              disabled={history.length === 0}
            >
              Rollback
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            Total versi tersimpan: {history.length}
          </Typography>
        </CardContent>
      </Card>

      {/* Card: Template */}
      <Card variant="outlined">
        <CardContent className="space-y-2">
          <Typography variant="h6">💾 Template Konfigurasi</Typography>

          <Stack direction="row" spacing={2} className="flex-wrap">
            <TextField
              size="small"
              label="Nama template"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              disabled={!templateName.trim()}
              onClick={() => saveTemplate(templateName)}
            >
              Simpan Template
            </Button>
          </Stack>

          {Object.keys(templates).length > 0 && (
            <Stack direction="row" spacing={1} className="flex-wrap">
              {Object.keys(templates).map((name) => (
                <Button
                  key={name}
                  variant="outlined"
                  size="small"
                  onClick={() => loadTemplate(name)}
                >
                  Load: {name}
                </Button>
              ))}
            </Stack>
          )}

          <Typography variant="caption" color="text.secondary">
            Total template: {Object.keys(templates).length}
          </Typography>
        </CardContent>
      </Card>

      <PreviewBox />
      <CompareBox />
    </Box>
  );
}
