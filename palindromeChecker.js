//walk through the string we want to have an even number of characters
//allowing for one or none odd

function palindromeChecker(input) {

    var dictionary = {};

    for (var i = 0, len = input.length; i < len; i++) {
        var char = input[i];
        if (!dictionary[char]) {
            dictionary[char] = true;
        }
        else {
            dictionary[char] = !dictionary[char];
        }
    }
    
    //now walk the dictionary and ensure we have one or no odds (represented as a dictionary key value of true)
    var oddCount=0;
   for (var char in dictionary) {
        if (dictionary.hasOwnProperty(char)) {
           oddCount+=dictionary[char];
           if(oddCount>1) return false;
        }
    }
    return true;

}

function assert(f, a, r) {
    var res = f(a);
    if (r !== res) {
        console.log("assert failed for arg " + a);
    }
}


assert(palindromeChecker,"civic",true);
assert(palindromeChecker,"poop",true);
assert(palindromeChecker,"civil",false);
assert(palindromeChecker,"ii",true);
assert(palindromeChecker,"ci",false);
assert(palindromeChecker,"c",true);
process.exit();