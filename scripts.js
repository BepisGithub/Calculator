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

let hasDecimal = false;
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
    while (resultsDisplay.scrollHeight > resultsDisplay.clientHeight) {
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
        if(temp==0 && userInput[userInput.length-1]=="divide"){
            console.log("YOu tried to divide by 0");
            resultsDisplay.textContent = "Can't divide by 0";
            scaleFontSize(resultsDisplay);

        }else{
        displayValue += temp;
        resultsDisplay.textContent = displayValue;
        scaleFontSize(resultsDisplay);
        }

    });
});

functionButtons.forEach((element,index) => {
    let temp = element.getAttribute("id");
        temp = Array.from(temp);
        temp.splice(0,1);
        temp = temp.join("");

        switch(temp){
            case "clear":
                element.addEventListener("click", () => {
                    displayValue = "";
                    userInput = [];
                    hasDecimal = false;
                    resultsDisplay.textContent = "Cleared!";
                });
                break;
            case "backspace":
                element.addEventListener("click", () => {
                    let temp = displayValue.slice(-1);
                    if(temp=="."){ //if the cleared value is a decimal
                        hasDecimal = false;
                    }
                    displayValue = displayValue.substring(0,displayValue.length-1);
                    resultsDisplay.textContent = displayValue;
                });
                break;
            case "equal":
                element.addEventListener("click", () => {
                    
                    
                    if(userInput.length==2){
                        userInput.push(Number(displayValue));
                        let temp = userInput;
                        userInput = [];
                        userInput[0] = Number((operate(temp[0],temp[1],temp[2])).toFixed(5));
                        displayValue = userInput[0];
                        displayValue = String(displayValue);
                        resultsDisplay.textContent = displayValue;
                        console.table(userInput);
                    }else if(userInput.length==4){
                        let temp = userInput;
                        userInput = [];
                        userInput[0] = Number((operate(temp[0],temp[1],temp[2])).toFixed(5));
                        userInput[1] = temp[3];
                        displayValue = userInput[0];
                        resultsDisplay.textContent = displayValue;
                    }
                    else{
                        resultsDisplay.textContent = "Error";
                    }

                    hasDecimal = !(Number.isInteger(userInput[0]));
                });
                break;
            case "decimal":
                element.addEventListener("click", () => {
                    if(hasDecimal==false){
                        hasDecimal = true;
                        displayValue = displayValue + ".";
                        resultsDisplay.textContent = displayValue;
                    }
                });
                break;
            default:
                element.addEventListener("click", () => {
                    hasDecimal = false;
                    console.table(userInput);
                    if(userInput.length==1){
                        userInput[0] = (Number(displayValue));
                    }else{
                        userInput.push(Number(displayValue));
                    }
                    userInput.push(temp);
                    console.table(userInput);
                    if(userInput.length==4){
                        let temp = userInput;
                        userInput = [];
                        userInput[0] = Number((operate(temp[0],temp[1],temp[2])).toFixed(5));
                        userInput[1] = temp[3];
                        displayValue = userInput[0];
                        resultsDisplay.textContent = displayValue;
                    }
                    displayValue = "";
                });
        }






});