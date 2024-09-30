let centerPoint = 540;
let x1, x2;
let y1, y2;
let radius = 100/2;
let radius2 = 100/2;
let angle1 = 0;
let angle2 = 0;
let interval = 10;
let accel = 0.1
let dotColor;




function setup() {
  createCanvas(1080, 1080);
  background(0,0,20);
  dotColor = color(255,100,0,100)
  // background(255)
  noFill();
  for(let i=0;i<1000;i++){
    noStroke()
    fill(0,0,30,10)
    rect(random(900),random(900),random(100),random(200))
  }
  // ellipse(400,400,300,300)
  // ellipse(400,400,457.2,457.2)



//fill(100,0,0);
//ellipse(0,0,100,100);

}
//
function draw() {
  x1 = sin(radians(angle1))*radius+centerPoint;
  y1 = cos(radians(angle1))*radius+centerPoint;
  x2 = sin(radians(angle2))*radius2+x1;
  y2 = cos(radians(angle2))*radius2+y1;
  fill(dotColor);
  noStroke()
  // rotate(radians(5));
  // ellipse(x1, y1, 10, 10);
  ellipse(x2, y2, 5, 5);
  strokeWeight(1)
  stroke(255,0,0,50)
  line(x1,y1,x2,y2);
//radius -=10;
  angle1 +=interval;
  // angle2 +=interval*7.4873879;
  angle2 +=interval*43.1//+accel;  ///60.01, 31.33, 61.15, 67.1,61.77, *0.1, 65.55, 47.7!!  47.3 43.1  
  radius += 0.1;
  radius2 += 0.1;
  // accel +=0.1
  // background(220);
  // noFill();
  // ellipse(400,400,300,300)
  // ellipse(400,400,457.2,457.2)
}
