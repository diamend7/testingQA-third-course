// tests/calculator.unit.test.js
// Модульні тести логіки калькулятора (src/calculator/calculator.js) без DOM
const { Calculator, format } = require('../src/calculator/calculator');

// допоміжна функція: натискає послідовність клавіш і повертає дисплей
function pressAll(keys) {
  const calc = new Calculator();
  keys.forEach((k) => calc.press(k));
  return calc.display;
}

describe('calculator: unit', () => {
  test('format: округлення і експоненційна форма', () => {
    expect(format(0.1 + 0.2)).toBe('0.3'); // прибирає похибку плаваючої коми
    expect(format(999999999 * 999999999)).toBe('9.99999998e+17'); // великі числа
    expect(format(1 / 0)).toBe('Помилка'); // нескінченність
  });

  test('press: арифметичні операції', () => {
    expect(pressAll(['7', '+', '3', '='])).toBe('10');
    expect(pressAll(['5', '-', '8', '='])).toBe('-3');
    expect(pressAll(['1', '2', '*', '1', '2', '='])).toBe('144');
    expect(pressAll(['7', '/', '2', '='])).toBe('3.5');
    expect(pressAll(['2', '+', '3', '*', '4', '='])).toBe('20'); // зліва направо
  });

  test('press: ділення на нуль і відновлення після AC', () => {
    const calc = new Calculator();
    ['5', '/', '0', '='].forEach((k) => calc.press(k));
    expect(calc.display).toBe('Ділення на нуль');
    expect(calc.error).toBe(true);

    calc.press('7'); // після помилки цифри ігноруються
    expect(calc.display).toBe('Ділення на нуль');

    calc.press('AC'); // скидання
    expect(calc.display).toBe('0');
    expect(calc.error).toBe(false);
  });

  test("press: пам'ять M+, M-, MR, MC", () => {
    const calc = new Calculator();
    ['5', 'M+', 'AC', '2', 'M-', 'AC', 'MR'].forEach((k) => calc.press(k));
    expect(calc.display).toBe('3'); // 5 - 2
    expect(calc.memory).toBe(3);

    calc.press('MC');
    expect(calc.memory).toBe(0);
  });

  test('press: обмеження вводу (крапка, 16 цифр)', () => {
    expect(pressAll(['3', '.', '.', '1', '4'])).toBe('3.14'); // друга крапка ігнорується
    expect(pressAll('12345678901234567'.split(''))).toBe('1234567890123456'); // не більше 16 цифр
  });
});
