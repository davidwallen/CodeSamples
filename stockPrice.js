//stockPrice
//given an array of values where index 0 is open and index n is close
//calculate the max spread for a trade in the day
//shorts not allowed

function maxSpread(prices) {
    var max = 0;

    for (var i = prices.length - 1; i > 0; i--) {
        var sellPrice = prices[i];
        for (var j = 0; j < i; j++) {
            var buyPrice = prices[j],
                potentialSpread = sellPrice - buyPrice;

            if (potentialSpread > max) {
                max = potentialSpread;
            }
        }

    }
    return max;
}


function greedyMaxSpread(prices) {
    if (prices.lenght < 2) {
        throw new Error("at least two prices required...");
    }

    var lowPrice = prices[0],
        maxSpread = prices[1] - lowPrice;

    for (var i = 1, len = prices.length; i < len; i++) {
        maxSpread = Math.max(maxSpread, prices[i] - lowPrice);
        lowPrice = Math.min(prices[i], lowPrice);
    }
    return maxSpread;
}



function assert(f, a, r) {
    var res = f(a);
    if (r !== res) {
        console.log("assert failed for arg " + a + " result was " + res);
    }
}



console.time('maxSpread');
for (var i = 0; i < 100000; i++) {
    assert(maxSpread, [0, 10, 8, 19, 72, 12], 72);
    assert(maxSpread, [0, 0, 0, 1], 1);
    assert(maxSpread, [10, 7, 5, 8, 11, 9], 6);
    assert(maxSpread, [0, 1, 2, 3, 4, 5], 5);
}
console.timeEnd('maxSpread');

console.time('greedyMaxSpread');
for (var i = 0; i < 100000; i++) {
    assert(greedyMaxSpread, [0, 1, 2, 3, 4, 5], 5);
    assert(greedyMaxSpread, [0, 10, 8, 19, 72, 12], 72);
    assert(greedyMaxSpread, [0, 0, 0, 1], 1);
    assert(greedyMaxSpread, [10, 7, 5, 8, 11, 9], 6);
}
console.timeEnd('greedyMaxSpread');

process.exit();
