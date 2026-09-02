import { expect, test } from '@playwright/test';

test.describe('JSON Formatter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/json-formatter');
  });

  test('loads with an empty state', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'JSON Formatter' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^format$/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /^minify$/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /clear/i })).toBeDisabled();
  });

  test('formats compact JSON with readable indentation', async ({ page }) => {
    const input = page.getByLabel('JSON input').locator('.cm-content');

    await input.click();
    await page.keyboard.type('{"a":1,"b":[1,2,3]}');

    await page.getByRole('button', { name: /^format$/i }).click();

    const output = page.getByLabel('JSON output').locator('.cm-content');
    await expect(output).toContainText('"a": 1');
    await expect(page.getByText('Valid JSON')).toBeVisible();
  });

  test('minifies formatted JSON', async ({ page }) => {
    const input = page.getByLabel('JSON input').locator('.cm-content');

    await input.click();
    await page.keyboard.type('{\n  "a": 1\n}');

    await page.getByRole('button', { name: /^minify$/i }).click();

    const output = page.getByLabel('JSON output').locator('.cm-content');
    await expect(output).toHaveText('{"a":1}');
  });

  test('shows a validation error for invalid JSON', async ({ page }) => {
    const input = page.getByLabel('JSON input').locator('.cm-content');

    await input.click();
    await page.keyboard.type('{invalid}');

    await expect(page.getByText('Invalid JSON')).toBeVisible();
    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('changes indentation width before formatting', async ({ page }) => {
    const input = page.getByLabel('JSON input').locator('.cm-content');

    await input.click();
    await page.keyboard.type('{"a":1}');

    await page.getByLabel('Indentation').click();
    await page.getByRole('option', { name: '4 spaces' }).click();
    await page.getByRole('button', { name: /^format$/i }).click();

    const output = page.getByLabel('JSON output').locator('.cm-content');
    await expect(output).toContainText('    "a": 1');
  });

  test('clear empties both input and output', async ({ page }) => {
    const input = page.getByLabel('JSON input').locator('.cm-content');

    await input.click();
    await page.keyboard.type('{"a":1}');
    await page.getByRole('button', { name: /^format$/i }).click();

    await page.getByRole('button', { name: /clear/i }).click();

    await expect(input).toHaveText('');
    await expect(page.getByLabel('JSON output').locator('.cm-content')).toHaveText('');
  });
});
