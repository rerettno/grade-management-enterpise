"use client";

import React from "react";
import { useClassStore } from "@/stores/classStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function calculateAverageScore(classes: { score: number }[]) {
  if (classes.length === 0) return 0;
  const total = classes.reduce((sum, cls) => sum + cls.score, 0);
  return total / classes.length;
}

function getScoreDistribution(classes: { score: number }[]) {
  // Group scores into ranges of 10 points: 50-59, 60-69, etc.
  const distribution: { range: string; count: number }[] = [];
  const ranges = ["50-59", "60-69", "70-79", "80-89", "90-99", "100+"];

  const counts = new Array(ranges.length).fill(0);

  classes.forEach((cls) => {
    const score = cls.score;
    if (score >= 100) {
      counts[5] += 1;
    } else if (score >= 90) {
      counts[4] += 1;
    } else if (score >= 80) {
      counts[3] += 1;
    } else if (score >= 70) {
      counts[2] += 1;
    } else if (score >= 60) {
      counts[1] += 1;
    } else if (score >= 50) {
      counts[0] += 1;
    }
  });

  for (let i = 0; i < ranges.length; i++) {
    distribution.push({ range: ranges[i], count: counts[i] });
  }

  return distribution;
}

export default function ClassAnalytics() {
  const classes = useClassStore((state) => state.classes);

  const averageScore = calculateAverageScore(classes);
  const scoreDistribution = getScoreDistribution(classes);

  return (
    <section className="p-4 border rounded shadow bg-white mt-6">
      <h2 className="text-xl font-semibold mb-4">Class Analytics & Progress</h2>
      <p className="mb-4">Average Score: {averageScore.toFixed(2)}</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={scoreDistribution}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Number of Classes" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
