/* 

permGen

*/

function permGen(s) {
    //for a given a
    //return all permutations of a
    var len = s.length;
    if (len <= 1) {
        return new Set(s);
    }

    var leftS = s.slice(0, -1);
    var lastChar = s[--len];

    // recursive call: get all possible permutations for all chars except last
    var part = permGen(leftS);

    // put the last char in all possible positions for each of the above permutations
    var result = new Set();
    part.forEach(function(sub) {
        for (var i = 0; i <= len; i++) {
            var perm = sub.slice(0, i) + lastChar + sub.slice(i);
            result.add(perm);
        }
    });
    return result;
}

console.log(permGen('David Allen'));

process.exit();
