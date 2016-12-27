/*
Write a function to find the 2nd largest element in a binary search tree ↴ .

*/

function getSecondLargestValue(node) {
    if (!node.left && !node.right) {
        throw new Error('2 nodes required');
    }

    function scanRight(rNode) {
        while (rNode) {
            if (!rNode.right) return rNode;
            rNode = rNode.right;
        }
    }

    function isLeaf(node) {
        return (!(node.right || node.left));
    }

    while (node) {
        // when we have no right node we need to get 
        // next largest from scanning right on the left node
        if (node.left && !node.right) {
            return scanRight(node.left).value;
        }

        // when we have a right that is a leaf node then current
        // node value is the second largest (behind that right leaf)
        if (node.right && isLeaf(node.right)) {
            return node.value;
        }

        node = node.right;
    }
}


var myValidTree = {
        value: 50,
        left: {
            value: 28,
            left: {
                value: 12,
                left: {
                    value: 6
                },
                right: {
                    value: 18,
                    left: {
                        value: 15
                    },
                    right: {
                        value: 21
                    }
                }
            },
            right: {
                value: 37,
                left: {
                    value: 36
                },
                right: {
                    value: 43,
                    left: {
                        value: 40
                    },
                    right: {
                        value: 46
                    }
                }
            }
        },
        right: {
            value: 75,
            left: {
                value: 62,
                left: {
                    value: 56
                },
                right: {
                    value: 81,
                    left: {
                        value: 78
                    },
                    right: {
                        value: 84
                    }
                }
            },
            right: {
                value: 87,
                left: {
                    value: 85
                },
                right: {
                    value: 93,
                    left: {
                        value: 90
                    },
                    right: {
                        value: 96
                    }
                }
            }
        }
    },
    myCrookedTree = {
        value: 50,
        left: {
            value: 28,
            left: {
                value: 12,
                left: {
                    value: 6
                },
                right: {
                    value: 18,
                    left: {
                        value: 15
                    },
                    right: {
                        value: 21
                    }
                }
            },
            right: {
                value: 37,
                left: {
                    value: 36
                }
            }
        }
    },
    myLeftTree = {
        value: 50,
        left: {
            value: 28,
            left: {
                value: 12,
                left: {
                    value: 6
                }
            }
        }
    }


function assert(f, a, r, l) {
    var res = f(a);
    if (r !== res) {
        console.log("assert failed for " + l + ' expected ' + r + ' got ' + res);
    }
}

assert(getSecondLargestValue, myValidTree, 93, 'myValidTree');
assert(getSecondLargestValue, myCrookedTree, 37, 'myCrookedTree');
assert(getSecondLargestValue, myLeftTree, 28, 'myLeftTree');

process.exit();
