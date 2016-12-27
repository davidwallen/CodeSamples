var util = require('util'),
    group = {
        '{': {
            direction: 'open',
            type: 'brace'
        },
        '(': {
            direction: 'open',
            type: 'paren'
        },
        '[': {
            direction: 'open',
            type: 'bracket'
        },
        '}': {
            direction: 'close',
            type: 'brace'
        },
        ')': {
            direction: 'close',
            type: 'paren'
        },
        ']': {
            direction: 'close',
            type: 'bracket'
        }
    };

function checkNesting(arg) {

    var stack = [],
        result = true;

    for (var i = 0, len = arg.length; i < len && result; i++) {
        if (group[arg[i]]) {
            if (group[arg[i]].direction === 'close') {
                //we expect peek to result in the same type - if not return a false
                if (stack.length == 0 || group[arg[i]].type !== group[stack[stack.length - 1]].type) {
                    result = false;
                }
                else if (group[arg[i]].type === group[stack[stack.length - 1]].type) {
                    stack.pop();
                }
            }
            else {
                stack.push(arg[i]);
            }
        }
    }
    //the stack should be empty if not fail
    if (result && stack.length > 0) result = false;
    return result;
}

function assert(f, a, r) {
    var res = f(a);
    if (r !== res) {
        console.log("assert failed for arg " + a);
    }
}

// run your function through some test cases here
// remember: debugging is half the battle!

//assert(checkNesting, "{foo}", true);
assert(checkNesting, "{foo[}", false);
assert(checkNesting, "bar)", false);
assert(checkNesting, "(", false);
assert(checkNesting, ")", false);
assert(checkNesting, "[)", false);
assert(checkNesting,"function assert(f, a, r) {\r\n    var res = f(a);\r\n    if (r !== res) {\r\n        console.log(\"assert failed for arg \" + a);\r\n    }\r\n}\r\n",true);
process.exit();
