/*
A crack team of love scientists from OkEros (a hot new dating site) have devised a way to represent dating profiles as rectangles on a two-dimensional plane.
They need help writing an algorithm to find the intersection of two users' love rectangles. They suspect finding that intersection is the key to a matching 
algorithm so powerful it will cause an immediate acquisition by Google or Facebook or Obama or something.

Two rectangles overlapping a little. It must be love.
Write a function to find the rectangular intersection of two given love rectangles.

As with the example above, love rectangles are always "straight" and never "diagonal." More rigorously: each side is parallel with either the x-axis or the y-axis.

They are defined as objects ↴ like this:

  var myRectangle = {

    // coordinates of bottom-left corner
    leftX: 1,
    bottomY: 5,

    // width and height
    width: 10,
    height: 4,

};

Your output rectangle should use this format as well.

Gotchas
What if there is no intersection? Does your function do something reasonable in that case?

*/

function examineCorners(r1, r2) {
  // 1) does any corner of r1 fall within r2
  // 2) do two opposite corners fall within the infinitely projected h or w of r2

  //convert inputs to coordinate plane

  function addCoordinates(r) {
    r.x1 = r.leftX;
    r.x2 = r.leftX + r.width;
    r.y1 = r.bottomY;
    r.y2 = r.bottomY + r.height;

    r.minX = Math.min(r.x1, r.x2);
    r.maxX = Math.max(r.x1, r.x2);
    r.minY = Math.min(r.y1, r.y2);
    r.maxY = Math.max(r.y1, r.y2);

    r.a = {
      x: r.x1,
      y: r.y1
    };
    r.b = {
      x: r.x1,
      y: r.y2
    };
    r.c = {
      x: r.x2,
      y: r.y1
    };
    r.d = {
      x: r.x2,
      y: r.y2
    };
    return r;
  }

  function pointInRectangle(p, r) {
    return (p.x >= r.minX && p.x <= r.maxX && p.y >= r.minY && p.y <= r.maxY);
  }

  r1 = addCoordinates(r1);
  r2 = addCoordinates(r2);

  function isAnyCornerInside(r1, r2) {
    return (pointInRectangle(r1.a, r2) || pointInRectangle(r1.b, r2) || pointInRectangle(r1.c, r2) || pointInRectangle(r1.d, r2) || pointInRectangle(r2.a, r1) || pointInRectangle(r2.b, r1) || pointInRectangle(r2.c, r1) || pointInRectangle(r2.d, r1));
  }

  function isEdgeOverlap(r1, r2) {

    function isPointBetweenX(p, r) {
      return (p.x >= r.minX && p.x <= r.maxX);
    }

    function isPointBetweenY(p, r) {
      return (p.y >= r.minY && p.y <= r.maxY);
    }

    function isPointAbove(p, r) {
      return (p.y >= r.maxY);
    }

    function isPointBelow(p, r) {
      return (p.y <= r.minY);
    }

    function isPointRight(p, r) {
      return (p.x >= r.maxX);
    }

    function isPointLeft(p, r) {
      return (p.x <= r.minX);
    }

    function compareRectangles(r1, r2) {
      return (isPointBetweenX(r1.a, r2) && isPointAbove(r1.a, r2) && (isPointBelow(r1.b, r2) || isPointBelow(r1.c, r2) || isPointBelow(r1.d, r2))) ||
        (isPointBetweenX(r1.b, r2) && isPointAbove(r1.b, r2) && (isPointBelow(r1.a, r2) || isPointBelow(r1.c, r2) || isPointBelow(r1.d, r2))) ||
        (isPointBetweenX(r1.c, r2) && isPointAbove(r1.c, r2) && (isPointBelow(r1.a, r2) || isPointBelow(r1.b, r2) || isPointBelow(r1.d, r2))) ||
        (isPointBetweenX(r1.d, r2) && isPointAbove(r1.d, r2) && (isPointBelow(r1.a, r2) || isPointBelow(r1.b, r2) || isPointBelow(r1.c, r2))) ||
        (isPointBetweenY(r1.a, r2) && isPointRight(r1.a, r2) && (isPointLeft(r1.b, r2) || isPointLeft(r1.c, r2) || isPointLeft(r1.d, r2))) ||
        (isPointBetweenY(r1.b, r2) && isPointRight(r1.b, r2) && (isPointLeft(r1.a, r2) || isPointLeft(r1.c, r2) || isPointLeft(r1.d, r2))) ||
        (isPointBetweenY(r1.c, r2) && isPointRight(r1.c, r2) && (isPointLeft(r1.a, r2) || isPointLeft(r1.b, r2) || isPointLeft(r1.d, r2))) ||
        (isPointBetweenY(r1.d, r2) && isPointRight(r1.d, r2) && (isPointLeft(r1.a, r2) || isPointLeft(r1.b, r2) || isPointLeft(r1.c, r2))) ||
        false;
    }

    return compareRectangles(r1, r2) || compareRectangles(r2, r1);

  }

  return (isAnyCornerInside(r1, r2) || isEdgeOverlap(r1, r2));

}

function examineOverlap(r1, r2) {
  function findRangeOverlap(point1, length1, point2, length2) {

    // find the highest start point and lowest end point.
    // the highest ("rightmost" or "upmost") start point is
    // the start point of the overlap.
    // the lowest end point is the end point of the overlap.
    var highestStartPoint = Math.max(point1, point2);
    var lowestEndPoint = Math.min(point1 + length1, point2 + length2);

    // return null overlap if there is no overlap
    if (highestStartPoint >= lowestEndPoint) {
      return {
        startPoint: null,
        overlapLength: null
      };
    }

    // compute the overlap length
    var overlapLength = lowestEndPoint - highestStartPoint;

    return {
      startPoint: highestStartPoint,
      overlapLength: overlapLength
    };
  }


  // get the x and y overlap points and lengths
  var xOverlap = findRangeOverlap(r1.leftX, r1.width, r2.leftX, r2.width);
  var yOverlap = findRangeOverlap(r1.bottomY, r1.height, r2.bottomY, r2.height);

  // return null rectangle if there is no overlap
  if (!xOverlap.overlapLength || !yOverlap.overlapLength) {
    return {
      leftX: null,
      bottomY: null,
      width: null,
      height: null,
    };
  }

  return {
    leftX: xOverlap.startPoint,
    bottomY: yOverlap.startPoint,
    width: xOverlap.overlapLength,
    height: yOverlap.overlapLength,
  };

}

var r1 = {

    // coordinates of bottom-left corner
    leftX: 1,
    bottomY: 5,

    // width and height
    width: 10,
    height: 4,

  },
  r2 = {

    // coordinates of bottom-left corner
    leftX: 0,
    bottomY: 0,

    // width and height
    width: -10,
    height: -4,

  },
  r3 = {

    // coordinates of bottom-left corner
    leftX: 2,
    bottomY: 6,

    // width and height
    width: 8,
    height: 2,

  },
  r4 = {

    // coordinates of bottom-left corner
    leftX: 3,
    bottomY: 4,

    // width and height
    width: 2,
    height: 12,

  };

console.time('points');
console.log(examineCorners(r1, r1));
console.log(examineCorners(r2, r2));
console.log(examineCorners(r1, r2));
console.log(examineCorners(r2, r1));
console.log(examineCorners(r3, r1));
console.log(examineCorners(r1, r3));
console.log(examineCorners(r4, r3));
console.log(examineCorners(r3, r4));
console.timeEnd('points');

console.time('ranges');
console.log(examineOverlap(r1, r1));
console.log(examineOverlap(r2, r2));
console.log(examineOverlap(r1, r2));
console.log(examineOverlap(r2, r1));
console.log(examineOverlap(r3, r1));
console.log(examineOverlap(r1, r3));
console.log(examineOverlap(r4, r3));
console.log(examineOverlap(r3, r4));
console.timeEnd('ranges');

process.exit();
