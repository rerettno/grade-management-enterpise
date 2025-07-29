// src/lib/validation/gradeConfigSchema.ts
import { z } from "zod";

export const gradeConfigSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        percentage: z.number().min(0).max(100),
      })
    )
    .min(1),
});
