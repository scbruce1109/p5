var ging, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -1000,
  locationZ: 1000,
  rotationX: 0,
  rotationY: -0,
  rotationZ: 0
}



function setup() {
  frameRate(200)

  w = ''
  // ding = 360;
  colors = [
    color(255,0,0),
    color(0,20,255)
  ]

  createCanvas(600, 600);
  background(35);

  // c = createVector(0,0,0)

  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  var glurp = fovWidth(ging,10000)

  var sp = spherePoints(createVector(0,0,0),200,400)
  console.log(sp)
  l = new Mesh(createVector(0,0,0),[sp])

  e = new Ellipse3D(createVector(0,0,100),100,100,100);
  // e.rotate(radians(90),'x')
}





function draw() {
  // background(0)
noFill();
stroke(255,10)
// l.rotate(PI/180,'x')
l.rotate(PI/180*20,'z')
l.displayPoints(ging)
// l.translate(createVector(0,0,-.01))
l.scale(0.999)
// stroke(0,10)
// e.display(ging)
// var dings = ging.project(ding)
// for (let i = 0;i<dings.length;i++){
//   point(dings[i].x,dings[i].y)
//   console.log('hey')
// }
// ging.displayHL();

// e.translate(createVector(0,0,cos(radians(ding))))
//
// e.scale(cos(radians(ding)))
// ding+= .1;


key3d();

  }





















function castShadow(mesh, angle){
  var shadow = [];
  for (let i = 0;i<rec.length;i++){
    var zoob = projectPointToGround(rec[i],90-35,-90);
    // var goob = p5.Vector.add(rec[i],zoob;)
    // var goob = ging.project([zoob]);
    shadow.push(zoob)
    // line(recProjec[i].x,recProjec[i].y,goob[0].x,goob[0].y)

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





















function key3d(){
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
