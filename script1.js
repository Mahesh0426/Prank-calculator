// Problem Statement - Build a Basic Calculator
// STEP 1- Build UI: Raw design, HTML implementaion + CSS
// STEP 2- Build solution [Bussiness Logic]

// PRANK AUDIO
const prankAudio = new Audio("./aa.wav");
// Operator COnstants

//Get all button from calculator
const calculatorButtons = document.querySelectorAll("button");

//display box
const displayBox = document.querySelector(".display-box");
let displayValue = "";

// operators constants
let OPERATORS = ["%", "/", "*", "-", "+"];

// STEP 1 - Add onclick event listener to every buttons
calculatorButtons.forEach((btn) => {
  const Value = btn.innerText;

  btn.onclick = () => {
    buttonAction(Value);
  };
});

// STEP 2 - Add key press event listener to
document.addEventListener("keypress", (event) => {
  if (event.code.includes("Key")) {
    return;
  }
  buttonAction(event.key);
});

// Function for displaying values in display box
const display = () => {
  displayBox.innerText = displayValue || "0.0";
};
const buttonAction = (buttonValue) => {
  //Implement AC button work
  if (buttonValue === "AC") {
    displayValue = "";
    display();
    return;
  }

  //Implement C button
  if (buttonValue === "C") {
    displayValue = displayValue.slice(0, -1);
    display();
    return;
  }

  //Implement handling the operators
  //| donot allow consecutive multiple operators
  if (OPERATORS.includes(buttonValue)) {
    // do not allow some operators at the begginning
    if (!displayValue) {
      ["%", "/", "*"].includes(buttonValue);
      return;
    }
    lastOperator = buttonValue;
    //get the last operator
    const lastCharacter = displayValue[displayValue.length - 1];

    // If the last character is an operator, remove it
    if (OPERATORS.includes(lastCharacter)) {
      // remove the lastCharacter which is existing operator
      displayValue = displayValue.slice(0, -1);
    }
  }

  //handle . issue
  if (buttonValue === ".") {
    // If there is no operator yet and the display already has a decimal point, do nothing
    if (!lastOperator && displayValue.includes(".")) {
      return;
    }
    // Find the index of the last operator in the current input
    const lastOperatorIndex = displayValue.lastIndexOf(lastOperator);
    // Get the part of the input after the last operator
    const lastNumberSet = displayValue.slice(lastOperatorIndex);
    // If the current number segment already has a decimal point, do nothing
    if (lastNumberSet.includes(".")) {
      return;
    }
  }
  // Implement = button to get the total
  if (buttonValue === "=" || buttonValue === "Enter") {
    // eval needs proper expression to work on
    // For that we clean last operator "="

    // Get a valid string for eval
    const result = eval(displayValue);
    displayValue = result;

    //Logic for prank
    const prankValue = getRandomNumber();
    //in JS 0 is false
    if (prankValue) {
      displayBox.classList.add("prank");
      prankAudio.play();
    }
    display();
    return;
  }
  displayValue += buttonValue;

  display();
};
const getRandomNumber = () => {
  const randomNumber = Math.round(Math.random() * 10);

  return randomNumber <= 3 ? randomNumber : 0;
};
