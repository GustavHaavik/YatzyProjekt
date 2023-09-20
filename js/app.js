const diceImages = document.querySelectorAll('.dice');
const rollDiceButton = document.getElementById('rollDice');
const turnsDisplay = document.getElementById('turns');
const scoreElements = document.querySelectorAll('.score');

// Function to roll the dice (you can customize this)
function rollDice() {
    // Generate random numbers (1 to 6) for each die
    const diceValues = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);

    // Update the dice images with the new values (you'll need to have images for each face)
    for (let i = 0; i < diceImages.length; i++) {
        diceImages[i].src = `images/${diceValues[i]}.png`;
    }

    // Update the turns count (customize as needed)
    const turns = parseInt(turnsDisplay.textContent);
    turnsDisplay.textContent = turns + 1;
}

// Get all elements with the "result" class

// Add a click event listener to each result element
scoreElements.forEach((resultElement) => {
    resultElement.addEventListener('click', () => {
        // Handle the click event here
        // You can implement your own logic when a result is clicked
        // For example, you can open a modal or perform some other action
        alert(`You clicked on ${resultElement.textContent}`);
    });
});


// Event listener for rolling the dice
rollDiceButton.addEventListener('click', rollDice);