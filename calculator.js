import $ from 'jquery';

let Calculator = () => {
    const maximumDigitsOnScreen = 7;
    const calculatorScreen = $('.calculator-screen');
    const clearBtn = $("#clear-btn");
    const equalsBtn = $("#equals-btn");
    const pointBtn = $("#point-btn");
    const numberBtns = $("[data-type='number']");
    const operatorBtns = $("[data-type='operator']");
    let isClearScreen = false; // clears screen after new numbers are entered following an operator press
    let isEqualsPressed = false; // tracks whether = is being spammed

    let add = (num1, num2) => num1 + num2;
    let subtract = (num1, num2) => num1 - num2;
    let multiply = (num1, num2) => num1 * num2;
    let divide = (num1, num2) => {
        if ( num2 === 0 ) return undefined;
        return num1 / num2;
    }
    const modulus = (num1, num2) => num1 % num2;
    const exponent = (num1, num2) => num1 ** num2;
    const squared = (num1) => num1 ^ 2;


    /**
     * Gets the number on the screen as a floating point number
     * @returns floating-point value of the value displayed on the screen
     */
    const getScreenValue = () => parseFloat(calculatorScreen.val());

    const deleteCharFromScreen = () => updateCalculatorScreen( calculatorScreen.val().slice(0, calculatorScreen.val().length - 1) );

    let operatorTable = {
        '+' : add,
        '-' : subtract,
        '*' : multiply,
        '/' : divide,
        '%' : modulus,
        '^' : exponent,
        'x^2': squared,
    }

    // input variables
    let firstOperand = 0,
        secondOperand = 0,
        operator = '';

    /**
     * Performs the assigned operation on the table
     * @param {string} firstOperand 
     * @param {string} secondOperand 
     * @param {char} operator 
     * @returns 
     */
    const operate =  (firstNumber, secondNumber, operator) => {
        console.log("Operate():", firstNumber, secondNumber, operator);
        const result = operatorTable[operator]( firstNumber, secondNumber );
        if (operator === "/" && secondNumber === 0.0) {
            return "Error";
        }
        return result;
    }

    const appendPointToCurrentInput = () => {
        const calculatorScreenVal = calculatorScreen.val();
        if ( !calculatorScreenVal.includes(".") ) {
            calculatorScreen.val( calculatorScreen.val() + ".");
        }
    }

    /**
     * Updates the value on the screen based on the user input's value
     * @returns the value on the calculator screen
     */
    let updateCalculatorScreen = ( newVal ) => newVal.length > maximumDigitsOnScreen ? calculatorScreen.val( newVal.slice(0,maximumDigitsOnScreen) ) : calculatorScreen.val(newVal);

    let clearScreen = () => calculatorScreen.val('');
    let resetInput = () => [firstOperand, secondOperand, operator] = [0, 0, ''];

    // Event handling
    numberBtns.each( ( index, btn ) => {
        $(btn).on("click", ( event ) => {
            // prevent entering multiple zeros for 0.
            if ( calculatorScreen.val() === "0" && event.target.value === "0" ) {
                return;
            }
            if ( calculatorScreen.val().toLowerCase() === "error" && typeof(secondOperand) === "string" && secondOperand.toLowerCase() === "error") {
                clearScreen();
            }
            if ( isClearScreen ) {
                clearScreen();
                isClearScreen = !isClearScreen; // toggle the flag before new values are entered
            }
            updateCalculatorScreen( calculatorScreen.val() + event.target.value );
        });
    })

    operatorBtns.each( (index, btn) => {
        $(btn).on("click", function(event) {
            if ( isEqualsPressed) {
                isEqualsPressed = false;
            }
            if ( calculatorScreen.val().toLowerCase() === "error") {
                resetInput();
                clearScreen();
            }
            // prevents typing in multiple operators in sequence
            if ( operator && isClearScreen ) {
                operator = event.target.value;
                return;
            }

            if ( !operator ) {
                firstOperand = parseFloat( calculatorScreen.val() || 0);
                operator = event.target.value;
            } else {
                secondOperand = getScreenValue();
                firstOperand = operate(firstOperand, secondOperand, operator);
                updateCalculatorScreen(firstOperand.toString())
                operator = event.target.value;
                // reset second operand
                secondOperand = 0;
            }
            isClearScreen = true;
        })
    });

    clearBtn.on( "click", ()=> { clearScreen(); resetInput(); } );

    equalsBtn.on( "click", (event) => {
        if (!operator) return;

        if ( !isEqualsPressed ) {
            secondOperand = getScreenValue();
        }
        firstOperand = operate(firstOperand, secondOperand, operator);
        updateCalculatorScreen(firstOperand);
        isEqualsPressed = true;
        // secondOperand = 0;
        isClearScreen = true;
    });

    pointBtn.on( "click", (event) => {
        appendPointToCurrentInput();
    });

    calculatorScreen.on('error', ()=> {
        isClearScreen = true;
    })

    

    //TODO: write operator logic. May need a function to set the operator
    // and some logic to clear out the screen when the second operator is entered

    // handle keys
    $(document).on('keydown', function(event) {
        event.preventDefault();
        const keyPressed = event.key;
        console.log('key pressed: ', keyPressed);
        switch( keyPressed ) {
            case "Enter":
                $('button[value="="]').trigger('click');
                break;
            case ".":
                $('button[value="."]').trigger('click');
                break;
            case "Backspace":
                deleteCharFromScreen();
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
            case "+":
            case "-":
            case "*":
            case "/":
                $(`button[value="${keyPressed}"]`).trigger('click');
                break;
            default:
                break;
        }
        console.log(event.key)
    })


    
}

Calculator();