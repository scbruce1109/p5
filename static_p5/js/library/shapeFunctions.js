// function setup() {
//   createCanvas(600, 600);
//   ellipse(width/2,height/2,20,20)
//
//   var points = generatePoints(width/2,height/2,200,200,3,0)
//   var arcP = generateArc(width/2,height/2,200,150,10,-5)
//   var arcP2 = generateArc(width/2,height/2,200,150,10,90-5)
//
//   var tx = width/2 + cos(radians(-90))*200;
//   var ty = height/2 + sin(radians(-90))*200;
//   // ellipse(tx,ty,20,20)
//
//   line(width/2,0,width/2,height)
//   line(0,height/2,width,height/2)
//
//   noStroke();
//   fill(0)
//
// //   var shape1 = new myShape(arcP2);
// //   shape1.display()
//
// //   var shape2 = new myShape(arcP);
// //   shape2.display()
//
//   var ting = arcRing(width/2,height/2,200,100,2,0,20)
//
//   var zing = arcCircle(width/2,height/2,200,10,60);
//
//
//
//   // for (let i=0;i<points.length;i++){
//   //   ellipse(points[i].x,points[i].y,20,20)
//   // }
//
// }
//
// function draw() {
//   // background(220);
//
// }

function generatePoints(xloc, yloc, xsize, ysize, numVerts, offset){
  var pList = [];
  if (! offset){
    offset = 0;
  }
  offset = offset - 90;
  var spacing = 360 / numVerts;

  for (let i=0;i<numVerts;i++){
    var x = xloc + cos(radians(i*spacing+offset)) * xsize;
    var y = yloc + sin(radians(i*spacing+offset)) * ysize;
    pList.push(new p5.Vector(x,y))
  }
  return pList;
}

function generateArc(xloc, yloc, rad1, rad2, angle, offsetAngle){
  var points = [];
  offsetAngle = offsetAngle-90;
  var theta = offsetAngle;
  angle = angle

  while (theta <= offsetAngle + angle){
    var x = xloc + cos(radians(theta)) * rad1;
    var y = yloc + sin(radians(theta)) * rad1;
    points.push(new p5.Vector(x,y));
    theta += 1;
  }
  theta = offsetAngle + angle;
  while ( theta >= offsetAngle){
    var x = xloc + cos(radians(theta)) * rad2;
    var y = yloc + sin(radians(theta)) * rad2;
    points.push(new p5.Vector(x,y));
    theta -= 1;
  }
  return points;

}

class myShape {
  constructor(pointsList){
    this.points = pointsList;

  }

  display(){
    beginShape();
    for (let i=0;i<this.points.length;i++){
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape(CLOSE);
  }
}

function ringArcs(locx, locy, radius1, radius2, numSegs, spacer){



}

function arcRing(xloc, yloc, radius1, radius2, numVerts, offset, angle){
  var pList = [];
  if (! offset){
    offset = 0;
  }
  offset = offset - 90;
  var spacing = 360 / numVerts;

  for (let i=0;i<numVerts;i++){
    var theta = i*spacing+offset
    var daArc = generateArc(xloc,yloc,radius1,radius2,angle,(360-theta-90)-angle/2)
    var daShape = new myShape(daArc);
    fill(random(255));
    daShape.display();
    // var x = xloc + cos(radians(i*spacing+offset)) * xsize;
    // var y = yloc + sin(radians(i*spacing+offset)) * ysize;
    // pList.push(new p5.Vector(x,y))
  }
  // return pList;
}

function arcCircle(xloc, yloc, radius, numY, numX, offset){
  var ySpacing = (radius / numY);
  var off = 0
  var num = 2
  var angle = 360 / numX;

  for (let i = 0;i<numY;i++){
    var r1 = radius-i* ySpacing;
    var r2 = radius-(i+1)* ySpacing;
    arcRing(xloc,yloc,r1,r2,numX,off,angle)
    // num += 1
    // off += 10;
    // noFill();
    // stroke(0);
    // ellipse(xloc,yloc,r*2,r*2);

  }

}


function polygonContainsPoint(polygonPoints, testPoint) {
  var numVerts = polygonPoints.length;
  var c = false;
  var j = numVerts - 1;
  for (let i = 0; i < numVerts; i++)     {
    var deltaX = polygonPoints[j].x - polygonPoints[i].y;
    var ySpread = testPoint.y - polygonPoints[i].y;
    var deltaY = polygonPoints[j].y - polygonPoints[i].y;
    if (((polygonPoints[i].y > testPoint.y) != (polygonPoints[j].y > testPoint.y)) &&
        (testPoint.x < (((deltaX * ySpread) / deltaY) + polygonPoints[i].x))) {
      c = !c;
    }
    j = i;
  }
  return c;
}

function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

    var x = point.x, y = point.y;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

//https://www.algorithms-and-technologies.com/point_in_polygon/javascript
// const pointInPolygon = function (polygon, point) {
//     //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
//     let odd = false;
//     //For each edge (In this case for each point of the polygon and the previous one)
//     for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
//         //If a line from the point into infinity crosses this edge
//         if (((polygon[i].y > point.y) !== (polygon[j].y > point.y)) // One point needs to be above, one below our y coordinate
//             // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
//             && (point.x < ((polygon[j].x - polygon[i].x) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
//             // Invert odd
//             odd = !odd;
//         }
//         j = i;

//     }
//     //If the number of crossings was odd, the point is in the polygon
//     return odd;
// };


function pointsBB(points){
  var l = Infinity;
  var r = -Infinity;
  var t = Infinity;
  var b = -Infinity;

  for (let i = 0;i<points.length;i++){
    // ellipse(points[i].x,points[i].y,10,10)
    console.log('hey')
    if (points[i].x < l){
      console.log('woo')
      l = points[i].x;
    }
    if (points[i].x > r){
      r = points[i].x;
      console.log('bif')
    }
    if (points[i].y < t){
      t = points[i].y;
      console.log('baff')
    }
    if (points[i].y > b){
      b = points[i].y;
      console.log('wobo')
    }

  }
  // rect(l,t,r-l,b-t)
  // rect(l,t,200,200)
  return [l,r,t,b];

}

function circumCircle(points){

}

function fillPoly(pPoints,numPoints){
  var bbb = pointsBB(pPoints)

  for (let i = 0;i<numPoints;i++){
    var pp = createVector(random(bbb[0],bbb[1]),random(bbb[2],bbb[3]))

    if(inside(pp,pPoints)){
      stroke(0,0,255,50)
      fill(200,0,0,50)
      ellipse(pp.x,pp.y,10,10)
    }


  }
}


////// neighbor influence
