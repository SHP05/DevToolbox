import { expect, test } from '@playwright/test';

test.describe('Text Comparator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/text-comparator');
  });

  test('loads with an empty state', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Text Comparator' })).toBeVisible();
    await expect(
      page.getByText('Enter text on both sides to see the differences here.'),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /swap/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /clear/i })).toBeDisabled();
  });

  test('highlights added and removed lines between two texts', async ({ page }) => {
    const original = page.getByLabel('Original text').locator('.cm-content');
    const changed = page.getByLabel('Changed text').locator('.cm-content');

    await original.click();
    await page.keyboard.type('line one\nline two');

    await changed.click();
    await page.keyboard.type('line one\nline three');

    const diffResult = page.getByRole('log', { name: 'Diff result' });
    await expect(diffResult.getByText('line one')).toBeVisible();
    await expect(diffResult.getByText('line two')).toBeVisible();
    await expect(diffResult.getByText('line three')).toBeVisible();
  });

  test('ignore case option treats differently-cased text as equal', async ({ page }) => {
    const original = page.getByLabel('Original text').locator('.cm-content');
    const changed = page.getByLabel('Changed text').locator('.cm-content');

    await original.click();
    await page.keyboard.type('Hello World');

    await changed.click();
    await page.keyboard.type('hello world');

    // Before enabling "ignore case", the line should show as changed.
    await expect(page.getByText('+1', { exact: true })).toBeVisible();

    await page.getByLabel('Ignore case').check();

    // After enabling it, there should be no additions/removals left.
    await expect(page.getByText('+0', { exact: true })).toBeVisible();
    await expect(page.getByText('-0', { exact: true })).toBeVisible();
  });

  test('swap exchanges the original and changed text', async ({ page }) => {
    const original = page.getByLabel('Original text').locator('.cm-content');
    const changed = page.getByLabel('Changed text').locator('.cm-content');

    await original.click();
    await page.keyboard.type('foo');
    await changed.click();
    await page.keyboard.type('bar');

    await page.getByRole('button', { name: /swap/i }).click();

    await expect(original).toHaveText('bar');
    await expect(changed).toHaveText('foo');
  });

  test('clear empties both editors', async ({ page }) => {
    const original = page.getByLabel('Original text').locator('.cm-content');
    const changed = page.getByLabel('Changed text').locator('.cm-content');

    await original.click();
    await page.keyboard.type('foo');
    await changed.click();
    await page.keyboard.type('bar');

    await page.getByRole('button', { name: /clear/i }).click();

    await expect(original).toHaveText('');
    await expect(changed).toHaveText('');
    await expect(
      page.getByText('Enter text on both sides to see the differences here.'),
    ).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('redirects the home route to the Text Comparator', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/text-comparator$/);
    await expect(page.getByRole('heading', { name: 'Text Comparator' })).toBeVisible();
  });

  test('sidebar lists all four utilities as available links', async ({ page }) => {
    await page.goto('/text-comparator');
    const nav = page.getByRole('navigation', { name: 'Utilities' });
    await expect(nav.getByRole('link', { name: /Text Comparator/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /JSON Formatter/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /SQL Formatter/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Regex Tester/i })).toBeVisible();
  });

  test('navigates to JSON Formatter from the sidebar', async ({ page }) => {
    await page.goto('/text-comparator');
    await page.getByRole('link', { name: /JSON Formatter/i }).click();
    await expect(page).toHaveURL(/\/json-formatter$/);
    await expect(page.getByRole('heading', { name: 'JSON Formatter' })).toBeVisible();
  });

  test('navigates to SQL Formatter from the sidebar', async ({ page }) => {
    await page.goto('/text-comparator');
    await page.getByRole('link', { name: /SQL Formatter/i }).click();
    await expect(page).toHaveURL(/\/sql-formatter$/);
    await expect(page.getByRole('heading', { name: 'SQL Formatter' })).toBeVisible();
  });
});
