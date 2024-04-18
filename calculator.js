let Calculator = () => {
    const maximumDigitsOnScreen = 7;
    let accumulator = 0;
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
            let operation = event.target.value;

            switch(operation) {
                case 'ce' :
                    accumulator = 0;
                    calculatorScreen.val(0);
                    break;
                case '+' :
                    accumulator = add( accumulator, parseInputFromCalculatorScreen() ); 
                    break;
                case '=' :
                    updateCalculatorScreen();
                default:
                    break;
            }
        }
    });

    let numbers = $('[data-type="number"]').on({
        'click': (event) => {
            let currentInputOnScreen = calculatorScreen.val() !== '0' ? calculatorScreen.val() : '';
           
            if (currentInputOnScreen.length < maximumDigitsOnScreen) {
                calculatorScreen.val( currentInputOnScreen + event.target.value);
            }
                
        }
    });
}

Calculator();