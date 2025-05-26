var sp, ml, hl, mpl, mpr, vpl, vpr, cv, rotation,recCenter,ging, axis, w;
var lineMesh,sphereMesh,sphereMesh2,m,rec,v,v1,shapes,recp,sphe,sphe2;
var tings,movers, horz, line1, line2,rec2;

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
  background(255);

  movers = [];
  params.noiseSeed = 88767.3074244767


  noiseSeed(params.noiseSeed)

  noFill();
  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  recp = [
    createVector(-50,-50,-0),
    createVector(-50,50,0),
    createVector(50,50,0),
    createVector(50,-50,0),
  ]

  line1 = [createVector(0,0,0),createVector()]

  // rec = new Ellipse3D(createVector(0,0,0),500,500,40)
  console.log('rec')
  console.log(rec)

  // rec.translate(createVector(100,200,200))
  // rec.rotate(radians(45),'y')

  // rec2 = makeRect(createVector(0,0,0),500,500,true)
  var tt = [
    createVector(0,0,0),
    createVector(0,0,300),
    createVector(300,300,700)
  ]
  shapes = [];
  var p = pointOnGround(ging, random(-30,30),random(50000))
  var p2 = pointOnGround(ging, random(-30,30),random(50000))
  p2[1].z = 0
  var p3 = pointOnGround(ging, random(-30,30),random(50000))
  rec = new Line3D([p[1],p2[1],p3[1]])
  rec.smoothChaikin(6)
  var ps = rec.randomPoints(200);
  for (let j=0;j<ps.length;j++){
    var r = new Box3D(ps[j],200,200,random(4000),true)
    // r.rotate(radians(90),'x')
    shapes.push(r)

  }

  for (let i = 0;i<100;i++){
    var d = random(100,50000)
    var p = pointOnGround(ging, -30,d)
    var p2 = pointOnGround(ging, 30,d)
    var line = new Line3D([p[1],p2[1]])
    var ps = line.randomPoints(20);
    for (let j=0;j<ps.length;j++){
      var r = new Rect3D(ps[j],100,50)
      // r.rotate(radians(90),'x')
      shapes.push(r)

    }
    // recc.display(ging)
    shapes.push(line)
  }
  console.log(shapes)
  rec2 = new Box3D(createVector(0,2000,0),200,200,400,true)

  // rec2.rotate(radians(90),'x')
  // rec.rotate(radians(45),'z')
//   for (let i =0;i<1000;i++){
//   v = placePointOnPlane(rec.faces[0],random(1),random(1))
//   var m = new Mover3D(v,1)
//   movers.push(m);
// }


  horz = fovWidth(ging,500000)


  // shapes = arrayOnLine(rec,createVector(0,0,0),createVector(0,0,4000),8)


  var rott = 0


zoob = pointOnGround(ging,0,10000)
tings = [v,zoob];
  // ging.initWorld(w)
  // console.log('uhhh')
  // console.log(ging.location.copy())
  ging.displayHL()

  fill(200,0,0,100)
  // sphe2.display(ging)
  noStroke()
  rec.display(ging)
  console.log(params)
}

function draw() {
  // background('#ffe8b2');
  background(255)
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

  var hl = ging.displayHL();
  // rec.rotate(radians(1),'z')
  noFill()
  rec.display(ging)
  fill(200,0,0,40)
  stroke(200,0,0,40)
  // sphe2.display(ging)
  // noStroke()

  // noFill();
  // rec2.display(ging);
//
// sphe.display(ging)
// noFill()
for (let i = 0;i<shapes.length;i++){
  shapes[i].display(ging)
  // console.log('hye')
}
// ellipse(ging.project([v])[0].x,ging.project([v])[0].y,20,20)
var lineps = [v]
lineps = ging.project(horz)
// console.log(lineps)
var zink = new PolyLine(lineps)
// stroke(0)
zink.display()
noStroke();
ellipse(lineps[0].x,lineps[0].y,10,10)
// for (let i =0;i<movers.length;i++){
// var x = -map(noise(movers[i].location.x*0.002),0,1,-1,1);
// var y = map(noise(movers[i].location.y*0.002),0,1,-1,1);
// var z = -map(noise(movers[i].location.z*0.002),0,1,-1,1);
//
// var zzz = createVector(x,y,z)
// movers[i].addForce(zzz);
// movers[i].display(ging)
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
