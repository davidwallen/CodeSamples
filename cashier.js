/*
Imagine you landed a new job as a cashier...
Your quirky boss found out that you're a programmer and has a weird request about something they've been wondering for a long time.

Write a function that, given:

an amount of money
an array of coin denominations
computes the number of ways to make amount of money with coins of the available denominations.

Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 4—the number of ways to make 44¢ with those denominations:

1¢, 1¢, 1¢, 1¢
1¢, 1¢, 2¢
1¢, 3¢
2¢, 2¢
Gotchas
What if there's no way to make the amount with the denominations? Does your function have reasonable behavior?
*/


function getPossibilitiesForRecursive(amountLeft, denominations, currentIndex) {
    currentIndex = currentIndex || 0;

    if (amountLeft === 0) {
        return 1;
    }
    if (amountLeft < 0 || currentIndex === denominations.length) {
        return 0;
    }

    var numPossibilities = 0;
    // choose a current coin
    var currentCoin = denominations[currentIndex];

    while (amountLeft >= 0) {
        numPossibilities += getPossibilitiesForRecursive(amountLeft, denominations, currentIndex + 1);
        amountLeft -= currentCoin;
    }

    return numPossibilities;
}

var cache = {};

function getPossibilitiesForAmountCache(amountLeft, denominations, currentIndex) {
    currentIndex = currentIndex || 0;

    if (cache[amountLeft + '-' + currentIndex]) {
        return cache[amountLeft + '-' + currentIndex];
    }

    if (amountLeft === 0) {
        //cache[amountLeft + '-' + currentIndex] = 1;
        return 1;
    }
    if (amountLeft < 0 || currentIndex === denominations.length) {
        //cache[amountLeft + '-' + currentIndex] = 0;
        return 0;
    }

    var numPossibilities = 0;
    // choose a current coin
    var currentCoin = denominations[currentIndex];

    while (amountLeft >= 0) {
        numPossibilities += getPossibilitiesForAmountCache(amountLeft, denominations, currentIndex + 1);
        amountLeft -= currentCoin;
    }
    cache[amountLeft + '-' + currentIndex] = numPossibilities;
    return numPossibilities;
}

function getPossibilitiesForAmountBottomUp(amount, denominations) {

    // intialize an array of zeros with indices up to amount
    var waysOfDoingNcents = [];
    for (var i = 0; i <= amount; i++) {
        waysOfDoingNcents[i] = 0;
    }
    waysOfDoingNcents[0] = 1;

    for (var j = 0; j < denominations.length; j++) {
        var coin = denominations[j];
        for (var higherAmount = coin; higherAmount <= amount; higherAmount++) {
            var higherAmountRemainder = higherAmount - coin;
            waysOfDoingNcents[higherAmount] += waysOfDoingNcents[higherAmountRemainder];
        }
    }
    return waysOfDoingNcents[amount];
}

var denominations = [5, 6, 7, 8, 9, 10],
    amount = 100;

console.time('recursive');
console.log({
    amount,
    denominations,
    possibilities: getPossibilitiesForRecursive(amount, denominations)
});
console.timeEnd('recursive');

console.time('cache');
console.log({
    amount,
    denominations,
    possibilities: getPossibilitiesForAmountCache(amount, denominations)
});
console.timeEnd('cache');

console.time('bottomup');
console.log({
    amount,
    denominations,
    possibilities: getPossibilitiesForAmountBottomUp(amount, denominations)
});
console.timeEnd('bottomup');

process.exit();
