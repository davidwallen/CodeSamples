/*
Write a function fib() that a takes an integer nn and returns the nnth fibonacci
number.

In mathematics, the Fibonacci numbers are the numbers in the following integer 
sequence, called the Fibonacci sequence, and characterized by the fact that 
every number after the first two is the sum of the two preceding ones:

{1,1,2,3,5,8,13,21,34,55,89,144,} 1,1,2,3,5,8,13,21,34,55,89,144,
Often, especially in modern usage, the sequence is extended by one more initial 
term:

{0,1,1,2,3,5,8,13,21,34,55,89,144,} 0,1,1,2,3,5,8,13,21,34,55,89,144,.

The Fibonacci spiral: an approximation of the golden spiral created by drawing 
circular arcs connecting the opposite corners of squares in the Fibonacci 
tiling; this one uses squares of sizes 1, 1, 2, 3, 5, 8, 13, 21, and 34.
By definition, the first two numbers in the Fibonacci sequence are either 1 and 
1, or 0 and 1, depending on the chosen starting point of the sequence, and each 
subsequent number is the sum of the previous two.

In mathematical terms, the sequence Fn of Fibonacci numbers is defined by the 
recurrence relation

{F_{n}=F_{n-1}+F_{n-2},} {F_{n}=F_{n-1}+F_{n-2},}
with seed values

{ F_{1}=1,F_{2}=1} {F_{1}=1,F_{2}=1}
or

{F_{0}=0,F_{1}=1.} {F_{0}=0,F_{1}=1.}

*/

function fib(n) {

    var series = {
        '0': 0,
        '1': 1
    };

    var prevPrev = 0; // 0th fibonacci
    var prev = 1; // 1st fibonacci
    var current; // Declare current

    for (var x = 1; x < n; x++) {
        current = prev + prevPrev;
        prevPrev = prev;
        prev = current;
        series[x] = current;
    }

    return series;
}

console.log(fib(150));

process.exit();
