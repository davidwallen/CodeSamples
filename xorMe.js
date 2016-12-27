/*

which twin in a matched set is missing ?

*/


function findMissingTwin(doubles) {

  var missingElement = 0;

  doubles.forEach(function(single) {
    missingElement ^= single;
  });

  return missingElement;
}


var array = [],
  numSingles = 1000000;

for (var i = 0; i < numSingles; i++) {
  array.push(i + 1);
  array.push(i + 1);
}

array.sort(function(a, b) {
  return Math.random() * 2 - 1;
});

var expected = array[array.length - 1];
array = array.slice(0, array.length - 1);

console.time('xor');
var actual = findMissingTwin(array);
console.timeEnd('xor');

console.log({
  expected,
  actual
});

process.exit();
