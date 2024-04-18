function setup() {
  createCanvas(1080, 1080);
  background(8,10,15);
  noFill();
  // ellipse(400,400,300,300)
  // ellipse(400,400,457.2,457.2)

  let orbitLength1 = 365.265
  let orbitLength2 = 687
  let orbitRadius1 = 1
  let orbitRadius2 = 1.524

  let centerPoint = 540;
  let x1, x2;
  let y1, y2;
  let radius = 457.2/2 *2
  let radius2 = 300/2 *2
  let angle1 = 0;
  let angle2 = 0;
  let interval = 1;
//fill(100,0,0);
//ellipse(0,0,100,100);

for (let i=0;i<72*45;i++){
  console.log('whooo')
  x1 = sin(radians(angle1))*radius+centerPoint;
  y1 = cos(radians(angle1))*radius+centerPoint;
  x2 = sin(radians(angle2))*radius2+centerPoint;
  y2 = cos(radians(angle2))*radius2+centerPoint;
  fill(0,10);
  // rotate(radians(5));
  // ellipse(x1, y1, 10, 10);
  // ellipse(x2, y2, 10, 10);
  strokeWeight(1)
  stroke(255,10)
  p1 = new p5.Vector(x1,y1);
  p2 = new p5.Vector(x2,y2);
  // dottedLine(p1,p2,0.1,0,1);

  line(x1,y1,x2,y2);
//radius -=10;
  angle1 +=interval;
  angle2 +=interval*1.881
// cColor +=10;
}
}
//
// function draw() {
//   // background(220);
//   // noFill();
//   // ellipse(400,400,300,300)
//   // ellipse(400,400,457.2,457.2)
// }
