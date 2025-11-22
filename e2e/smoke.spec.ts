import { test, expect } from "@playwright/test";

const TEST_SAMPLE = `21 Nov 2025 #224
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.525
Brazil|real|1|BRL|3.905
Bulgaria|lev|1|BGN|12.348
Canada|dollar|1|CAD|14.878
` as const;

test.describe("Exchange App smoke test", () => {
  test.beforeEach(async ({ page }) => {
    // Overwrite the expected .txt from network with sample data.
    await page.route("**/*.txt", async (route) => {
      await route.fulfill({
        status: 200,
        body: TEST_SAMPLE,
        contentType: "text/plain",
      });
    });
    await page.goto("/");
  });

  test("loads rates and performs conversion", async ({ page }) => {
    // 1. Verify Header / Data Loading
    // Check if the date from our mock file is displayed
    await expect(page.getByText("21 Nov 2025")).toBeVisible();

    // Check if a rate card exists (e.g., AUD)
    await expect(page.locator("strong", { hasText: "AUD" })).toBeVisible();
    await expect(page.getByText("1 AUD = 13.525 CZK")).toBeVisible();

    // 2. Verify Converter Interaction
    const amountInput = page.getByLabel(/Amount/i); // Assumes aria-label or <label> text
    const currencySelect = page.getByRole("combobox");

    // Enter 1000 CZK
    await amountInput.fill("1000");

    // Select AUD
    await currencySelect.selectOption({ label: "AUD - dollar" }); // Adjust label based on your <option> text

    // 3. Verify Calculation Result
    const calc = 1000 / 13.525;
    await expect(page.getByText(calc.toFixed(2) + " AUD")).toBeVisible();
  });

  test("persists theme preference", async ({ page }) => {
    // Toggle to Dark Mode
    const toggleBtn = page.getByRole("button", { name: /Dark Mode/i });
    await toggleBtn.click();

    // Check if background color changed (simplified check)
    const body = page.locator("body");
    await expect(body).toHaveCSS("background-color", "rgb(18, 18, 18)");

    // Reload page to test persistence
    await page.reload();
    await expect(body).toHaveCSS("background-color", "rgb(18, 18, 18)");
  });
});
