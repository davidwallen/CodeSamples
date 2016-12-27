/*
You decide to test if your oddly-mathematical heating company is fulfilling its All-Time Max, Min, Mean and Mode Temperature Guarantee™.
Write a class TempTracker with these methods:

insert()—records a new temperature
getMax()—returns the highest temp we've seen so far
getMin()—returns the lowest temp we've seen so far
getMean()—returns the mean ↴ of all temps we've seen so far
getMode()—returns a mode ↴ of all temps we've seen so far
Optimize for space and time. Favor speeding up the getter functions (getMax(), getMin(), getMean(), and getMode()) over speeding up the insert() function.

Temperatures will all be inserted as integers. We'll record our temperatures in Fahrenheit, so we can assume they'll all be in the range 0..100.

If there is more than one mode, return any of the modes.

Gotchas
We can get O(1) time for all functions.
*/
function TempTrackerBrute() {
    this.temps = [];
    this.total = 0;
    this.max = 0;
    this.min = 110;

    TempTrackerBrute.prototype.insert = function(t) {
        this.temps.push(t);
        this.total += t;
        if (t > this.max) this.max = t;
        if (t < this.min) this.min = t;
    }
    TempTrackerBrute.prototype.getMax = function() {
        return this.max;
    }

    TempTrackerBrute.prototype.getMin = function() {
        return this.min;
    }

    TempTrackerBrute.prototype.getMean = function() {
        return this.total / this.temps.length;
    }

    TempTrackerBrute.prototype.getMode = function() {
        var count = [],
            maxIndex = 0,
            mode = 0;
        for (var i = 0; i < this.temps.length; i++) {
            count[this.temps[i]] = (count[this.temps[i]] || 0) + 1;
            if (count[this.temps[i]] > maxIndex) {
                maxIndex = count[this.temps[i]];
                mode = this.temps[i];
            }
        }
        return mode;
    }

    TempTrackerBrute.prototype.getMedian = function() {
        var median;
        if (this.temps.length % 2 === 0) { // is even
            // average of two middle numbers
            median = (this.temps[this.temps.length / 2 - 1] + this.temps[this.temps.length / 2]) / 2;
        }
        else { // is odd
            // middle number only
            median = this.temps[(this.temps.length - 1) / 2];
        }
        return this.median;
    }
};

function TempTracker() {
    // for mode
    this.modes = [];
    this.modeCt = 0;

    this.mean = null;
    this.mode = null;
    this.max = 0;
    this.min = 110;
    this.numTemps = 0;
    this.sumTemps = 0;

    TempTracker.prototype.insert = function(t) {
        // handle max and min
        if (t > this.max) {
            this.max = t;
        }
        if (t < this.min) {
            this.min = t;
        }

        //hande mean
        this.numTemps++;
        this.sumTemps += t;
        this.mean = this.sumTemps / this.numTemps;

        // handle mode
        if (!this.modes[t]) {
            this.modes[t] = 0;
        }
        this.modes[t]++;
        if (this.modes[t] > this.modeCt) {
            this.mode = t;
            this.modeCt = this.modes[t];
        }
    }

    TempTracker.prototype.getMax = function() {
        return this.max;
    }

    TempTracker.prototype.getMin = function() {
        return this.min;
    }

    TempTracker.prototype.getMean = function() {
        return this.mean;
    }

    TempTracker.prototype.getMode = function() {
        return this.mode;
    }
};

var dataPoints = 100000,
    accessEvery = 100,
    temps = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < dataPoints; i++) {
    temps.push(getRandomInt(0, 110));
}

function test(f) {
    function functionName(fun) {
        var ret = fun.toString();
        ret = ret.substr('function '.length);
        ret = ret.substr(0, ret.indexOf('('));
        return ret;
    }

    var fn = functionName(f);
    console.time(fn);
    var tt = new f();
    for (var i = 0; i < dataPoints; i++) {
        tt.insert(temps[i]);
        if (i % accessEvery === 0) {
            var result = {
                min: tt.getMin(),
                max: tt.getMax(),
                mean: tt.getMean(),
                mode: tt.getMode()
            }
        }
    }
    console.timeEnd(fn);

    console.log({
        result: {
            min: tt.getMin(),
            max: tt.getMax(),
            mean: tt.getMean(),
            mode: tt.getMode()
        },
        size: (JSON.stringify(tt)).length
    });

}

test(TempTracker);
test(TempTrackerBrute);

process.exit();
