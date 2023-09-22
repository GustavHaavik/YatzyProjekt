const dice = [];
let throwAttempts = 0;

export function getDice() {
    return dice;
}

export function getAttempts() {
    return throwAttempts;
}

export function resetThrowCounts() {
    throwAttempts = 0;
}

export function rollDice(holding) {
    if (throwAttempts === 3) {
        alert('You have no more turns left!');
        return;
    }

    for (let i = 0; i < 5; i++) {
        if (!holding[i]) {
            dice[i] = Math.floor(Math.random() * 6) + 1;
        }
    }

    throwAttempts++;
}

export function getResults() {
    const results = [];
    for (let i = 0; i < 6; i++) {
        results[i] = sameValuePoints(i + 1);
    }
    results[6] = onePairPoints();
    results[7] = twoPairPoints();
    results[8] = threeOfAKindPoints();
    results[9] = fourOfAKindPoints();
    results[10] = smallStraightPoints();
    results[11] = largeStraightPoints();
    results[12] = fullHousePoints();
    results[13] = chancePoints();
    results[14] = yatzyPoints();

    return results;
}

export function getSum() {
    const results = getResults();
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        sum += results[i];
    }
    return sum;
}

export function getBonus() {
    const sum = getSum();
    if (sum >= 63) {
        return 50;
    }
    return 0;
}

export function getTotal() {
    const sum = getSum();
    const bonus = getBonus();
    const results = getResults();
    let total = sum + bonus;
    for (let i = 6; i < results.length; i++) {
        total += results[i];
    }
    return total;
}


function sameValuePoints(value) {
    const counts = calculateCounts();
    return counts[value - 1] * value;
}

function calculateCounts() {
    const counts = [0, 0, 0, 0, 0, 0];
    for (let value of dice) {
        counts[value - 1]++;
    }

    return counts;
}


function getPairs() {
    const counts = calculateCounts();
    const pairs = [];
    for (let i = 1; i < counts.length; i++) {
        if (counts[i] >= 2) {
            pairs.push(i + 1);
        }
    }

    return pairs;
}


function onePairPoints() {
    const pairs = getPairs();
    const size = pairs.length;
    if (size < 1) {
        return 0;
    }
    return pairs[size - 1] * 2;
}


function twoPairPoints() {
    const pairs = getPairs();
    const size = pairs.length;
    if (size < 2) {
        return 0;
    }
    return pairs[size - 1] * 2 + pairs[size - 2] * 2;
}

function threeOfAKindPoints() {
    const counts = calculateCounts();
    for (let i = 0; i < counts.length; i++) {
        if (counts[i] >= 3) {
            return (i + 1) * 3;
        }
    }
    return 0;
}

function fourOfAKindPoints() {
    const counts = calculateCounts();
    for (let i = 0; i < counts.length; i++) {
        if (counts[i] >= 4) {
            return (i + 1) * 4;
        }
    }
    return 0;
}


function fullHousePoints() {
    const counts = calculateCounts();
    let pair = false;
    let threeOfAKind = false;
    for (let i = 0; i < counts.length; i++) {
        if (counts[i] === 2) {
            pair = true;
        }
        if (counts[i] === 3) {
            threeOfAKind = true;
        }
    }

    let sum = 0;
    if (pair && threeOfAKind) {
        for(let i = 0; i < counts.length; i++) {
            sum += (i + 1) * counts[i];
        }
    }
    return sum;
}

function isStraight(start, end) {
    const counts = calculateCounts();
    for (let i = start; i < end; i++) {
        if (counts[i] !== 1) {
            return false;
        }
    }
    return true;
}


function smallStraightPoints() {
    if (isStraight(0, 5)) {
        return 15;
    }
    return 0;
}

function largeStraightPoints() {
    if (isStraight(1, 6)) {
        return 20;
    }
    return 0;
}

function chancePoints() {
    return dice.reduce((a, b) => a + b, 0);
}

function yatzyPoints() {
    const counts = calculateCounts();
    let points = 0;
    let yatzy = false;
    for (let i = 0; i < counts.length; i++) {
        if (counts[i] === 5) {
            yatzy = true;
        }
    }
    if (yatzy) {
        points = 50;
    }
    return points;
}