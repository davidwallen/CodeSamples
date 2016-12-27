/*Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of integers and returns an array of the products.

For example, given:

  [1, 7, 3, 4]

your function would return:

  [84, 12, 28, 21]

by calculating:

  [7*3*4, 1*3*4, 1*7*4, 1*7*3]

Do not use division in your solution.*/

function getProductsOfAllIntsExceptAtIndex(ints) {
  var results = [];

  //nested loops
  for (var i = 0, len = ints.length; i < len; i++) {
    var prod = 1;
    for (var j = 0; j < len; j++) {
      if (i != j) {
        prod = prod * ints[j];
      }
    }
    results.push(prod);
  }
  return results;
}

function getProductsOfAllIntsExceptAtIndexGreedy(ints) {
  var results = [];

  //single loop to calc values before index i
  var prod = 1;
  for (var i = 0, len = ints.length; i < len; i++) {
    results[i] = prod;
    prod *= ints[i];
  }

  //single loop to calc values after index i
  prod = 1;
  for (var i = ints.length-1; i >= 0; i--) {
    results[i] *= prod;
    prod *= ints[i];
  }

  return results;
}

function assert(f, a, r) {
    var res = f(a);
    if (r !== res) {
        console.log("assert failed for arg " + a + " result was " + res);
    }
}

console.log("brute "+  getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4]));
console.log("greedy "+  getProductsOfAllIntsExceptAtIndexGreedy([1, 7, 3, 4]));

var iterations=1000000;

console.time('brute');
for (var i = 0; i < iterations; i++) {
  getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4]);
}
console.timeEnd('brute');

console.time('greedy');
for (var i = 0; i < iterations; i++) {
  getProductsOfAllIntsExceptAtIndexGreedy([1, 7, 3, 4]);
}
console.timeEnd('greedy');

process.exit();
