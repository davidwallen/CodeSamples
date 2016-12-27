/*Given an arrayOfInts, find the highestProduct you can get from three of the integers.
The input arrayOfInts will always have at least three integers.

Gotchas
Does your function work with negative numbers? If arrayOfInts is [−10,−10,1,3,2] we should return 300

300 (which we get by taking -10 * -10 * 3−10∗−10∗3).
*/

function highestProductBrute(arrayOfInts) {
    if (arrayOfInts.length < 3) {
        throw new Error("array has to be at least 3 items");
    }
    //lets doe a brute force permutation for all three int possibilities

    var maxProd = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];

    for (var i = 0, len = arrayOfInts.length; i < len; i++) {
        for (var j = 0; j < len; j++) {
            for (var k = 0; k < len; k++) {
                if (i != j && i != k && j != k) {
                    var curProd = arrayOfInts[i] * arrayOfInts[j] * arrayOfInts[k];
                    if (curProd > maxProd) {
                        //console.log([arrayOfInts[i] , arrayOfInts[j] , arrayOfInts[k]]);
                        maxProd = curProd;
                    }
                }
            }
        }
    }
    return maxProd;
}


function highestProductGreedy(arrayOfInts) {
    //keep a highest int
    //lowest int
    //highest product of two
    //lowest product of two
    //and highest product of three
    //as we loop update these vars
    //at the end we have our product


    if (arrayOfInts.length < 3) {
        throw new Error("array has to be at least 3 items");
    }
    else if (arrayOfInts.length === 3) {
        return arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];
    }

    var highest = Math.max(arrayOfInts[0], arrayOfInts[1]),
        lowest = Math.min(arrayOfInts[0], arrayOfInts[1]),
        highestProductOf2 = arrayOfInts[0] * arrayOfInts[1],
        lowestProductOf2 = arrayOfInts[0] * arrayOfInts[1],
        highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];
    for (var i = 2; i < arrayOfInts.length; i++) {
        var current = arrayOfInts[i];
        highestProductOf3 = Math.max(highestProductOf3, current * highestProductOf2, current * lowestProductOf2);
        highestProductOf2 = Math.max(highestProductOf2, current * highest, current * lowest);
        lowestProductOf2 = Math.min(lowestProductOf2, current * highest, current * lowest);
        highest = Math.max(highest, current);
        lowest = Math.min(lowest, current);
    }

    return highestProductOf3;
}

function highestProductSuperGreedy(arrayOfInts) {
    //can we do this in a single pass?
    //scan for 3 max and 2 min
    //then create products for those
    if (arrayOfInts.length < 3) {
        throw new Error("array has to be at least 3 items");
    }
    else if (arrayOfInts.length === 3) {
        return arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];
    }

    var max1, max2, max3, min1, min2;
    for (var i = 0, len = arrayOfInts.length; i < len; i++) {
        var val = arrayOfInts[i];
        if (typeof max1 === 'undefined' || val > max1) {
            max3 = max2;
            max2 = max1;
            max1 = val;
        }
        else if (typeof max2 === 'undefined' || val > max2) {
            max3 = max2;
            max2 = val;
        }
        else if (typeof max3 === 'undefined' || val > max3) {
            max3 = val;
        }
        if (val <= 0) {
            if (typeof min1 === 'undefined' || val < min1) {
                min2 = min1;
                min1 = val;
            }
            else if (typeof min2 === 'undefined' || val < min2) {
                min2 = val;
            }
        }
    }

    function multiplyAndCompare(t1, t2, t3, previousMax) {
        if (typeof t1 === 'undefined' || typeof t3 === 'undefined' || typeof t3 === 'undefined') return previousMax;
        var c = t1 * t2 * t3;
        if (typeof previousMax === 'undefined' || isNaN(previousMax) || c > previousMax) return c;
        return previousMax;
    }
    
    var maxProd;
    maxProd = multiplyAndCompare(max1, max2, max3, maxProd);
    maxProd = multiplyAndCompare(max1, max2, min1, maxProd);
    maxProd = multiplyAndCompare(max1, min1, min2, maxProd);

    return maxProd;
}

function assert(f, a, r) {
    var res = f(a);
    if (r !== res) {
        console.log("assert failed for arg " + a + " result was " + res);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var elements = 70000,
    args = [],
    resSuperGreedy, resGreedy, resBrute;

for (var i = 0; i < elements; i++) {
    args.push(getRandomInt(-10000000, 10000000));
}

console.time('greedy');
console.log(highestProductGreedy(args));
console.timeEnd('greedy');

console.time('resSuperGreedy');
console.log(highestProductSuperGreedy(args));
console.timeEnd('resSuperGreedy');

console.time('brute');
console.log(highestProductBrute(args));
console.timeEnd('brute');

process.exit();