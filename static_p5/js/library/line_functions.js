function endpointFromAngle(origin, angle, distance){
  var x = origin.x + cos(radians(angle)) * distance;
  var y = origin.y + sin(radians(angle)) * distance;
  return createVector(x,y);
}

function intersectPoint(point1, point2, point3, point4) {
   const ua = ((point4.x - point3.x) * (point1.y - point3.y) -
             (point4.y - point3.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) -
             (point4.x - point3.x) * (point2.y - point1.y));

  const ub = ((point2.x - point1.x) * (point1.y - point3.y) -
             (point2.y - point1.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) -
             (point4.x - point3.x) * (point2.y - point1.y));

  const x = point1.x + ua * (point2.x - point1.x);
  const y = point1.y+ ua * (point2.y - point1.y);

  return new p5.Vector(x,y)
}


function dottedLine(origin, endpoint, density, width, scale){

// if (strokeWeight){
//   strokeWeight(strokeWeight)
// }
// fill(255,60)

var dist = origin.dist(endpoint);
var angle = getAngle(origin, endpoint);

var numPoints = 500* dist / 100 * density/scale;

for (let i = 0; i<numPoints;i++){
  var rando = random(dist);
  var x = origin.x + cos(angle)*rando;
  // console.log(x);
  var y = origin.y + sin(angle)*rando;

  point(x,y);
}
}

function dashedLine(origin, endpoint, segments, spacer){
  var angle = getAngle(origin, endpoint);
  var dist = origin.dist(endpoint);
  var segLength = dist / segments;
  var cursor = new p5.Vector(origin.x, origin.y);
  stroke(100,60);

  for (let i = 0;i<segments;i++){
   if (i == segments - 1){
    line(cursor.x,cursor.y, endpoint.x, endpoint.y);
   }
   else {
     spacer = random(10,spacer);
     var rando = random(100);
     var x = cursor.x + cos(angle) * (segLength +rando);
    var y = cursor.y + sin(angle) * (segLength +rando);
    line(cursor.x,cursor.y, x, y);
    cursor.x = x;
    cursor.y = y;
    cursor.x = cursor.x + cos(angle) * spacer;
    cursor.y = cursor.y + sin(angle) * spacer;
   }
  }
}


function getAngle(origin, endpoint){
  // console.log(endpoint)
  push();
  translate(origin.x, origin.y);
  var theta = atan2(endpoint.y-origin.y, endpoint.x-origin.x);
  pop();
  return theta;
}

function customLinePerlinNoise(origin, endpoint, randomAmount, step, scale_){

  if (! scale_){
    scale_ = 1;
  }

  step = step * scale_;
  randomAmount = randomAmount * scale_;


  //int step = 10;
  var lastx = -999;
  var lasty = -999;
  var y = origin.y;
  var yStep;
  var ynoise = random(10);

  var distance = origin.dist(endpoint)
  var angle = getAngle(origin,endpoint);
  var perpAngle = angle + PI/2;

  for (let i=0;i<=distance;i+=step){

    var x = origin.x + cos(angle)*i;
    var offsetPerp = noise(ynoise)*randomAmount;
    y = origin.y + sin(angle)*i;
    y += sin(perpAngle)*offsetPerp;
    x += cos(perpAngle)*offsetPerp;

    /// i think we need to offset by 90 degrees
    // y = 10+noise(ynoise)*randomAmount+origin.y; /// between 10 and 210


    if (lastx>-999){
     line(x,y,lastx,lasty);
   }

   var offsetLine = (random(20)-10) * scale_;
   lastx=x+cos(angle)* offsetLine;
   lasty=y+sin(angle)*offsetLine;
   ynoise+=01;
  }
}

class MyLine{

  constructor(x1,y1,x2,y2,numPoints){
  this.origin = new p5.Vector(x1,y1);
  this.end = new p5.Vector(x2,y2)
  this.dist = this.origin.dist(this.end)
  this.points = [];
  this.angle = getAngle(this.origin,this.end);

  var segLen = this.dist / numPoints;
  for (let i =0;i<=this.dist;i+=segLen){
    var x = this.origin.x + cos(this.angle) * i;
    var y = this.origin.y + sin(this.angle) * i;

    this.points.push([x,y])
  }

  console.log(this.points)

}

offsetPoints(amount){
  var perpAngle = this.angle + PI/2;
  for (let i = 1;i<this.points.length-1;i++){

    console.log(degrees(this.angle))
    console.log(degrees(perpAngle))
    var rando = random(-amount,amount)
    console.log(amount)
    var newX = this.points[i][0] + cos(perpAngle)*rando;
    var newY = this.points[i][1] + sin(perpAngle)*rando;
    console.log('hey there')
    this.points[i] = [newX,newY]
    // ellipse(this.points[i][0],this.points[i][1],5,5);
  }
}

  display(){
    // line(this.origin.x,this.origin.y,this.end.x,this.end.y)
  //   ellipse(this.origin.x,this.origin.y,10,10);
  // ellipse(this.end.x,this.end.y,10,10);
  for (let i = 0;i<this.points.length;i++){
    if(i != this.points.length-1){
      line(this.points[i][0],this.points[i][1],this.points[i+1][0],this.points[i+1][1])
    }
    // console.log('hey there')
    // ellipse(this.points[i][0],this.points[i][1],5,5);
  }
  }
}

function distributePointsOnLine(origin, endpoint, numPoints){
  var d = dist(origin.x,origin.y,endpoint.x,endpoint.y);
  var spacer = d / numPoints;
  var a = getAngle(origin, endpoint);
  var points = []

  var xa = cos(a);
  var ya = sin(a);
  for (let i = 0;i<=numPoints;i++){
    var x = origin.x + xa * i *spacer;
    var y = origin.y + ya * i *spacer;
    points.push(createVector(x,y))
  }

  return points
}

function distributePointsOnArc(center,radius,numPoints,startAngle,endAngle){
  if (!startAngle){
    startAngle = 0;
    endAngle = 360;
  }

  var arc = Math.abs(endAngle - startAngle);
  var spacer = arc / numPoints;

  var a = startAngle;
  var points = [];
  for (let i = 0;i<numPoints;i++){
    var x = center.x + cos(radians(a + i * spacer)) * radius;
    var y = center.y + sin(radians(a + i * spacer)) * radius;

    points.push(createVector(x,y))

  }
  return points;
}

function placePoint(dest, jitter, gaussian){
  var a = radians(random(360))
  var jit = random(-jitter,jitter)
  var x = dest.x + cos(a)*jit;
  var y = dest.y + sin(a)*jit;

  return(createVector(x,y))

}
