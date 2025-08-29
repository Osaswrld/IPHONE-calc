// DOM Elements 
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const displayEl = document.querySelector('.display');

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


// Varaibles
let displayStrInMemory = null;
let operatorInMemory = null;


// Functions
const getDisplayAsStr = () => displayEl.textContent.split(',').join('');


const getDisplayAsNum = () => {
  return parseFloat(getDisplayAsStr());
};

const setStrAsDisplay = (displayStr) => {
  if (displayStr[displayStr.length - 1] == '.') {
    displayEl.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = displayStr.split('.');
  if (decimalStr) {
    displayEl.textContent =  
    parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handleNumberClick = (numStr) => {
  const currentDisplayStr = getDisplayAsStr();
  if (currentDisplayStr == '0') {
    setStrAsDisplay(numStr);
  } else {
    setStrAsDisplay(currentDisplayStr + numStr);
  }
};

const getResultOfOperationAsStr = () => {
  const displayNumInMemory = parseFloat(displayStrInMemory);
  const currentDisplayNum = getDisplayAsNum();
 let newDisplayNum;
  if (operatorInMemory == 'addition') {
    newDisplayNum = displayNumInMemory + currentDisplayNum;
  } else if (operatorInMemory == 'substraction') {
    newDisplayNum = displayNumInMemory - currentDisplayNum;
  } else if (operatorInMemory == 'multiplication') {
    newDisplayNum = displayNumInMemory * currentDisplayNum;
  } else if (operatorInMemory == 'division') {
    newDisplayNum = displayNumInMemory / currentDisplayNum;
  }

  return newDisplayNum.toString();
};

const handOperatorClick = (operation) => {

  const currentDisplayStr = getDisplayAsStr();
  if (!displayStrInMemory) {
    displayStrInMemory = currentDisplayStr;
    operatorInMemory = operation;
    setStrAsDisplay('0');
    return;
  } 
  displayStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsDisplay('0');
}; 



// Add Event ;isteners to functions
acEl.addEventListener('click', () => {
  setStrAsDisplay('0');
  displayStrInMemory = null;
  operatorInMemory = null;
});
pmEl.addEventListener('click', () => {
  const currentDisplayNum = getDisplayAsNum();
  const currentDisplayStr = getDisplayAsStr();

  if (currentDisplayStr == '-0') {
    setStrAsDisplay('0');
    return;
  }


  if (currentDisplayNum  >= 0) {
    setStrAsDisplay('-' + currentDisplayStr);
  } else {
    setStrAsDisplay(currentDisplayStr.substring(1));
  }
});
percentEl.addEventListener('click', () => {
  const currentDisplayNum = getDisplayAsNum();
  const newDisplayNum = currentDisplayNum / 100;
  setStrAsDisplay(newDisplayNum.toString());
  displayStrInMemory = null;
  operatorInMemory = null;
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
    setStrAsDisplay(getResultOfOperationAsStr());
    displayStrInMemory = null;
    displayNumInMemory = null;
  }
});




// Add Event Listeners to numbers and decimal
for (let i=0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () => { 
   handleNumberClick(i.toString());
  });
}
decimalEl.addEventListener('click', () => {
  const currentDisplayStr = getDisplayAsStr();
  if (!currentDisplayStr.includes(".")) {
    setStrAsDisplay(currentDisplayStr + '.');
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