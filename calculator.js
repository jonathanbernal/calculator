let Calculator = () => {
    let accumulator = 0;

    let add = (num1, num2) => num1 + num2;
    let subtract = (num1, num2) => num1 - num2;
    let multiply = (num1, num2) => num1 * num2;
    let divide = (num1, num2) => {
        if ( num2 === 0 ) return undefined;
        return num1 / num2;
     }
    
    let keys = $('.key').on({
        'click' : (event) => console.log("You pressed", event.target.value)
    })
}

Calculator();