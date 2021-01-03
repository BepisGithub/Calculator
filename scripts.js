function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(a,operator,b){
    switch(operator){
        case "add":
            return add(a,b);
        case "subtract":
            return subtract(a,b);
        case "multiply":
            return multiply(a,b);
        case "divide":
            return divide(a,b);
    }
}

const body = document.querySelector("body");
let numberButtons = [];
let functionButtons = [];
let displayValue = "";
let userInput = [];
const addButton = body.querySelector("#badd");
const subtractButton = body.querySelector("#bsubtract");
const multiplyButton = body.querySelector("#bmultiply");
const divideButton = body.querySelector("#bdivide");
const clearButton = body.querySelector("#bclear")
const equalsButton = body.querySelector("#bequal")
const backButton = body.querySelector("#bbackspace")
const dotButton = body.querySelector("#bdecimal");
let resultsDisplay = body.querySelector("#results")

for(i=0;i<10;i++){
    numberButtons[i] = document.querySelector(`#b${i}`)
}
functionButtons = [addButton,subtractButton,multiplyButton,divideButton,clearButton,backButton,equalsButton,dotButton];

function scaleFontSize(element) {

    // Reset font-size to 100% to begin
    resultsDisplay.style.fontSize = "6vh";
    let i = 9;
    // Check if the text is wider than its container,
    // if so then reduce font-size
    while (resultsDisplay.scrollWidth > resultsDisplay.clientWidth) {
        if(i<3){
            i = 3;
            resultsDisplay.style.fontSize = `${(6/10)*i}vh`;
            break;

        }
        resultsDisplay.style.fontSize = `${(6/10)*i}vh`;
        i--;
    }
}

numberButtons.forEach((element,index) => { //goona make this so that it doesnt get converted to a number till one of the operations is pressed
    element.addEventListener("click",() => {
        let temp = element.getAttribute("id");
        temp = Array.from(temp);
        temp.splice(0,1);
        displayValue += temp;
        // console.log(displayValue);
        resultsDisplay.textContent = displayValue;
        scaleFontSize(resultsDisplay)

    });
});

functionButtons.forEach((element,index) => {
    let temp = element.getAttribute("id");
        temp = Array.from(temp);
        temp.splice(0,1);
        temp = temp.join("");

        switch(temp){
            case "clear":
                element.addEventListener("click", () => console.log("clear"));
                break;
            case "backspace":
                element.addEventListener("click", () => console.log("backspace"));
                break;
            case "equal":
                element.addEventListener("click", () => console.log("equal"));
                break;
            case "decimal":
                element.addEventListener("click", () => console.log("decimal"));
                break;
            default:
                element.addEventListener("click", () => {
                    console.log(userInput);
                    userInput.push(Number(displayValue));
                    userInput.push(temp);
                    if(userInput.length==4){
                        let temp = userInput;
                        userInput = [];
                        userInput[0] = operate(temp[0],temp[1],temp[2]);
                        userInput[1] = temp[3];
                        displayValue = userInput[0];
                        resultsDisplay.textContent = displayValue;
                    }
                    displayValue = "";
                });
        }






});