// Логіка калькулятора. Не залежить від DOM, тому її можна тестувати і в браузері, і в Node.
(function (root) {
  var MAX_DIGITS = 16;

  function parse(str) {
    return parseFloat(str);
  }

  // Форматує число для відображення: до 12 значущих цифр, великі/малі числа - в експоненційному вигляді.
  function format(n) {
    if (!isFinite(n)) return 'Помилка';
    var r = Number(n.toPrecision(12));
    var abs = Math.abs(r);
    if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) {
      return r.toExponential(8).replace(/\.?0+e/, 'e');
    }
    return String(r);
  }

  function Calculator() {
    this.reset();
    this.memory = 0;
  }

  Calculator.prototype.reset = function () {
    this.display = '0';
    this.acc = null;
    this.op = null;
    this.fresh = true; // наступна цифра починає нове число
    this.error = false;
    this.expr = '';
  };

  Calculator.prototype.setError = function (msg) {
    this.reset();
    this.display = msg;
    this.error = true;
  };

  Calculator.prototype.compute = function (a, op, b) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/':
        if (b === 0) return null;
        return a / b;
    }
    return b;
  };

  Calculator.prototype.press = function (key) {
    if (key === 'AC') {
      this.reset();
      return this.display;
    }
    if (this.error) return this.display; // після помилки працює лише AC

    if (/^[0-9]$/.test(key)) {
      if (this.fresh) {
        this.display = key;
        this.fresh = false;
      } else if (this.display === '0') {
        this.display = key;
      } else if (this.display.replace(/[-.]/g, '').length < MAX_DIGITS) {
        this.display += key;
      }
    } else if (key === '.') {
      if (this.fresh) {
        this.display = '0.';
        this.fresh = false;
      } else if (this.display.indexOf('.') === -1) {
        this.display += '.';
      }
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      if (this.op && this.fresh) {
        this.op = key; // два оператори поспіль: замінюємо оператор
      } else {
        if (this.op) {
          var res = this.compute(this.acc, this.op, parse(this.display));
          if (res === null) { this.setError('Ділення на нуль'); return this.display; }
          this.acc = res;
          this.display = format(res);
        } else {
          this.acc = parse(this.display);
        }
        this.op = key;
        this.fresh = true;
      }
    } else if (key === '=') {
      if (this.op) {
        var r = this.compute(this.acc, this.op, parse(this.display));
        if (r === null) { this.setError('Ділення на нуль'); return this.display; }
        this.display = format(r);
        this.acc = null;
        this.op = null;
        this.fresh = true;
      }
    } else if (key === 'B') {
      if (!this.fresh) {
        this.display = this.display.slice(0, -1);
        if (this.display === '' || this.display === '-') {
          this.display = '0';
          this.fresh = true;
        }
      }
    } else if (key === '±') {
      if (parse(this.display) !== 0) {
        this.display = this.display.charAt(0) === '-' ? this.display.slice(1) : '-' + this.display;
      }
    } else if (key === '%') {
      this.display = format(parse(this.display) / 100);
      this.fresh = true;
    } else if (key === 'M+') {
      this.memory += parse(this.display);
      this.fresh = true;
    } else if (key === 'M-') {
      this.memory -= parse(this.display);
      this.fresh = true;
    } else if (key === 'MR') {
      this.display = format(this.memory);
      this.fresh = true;
    } else if (key === 'MC') {
      this.memory = 0;
    }
    return this.display;
  };

  // Рядок поточного виразу для верхнього рядка дисплея.
  Calculator.prototype.expression = function () {
    if (this.op === null || this.acc === null) return '';
    var sym = { '+': '+', '-': '−', '*': '×', '/': '÷' }[this.op];
    return format(this.acc) + ' ' + sym;
  };

  var api = { Calculator: Calculator, format: format };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CalcCore = api;
})(typeof window !== 'undefined' ? window : this);
