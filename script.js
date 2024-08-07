document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === '=') {
                try {
                    currentInput = calculateResult(currentInput);
                    display.textContent = currentInput;
                    resultDisplayed = true;
                } catch (error) {
                    display.textContent = 'Error';
                    currentInput = '';
                    resultDisplayed = false;
                }
            } else if (value === 'C') {
                currentInput = '';
                display.textContent = '0';
            } else if (value === '⌫') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else {
                if (resultDisplayed) {
                    currentInput = value;
                    resultDisplayed = false;
                } else {
                    currentInput += value;
                }
                display.textContent = currentInput;
            }
        });
    });

    function calculateResult(input) {
        input = input.replace(/sin/g, 'Math.sin')
                     .replace(/cos/g, 'Math.cos')
                     .replace(/tan/g, 'Math.tan')
                     .replace(/π/g, 'Math.PI')
                     .replace(/e/g, 'Math.E')
                     .replace(/Ln/g, 'Math.log')
                     .replace(/log/g, 'Math.log10')
                     .replace(/sqrt/g, 'Math.sqrt')
                     .replace(/1\/x/g, '1/')
                     .replace(/\^/g, '**')
                     .replace(/Deg/g, 'toDegrees')
                     .replace(/10\^/g, '10**');
                     
        input = input.replace(/(\d+)!/g, (match, p1) => factorial(parseInt(p1)));

        return eval(input);
    }

    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }

    function toDegrees(radians) {
        return radians * (180 / Math.PI);
    }
});
