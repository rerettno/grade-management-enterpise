"use client";

import { useGradeConfigStore } from "@/stores/gradeConfigStore";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";

export default function PreviewBox() {
  const items = useGradeConfigStore((state) => state.items);

  // Dummy scores
  const dummyScores: Record<string, number> = {
    "1": 80,
    "2": 75,
    "3": 85,
    "4": 90,
    "5": 88,
  };

  // Kalkulasi
  const results = items.map((item) => {
    const rawScore = dummyScores[item.id] ?? 0;
    const finalScore = (rawScore * item.percentage) / 100;
    return {
      name: item.name,
      rawScore,
      percentage: item.percentage,
      finalScore: Math.round(finalScore),
    };
  });

  const total = results.reduce((sum, r) => sum + r.finalScore, 0);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🧮 Pratinjau Hitung (dummy)
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Komponen</TableCell>
              <TableCell align="center">Skor</TableCell>
              <TableCell align="center">Persentase</TableCell>
              <TableCell align="center">Hasil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{r.name}</TableCell>
                <TableCell align="center">{r.rawScore}</TableCell>
                <TableCell align="center">{r.percentage}%</TableCell>
                <TableCell
                  align="center"
                  style={{ fontFamily: "monospace", fontWeight: "bold" }}
                >
                  {r.finalScore}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Typography fontWeight="bold">⭐ TOTAL</Typography>
              </TableCell>
              <TableCell
                align="center"
                style={{ fontFamily: "monospace", fontWeight: "bold" }}
              >
                {total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
