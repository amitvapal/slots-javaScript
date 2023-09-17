// 1. Deposit some money
// 2. Determine number of lines to bet on out of 3
// 3. Collect bet amount
// 4. Spin the slot machine
// 5. Determine if user won or lost
// 6. Update the balance through thereir winning
// 7. Repeat steps 1-6 until user quits

const prompt = require('prompt-sync')();


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8,
}

const SYMBOLS_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}





const deposit = () => {
    while (true) {
        const depositAmount = prompt('How much would you like to deposit: ');
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log('Please enter a valid amount');
            
        }  else {
            return numberDepositAmount;
        }
    }
}


const getNumberOfLines = () => {
    while (true) {
        const lines = prompt('How many lines would you like to bet on (1-3): ');
        const numberLines = parseInt(lines);

        if(isNaN(numberLines) || numberLines <= 0 || numberLines > 3) {
            console.log('Please enter a valid number of lines');
            
        }  else {
            return numberLines;
        }
    }
}    


const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt('How much would you like to bet per line: ');
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log('Please enter a valid bet amount');
            
        }  else {
            return numberBet;
        }
    }

}

const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
            
        }
    }
    const reels = [[], [], []];
    for (let i = 0; i < COLS; i++) {
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const index = Math.floor(Math.random() * reelSymbols.length);
            reels[i].push(reelSymbols[index]);
            reelSymbols.splice(index, 1);
        }
    }
}
spin();

let balance = deposit();
const numberOfLines = getNumberOfLines(); 
const bet = getBet(balance, numberOfLines);
