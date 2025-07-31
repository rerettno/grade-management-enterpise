import { test, expect } from "@playwright/test";

test("should display initial items and total percentage", async ({ page }) => {
  await page.goto("/grade-config");
  await expect(page.locator("text=Tugas")).toBeVisible();
  await expect(page.locator("text=Total persentase")).toBeVisible();
});
