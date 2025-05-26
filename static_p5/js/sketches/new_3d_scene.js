var e,r,e2,r2,g1,shapes;

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
  createCanvas(600, 900);
  background('#ffffff');

  g1 = new ColorGrid(0,0,width,height,5);

  movers = [];
  params.noiseSeed = 88767.3074244767


  noiseSeed(params.noiseSeed)
  shapes = []
  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});
  for (let i = 0;i<200;i++){
    var p = placePoint3D(createVector(0,0,0),random(360),random(360),500);

    e = new Sphere3D(p,50)
    shapes.push(e);
  }

  // r = new Box3D(createVector(0,0,0),100,100,100)

  // e = new Ellipse3D(createVector(0,1000,0),100,100,20)
}

function draw() {
  background('#ffe8b2');
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
// noFill();
// noStroke();
fill(255,80)
  // e.display(ging)
  // noFill();
  // r.display(ging);
  // e2.display(ging)

  var hl = ging.displayHL();

for (let i = 0;i<shapes.length;i++){
  shapes[i].display(ging)
  // console.log('hye')
}


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
