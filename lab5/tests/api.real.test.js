// tests/api.real.test.js
// Інтеграційний тест зі справжнім запитом до JSON Placeholder (без mock)
const fetchPosts = require('../src/api');

test('Отримання постів зі справжнього API (без mock)', async () => {
  const posts = await fetchPosts();

  expect(posts).toBeInstanceOf(Array); // Очікуємо масив
  expect(posts.length).toBeGreaterThan(0); // Масив не порожній
  expect(posts[0]).toHaveProperty('id'); // Структура об'єкта
});
