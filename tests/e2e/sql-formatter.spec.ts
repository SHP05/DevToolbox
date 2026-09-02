import { expect, test } from '@playwright/test';

test.describe('SQL Formatter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sql-formatter');
  });

  test('loads with an empty state', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SQL Formatter' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^format$/i })).toBeDisabled();
    await expect(page.getByRole('button', { name: /clear/i })).toBeDisabled();
  });

  test('formats a query with readable indentation', async ({ page }) => {
    const input = page.getByLabel('SQL input').locator('.cm-content');

    await input.click();
    await page.keyboard.type('select a, b from t where x = 1 order by a');

    await page.getByRole('button', { name: /^format$/i }).click();

    const output = page.getByLabel('SQL output').locator('.cm-content');
    await expect(output).toContainText('SELECT');
    await expect(output).toContainText('FROM');
    await expect(output).toContainText('WHERE');
    await expect(output).toContainText('ORDER BY');
    await expect(page.getByText('Valid SQL')).toBeVisible();
  });

  test('formats joins, CTEs and CASE expressions', async ({ page }) => {
    const input = page.getByLabel('SQL input').locator('.cm-content');

    await input.click();
    await page.keyboard.type(
      "with cte as (select id from users) select cte.id, case when cte.id > 0 then 'yes' else 'no' end from cte join orders on cte.id = orders.user_id",
    );

    await page.getByRole('button', { name: /^format$/i }).click();

    const output = page.getByLabel('SQL output').locator('.cm-content');
    await expect(output).toContainText('WITH');
    await expect(output).toContainText('JOIN orders');
    await expect(output).toContainText('CASE');
  });

  test('shows a validation error for malformed SQL', async ({ page }) => {
    const input = page.getByLabel('SQL input').locator('.cm-content');

    await input.click();
    await page.keyboard.type('select * from (');

    await expect(page.getByText('Invalid SQL')).toBeVisible();
    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('switches keyword case before formatting', async ({ page }) => {
    const input = page.getByLabel('SQL input').locator('.cm-content');

    await input.click();
    await page.keyboard.type('select a from t');

    await page.getByLabel('Keyword case').click();
    await page.getByRole('option', { name: 'Preserve case' }).click();
    await page.getByRole('button', { name: /^format$/i }).click();

    const output = page.getByLabel('SQL output').locator('.cm-content');
    await expect(output).toContainText('select');
  });

  test('clear empties both input and output', async ({ page }) => {
    const input = page.getByLabel('SQL input').locator('.cm-content');

    await input.click();
    await page.keyboard.type('select a from t');
    await page.getByRole('button', { name: /^format$/i }).click();

    await page.getByRole('button', { name: /clear/i }).click();

    await expect(input).toHaveText('');
    await expect(page.getByLabel('SQL output').locator('.cm-content')).toHaveText('');
  });
});
