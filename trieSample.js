/*

Trie storage samples.

Read content from a given URL and then index all the words that appear there.


*/
function WordDictionary() {
    this.dictionary = {};

    WordDictionary.prototype.addWord = function(word) {

        if (!this.dictionary.hasOwnProperty(word)) {
            this.dictionary[word] = 1;
        }
        else {
            this.dictionary[word]++;
        }

        return this.dictionary[word];
    }

    WordDictionary.prototype.addArryOfWord = function(a) {
        var uniqueAdditions = 0;
        for (var i = 0, len = a.length; i < len; i++) {
            if (this.addWord(a[i]) === 1) uniqueAdditions++;
        }

        return uniqueAdditions;
    }
}

function WordTrie() {
    this.rootNode = {};

    WordTrie.prototype.addWord = function(word) {

        //returns the number of times this word has been added

        var currentNode = this.rootNode;
        var isNewWord = false;

        // Work downwards through the trie, adding nodes
        // as needed, and keeping track of whether we add
        // any nodes.
        for (var i = 0; i < word.length; i++) {
            var char = word[i];

            if (!currentNode.hasOwnProperty(char)) {
                isNewWord = true;
                currentNode[char] = {};
            }

            currentNode = currentNode[char];
        }

        // Explicitly mark the end of a word by creating a count node.
        // Otherwise, we might say a word is
        // present if it is a prefix of a different,
        // longer word that was added earlier.
        if (!currentNode.hasOwnProperty("ct")) {
            isNewWord = true;
            currentNode["ct"] = 1;
        }
        else {
            currentNode["ct"]++;
        }

        return currentNode["ct"];
    }

    WordTrie.prototype.addArryOfWord = function(a) {
        var uniqueAdditions = 0;
        for (var i = 0, len = a.length; i < len; i++) {
            if (this.addWord(a[i]) === 1) uniqueAdditions++;
        }

        return uniqueAdditions;
    }
}

var fs = require('fs'),
    wordArray = (fs.readFileSync('hamletlc.txt').toString()).split(' ');

console.log('wordArray length ' + wordArray.length);

//var wordArray = ['the', 'unfortunate', 'these', 'fortunate', 'the', 'and', 'the', 'horse', 'pig', 'fortune'];
global.gc();
var memStart = process.memoryUsage();
console.time('WordTrie');
var wt = new WordTrie();
console.log('unique additions ' + wt.addArryOfWord(wordArray));
var memEnd = process.memoryUsage(),
    memUsed = {
        rss: memEnd.rss - memStart.rss,
        heapUsed: memEnd.heapUsed - memStart.heapUsed
    };
console.log({
    memUsed
});
console.timeEnd('WordTrie');

global.gc();
var memStart = process.memoryUsage();
console.time('WordDictionary');
var wd = new WordDictionary();
console.log('unique additions ' + wd.addArryOfWord(wordArray));
var memEnd = process.memoryUsage(),
    memUsed = {
        rss: memEnd.rss - memStart.rss,
        heapUsed: memEnd.heapUsed - memStart.heapUsed
    };
console.log({
    memUsed
});
console.timeEnd('WordDictionary');

process.exit();
