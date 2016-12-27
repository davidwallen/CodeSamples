/*
Write a function to see if a binary tree ↴ is "superbalanced" (a new tree property we just made up).
A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one.
*/

function BinaryTreeNode(value) {
    this.value = value;
    this.left = null;
    this.right = null;


    BinaryTreeNode.prototype.insertLeft = function(value) {
        this.left = new BinaryTreeNode(value);
        return this.left;
    }

    BinaryTreeNode.prototype.insertRight = function(value) {
        this.right = new BinaryTreeNode(value);
        return this.right;
    }
};


function isSuperBalanaced(bTree) {

    var nodes = [{
            node: bTree,
            depth: 0
        }],
        maxD = null,
        minD = null;

    while (nodes.length) {

        //note breadth first by taking the top element
        var cNode = nodes.pop();
        if (!cNode.node.right && !cNode.node.left) {
            //leaf node
            //lets record the distance
            //and figure out how we will very quickly compare the various depths we have
            //we need a max and a min to leafs and that might be sufficient
            if (maxD === null || cNode.depth > maxD) {
                maxD = cNode.depth;
            }
            if (minD === null || cNode.depth < minD) {
                minD = cNode.depth;
            }
            if ((maxD - minD) > 1) {
                return {
                    result: 'not balanced',
                    maximumDepthTraversed: maxD,
                    minimumDepthTraversed: minD
                };
            }
        }
        else {
            if (cNode.node.right) {
                nodes.push({
                    node: cNode.node.right,
                    depth: cNode.depth + 1
                });
            }
            if (cNode.node.left) {
                nodes.push({
                    node: cNode.node.left,
                    depth: cNode.depth + 1
                });
            }
        }
    }

    return {
        result: 'balanced',
        maximumDepthTraversed: maxD,
        minimumDepthTraversed: minD
    };
}


var myBalancedTree = {
        value: "root",
        left: {
            value: "l1",
            left: {
                value: "ll2",
                left: {
                    value: "lll3-leaf"
                },
                right: {
                    value: "llr3",
                    left: {
                        value: "llrl4-leaf"
                    },
                    right: {
                        value: "llrr4-leaf"
                    }
                }
            },
            right: {
                value: "lr2",
                left: {
                    value: "lrl3-leaf"
                },
                right: {
                    value: "lrr3",
                    left: {
                        value: "lrrl4-leaf"
                    },
                    right: {
                        value: "lrrr4-leaf"
                    }
                }
            }
        },
        right: {
            value: "r1",
            left: {
                value: "rl2",
                left: {
                    value: "rll3-leaf"
                },
                right: {
                    value: "rlr3",
                    left: {
                        value: "rlrl4-leaf"
                    },
                    right: {
                        value: "rlrr4-leaf"
                    }
                }
            },
            right: {
                value: "rr2",
                left: {
                    value: "rrl3-leaf"
                },
                right: {
                    value: "rrr3",
                    left: {
                        value: "rrrl4-leaf"
                    },
                    right: {
                        value: "rrrr4-leaf"
                    }
                }
            }
        }
    },
    myUnBalancedTree = {
        value: "root",
        left: {
            value: "l1",
            left: {
                value: "ll2",
                left: {
                    value: "lll3-leaf"
                },
                right: {
                    value: "llr3",
                    left: {
                        value: "llrl4-leaf"
                    },
                    right: {
                        value: "llrr4-leaf"
                    }
                }
            },
            right: {
                value: "lr2",
                left: {
                    value: "lrl3-leaf"
                },
                right: {
                    value: "lrr3",
                    left: {
                        value: "lrrl4-leaf"
                    },
                    right: {
                        value: "lrrr4-leaf"
                    }
                }
            }
        },
        right: {
            value: "r1",
            left: {
                value: "rl2",
                left: {
                    value: "rll3-leaf"
                },
                right: {
                    value: "rlr3",
                    left: {
                        value: "rlrl4-leaf"
                    },
                    right: {
                        value: "rlrr4-leaf"
                    }
                }
            },
            right: {
                value: "rr2",
                left: {
                    value: "rrl3-leaf"
                },
                right: {
                    value: "rrr3",
                    left: {
                        value: "rrrl4-leaf"
                    },
                    right: {
                        value: "rrrr4",
                        right: {
                            value: "rrr5",
                            left: {
                                value: "rrrrl6-leaf"
                            },
                            right: {
                                value: "rrrrr6-leaf"
                            }
                        }
                    }
                }
            }
        }
    }


console.log(isSuperBalanaced(myBalancedTree));
console.log(isSuperBalanaced(myUnBalancedTree));

process.exit();
