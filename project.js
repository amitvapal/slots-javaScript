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

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    const rows = [];

    for(let i =0; i<ROWS; i++){
        rows.push([]);
        for(let j = 0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;

}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length -1){
                rowString += " | ";
            }
        }
        console.log(rowString);

    }
}  
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row =0; row<lines;row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols) {
            if(symbol != symbols[0]){
                allSame = false;
                break;

            }
        }
        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}

const game = () => {
    let balance = deposit();

    while(true){ 
        console.log("Balance: $", balance);   
        const numberOfLines = getNumberOfLines(); 
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won $", winnings);
        if(balance <= 0){
            console.log("You lost all your money. Game over!");
            break;
        }
        const playAgain = prompt("Would you like to play again? (y/n): ");
        if(playAgain != "y"){
            break;
        }
    }
}
game();
