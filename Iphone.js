// DOM Elements 
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const displayEl = document.querySelector('.display');
const calculationDisplayEl = document.querySelector('.calculation-display');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const substractionEl = document.querySelector('.substraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [
  number0El, number1El, number2El, number3El, number4El,
  number5El, number6El, number7El, number8El, number9El
];

// Variables
let displayStrInMemory = null;
let operatorInMemory = null;
let currentCalculation = '';
let currentInput = '0'; // Track current input for calculation display

// Functions
const getDisplayAsStr = () => displayEl.textContent.split(',').join('');

const getDisplayAsNum = () => {
  return parseFloat(getDisplayAsStr());
};

const setStrAsDisplay = (displayStr) => {
  if (displayStr[displayStr.length - 1] === '.') {
    displayEl.textContent = displayStr;
  } else {
    const [wholeNumStr, decimalStr] = displayStr.split('.');
    displayEl.textContent = decimalStr 
      ? parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr
      : parseFloat(wholeNumStr).toLocaleString();
  }
  
  // Adjust font size based on total character count (including formatting characters)
  const charCount = displayEl.textContent.length;
  if (charCount >= 10) {
    displayEl.classList.remove('shrink');
    displayEl.classList.add('shrink-more');
  } else if (charCount >= 6) {
    displayEl.classList.add('shrink');
    displayEl.classList.remove('shrink-more');
  } else {
    displayEl.classList.remove('shrink', 'shrink-more');
  }
};

const updateCalculationDisplay = () => {
  calculationDisplayEl.textContent = currentCalculation;
  // Adjust font size for calculation display
  if (currentCalculation.length > 15) {
    calculationDisplayEl.style.fontSize = '25px';
  } else {
    calculationDisplayEl.style.fontSize = '35px';
  }
};

const handleNumberClick = (numStr) => {
  const currentDisplayStr = getDisplayAsStr();
  if (currentDisplayStr === '0' && numStr !== '0') {
    setStrAsDisplay(numStr);
    currentInput = numStr;
  } else if (currentDisplayStr === '-0' && numStr !== '0') {
    setStrAsDisplay('-' + numStr);
    currentInput = '-' + numStr;
  } else {
    setStrAsDisplay(currentDisplayStr + numStr);
    currentInput += numStr;
  }
  // Update calculation display with current input
  if (currentCalculation && !['+', '−', '×', '÷'].includes(currentCalculation[currentCalculation.length - 2])) {
    currentCalculation = currentCalculation.slice(0, -currentInput.length + 1) + currentInput;
  } else {
    currentCalculation = (currentCalculation ? currentCalculation.slice(0, -1) : '') + currentInput;
  }
  updateCalculationDisplay();
};

const getResultOfOperationAsStr = () => {
  const displayNumInMemory = parseFloat(displayStrInMemory);
  const currentDisplayNum = getDisplayAsNum();
  let newDisplayNum;
  if (operatorInMemory === 'addition') {
    newDisplayNum = displayNumInMemory + currentDisplayNum;
  } else if (operatorInMemory === 'substraction') {
    newDisplayNum = displayNumInMemory - currentDisplayNum;
  } else if (operatorInMemory === 'multiplication') {
    newDisplayNum = displayNumInMemory * currentDisplayNum;
  } else if (operatorInMemory === 'division') {
    newDisplayNum = displayNumInMemory / currentDisplayNum;
  }
  return newDisplayNum.toString();
};

const handOperatorClick = (operation) => {
  const currentDisplayStr = getDisplayAsStr();
  const operatorSymbols = {
    addition: '+',
    substraction: '−',
    multiplication: '×',
    division: '÷'
  };

  if (!displayStrInMemory) {
    displayStrInMemory = currentDisplayStr;
    operatorInMemory = operation;
    currentCalculation = currentInput + ' ' + operatorSymbols[operation] + ' ';
    currentInput = '0';
    setStrAsDisplay('0');
  } else {
    displayStrInMemory = getResultOfOperationAsStr();
    currentCalculation = displayStrInMemory + ' ' + operatorSymbols[operation] + ' ';
    operatorInMemory = operation;
    currentInput = '0';
    setStrAsDisplay('0');
  }
  updateCalculationDisplay();
};

// Add button press animation
const animateButton = (button) => {
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = '';
  }, 100);
};

// Add Event Listeners to functions
acEl.addEventListener('click', () => {
  setStrAsDisplay('0');
  displayStrInMemory = null;
  operatorInMemory = null;
  currentCalculation = '';
  currentInput = '0';
  updateCalculationDisplay();
});

pmEl.addEventListener('click', () => {
  const currentDisplayNum = getDisplayAsNum();
  const currentDisplayStr = getDisplayAsStr();

  if (currentDisplayStr === '-0') {
    setStrAsDisplay('0');
    currentInput = '0';
    currentCalculation = currentCalculation.replace('-0', '0');
  } else if (currentDisplayNum >= 0) {
    setStrAsDisplay('-' + currentDisplayStr);
    currentInput = '-' + currentDisplayStr;
    if (currentCalculation && !['+', '−', '×', '÷'].includes(currentCalculation[currentCalculation.length - 2])) {
      currentCalculation = currentCalculation.slice(0, -currentDisplayStr.length) + currentInput;
    } else {
      currentCalculation = (currentCalculation ? currentCalculation.slice(0, -1) : '') + currentInput;
    }
  } else {
    setStrAsDisplay(currentDisplayStr.substring(1));
    currentInput = currentDisplayStr.substring(1);
    currentCalculation = currentCalculation.substring(1);
  }
  updateCalculationDisplay();
});

percentEl.addEventListener('click', () => {
  const currentDisplayNum = getDisplayAsNum();
  const newDisplayNum = currentDisplayNum / 100;
  setStrAsDisplay(newDisplayNum.toString());
  currentCalculation = newDisplayNum.toString();
  currentInput = newDisplayNum.toString();
  displayStrInMemory = null;
  operatorInMemory = null;
  updateCalculationDisplay();
});

// Add Event Listeners to operators
additionEl.addEventListener('click', () => {
  handOperatorClick('addition');
});
substractionEl.addEventListener('click', () => {
  handOperatorClick('substraction');
});
multiplicationEl.addEventListener('click', () => {
  handOperatorClick('multiplication');
});
divisionEl.addEventListener('click', () => {
  handOperatorClick('division');
});
equalEl.addEventListener('click', () => {
  if (displayStrInMemory) {
    const result = getResultOfOperationAsStr();
    setStrAsDisplay(result);
    currentCalculation = result;
    currentInput = result;
    displayStrInMemory = null;
    operatorInMemory = null;
    updateCalculationDisplay();
  }
});

// Add Event Listeners to numbers and decimal
for (let i = 0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () => { 
    handleNumberClick(i.toString());
  });
}
decimalEl.addEventListener('click', () => {
  const currentDisplayStr = getDisplayAsStr();
  if (!currentDisplayStr.includes(".")) {
    setStrAsDisplay(currentDisplayStr + '.');
    currentInput += '.';
    if (currentCalculation && !['+', '−', '×', '÷'].includes(currentCalculation[currentCalculation.length - 2])) {
      currentCalculation = currentCalculation.slice(0, -currentInput.length + 1) + currentInput;
    } else {
      currentCalculation = (currentCalculation ? currentCalculation.slice(0, -1) : '') + currentInput;
    }
    updateCalculationDisplay();
  }
});

// Keyboard support
document.addEventListener('keydown', (event) => {
  event.preventDefault(); // Prevent default browser behavior
  
  const key = event.key;
  
  // Number keys
  if (key >= '0' && key <= '9') {
    const numberButton = document.querySelector(`.number-${key}`);
    if (numberButton) {
      animateButton(numberButton);
      handleNumberClick(key);
    }
  }
  
  // Operator keys
  switch (key) {
    case '+':
      animateButton(additionEl);
      handOperatorClick('addition');
      break;
    case '-':
      animateButton(substractionEl);
      handOperatorClick('substraction');
      break;
    case '*':
      animateButton(multiplicationEl);
      handOperatorClick('multiplication');
      break;
    case '/':
      animateButton(divisionEl);
      handOperatorClick('division');
      break;
    case 'Enter':
    case '=':
      animateButton(equalEl);
      if (displayStrInMemory) {
        const result = getResultOfOperationAsStr();
        setStrAsDisplay(result);
        currentCalculation = result;
        currentInput = result;
        displayStrInMemory = null;
        operatorInMemory = null;
        updateCalculationDisplay();
      }
      break;
    case '.':
      animateButton(decimalEl);
      const currentDisplayStr = getDisplayAsStr();
      if (!currentDisplayStr.includes(".")) {
        setStrAsDisplay(currentDisplayStr + '.');
        currentInput += '.';
        if (currentCalculation && !['+', '−', '×', '÷'].includes(currentCalculation[currentCalculation.length - 2])) {
          currentCalculation = currentCalculation.slice(0, -currentInput.length + 1) + currentInput;
        } else {
          currentCalculation = (currentCalculation ? currentCalculation.slice(0, -1) : '') + currentInput;
        }
        updateCalculationDisplay();
      }
      break;
    case 'Escape':
    case 'c':
    case 'C':
      animateButton(acEl);
      setStrAsDisplay('0');
      displayStrInMemory = null;
      operatorInMemory = null;
      currentCalculation = '';
      currentInput = '0';
      updateCalculationDisplay();
      break;
    case '%':
      animateButton(percentEl);
      const currentDisplayNum = getDisplayAsNum();
      const newDisplayNum = currentDisplayNum / 100;
      setStrAsDisplay(newDisplayNum.toString());
      currentCalculation = newDisplayNum.toString();
      currentInput = newDisplayNum.toString();
      displayStrInMemory = null;
      operatorInMemory = null;
      updateCalculationDisplay();
      break;
    case 'Backspace':
      const currentStr = getDisplayAsStr();
      if (currentStr.length > 1) {
        setStrAsDisplay(currentStr.slice(0, -1));
        currentInput = currentInput.slice(0, -1);
        currentCalculation = currentCalculation.slice(0, -1);
      } else {
        setStrAsDisplay('0');
        currentInput = '0';
        currentCalculation = currentCalculation.slice(0, -1);
      }
      updateCalculationDisplay();
      break;
  }
});

// Set up the time
const updateTime = () => {  
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();