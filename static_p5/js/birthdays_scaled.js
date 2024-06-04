let centerPoint;
let x1, x2;
let y1, y2;
let radius;
let radius2;
let angle1 = 0;
let angle2 = 0;
let interval = 0.3
let accel = 0.1
let dotColor;
let ratio;

var scale;



function setup() {

  // let date2 = new Date("February 11, 2000");
  let date2 = new Date();
  let date1 = new Date("March 16, 1955");
  // let date2 = new Date("April 9, 1991");
  // let date2 = new Date("October 4, 1991");
  // let date2 = new Date("October 4, 1991");
  // let date2 = new Date("November 5, 1992");
  ratio = date2.getTime()/date1.getTime();

  // newc = color("#ffd5d5ff")
  newc = color(0);
  newc.setAlpha(100);
  scale = 1;

  createCanvas(1080*scale, 1080*scale);


  centerPoint = width/2;
radius = 100/2*scale;
radius2 = 100/2*scale;


  // background(0,0,20);
  dotColor = color(255,0,0,50)
  // background(255)
  noFill();
  // for(let i=0;i<1000;i++){
  //   noStroke()
  //   fill(0,0,30,10)
  //   rect(random(900),random(900),random(100),random(200))
  // }
    var x2 = width/2;
  var y2 = height/2;
    while (0 < x2 & x2 < width & 0 < y2 & y2 < height){
  // for (let i = 0;i<4000;i++){
    x1 = sin(radians(angle1))*radius+centerPoint;
    y1 = cos(radians(angle1))*radius+centerPoint;
    x2 = sin(radians(angle2))*radius2+x1;
    y2 = cos(radians(angle2))*radius2+y1;
    fill(newc,5);
    noStroke()
    // rotate(radians(5));
    // ellipse(x1, y1, 10, 10);
    ellipse(x2, y2, 5*scale, 5*scale);
    strokeWeight(1*scale)
    stroke(newc,5)
    p1 = new p5.Vector(x1,y1);
    p2 = new p5.Vector(x2,y2);
    dottedLine(p1,p2,0.1,0,1);
    // line(x1,y1,x2,y2);
  //radius -=10;
    angle1 +=interval;
    // angle2 +=interval*7.4873879;
    angle2 +=interval*ratio//+accel;  ///60.01, 31.33, 61.15, 67.1,61.77, *0.1, 65.55, 47.7!!  47.3 43.1
    radius += 0.1*scale;
    radius2 += 0.1*scale;



  }



  // ellipse(400,400,300,300)
  // ellipse(400,400,457.2,457.2)



//fill(100,0,0);
//ellipse(0,0,100,100);

}
//
function draw() {
//   x1 = sin(radians(angle1))*radius+centerPoint;
//   y1 = cos(radians(angle1))*radius+centerPoint;
//   x2 = sin(radians(angle2))*radius2+x1;
//   y2 = cos(radians(angle2))*radius2+y1;
//   fill(dotColor);
//   noStroke()
//   // rotate(radians(5));
//   // ellipse(x1, y1, 10, 10);
//   ellipse(x2, y2, 5, 5);
//   strokeWeight(1)
//   stroke(255,0,0,50)
//   line(x1,y1,x2,y2);
// //radius -=10;
//   angle1 +=interval;
//   // angle2 +=interval*7.4873879;
//   angle2 +=interval*43.01//+accel;  ///60.01, 31.33, 61.15, 67.1,61.77, *0.1, 65.55, 47.7!!  47.3 43.1
//   radius += 0.1;
//   radius2 += 0.1;
  // accel +=0.1
  // background(220);
  // noFill();
  // ellipse(400,400,300,300)
  // ellipse(400,400,457.2,457.2)
}
