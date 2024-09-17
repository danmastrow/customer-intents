import { test, expect } from '@playwright/test';

const baseUrl = "https://d4xr38f7ml990.cloudfront.net/review-calls"
test('display review-calls as expected', async ({ page }) => {
  await page.goto(baseUrl);

  await expect(page).toHaveTitle(/Customer Intents/);
  await expect(page.getByRole('heading', { name: /Review calls/ })).toBeVisible();

  await expect(page.getByText(/1289 calls left to review/)).toBeVisible();
});

test('confirm Call works as expected', async ({ page }) => {
  await page.goto(baseUrl);

  await expect(page.getByText(/1289 calls left to review/)).toBeVisible();

  await expect(page.getByRole('heading', { name: /Initiate the provisioning of a brand-new phone or web-based connection/ })).toBeVisible();

  page.getByRole('button', { name: /Confirm/ }).click();
  await expect(page.getByRole('heading', { name: /Initiate the provisioning of a brand-new phone or web-based connection/ })).not.toBeVisible();
  await expect(page.getByRole('heading', { name: /Assess your monthly fee/ })).toBeVisible();
  await expect(page.getByText(/1288 calls left to review/)).toBeVisible();
});


test('skip Call works as expected', async ({ page }) => {
  await page.goto(baseUrl);

  await expect(page.getByText(/1289 calls left to review/)).toBeVisible();

  await expect(page.getByRole('heading', { name: /Initiate the provisioning of a brand-new phone or web-based connection/ })).toBeVisible();

  page.getByRole('button', { name: /Skip/ }).click();
  await expect(page.getByRole('heading', { name: /Initiate the provisioning of a brand-new phone or web-based connection/ })).not.toBeVisible();
  await expect(page.getByRole('heading', { name: /Assess your monthly fee/ })).toBeVisible();
  await expect(page.getByText(/1288 calls left to review/)).toBeVisible();
});

test('edit Call works as expected', async ({ page }) => {
  await page.goto(baseUrl);

  await expect(page.getByText(/1289 calls left to review/)).toBeVisible();

  await expect(page.getByText(/Account Management/)).toBeVisible();

  page.getByRole('button', { name: /Edit/ }).click();
  await expect(page.locator('input[value="Account Management"]')).toBeVisible();
});

