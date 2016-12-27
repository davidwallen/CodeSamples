/*

A given knapsack has x carrying capacity expressed as a weight. A set of coins
has y value at z weight each.

Given an unlimited supply of coins what is the optimal value that can be carried
in the knapsack for a given weight.

*/

function maxBagValue(widgets, weightCapacity) {

    var maxValues = [];
    for (var i = 0; i <= weightCapacity; i++) {
        maxValues[i] = 0;
    }

    for (var currentCapacity = 0; currentCapacity <= weightCapacity; currentCapacity++) {

        // set a variable to hold the max monetary value so far for currentCapacity
        var currentMaxValue = 0;

        for (var j = 0; j < widgets.length; j++) {
            var widget = widgets[j];
            if (widget.weight === 0 && widget.value !== 0) {
                return Infinity;
            }

            // if the current widget weighs as much or less than the current weight capacity
            // it's possible taking the widget would give get a better value
            if (widget.weight <= currentCapacity) {

                // so we check: should we use the widget or not?
                // if we use the widget, the most kilograms we can include in addition to the widget
                // we're adding is the current capacity minus the widget's weight. we find the max
                // value at that integer capacity in our array maxValues
                var maxValueUsingWidget = widget.value + maxValues[currentCapacity - widget.weight];

                // now we see if it's worth taking the widget. how does the
                // value with the widget compare to the currentMaxValue?
                currentMaxValue = Math.max(maxValueUsingWidget, currentMaxValue);
            }
        }

        // add each capacity's max value to our array so we can use them
        // when calculating all the remaining capacities
        maxValues[currentCapacity] = currentMaxValue;
    }

    return maxValues[weightCapacity];
}


//weight is milligrams

var coins = [{
    "description": "Cent",
    "value": 0.01,
    "weight": 2500,
    "diameter": "0.750 in.\n19.05 mm",
    "thickness": "1.52 mm",
    "edge": "Plain",
    "reeds": "N/A"
}, {
    "description": "Nickel",
    "value": 0.05,
    "weight": 5000,
    "diameter": "0.835 in.\n21.21 mm",
    "thickness": "1.95 mm",
    "edge": "Plain",
    "reeds": "N/A"
}, {
    "description": "Dime",
    "value": 0.1,
    "weight": 2268,
    "diameter": "0.705 in.\n17.91 mm",
    "thickness": "1.35 mm",
    "edge": "Reeded",
    "reeds": 118
}, {
    "description": "Quarter Dollar",
    "value": 0.25,
    "weight": 5670,
    "diameter": "0.955 in.\n24.26 mm",
    "thickness": "1.75 mm",
    "edge": "Reeded",
    "reeds": 119
}, {
    "description": "Half Dollar",
    "value": 0.5,
    "weight": 11340,
    "diameter": "1.205 in.\n30.61 mm",
    "thickness": "2.15 mm",
    "edge": "Reeded",
    "reeds": 150
}, {
    "description": "Presidential $1",
    "value": 1,
    "weight": 8100,
    "diameter": "1.043 in.\n26.49 mm",
    "thickness": "2.00mm",
    "edge": "edge-Lettering",
    "reeds": "N/A"
}, {
    "description": "Native American $1 Coin",
    "value": 1,
    "weight": 8100,
    "diameter": "1.043 in.\n26.49 mm",
    "thickness": "2.00 mm",
    "edge": "edge-Lettering",
    "reeds": "N/A"
}];


console.log(maxBagValue(coins, 50000));

process.exit();
