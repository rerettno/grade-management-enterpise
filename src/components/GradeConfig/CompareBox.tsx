"use client";

import { useState } from "react";
import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

export default function CompareBox() {
  const currentItems = useGradeConfigStore((s) => s.items);
  const templates = useGradeConfigStore((s) => s.templates);
  const [selectedTemplate, setSelectedTemplate] = useState<string | "">("");

  const selectedItems = selectedTemplate ? templates[selectedTemplate] : [];

  return (
    <Card variant="outlined">
      <CardContent className="space-y-2">
        <Typography variant="h6">🔍 Compare Tool</Typography>

        <Select
          size="small"
          fullWidth
          displayEmpty
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <MenuItem value="">
            <em>Pilih template...</em>
          </MenuItem>
          {Object.keys(templates).map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        {selectedTemplate && (
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="flex-1">
              <Typography fontWeight="bold">Current</Typography>
              <List dense>
                {currentItems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={`${item.name}: ${item.percentage}%`}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
            <div className="flex-1">
              <Typography fontWeight="bold">
                Template: {selectedTemplate}
              </Typography>
              <List dense>
                {selectedItems.map((item) => {
                  const changed =
                    currentItems.find((c) => c.id === item.id)?.percentage !==
                    item.percentage;
                  return (
                    <ListItem key={item.id}>
                      <ListItemText
                        primary={
                          <Box
                            component="span"
                            color={changed ? "error.main" : "inherit"}
                          >
                            {item.name}: {item.percentage}%
                          </Box>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
