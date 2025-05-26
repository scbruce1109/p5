var e,r,e2,r2,g1,s;

loadParams = false;
var paramName = 'building'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -1000,
  locationZ: 200,
  rotationX: 0,
  rotationY: -0,
  rotationZ: 0
}

function preload() {
  if (loadParams){
    params = loadJSON(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\Everydays"+"\\"+paramName +".json");
    console.log(params)
   params = JSON.parse(params)
  } else {
    params = params;
  }
}

function setup() {
  w = ''
  createCanvas(900, 900);
  background('#ffffff');

  g1 = new ColorGrid(0,0,width,height,5);

  movers = [];
  params.noiseSeed = 88767.3074244767


  noiseSeed(params.noiseSeed)
s = []
  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  var p = pointOnGround(ging, -0,5000)
  var p2 = pointOnGround(ging, random(-30,30),random(10000,25000))
  var p4 = pointOnGround(ging, -30,50000)
  p2[1].z = 1
  p4[1].z = 1
  var p3 = pointOnGround(ging, -30,1000)
// var ps = []
//   console.log('pp')
//   console.log(p)
//   console.log(p3)
var ps = [p3[1],p2[1],p4[1]];

  params.ps = ps
  r = new Rect3D(createVector(0,0,0),100,50)
  // r.rotate(radians(90),'x')
  r2 = new Rect3D(p2[1],100,500,true)
  r2.rotate(radians(90),'x')
  // e = new Line3D([createVector(0,0,0),createVector(1000,1000,0),createVector(-1000,2000,0),createVector(-1500,4000,1000)])
  e = new Line3D(ps)
  e.smoothChaikin(4)
  r = arrayOnLine(r,e,200)
  // var sphe = new Sphere3D(createVector(0,0,0),100);
  // e.translate(createVector(0,0,300))
  // s = arrayOnLine(sphe,e,200)
  // e2 = new Line3D([end,end2])
  // e2
  var lerpPoints = []
  for (let i = 0;i<3;i++){
    var lval = 1 / 3 * i
    if (lval == 0){lval = 0.01}
    lerpPoints.push(e.lerpLine(lval))
  }
  var pPoints = ging.project(lerpPoints);
  console.log(lerpPoints)
  console.log(pPoints)
  g1.fillColor([color("#ff7a40"),color("#ffe040"),color("#00016b")],pPoints,300,color('#fff8db'))
  // g1.display();

  for (let i =0;i<1000;i++){
    // var p = placePoint(createVector(width/2,height/2),200,false)
    var p = createVector(random(width),random(height))
    var c1 = g1.getValue(p.x,p.y).c
    c1.setAlpha(0.1)
    fill(c1);
    noStroke();
    // rect(random(width),random(height),random(100),random(100))
    var zoop = generatePoints(p.x, p.y,random(200),random(200),Math.floor(random(3,8)))
    var ding = new myShape(zoop,true)
    ding.offsetPoints(random(50))
    ding.subdivide(2)
    // console.log(ding.points)
    ding.offsetPoints(random(20))
    ding.subdivide(2)
    // console.log(ding.points)
    ding.offsetPoints(random(50))
    // var c1 = g1.getValue(bgGrid.points[i][j].x,bgGrid.points[i][j].y).c
    // c1.
    ding.smoothChaikin(2)
    ding.offsetPoints(random(5))
    ding.smoothChaikin(2)
    ding.offsetPoints(random(10))
    // ding.smoothChaikin(2)
    ding.display()
  }
  console.log(params)
  // e = new Ellipse3D(createVector(0,1000,0),100,100,20)
}

function draw() {
  // background('#ffe8b2');
  // background(0,0,40)
  strokeWeight(1)
  stroke(0,100);

  if (keyIsPressed === true) {
    if (key === 'w'){
  ging.translate(w,createVector(0,10,0))
} else if (key === 's'){
  ging.translate(w,createVector(0,-10,-0)) ////sin(radians(ging.rotation.x))*10
}  else if (key === 'a'){
  ging.translate(w,createVector(-10,0,-0))
} else if (key === 'd'){
  ging.translate(w,createVector(10,0,-0))
} else if (key === 'y'){
  ging.translate(w,createVector(-0,0,10))
} else if (key === 'h'){
  ging.translate(w,createVector(0,0,-10))
} else if (key === 'l'){
  ging.rotate(w,0,0,-.5)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'k'){
  ging.rotate(w,-0,0,.5)
  // w.rotate(ging.sp2,-5,'x')
}else if (key === 'u'){
  ging.rotate(w,.5,0,0)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'j'){
  ging.rotate(w,-.5,0,0)
  }
}
noFill();
noStroke();
  // e.display(ging)
  // e2.display(ging)
  var c = color('#fff8db')
  c.setAlpha(0.5)
  fill(c)
  for (let i = 0;i<r.length;i++){
    r[i].display(ging)
    // s[i].display(ging)
  }
  r2.display(ging)
  // var hl = ging.displayHL();

// for (let i = 0;i<shapes.length;i++){
//   shapes[i].display(ging)
//   // console.log('hye')
// }


  // fill(0)
  // text("x: " + ging.rotation.x.toString(),50,50)
  // text("z: " +ging.rotation.z.toString(),50,75)
  // text("Cam location",50,100)
  // text("X: " + (ging.location.x ).toString(),50,120)
  // text("Y: " + (ging.location.y ).toString() ,50,140)
  // text("Z: " + (ging.location.z ).toString(),50,160)

  params.locationX = ging.location.x;
  params.locationY = ging.location.y;
  params.locationZ = ging.location.z;
  params.rotationX = ging.rotation.x;
  params.rotationY = ging.rotation.y;
  params.rotationZ = ging.rotation.z;

  strokeWeight(3);
  stroke(255,0,0);

    // ging.displayAxes();
  // point(ging.origin.pVerts[0].x,ging.origin.pVerts[0].y)
  }



function keyPressed() {

  if (key === 'x') {
    axis = 'x'
  } else if (key === 'y'){
           axis = 'y'
  } else if (key === 'z'){
        axis = 'z'
  } else if (key === 'e'){
    exportParams(params);
  }

  if (keyCode === UP_ARROW) {
    // Code to run.
    boxCenter.rotateMesh(radians(-w.rotation),'x',w.sp2);
    boxCenter.rotateMesh(radians(5),axis);
    boxCenter.rotateMesh(radians(w.rotation),'x',w.sp2);
  } else if (keyCode === DOWN_ARROW){
    boxCenter.rotateMesh(radians(-w.rotation),'x',w.sp2);
    boxCenter.rotateMesh(radians(-5),axis);
    boxCenter.rotateMesh(radians(w.rotation),'x',w.sp2);
  }
}

function projectPointToGround(point, altitude, azimuthA){
  var v = p5.Vector.fromAngles(radians(altitude),radians(azimuthA))
  var vMag = point.y / cos(radians(altitude))
  v.setMag(vMag);
  // v.x += point.x;
  // v.z += point.z;
  v.add(point)
  return v;
}
