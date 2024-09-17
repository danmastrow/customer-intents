import { test, expect } from '@playwright/test';

const baseUrl = "https://d4xr38f7ml990.cloudfront.net"
test('display dashboard as expected', async ({ page }) => {
  await page.goto(baseUrl);


  await expect(page).toHaveTitle(/Customer Intents/);
  await expect(page.getByRole('heading', { name: /Dashboard/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Call category summary/ })).toBeVisible();
  await expect(page.getByRole('heading', {
    name: /Customer sentiment overview/
  })).toBeVisible();
  await expect(page.getByRole('heading', {
    name: /Latest customer calls/
  })).toBeVisible();

  await expect(page.getByText(/1289 calls total/)).toBeVisible();
});

test('navigates to review-calls page through sidebar', async ({ page }) => {
  await page.goto(baseUrl);

  await page.click('text=Review Calls');
  await expect(page.getByText(/1289 calls left to review/)).toBeVisible();
});

