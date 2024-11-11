let Calculator = () => {
    const maximumDigitsOnScreen = 7;
    const calculatorScreen = $('.calculator-screen');
    const clearBtn = $("#clear-btn");
    const equalsBtn = $("#equals-btn");
    const pointBtn = $("#point-btn");
    const numberBtns = $("[data-type='number']");

    let add = (num1, num2) => num1 + num2;
    let subtract = (num1, num2) => num1 - num2;
    let multiply = (num1, num2) => num1 * num2;
    let divide = (num1, num2) => {
        if ( num2 === 0 ) return undefined;
        return num1 / num2;
    }

    let operatorTable = {
        '+' : add,
        '-' : subtract,
        '*' : multiply,
        '/' : divide,
    }

    // input variables
    let firstOperand = null, operator = null, secondOperand = null;
    let userInput = [];

    /**
     * Performs the assigned operation on the table
     * @param {string} firstOperand 
     * @param {string} secondOperand 
     * @param {char} operator 
     * @returns 
     */
    let operate = ( firstOperand, secondOperand, operator ) => {
        let firstNumber = Number(firstOperand);
        let secondNumber = Number(secondOperand);

        console.log(firstNumber, secondNumber, operator);

        let allowedOperators = Object.keys( operatorTable );
        let isOperatorInAllowedOperatorList = allowedOperators.includes( operator );
        console.log('operator table result: ', operatorTable[operator]( firstNumber, secondNumber ))
        if ( isOperatorInAllowedOperatorList ) return operatorTable[operator]( firstNumber, secondNumber );
        return NaN;
    }

    let isOperator = ( operator ) => operator === '+' || operator === '-' || operator === '*' || operator === '/';

    /**
     * Updates the value on the screen based on the user input's value
     * @returns the value on the calculator screen
     */
    let updateCalculatorScreen = () => calculatorScreen.val( userInput.join('') );

    /**
     * Sets the value on the calculator screen to the specified value
     * @param {*} value the value to set the calculator screen to
     * @returns 
     */
    let setCalculatorScreen = (value) => calculatorScreen.val(value);

    let clearScreen = () => calculatorScreen.val('');
    let resetInput = () => userInput = [];

    let appendNumberToInput = (number) => userInput.push(number);

    let appendPointToInput = (point) => {
        if ( point === "." && !userInput.includes(".") ) {
            userInput.push(point);
        }
    }

    // Event handling
    clearBtn.on( "click", ()=> { clearScreen(); resetInput(); } );

    equalsBtn.on( "click", () => {
        let operationResult = operate( firstOperand, secondOperand, operator );
        updateCalculatorScreen( operationResult );
    });

    pointBtn.on( "click", (event) => {
        appendPointToInput(event.target.value);
        updateCalculatorScreen();
    });

    numberBtns.each( (index, btn) => {
        $(btn).on("click", (event) => {
            appendNumberToInput(event.target.value);
            updateCalculatorScreen();
        });
    })

    //TODO: write operator logic. May need a function to set the operator
    // and some logic to clear out the screen when the second operator is entered

    // handle keys
    let handleKeyboardInputs = (event) => {
        let keyPressed = event.key;

        if (keyPressed === "=" || keyPressed === "Enter") {

        } else if (keyPressed === "Delete") {
            clearScreen();
            userInput = [];
        } 
    }
    
    
    /**
     * Gets the input from the screen as a floating-point number.
     * @returns the float representation of the current input on the calculator screen
     */
    let parseInputFromCalculatorScreen = () => parseFloat( calculatorScreen.val() );

    

    let setFirstOperand = ( newValue ) => typeof newValue === "number" ? firstOperand = newValue : NaN;

    let setSecondoperand = ( newValue ) => typeof newValue === "number" ? secondOperand = newValue : NaN;



}

Calculator();