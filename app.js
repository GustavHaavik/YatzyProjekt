import * as yatzy from './model/game.js';

// DOM elements
const diceImages = document.querySelectorAll('.dice');
const rollDiceButton = document.getElementById('rollDice');
const turnsDisplay = document.getElementById('turns');
const scoreElements = document.querySelectorAll('.score');
const sum = document.getElementById('sum');
const bonus = document.getElementById('bonus');
const total = document.getElementById('total');

// Event listeners
rollDiceButton.addEventListener('click', roll);
diceImages.forEach((diceImage) => {
    diceImage.addEventListener('click', toggleHold);
});

scoreElements.forEach((resultElement) => {
    resultElement.addEventListener('click', () => {
        if (!isScorable(resultElement)) return;

        lockScore(resultElement);
        const scoreValue = parseInt(resultElement.querySelector('.result').textContent);
        yatzy.pushResult(scoreValue);

        updateScore();
        newTurn();
    });
});

// Functions
function roll() {
    const holdings = getHoldings();
    yatzy.rollDice(holdings);

    const diceValues = yatzy.getDice();
    updateDiceImages(diceValues);

    const attempts = yatzy.getAttempts();
    turnsDisplay.textContent = attempts;

    updateValues();
}

function updateValues() {
    const results = yatzy.getResults();
    scoreElements.forEach((resultElement, index) => {
        if (!resultElement.classList.contains('locked')) {
            resultElement.querySelector('.result').textContent = results[index];
        }
    });
}

function updateDiceImages(diceValues) {
    for (let i = 0; i < diceImages.length; i++) {
        diceImages[i].src = `images/${diceValues[i]}.png`;
    }
}

function getHoldings() {
    const holdings = [];
    diceImages.forEach((diceImage) => {
        holdings.push(diceImage.classList.contains('hold'));
    });
    return holdings;
}

function updateScore() {
    const sumPoints = yatzy.getSum();
    const bonusPoints = yatzy.getBonus();
    const totalPoints = yatzy.getTotal();

    sum.textContent = sumPoints;
    bonus.textContent = bonusPoints;
    total.textContent = totalPoints;
}

function newTurn() {
    yatzy.resetThrowCounts();
    const attempts = yatzy.getAttempts();
    turnsDisplay.textContent = attempts;

    diceImages.forEach((diceImage) => {
        diceImage.classList.remove('hold');
    });

    scoreElements.forEach((resultElement) => {
        if (!resultElement.classList.contains('locked')) {
            resultElement.querySelector('.result').textContent = '0';
        }
    });
}

function toggleHold(event) {
    event.currentTarget.classList.toggle('hold');
}

function isScorable(resultElement) {
    return !resultElement.classList.contains('locked') &&
        !['sum', 'bonus', 'total'].includes(resultElement.id) && yatzy.getAttempts() > 0;
}

function lockScore(resultElement) {
    resultElement.classList.add('locked');
}