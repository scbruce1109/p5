var ging, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e,r
var g,g2,g3,t;

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -1000,
  locationZ: 0,
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
  background(255);

  m = new Mover3D(createVector(0,0,0),1)

  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  // e = new Box3D(createVector(0,0,0),100,100,100);
  r = new Rect3D(createVector(0,0,0),100,100)
  r.rotate(PI/2,'x')
  t = 10000

  movers = [];
  for (let i = 0;i<1000;i++){
    var m = new Mover1(random(width),random(height),5,2);
movers.push(m)
  }
}





function draw() {
  background(255)
// noFill();
stroke(255,0,0,20)
fill(255,0,0,50)
// r.rotate(PI/180,'z')

ging.displayHL();
m.display(ging)
m.location.z += map(noise(t),0,1,-1,1);
t+=0.01
r.display(ging)

for (let i = 0;i<movers.length;i++){
  movers[i].addForce(g3.getValue(movers[i].location.x,movers[i].location.y).v)
  movers[i].display();
}

// var f = r.display(ging,true)
// fillPoly(f[0],100)


// var shadow = castShadow(r,45)
// console.log(shadow)
//
// shadow = new myShape(shadow)
// shadow.display()


// e.translate(createVector(0,0,cos(radians(ding))))
//
// e.scale(cos(radians(ding)))
// ding+= .1;


key3d();

  }





















function castShadow(mesh, angle){
  var shadow = [];
  for  (let j = 0;j<mesh.faces.length;j++){
    var sface = []
  for (let i = 0;i<mesh.faces[j].length;i++){
    var zoob = projectPointToGround(mesh.faces[j][i],90-35,-90);
    // var goob = p5.Vector.add(rec[i],zoob;)
    // var goob = ging.project([zoob]);
    shadow.push(zoob)
    // line(recProjec[i].x,recProjec[i].y,goob[0].x,goob[0].y)

  }
  // shadow.push(sface)
}
  // return new Mesh(createVector(me))
  return shadow
}



function projectPointToGround(point, altitude, azimuthA){
  var v = p5.Vector.fromAngles(radians(altitude),radians(azimuthA))
  var vMag = point.z / cos(radians(altitude))
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
