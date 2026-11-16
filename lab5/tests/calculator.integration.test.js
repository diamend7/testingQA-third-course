/**
 * @jest-environment jsdom
 */
// tests/calculator.integration.test.js
// Інтеграційні тести: логіка (calculator.js) + інтерфейс (app.js) + розмітка (index.html)
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../src/calculator/index.html'), 'utf8');

function loadApp() {
  jest.resetModules();
  // підставляємо розмітку сторінки без тегів script
  document.documentElement.innerHTML = html.replace(/<script[\s\S]*?<\/script>/g, '');
  // у браузері calculator.js кладе CalcCore у window, тут робимо це вручну
  global.CalcCore = require('../src/calculator/calculator');
  require('../src/calculator/app');
}

const display = () => document.getElementById('display').textContent;
const expr = () => document.getElementById('expr').textContent;
const click = (key) => document.querySelector(`button[data-key="${key}"]`).click();
const keydown = (key) => document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

describe('calculator: integration', () => {
  beforeEach(loadApp);

  test('натискання кнопок оновлює дисплей і рядок виразу', () => {
    expect(display()).toBe('0');

    click('7');
    click('+');
    expect(expr()).toBe('7 +'); // вираз показано у верхньому рядку
    click('3');
    expect(display()).toBe('3');
    click('=');
    expect(display()).toBe('10');
    expect(expr()).toBe(''); // після = вираз очищено

    click('5');
    click('/');
    click('0');
    click('=');
    expect(display()).toBe('Ділення на нуль');
    click('AC');
    expect(display()).toBe('0');
  });

  test('ввід з фізичної клавіатури працює разом із логікою', () => {
    ['1', '2', '+', '3', 'Enter'].forEach(keydown);
    expect(display()).toBe('15');

    ['a', 'b', 'x'].forEach(keydown); // сторонні клавіші ігноруються
    expect(display()).toBe('15');

    ['9', '8', 'Backspace'].forEach(keydown); // Backspace видаляє символ
    expect(display()).toBe('9');

    keydown('Escape'); // Escape = AC
    expect(display()).toBe('0');
  });
});
