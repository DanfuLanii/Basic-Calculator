const calculator = document.querySelector(".calc");
const keys = calculator.querySelector(".calc-keys");
const display = calculator.querySelector(".calc-display");

keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.value;
        const previousKeyType = calculator.dataset.previousKeyType;

        console.log('Button pressed:', keyContent);
        console.log('Action:', action);
        console.log('Displayed Number:', displayedNum);
        console.log('Previous Key Type:', previousKeyType);

        // NUMBER BUTTONS
        if (!action) {
            if (displayedNum === "0" || previousKeyType === "operator" || previousKeyType === "calculate") {
                display.value = keyContent;
            } else {
                display.value += keyContent;
            }
            calculator.dataset.previousKeyType = "number";
        }
        // DECIMAL
        else if (action === "decimal") {
            if (!displayedNum.includes(".")) {
                display.value += ".";
            } else if (previousKeyType === "operator" || previousKeyType === "calculate") {
                display.value = "0.";
            }
            calculator.dataset.previousKeyType = "decimal";
        }
        // CLEAR
        else if (action === "clear") {
            display.value = "0";
            delete calculator.dataset.firstValue;
            delete calculator.dataset.operator;
            calculator.dataset.previousKeyType = "clear";
        }
        // OPERATOR
        else if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            console.log('First Value:', firstValue);
            console.log('Operator:', operator);
            console.log('Second Value:', secondValue);

            if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
                const result = calculate(firstValue, secondValue, operator);
                display.value = result;
                calculator.dataset.firstValue = result;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            calculator.dataset.operator = action;
            calculator.dataset.previousKeyType = "operator";
        }
        // CALCULATE
        else if (action === "calculate") {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            console.log('Calculating with:', firstValue, operator, secondValue);

            if (firstValue && operator) {
                const result = calculate(firstValue, secondValue, operator);
                display.value = result;

                calculator.dataset.firstValue = result;
                calculator.dataset.previousKeyType = "calculate";
            }
        }

        function calculate(firstValue, secondValue, operator) {
            firstValue = parseFloat(firstValue);
            secondValue = parseFloat(secondValue);

            switch (operator) {
                case "add":
                    return firstValue + secondValue;
                case "subtract":
                    return firstValue - secondValue;
                case "multiply":
                    return firstValue * secondValue;
                case "divide":
                    return firstValue / secondValue;
                default:
                    return secondValue;
            }
        }
    }
});
