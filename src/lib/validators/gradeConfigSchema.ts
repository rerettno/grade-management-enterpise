import { z } from "zod";

export const gradeConfigSchema = z
  .object({
    items: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          percentage: z.number().min(5, "Minimal 5%").max(60, "Maksimal 60%"),
        })
      )
      .min(1, "Harus ada minimal 1 item"),
  })
  .refine(
    (data) => {
      const total = data.items.reduce((sum, item) => sum + item.percentage, 0);
      return total === 100;
    },
    {
      message: "Total semua persentase harus tepat 100%",
    }
  );
