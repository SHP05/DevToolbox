import { expect, test } from '@playwright/test';

test.describe('Regex Tester', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/regex-tester');
  });

  test('loads with an empty state', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Regex Tester' })).toBeVisible();
    await expect(
      page.getByText('Enter a pattern and test text to see matches highlighted here.'),
    ).toBeVisible();
    await expect(page.getByText('No matches yet.')).toBeVisible();
    await expect(page.getByRole('button', { name: /clear/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /copy matches/i })).toBeDisabled();
  });

  test('highlights matches and lists match details', async ({ page }) => {
    await page.getByLabel('Regex pattern').fill('\\d+');

    const testText = page.getByLabel('Test text').locator('.cm-content');
    await testText.click();
    await page.keyboard.type('a1 b22 c333');

    const highlighted = page.getByRole('log', { name: 'Highlighted matches' });
    await expect(highlighted.getByText('1', { exact: true })).toBeVisible();
    await expect(highlighted.getByText('22', { exact: true })).toBeVisible();
    await expect(highlighted.getByText('333', { exact: true })).toBeVisible();

    await expect(page.getByText('3 matches')).toBeVisible();
    await expect(page.getByLabel('Match details')).toBeVisible();
  });

  test('shows a validation error for an invalid pattern', async ({ page }) => {
    await page.getByLabel('Regex pattern').fill('(unclosed');

    await expect(page.getByText('Invalid regular expression')).toBeVisible();
    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('unchecking the global flag limits results to the first match', async ({ page }) => {
    await page.getByLabel('Regex pattern').fill('\\d+');

    const testText = page.getByLabel('Test text').locator('.cm-content');
    await testText.click();
    await page.keyboard.type('a1 b22 c333');

    await expect(page.getByText('3 matches')).toBeVisible();

    await page.getByLabel('g').uncheck();

    await expect(page.getByText('1 match', { exact: true })).toBeVisible();
  });

  test('clear empties the pattern and test text', async ({ page }) => {
    await page.getByLabel('Regex pattern').fill('\\d+');
    const testText = page.getByLabel('Test text').locator('.cm-content');
    await testText.click();
    await page.keyboard.type('a1 b2');

    await page.getByRole('button', { name: /clear/i }).click();

    await expect(page.getByLabel('Regex pattern')).toHaveValue('');
    await expect(testText).toHaveText('');
    await expect(
      page.getByText('Enter a pattern and test text to see matches highlighted here.'),
    ).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('navigates to Regex Tester from the sidebar', async ({ page }) => {
    await page.goto('/text-comparator');
    await page.getByRole('link', { name: /Regex Tester/i }).click();
    await expect(page).toHaveURL(/\/regex-tester$/);
    await expect(page.getByRole('heading', { name: 'Regex Tester' })).toBeVisible();
  });
});
