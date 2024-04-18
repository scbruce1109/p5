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
