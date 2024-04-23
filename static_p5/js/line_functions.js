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
  console.log(endpoint)
  push();
  translate(origin.x, origin.y);
  var theta = atan2(endpoint.y-origin.y, endpoint.x-origin.x);
  pop();
  return theta;
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
