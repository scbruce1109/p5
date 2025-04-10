var sp, ml, hl, mpl, mpr, vpl, vpr, cv, rotation,recCenter,ging, axis, w;
var lineMesh,sphereMesh,sphereMesh2,m,rec,v,v1,shapes,recp,sphe,sphe2;
var tings,movers

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: 1000,
  locationZ: -8000,
  rotationX: 15,
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
  createCanvas(600, 900);
  background(255);

  movers = [];
  params.noiseSeed = 88767.3074244767


  noiseSeed(params.noiseSeed)

  noFill();
  w = new World(0,0,width,height,createVector(0,0,0));
  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  recp = [
    createVector(-50,0,-200),
    createVector(-50,0,200),
    createVector(50,0,200),
    createVector(50,0,-200),
  ]

  rec = new Mesh(createVector(0,0,0),[recp])
  rec.translate(createVector(0,2000,0))
  rec.rotate(radians(90),'x')
  rec.rotate(radians(45),'y')
  for (let i =0;i<1000;i++){
  v = placePointOnPlane(rec.faces[0],random(1),random(1))
  var m = new Mover3D(v,random(100))
  movers.push(m);
}
  console.log(v)


  // shape = new Polygon_3d(recp,createVector(0,0,0))
  shapes = arrayOnLine(rec,createVector(0,0,0),createVector(0,0,2000),50)
  // shapes = makeArray([rec],500,20,'z')
  // shapes = makeArray(shapes,200,5,'y')
  // shapes = makeArray(shapes,500,5,'x')
  console.log('shapes')
  console.log(shapes)
  var rott = 0
  // for (let i = 0;i<40;i++){
  //   var shape = new Ellipse_3D(50,createVector(0,0,0),200,200)
  //
  //   shape.rotate(rott,'x')
  //   // shape.rotate(random(360),'y')
  //   // shape.rotate(random(360),'z')
  //   shapes.push(shape)
  //   rott += 10
  // }

  sphe = new Ellipse_3D(100,createVector(0,0,0),400,400)
  sphe2 = new Ellipse_3D(100,createVector(0,0,0),400,400)
  sphe2.rotate(23.5,'x')
  // sphe2.translate(0,-0,-600)

  // shape.display(ging)
  console.log('shape')
  console.log(sphe)

//   boxCenter = makeBox(createVector(0,0,0),100,100,100,'e');
// w.objects.push(boxCenter);

//rec = [createVector(0,0,0),createVector(0,0,200),createVector(0,600,200),createVector(0,600,0)]

// v1 = createVector(0,0,0);
// v = p5.Vector.fromAngles(radians(90), radians(90-ging.rotation.y),100)
// v.setMag(400)

// v = placePointInFov(ging,0,0)
// v = ging.location.copy()
// zoob = projectPointToGround(v,90-45,-20)
zoob = pointOnGround(ging,0,10000)
tings = [v,zoob];
  // ging.initWorld(w)
  console.log('uhhh')
  console.log(ging.location.copy())
  ging.displayHL()
  w.display(ging);

  fill(200,0,0,100)
  // sphe2.display(ging)
  noStroke()
  rec.display(ging)
  console.log(params)
}

function draw() {
  // background('#ffe8b2');
  strokeWeight(1)
  stroke(0,100);

  if (keyIsPressed === true) {
    if (key === 'w'){
  ging.translate(w,createVector(0,sin(radians(ging.rotation.x))*-10,10))
} else if (key === 's'){
  ging.translate(w,createVector(0,sin(radians(ging.rotation.x))*10,-10))
}  else if (key === 'a'){
  ging.translate(w,createVector(-10,0,-0))
} else if (key === 'd'){
  ging.translate(w,createVector(10,0,-0))
} else if (key === 'y'){
  ging.translate(w,createVector(-0,10,-0))
} else if (key === 'h'){
  ging.translate(w,createVector(0,-10,-0))
} else if (key === 'l'){
  ging.rotate(w,0,-.5,0)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'k'){
  ging.rotate(w,-0,.5,0)
  // w.rotate(ging.sp2,-5,'x')
}else if (key === 'u'){
  ging.rotate(w,.5,0,0)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'j'){
  ging.rotate(w,-.5,0,0)
  }
}

  var hl = ging.displayHL();
  w.display(ging);
  // rec.rotate(radians(1),'y')
  noFill()
  fill(200,0,0,4)
  // sphe2.display(ging)
  noStroke()
  // rec.display(ging)
//
// sphe.display(ging)

for (let i = 0;i<shapes.length;i++){
  // shapes[i].display(ging)
}
// ellipse(ging.project([v])[0].x,ging.project([v])[0].y,20,20)
var lineps = [v]
lineps = ging.project(lineps)
// console.log(lineps)
// var zink = new PolyLine(lineps)
// zink.display()
ellipse(lineps[0].x,lineps[0].y,10,10)
for (let i =0;i<movers.length;i++){
var x = -map(noise(movers[i].location.x*0.002),0,1,-1,1);
var y = map(noise(movers[i].location.y*0.002),0,1,-1,1);
var z = -map(noise(movers[i].location.z*0.002),0,1,-1,1);

var zzz = createVector(x,y,z)
movers[i].addForce(zzz);
movers[i].display(ging)
}


  fill(0)
  text("x: " + ging.rotation.x.toString(),50,50)
  text("y: " +ging.rotation.y.toString(),50,75)
  text("Cam location",50,100)
  text("X: " + (ging.location.x - w.x).toString(),50,120)
  text("Y: " + (ging.location.y - w.y).toString() ,50,140)
  text("Z: " + (ging.location.z - w.z).toString(),50,160)

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
