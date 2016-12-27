/*
You've built an in-flight entertainment system with on-demand movie streaming.
Users on longer flights like to start a second movie right when their first one 
ends, but they complain that the plane usually lands before they can see the 
ending. So you're building a feature for choosing two movies whose total 
runtimes will equal the exact flight length.

Write a function that takes an integer flightLength (in minutes) and an array of 
integers movieLengths (in minutes) and returns a boolean indicating whether 
there are two numbers in movieLengths whose sum equals flightLength.

When building your function:

Assume your users will watch exactly two movies
Don't make your users watch the same movie twice
Optimize for runtime over memory
Gotchas
We can do this in O(n)O(n) time, where nn is the length of movieLengths.

Remember: your users shouldn't watch the same movie twice. Are you sure your 
method won’t give a false positive if the array has one element that is half 
flightLength?

strategy: create a set of movieObjects seen recorded by length
loop through movies adding them to set and looking to see if the set
contains a movie that would add up to flight length

two solutions on the set implementation - use Javascript native or use an object
where key is the identity of the set item(s). The add operation will be more
expensive with the dictionary approach but will provide greater flexibility -
will compare both.

*/

function getMoviesForTimeDict(movies, time) {
    var movieTimeDict = {};

    for (var i = 0, len = movies.length; i < len; i++) {
        var remainingTime = time - movies[i].length;
        if (movieTimeDict.hasOwnProperty(remainingTime)) {
            return ({
                firstMovie: movies[i],
                secondMovieOptions: movieTimeDict[remainingTime]
            });
        }
        else {
            if (!movieTimeDict[movies[i].length]) {
                movieTimeDict[movies[i].length] = [];
            }
            movieTimeDict[movies[i].length].push(movies[i]);
        }
    }
}

function canTwoMoviesFillTime(movies, time) {

    // movie lengths we've seen so far
    var movieTimeSet = new Set();

    for (var i = 0; i < movies.length; i++) {
        var timeRemaining = time - movies[i].length;
        if (movieTimeSet.has(timeRemaining)) {
            return true;
        }
        movieTimeSet.add(movies[i].length);
    }
    return false;
}

var movies = [{
    title: "Man from LaMancha",
    playingTime: 213
}, {
    title: "A Short Story",
    playingTime: 60
}, {
    title: "A Second Medium Story",
    playingTime: 90
}, {
    title: "A Medium Story",
    playingTime: 90
}, {
    title: "An Episode",
    playingTime: 30
}, {
    title: "Another Episode",
    playingTime: 30
}];

var fs = require('fs'),
    movies = JSON.parse(fs.readFileSync('movies.json').toString());

console.time('Dict');
console.log(getMoviesForTimeDict(movies, 120));
console.timeEnd('Dict');
console.time('Set');
console.log(canTwoMoviesFillTime(movies, 120));
console.timeEnd('Set');

process.exit();
