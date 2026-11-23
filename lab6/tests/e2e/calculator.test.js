// tests/e2e/calculator.test.js
// e2e тести обраного проєкту: веб-калькулятор (ЛР3–ЛР5)
const { test, expect } = require('@playwright/test');

// натискає кнопку калькулятора за її data-key
const press = (page, key) => page.locator(`button[data-key="${key}"]`).click();

test.describe('Калькулятор', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator/');
  });

  test('Сторінка відкривається з головної, на дисплеї 0', async ({ page }) => {
    await page.goto('/');
    await page.click('#calcLink'); // перехід з головної сторінки
    await expect(page).toHaveURL(/\/calculator\//);
    await expect(page).toHaveTitle('Калькулятор');
    await expect(page.locator('#display')).toHaveText('0');
    await expect(page.locator('.keys button')).toHaveCount(24); // усі кнопки на місці
  });

  test('Обчислення 7 + 3 = 10 кліками по кнопках', async ({ page }) => {
    await press(page, '7');
    await press(page, '+');
    await expect(page.locator('#expr')).toHaveText('7 +'); // рядок виразу
    await press(page, '3');
    await press(page, '=');
    await expect(page.locator('#display')).toHaveText('10');
  });

  test('Ділення на нуль показує помилку, AC скидає', async ({ page }) => {
    for (const k of ['5', '/', '0', '=']) await press(page, k);
    await expect(page.locator('#display')).toHaveText('Ділення на нуль');
    await press(page, 'AC');
    await expect(page.locator('#display')).toHaveText('0');
  });

  test('Ввід з клавіатури: 12 + 3 Enter = 15', async ({ page }) => {
    await page.keyboard.type('12+3');
    await page.keyboard.press('Enter');
    await expect(page.locator('#display')).toHaveText('15');
    await page.keyboard.press('Escape'); // Escape = AC
    await expect(page.locator('#display')).toHaveText('0');
  });

  test('Немає горизонтального скролу (у т.ч. на мобільному)', async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
