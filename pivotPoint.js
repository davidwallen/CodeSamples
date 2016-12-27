/*
I want to learn some big words so people think I'm smart.
I opened up a dictionary to a page in the middle and started flipping through, looking for words I didn't know. 
I put each word I didn't know at increasing indices in a huge array I created in memory. When I reached the 
end of the dictionary, I started from the beginning and did the same thing until I reached the page I started 
at.

Now I have an array of words that are mostly alphabetical, except they start somewhere in the middle of the 
alphabet, reach the end, and then start from the beginning of the alphabet. In other words, this is an 
alphabetically ordered array that has been "rotated."

*/


function findPivotPoint(a) {
    var start = 0,
        end = a.length - 1;

    while (start < end) {

        // guess a point halfway between floor and ceiling
        var i = Math.floor(start + ((end - start) / 2));

        if (a[i] > a[0]) {
            // shift range down
            start = i;
        }
        else {
            // shift range up
            end = i;
        }

        //if we have converged then we are done
        if (start + 1 === end) {
            break;
        }
    }

    return end;

}


var words = [
    'ptolemaic',
    'retrograde',
    'supplant',
    'undulate',
    'xenoepist',
    'asymptote', // <-- rotates here!
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage',
];

console.log(findPivotPoint(words));

process.exit();
