/*
Your company built an in-house calendar tool called HiCal. You want to add a feature to see the times in a day when everyone is available.
To do this, you’ll need to know when any team is having a meeting. In HiCal, a meeting is stored as objects ↴ with attributes startTime and endTime. 
These integers represent the number of 30-minute blocks past 9:00am.

For example:

  {startTime: 2, endTime: 3} // meeting from 10:00 – 10:30 am
{startTime: 6, endTime: 9} // meeting from 12:00 – 1:30 pm

Write a function mergeRanges() that takes an array of meeting time ranges and returns an array of condensed ranges.

For example, given:

  [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 5},
    {startTime: 4,  endTime: 8},
    {startTime: 10, endTime: 12},
    {startTime: 9,  endTime: 10},
]

your function would return:

  [
    {startTime: 0, endTime: 1},
    {startTime: 3, endTime: 8},
    {startTime: 9, endTime: 12},
]

Do not assume the meetings are in order. The meeting times are coming from multiple teams.

Write a solution that's efficient even when we can't put a nice upper bound on the numbers representing our time ranges. Here we've simplified our times 
down to the number of 30-minute slots past 9:00 am. But we want the function to work even for very large numbers, like Unix timestamps. In any case, the 
spirit of the challenge is to merge meetings where startTime and endTime don't have an upper bound.

  [{startTime: 1, endTime: 2}, {startTime: 2, endTime: 3}]
  
  These meetings should probably be merged, although they don't exactly "overlap"—they just "touch." Does your function do this?
*/

function mergeRanges(args) {
    //brute force is sort the args by start
    //then walk the array and accumulate into a result array

    if (args.length < 1) {
        throw new Error("at least one time range is required");
    }

    args.sort(function(a, b) {
        return a.startTime - b.startTime;
    });
    

    var result = [{
            startTime: args[0].startTime,
            endTime: args[0].endTime
        }],
        head = 0;

    for (var i = 1, len = args.length; i < len; i++) {
        if (args[i].startTime <= result[head].endTime && args[i].endTime > result[head].endTime) {
            //merge case
            result[head].endTime = args[i].endTime;
        }
        else if (args[i].startTime > result[head].endTime) {
            //new record
            result.push(args[i]);
            head++;
        }
    }
    return result;
}

var args = [{
    startTime: 0,
    endTime: 1
}, {
    startTime: 3,
    endTime: 8
}, {
    startTime: 9,
    endTime: 12
}, {
    startTime: 1,
    endTime: 2
}, {
    startTime: 2,
    endTime: 3
}, {
    startTime: 20,
    endTime: 30
}, ];
console.log(mergeRanges(args));

args = [{
    startTime: 1,
    endTime: 10
}, {
    startTime: 2,
    endTime: 6
}, {
    startTime: 3,
    endTime: 5
}, {
    startTime: 7,
    endTime: 9
}, ];
console.log(mergeRanges(args));
