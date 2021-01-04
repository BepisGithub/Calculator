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

//need to make it so that it only adds a comma to the part before the e
function draw(val){
    if(isNaN(val)){
        resultsDisplay.textContent = val;
    }else{

        let temp = Array.from(val); //its including the commas in the array so
        //array
        //if array has e
        //dont do anything
        let hasE = temp.includes("e");
        if(hasE){
            temp = temp.join("");
            resultsDisplay.textContent = temp;
        }else{
            temp = temp.filter(item => {
                if (!(isNaN(item)) || item=="."){
                    return true;
                }
            });

            let tlength = temp.length-4;
            let periodPos = temp.indexOf(".");
            while(!(temp[tlength]===undefined) && !(tlength < (-1*(temp.length)))){
                temp.splice((tlength+1),0,","); //so this part gets gunked up because its inserting it every 3 elements, not every 3 numbers. and with that i must conclude
                tlength -= 3;
            };

            temp = temp.join("");

            resultsDisplay.textContent = temp;

        }   
    }
    scaleFontSize(resultsDisplay);


}

draw("LD's calculator project!");

numberButtons.forEach((element,index) => { //goona make this so that it doesnt get converted to a number till one of the operations is pressed
    element.addEventListener("click",() => {
        let temp = element.getAttribute("id");
        temp = Array.from(temp);
        temp.splice(0,1);
        displayValue += temp;
        // resultsDisplay.textContent = displayValue;
        // scaleFontSize(resultsDisplay);
        draw(displayValue);

    });
});

window.addEventListener('keydown', (e) => { //need to check if its a number or function
    if(e.key<=9 && e.key>=0){ //if its a number
        let temp = new MouseEvent("click");
        numberButtons[e.key].dispatchEvent(temp);
    }else{
        let temp = new MouseEvent("click");
        switch(e.key){
            case "+":
                functionButtons[0].dispatchEvent(temp);
                break;
            case "-":
                functionButtons[1].dispatchEvent(temp);
                break;
            case "*":
                functionButtons[2].dispatchEvent(temp);
                break;
            case "/":
                functionButtons[3].dispatchEvent(temp);
                break;
            case ".":
                functionButtons[7].dispatchEvent(temp);
                break;
            case "=":
                functionButtons[6].dispatchEvent(temp);
                break;
            case "Backspace":
                functionButtons[5].dispatchEvent(temp);
                break;
            case "Delete":
                functionButtons[4].dispatchEvent(temp);
                break;
            default:

        }
    }
    
});



functionButtons.forEach((element,index) => {
    let temp = element.getAttribute("id");
        temp = Array.from(temp);
        temp.splice(0,1);
        temp = temp.join("");
    
        switch(temp){
            case "clear":
                element.addEventListener("click", () => {
                    let inp = prompt("Are you sure you want to clear everything?","yes");
                    inp.toLowerCase();
                    if(inp==="yes"){
                        displayValue = "";
                        userInput = [];
                        hasDecimal = false;
                        // resultsDisplay.textContent = "Cleared!";
                        draw("Cleared!");
                    }
                });
                break;
            case "backspace":
                element.addEventListener("click", () => {
                    let temp = displayValue.slice(-1);
                    if(temp=="."){ //if the cleared value is a decimal
                        hasDecimal = false;
                    }
                    displayValue = displayValue.substring(0,displayValue.length-1);
                    // resultsDisplay.textContent = displayValue;
                    draw(displayValue);
                    scaleFontSize(resultsDisplay);

                });
                break;
            case "equal":
                element.addEventListener("click", () => {



                    if(userInput.length==2){
                        userInput.push(Number(displayValue));
                        //
                            if(userInput[2]===0 && userInput[1]=="divide"){
                                // resultsDisplay.textContent = "Can't divide by 0";
                                draw("Can't divide by 0");
                            }else{
                        //
                        let temp = userInput;
                        userInput = [];
                        userInput[0] = Number((operate(temp[0],temp[1],temp[2])).toFixed(5));
                        displayValue = userInput[0];
                        displayValue = String(displayValue);
                        // resultsDisplay.textContent = displayValue;
                        draw(displayValue);
                        }
                    }
                    // else if(userInput.length==4){
                    //     let temp = userInput;
                    //     userInput = [];
                    //     userInput[0] = Number((operate(temp[0],temp[1],temp[2])).toFixed(5));
                    //     userInput[1] = temp[3];
                    //     displayValue = userInput[0];
                    //     resultsDisplay.textContent = displayValue;
                    //     scaleFontSize(resultsDisplay);

                    // }
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
                        // resultsDisplay.textContent = displayValue;
                        draw(displayValue);

                    }
                });
                break;
            default:
                element.addEventListener("click", () => {
                    hasDecimal = false;
                    if(userInput.length==1){
                        userInput[0] = (Number(displayValue));
                    }else{
                        userInput.push(Number(displayValue));
                    }
                    userInput.push(temp);


                    if(userInput.length==4){
                        if(userInput[2]===0 && userInput[1]=="divide"){
                            // resultsDisplay.textContent = "Can't divide by 0";
                            draw("Can't divide by 0");
                        }else{
                        let temp = userInput;
                        userInput = [];
                        userInput[0] = Number((operate(temp[0],temp[1],temp[2])).toFixed(5));
                        userInput[1] = temp[3];
                        displayValue = userInput[0];
                        // resultsDisplay.textContent = displayValue;
                        draw(displayValue);
                        }
                        
                    }
                    displayValue = "";
                });
        }






});