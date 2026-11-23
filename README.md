# testingQA-third-course

Лабораторні роботи з дисципліни «QA, QC і тестування ПП» (3 курс).

| Папка | Лабораторна | Що всередині |
|-------|-------------|--------------|
| `lab5` | ЛР5 | Модульні та інтеграційні тести (Jest) + Testomat.io |
| `lab6` | ЛР6 | E2E та screenshot тести (Playwright) |
| `.github/workflows/ci.yml` | ЛР7 | Continuous Integration (GitHub Actions) |

## CI

Workflow **Lab CI** запускається на кожен push і pull request у гілку `main`:

- `unit-tests` — `npm test` у `lab5`;
- `e2e-tests` — e2e тести Playwright у `lab6` (Chromium).
