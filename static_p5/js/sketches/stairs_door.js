var e,r,e2,r2;

loadParams = false;
var paramName = 'building'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -1000,
  locationZ: -0,
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
  background(0);

  movers = [];
  params.noiseSeed = 88767.3074244767


  noiseSeed(params.noiseSeed)

  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  var p = pointOnGround(ging, -0,5000)
  var p2 = pointOnGround(ging, random(-30,30),random(3000,10000))
  var p4 = pointOnGround(ging, random(-30,30),random(3000,10000))
  p2[1].z = 1000
  var p3 = pointOnGround(ging, 0,1000)
// var ps = []
//   console.log('pp')
//   console.log(p)
//   console.log(p3)
var ps = [p3[1],p2[1]];

//   var o = createVector(0,0,0);
//   ps.push(o)
//   for (let i = 0;i<100;i++){
//   var end = placePoint3D(o, random(90,180),random(360),100);
//   ps.push(end)
//   o = end
//
//   var angles = getAngle3D(o,end)
//   console.log(angles)
//   var end2 = placePoint3D(end, angles[0]+90,angles[1]+90,100);
// }
  r = new Rect3D(createVector(0,0,0),400,50)
  // r.rotate(radians(90),'x')
  r2 = new Rect3D(p2[1],100,500,true)
  r2.rotate(radians(90),'x')
  // e = new Line3D([createVector(0,0,0),createVector(1000,1000,0),createVector(-1000,2000,0),createVector(-1500,4000,1000)])
  e = new Line3D(ps)
  e.smoothChaikin(4)
  r = arrayOnLine(r,e,80)
  // e2 = new Line3D([end,end2])
  // e2



  // e = new Ellipse3D(createVector(0,1000,0),100,100,20)
}

function draw() {
  // background('#ffe8b2');
  background(0,0,40)
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
  // e.display(ging)
  // e2.display(ging)
  fill(255,150)
  for (let i = 0;i<r.length;i++){
    r[i].display(ging)
  }
  r2.display(ging)
  var hl = ging.displayHL();

// for (let i = 0;i<shapes.length;i++){
//   shapes[i].display(ging)
//   // console.log('hye')
// }


  fill(0)
  text("x: " + ging.rotation.x.toString(),50,50)
  text("z: " +ging.rotation.z.toString(),50,75)
  text("Cam location",50,100)
  text("X: " + (ging.location.x ).toString(),50,120)
  text("Y: " + (ging.location.y ).toString() ,50,140)
  text("Z: " + (ging.location.z ).toString(),50,160)

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
