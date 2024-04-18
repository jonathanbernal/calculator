let Calculator = () => {
    const maximumDigitsOnScreen = 7;
    let accumulator = 0;
    let wasOperatorPressed = false;
    let lastOperatorPressed = null;
    let calculatorScreen = $('.calculator-screen');
    calculatorScreen.val(0);

    let add = (num1, num2) => num1 + num2;
    let subtract = (num1, num2) => num1 - num2;
    let multiply = (num1, num2) => num1 * num2;
    let divide = (num1, num2) => {
        if ( num2 === 0 ) return undefined;
        return num1 / num2;
    }
    let parseInputFromCalculatorScreen = () => parseInt(calculatorScreen.val());
    let updateCalculatorScreen = () => calculatorScreen.val(accumulator);
    
    let operators = $('[data-type="operator"]').on({
        'click' : (event) => {
            let operator = event.target.value;
            let valueOnScreen = parseInputFromCalculatorScreen();
            if ( operator !== '=' ) {
                lastOperatorPressed = operator;
            }

            switch(operator) {
                case 'ce' :
                    wasOperatorPressed = false;
                    accumulator = 0;
                    calculatorScreen.val('0');
                    break;
                case '+' :
                    if ( !wasOperatorPressed && valueOnScreen !== '0') {
                        accumulator = add(accumulator, valueOnScreen);
                        calculatorScreen.val(accumulator);
                        wasOperatorPressed = !wasOperatorPressed;
                    } else if ( wasOperatorPressed ) {
                        accumulator = add(accumulator, valueOnScreen);
                        calculatorScreen.val(accumulator);
                    }
                    break;
                case '=' :
                    // check for last operation button pressed and perform the last operation before displaying the final result
                    switch ( lastOperatorPressed ) {
                        case '+':
                            accumulator = add(accumulator, valueOnScreen);
                            calculatorScreen.val(accumulator);
                            break;
                        case '-':
                            accumulator = subtract(accumulator, valueOnScreen);
                            calculatorScreen.val(accumulator);
                            break;
                    }
                default:
                    break;
            }
        }
    });

    let numbers = $('[data-type="number"]').on({
        'click': (event) => {
            if ( wasOperatorPressed ) {
                wasOperatorPressed = !wasOperatorPressed;
                calculatorScreen.val('');
            }

            let currentInputOnScreen = calculatorScreen.val() !== '0' ? calculatorScreen.val() : '';
           
            if (currentInputOnScreen.length < maximumDigitsOnScreen) {
                calculatorScreen.val( currentInputOnScreen + event.target.value);
            }
        }
    });
}

Calculator();