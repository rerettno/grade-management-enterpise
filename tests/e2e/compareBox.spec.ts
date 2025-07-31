import { test, expect } from "@playwright/test";

test("should display compare tool", async ({ page }) => {
  await page.goto("/grade-config");
  await expect(page.locator("text=Compare Tool")).toBeVisible();
});
