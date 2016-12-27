/*
Write a function to check that a binary tree ↴ is a valid binary search tree

A binary search tree is a binary tree in which, for each node:

The node's value is greater than all values in the left subtree.
The node's value is less than all values in the right subtree.
BSTs are useful for quick lookups. If the tree is balanced, we can search for a given value in the tree in O(\lg{n})O(lgn) time.

*/


function isValidBST(bTree) {

    var nodes = [{
        node: bTree,
        lower: -Infinity,
        upper: Infinity,
        desc: "root"
    }];

    while (nodes.length) {

        //note breadth first by taking the top element
        var cNode = nodes.pop(),
            node = cNode.node,
            lower = cNode.lower,
            upper = cNode.upper;

        if (node.value < lower || node.value > upper) {
            console.log({
                cNode
            });
            return false;

        }

        if (node.right) {
            nodes.push({
                node: node.right,
                lower: node.value,
                upper: upper,
                desc: 'right'
            });
        }

        if (node.left) {
            nodes.push({
                node: node.left,
                lower: lower,
                upper: node.value,
                desc: 'left'
            });
        }
    }

    return true;
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
                    value: 72,
                    left: {
                        value: 71
                    },
                    right: {
                        value: 73
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
    myInvalidTree = {
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
                        value: 51
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
    }

console.log(isValidBST(myValidTree));
console.log(isValidBST(myInvalidTree));

process.exit();
