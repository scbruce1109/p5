var x1,x2,y1,y2, angle;
var colorList = [];

function setup(){
  createCanvas(1080, 1080);
  background(255);
  ellipse()
  angle = 0;
  var radius = 500;
  centerPoint = width/2;

  while (angle < 360){
    x1 = sin(radians(angle))*radius+centerPoint;
    y1 = cos(radians(angle))*radius+centerPoint;
    line(x1, y1, centerPoint, centerPoint)
    angle += 0.1;
  }
}

function draw(){

  // for ()
  //
  // x1 = sin(radians(angle1))*radius+centerPoint;
  // y1 = cos(radians(angle1))*radius+centerPoint;
  // x2 = sin(radians(angle2))*radius2+x1;
  // y2 = cos(radians(angle2))*radius2+y1;
}
