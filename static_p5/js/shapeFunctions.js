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
