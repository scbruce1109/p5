var x1,x2,y1,y2, angle, phase;
var colorList = ["#181778", "#FF6600","#788430"];

function setup(){
  createCanvas(1080, 1080);
  background(255);
  ellipse()
  angle = 0;
  var radius = 200;
  centerPoint = width/2;

  var angleSpace = 360 / colorList.length;
  phase = 180;


  for (let i=0;i<colorList.length;i++){
    x1 = sin(radians(angle+180))*radius+centerPoint;
    y1 = cos(radians(angle+180))*radius+centerPoint;
    fill(color(colorList[i]))
    ellipse(x1, y1, 20, 20)
    angle += angleSpace;
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
