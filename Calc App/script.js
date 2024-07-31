const calculator = document.querySelector(".calc");
const keys = calculator.querySelector(".calc-keys");
const display = calculator.querySelector(".calc-display");

keys.addEventListener("click", e =>{
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.value;
        const previousKeyType = calculator.dataset.previousKeyType;
        //NUMBER BUTTTONS
        if (!action) {
            if (displayedNum === "0" || previousKeyType === "operator") {
                display.value = keyContent;
        }       else{
                display.value += keyContent;
                } 
        //DECIMAL
        }else if (action === "decimal") {
            if(!displayedNum.includes(".")){
            display.value += ".";
            }
    
        }  
        //CLEAR
        else if(action === "clear"){
            display.value = "0";
            delete calculator.dataset.firstValue;
            delete calculator.dataset.operator;
            calculator.dataset.previousKeyType = "clear";
        
        }
        //OPERATOR
        else if (action === "operator") {
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = keyContent;
            calculator.dataset.previousKeyType = "operator";

        }
        //CALCULATE
        // else if (action === "calculate") {
        //     let firstValue = calculator.dataset.firstValue;
        //     const operator = calculator.dataset.operator;
        //     const secondValue = displayedNum;

        //     if (firstValue && operator) {
        //         const expression = 
        //     }
        // }

    }
})

