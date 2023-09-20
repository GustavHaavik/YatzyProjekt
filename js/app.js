import { getThrowLeft, rollDice } from './game.js';


const diceImages = document.querySelectorAll('.dice');
const rollDiceButton = document.getElementById('rollDice');
const turnsDisplay = document.getElementById('turns');
const scoreElements = document.querySelectorAll('.score');

function rollDice() {
    console.log('Rolling dice');
    const turns = getThrowLeft();
    if (turns === 0) {
        alert('You have no more turns left!');
        return;
    }

    // Get the holdings (dice that are held)
    const holdings = getHoldings();
    rollDice(holdings);

    // Get the dice values
    const diceValues = game.getDice();

    // Update the dice images with the new values
    for (let i = 0; i < diceImages.length; i++) {
        diceImages[i].src = `images/${diceValues[i]}.png`;
    }

    // Update the turns count
    turnsDisplay.textContent = turns;
}

function getHoldings() {
    const holdings = [];
    for (let i = 0; i < diceImages.length; i++) {
        holdings[i] = diceImages[i].classList.contains('hold');
    }
    return holdings;
}


// Add a click event listener to each result element
scoreElements.forEach((resultElement) => {
    resultElement.addEventListener('click', () => {
        alert(`You clicked on ${resultElement.textContent}`);
        // TODO: Add code to update the score
        // TODO: Lock the result element
        // TODO: Update Sum, Bonus and Total
        // TODO: Reset throws
    });
});


// Event listener for rolling the dice
rollDiceButton.addEventListener('click', rollDice);

// Event listener for holding a die
diceImages.forEach((diceImage) => {
    diceImage.addEventListener('click', () => {
        diceImage.classList.toggle('hold');
        console.log(diceImage);
    });
});