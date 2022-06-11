// Variáveis para armazenar os elementos da calculadora
const numButtons = document.querySelectorAll("[data-number]");
const opeButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const acButton = document.querySelector("[data-all-clear]");
const prevOpeTxt = document.querySelector("[data-prev-operand]");
const currOpeTxt = document.querySelector("[data-curr-operand]");
// Criando a classe da calculadora
class Calculator {
  constructor(prevOpeTxt, currOpeTxt) {
    this.prevOpeTxt = prevOpeTxt;
    this.currOpeTxt = currOpeTxt;
    this.clear();
  }

  formatDisplayNum(number) {
    const strNumber = String(number);

    const intDigits = parseFloat(strNumber.split(".")[0]);
    const decimalDigits = strNumber.split(".")[1];

    let intDisplay;

    if (isNaN(intDigits)) {
      intDisplay = "";
    } else {
      intDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0,
     });
    }

    if (decimalDigits != null) {
        return `${intDisplay}.${decimalDigits}`;
    } else {
        return intDisplay;
    }
  }

  delete() {
    this.currOpe = String(this.currOpe).slice(0, -1);
  }

  // Método para realizar o cálculo das operações
  calculate() {
    let result;

    // Convertendo os números para float caso possuam '.'
    const _prevOpeFloat = parseFloat(this.prevOpe);
    const _currOpeFloat = parseFloat(this.currOpe);

    // If para retornar caso não tenha nenhum número ou no prevOpe ou no currOpe
    if (isNaN(_prevOpeFloat) || isNaN(_currOpeFloat)) return;

    switch (this.operation) {
      case "+":
        result = _prevOpeFloat + _currOpeFloat;
        break;
      case "-":
        result = _prevOpeFloat - _currOpeFloat;
        break;
      case "/":
        result = _prevOpeFloat / _currOpeFloat;
        break;
      case "*":
        result = _prevOpeFloat * _currOpeFloat;
        break;
      default:
        return;
    }

    this.currOpe = result;
    this.operation = undefined;
    this.prevOpe = "";
  }

  // Método para receber o operador e passar o operador e o número antes desse para cima
  chooseOpe(operation) {
    if (this.currOpe === "") return;
    if (this.prevOpe !== "") {
      this.calculate();
    }
    this.operation = operation;

    this.prevOpe = this.currOpe;
    this.currOpe = "";
  }

  // Método para adicionar o número no leitor
  appendNum(number) {
    // If para impedir o usuário de digitar mais de um ponto
    if (this.currOpe.includes(".") && number === ".") return;

    this.currOpe = `${this.currOpe}${String(number)}`;
  }
  // Método para limpar o leitor
  clear() {
    this.currOpe = "";
    this.prevOpe = "";
    this.operation = undefined;
  }
  // Método para atualizar o texto do elemento para o valor numérico armazenado
  updateDisplay() {
    // Mostrando os números digitados antes do operador e o operador em cima
    this.prevOpeTxt.innerText = `${this.formatDisplayNum(this.prevOpe)} ${this.operation || ''}`;
    this.currOpeTxt.innerText = this.formatDisplayNum(this.currOpe);
  }
}

// Instanciando a classe calculadora
const calculator = new Calculator(prevOpeTxt, currOpeTxt);

// Loop for of para adicionar os números clicados ao leitor atualizando seu o display
for (const numButton of numButtons) {
  numButton.addEventListener("click", () => {
    calculator.appendNum(numButton.innerText);
    calculator.updateDisplay();
  });
}
// Loop for of para utilizar o método dos operadores
for (const opeButton of opeButtons) {
  opeButton.addEventListener("click", () => {
    calculator.chooseOpe(opeButton.innerText);
    calculator.updateDisplay();
  });
}

// Evento para a funcionalidade do AC atualizando seu display
acButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
