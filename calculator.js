import Stack from './Stack';

let Calculator = () => {
    const maximumDigitsOnScreen = 7;
    let accumulator = 0;
    let wasOperatorPressed = false;
    let lastOperatorPressed = null;
    let calculatorScreen = $('.calculator-screen');

    // Use two stacks for the parsing algorithm
    let valueStack = Stack();
    let operatorStack = Stack();

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
    
    /**
     * Gets the input from the screen as a floating-point number.
     * @returns the float representation of the current input on the calculator screen
     */
    let parseInputFromCalculatorScreen = () => parseFloat(calculatorScreen.val());

    /**
     * Updates the value on the screen based on the accumulator's value
     * @returns the value on the calculator screen
     */
    let updateCalculatorScreen = () => calculatorScreen.val(accumulator);
    let clearScreen = () => calculatorScreen.val('');

    let numberEvents = $('[data-type="number"]').on({
        'click' : (event) => {
            let newInputReceived = event.target.value;

            userInput += newInputReceived;

            calculatorScreen.val( calculatorScreen.val() + newInputReceived );
        }
    });

    let operatorEvents = $('[data-type="operator"]').on({
        'click' : (event) => {
            let operatorPressed = event.target.value;

            switch ( operatorPressed ) {
                case 'ce':
                    userInput = '';
                    clearScreen();
                    break;
                case '=':
                    let operationToPerform = userInput.split(' ');
                    firstOperand = parseFloat(operationToPerform[0]);
                    operator = operationToPerform[1];
                    secondOperand = parseFloat(operationToPerform[2]);
                    let result = operate(firstOperand, secondOperand, operator);
                    calculatorScreen.val(result)
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    userInput += ' ' + operatorPressed + ' ';
                    break;
                default:
                    break;
            }

            
        }
    });


}

Calculator();