# unit-integration-tests

Лабораторна робота №5 з дисципліни «QA, QC і тестування ПП»: модульні (unit) та інтеграційні (integration) тести на Jest з інтеграцією в TMS Testomat.io.

## Структура

```
src/
  math.js, auth.js            — функції для модульних тестів (приклад з методички)
  currency.js, api.js         — функції для інтеграційних тестів (приклад з методички)
  calculator/                 — обраний проєкт: веб-калькулятор (ЛР3–ЛР4)
    calculator.js             — логіка
    app.js                    — інтерфейс (DOM, кнопки, клавіатура)
    index.html, style.css
tests/
  math.test.js, auth.test.js                      — unit (методичка)
  currency.test.js, api.test.js, api.real.test.js — integration (методичка; api.test.js з mock axios)
  calculator.unit.test.js                         — unit-тести калькулятора (5)
  calculator.integration.test.js                  — integration-тести калькулятора (2, jsdom)
```

## Запуск

```bash
npm install
npm test
```

Із відправкою результатів у Testomat.io:

```bash
TESTOMATIO=<api_key> npx jest
```
