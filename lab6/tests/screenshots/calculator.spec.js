// tests/screenshots/calculator.spec.js
// screenshot тести обраного проєкту: калькулятор
const { test, expect } = require('@playwright/test');

test('Скриншот сторінки калькулятора', async ({ page }) => {
  await page.goto('/calculator/');
  expect(await page.screenshot()).toMatchSnapshot('screenshots/calculator/calculator-page.png');
});

test('Скриншот дисплея після обчислення', async ({ page }) => {
  await page.goto('/calculator/');
  for (const k of ['1', '2', '*', '1', '2', '=']) {
    await page.locator(`button[data-key="${k}"]`).click();
  }
  const screen = page.locator('.screen');
  await expect(page.locator('#display')).toHaveText('144');
  expect(await screen.screenshot()).toMatchSnapshot('screenshots/calculator/calculator-display.png');
});
