import * as yatzy from './model/game.js';

const diceImages = document.querySelectorAll('.dice');
const rollDiceButton = document.getElementById('rollDice');
const turnsDisplay = document.getElementById('turns');
const scoreElements = document.querySelectorAll('.score');

function roll() {
    // Get the holdings (dice that are held)
    const holdings = getHoldings();
    yatzy.rollDice(holdings);
    updatePoints();

    const attempts = yatzy.getAttempts();

    // Get the dice values
    const diceValues = yatzy.getDice();

    // Update the dice images with the new values
    for (let i = 0; i < diceImages.length; i++) {
        diceImages[i].src = `images/${diceValues[i]}.png`;
    }

    // Update the turns count
    turnsDisplay.textContent = attempts;
}

function updateScore() {
    const sum = document.getElementById('sum');
    const bonus = document.getElementById('bonus');
    const total = document.getElementById('total');

    const sumPoints = yatzy.getSum();
    const bonusPoints = yatzy.getBonus();
    const totalPoints = yatzy.getTotal();

    sum.textContent = sumPoints;
    bonus.textContent = bonusPoints;
    total.textContent = totalPoints;
}

function getHoldings() {
    const holdings = [];
    for (let i = 0; i < diceImages.length; i++) {
        holdings[i] = diceImages[i].classList.contains('hold');
    }
    return holdings;
}

function updatePoints() {
    const results = yatzy.getResults();
    for (let i = 0; i < scoreElements.length; i++) {
        if(scoreElements[i].classList.contains('locked')) {
            continue;
        }

        const result = scoreElements[i].querySelectorAll('.result');
        result[0].textContent = results[i];
    }
}

// Add a click event listener to each result element
scoreElements.forEach((resultElement) => {
    resultElement.addEventListener('click', () => {
        if(resultElement.id === 'sum' || resultElement.id === 'bonus' || resultElement.id === 'total') {
            return;
        }
        
        if(resultElement.classList.contains('locked')) {
            return;
        }

        resultElement.classList.add('locked');
        

        updateScore();
        // Resets the throw count
        yatzy.resetThrowCounts();
    });
});


// Event listener for rolling the dice
rollDiceButton.addEventListener('click', roll);

// Event listener for holding a die
diceImages.forEach((diceImage) => {
    diceImage.addEventListener('click', () => {
        diceImage.classList.toggle('hold');
        console.log(diceImage);
    });
});