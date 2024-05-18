let Calculator = () => {
    const maximumDigitsOnScreen = 7;
    let calculatorScreen = $('.calculator-screen');

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
    let userInput = '';

    /**
     * Performs the assigned operation on the table
     * @param {float} firstOperand 
     * @param {float} secondOperand 
     * @param {char} operator 
     * @returns 
     */
    let operate = ( firstOperand, secondOperand, operator ) => {
        let allowedOperators = Object.keys( operatorTable );
        let isOperatorInAllowedOperatorList = allowedOperators.includes( operator );

        if ( isOperatorInAllowedOperatorList ) return operatorTable[operator]( firstOperand, secondOperand );
        return undefined;
    }

    let isOperator = ( operator ) => operator === '+' || operator === '-' || operator === '*' || operator === '/';
    
    /**
     * Gets the input from the screen as a floating-point number.
     * @returns the float representation of the current input on the calculator screen
     */
    let parseInputFromCalculatorScreen = () => parseFloat( calculatorScreen.val() );

    /**
     * Updates the value on the screen based on the accumulator's value
     * @returns the value on the calculator screen
     */
    let updateCalculatorScreen = ( newValueOnScreen ) => calculatorScreen.val( newValueOnScreen );


    let clearScreen = () => calculatorScreen.val('');

    let numberEvents = $('[data-type="number"]').on({
        'click' : (event) => {
            const newInputReceived = event.target.value;
            const lastInputCharacter = userInput.at(-1);
            const isLastInputCharacterAnOperator = isOperator( lastInputCharacter );
            
            if ( isLastInputCharacterAnOperator ) {
                userInput += ' ' + newInputReceived;
                clearScreen();
            } else {
                userInput += newInputReceived;
            }
            
            updateCalculatorScreen( calculatorScreen.val() + newInputReceived );
        }
    });

    let operatorEvents = $('[data-type="operator"]').on({
        'click' : (event) => {
            let operatorPressed = event.target.value;

            switch ( operatorPressed ) {
                case 'ce':
                    userInput = '';
                    [ firstOperand, operator, secondOperand ] = [null, null, null];
                    clearScreen();
                    break;
                case '=':
                    // When the equals sign is pressed multiple times, it performs the last operation
                    // and adds the second operand to the accumulator every time it is pressed
                    if ( typeof( firstOperand ) === 'number' && typeof( secondOperand ) === 'number' ) {
                        firstOperand = operate( firstOperand, secondOperand, operator );
                        updateCalculatorScreen( firstOperand );
                    } else {
                        let operationToPerform = userInput.split(' ');

                        [ firstOperand, operator, secondOperand ] = operationToPerform.map( 
                            val => isNaN( val ) ? val : parseFloat( val ) 
                        );

                        // Store the result of the operation on the first operator for later
                        // use in case the user wants to perform additional operations
                        firstOperand = operate( firstOperand, secondOperand, operator );
                        updateCalculatorScreen( firstOperand );
                        // update user input to include the accumulated value
                        userInput = '' + firstOperand;
                    }
                    

                    break;
                case '+':
                    // If there is a number on the first operand only, mimic, add them up
                    // let operationToPerform = userInput.split(' ');
                    
                    // if two numbers, 
                    userInput += ' ' + operatorPressed;
                    break;
                case '-':
                    break;
                case '*':
                    break;
                case '/':
                    
                    break;
                default:
                    break;
            }

            
        }
    });


}

Calculator();