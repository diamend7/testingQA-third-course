var calc = new CalcCore.Calculator();
var displayEl = document.getElementById('display');
var exprEl = document.getElementById('expr');

function update() {
  displayEl.textContent = calc.display;
  exprEl.textContent = calc.expression();
}

document.querySelectorAll('button[data-key]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    calc.press(btn.dataset.key);
    update();
  });
});

// Підтримка фізичної клавіатури
var keyMap = {
  Enter: '=', '=': '=', Backspace: 'B', Escape: 'AC', Delete: 'AC',
  ',': '.', '.': '.', '+': '+', '-': '-', '*': '*', '/': '/', '%': '%'
};

document.addEventListener('keydown', function (e) {
  var key = null;
  if (/^[0-9]$/.test(e.key)) key = e.key;
  else if (keyMap[e.key]) key = keyMap[e.key];
  if (key === null) return;
  e.preventDefault();
  calc.press(key);
  update();
});

update();
