var cam, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e,r,ss
var g,g2,t,sort,l2
var palette

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -1000,
  locationZ: 200,
  rotationX: 0,
  rotationY: -0,
  rotationZ: 0
}

var colors = [
'#91b3d5',
// '#2c587c',
// '#45607c',
// '#91af8d',
// '#9baf70',
// '#acaf96',
// '#2c587c',
'#c3cfca',
'#9cb2b3',
// '#867b26',
// '#5c541a',

// '#baccce',
]

// colors = ["#515e67","#f1e0ac",'#ff9c5e',"#515e67"]



var pal = []



function setup() {
  createCanvas(600, 600);
  // background('#d5f5ff');
  background(255)
  w = ''

  palette = new colorPalette(colors);
  sort = []

var az = 0;
var alt = 0
var points = [];
var t = 1000
var t2 = 1000000


var p = createVector(0,0,0);

var a = 0
var z = 0;
var r = 400
var yy = 0
  for (let i = 0;i<2000;i++){
    var x = p.x + cos(radians(a))*r;
    var y = p.y+yy + sin(radians(a))*r;
    pp = createVector(x,y,z)
    // var pp = placePoint3D(p,az,alt,1100)
    points.push(pp);
    az += noise(t)*10//random(-10,10)
    alt += noise(t2)*10//random(-10,10)
    // console.log(noise(t))
    t += 0.1
    t2 += 0.1
    // yy +=1

    // z += 1
    a += 1
    r -=.2

  }
  console.log(points)

  l = new Line3D(points)
  // l = new Line3D([createVector(0,0,0),createVector(500,0,0),createVector(1000,1000,0)])

  l.smoothChaikin(4)


  cam = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});
  // g = new ColorGrid(0,0,width,height,10)
  // g.fillGradient(colors)
  // g.display()
  // paintStrokes(1000,g)
  // e = new Box3D(createVector(0,0,0),100,100,100);
  r = new Rect3D(createVector(0,0,0),100,100)


  var lineAngle = l.getAngle(0.2)
  console.log(lineAngle)
  var pp = placePoint3D(lineAngle[2],lineAngle[0]+90,lineAngle[1]+90,100)
  // ss = new Sphere3D(pp,100,20)
  ss = new Line3D([lineAngle[2],pp])

  // l2 = new Line3D(lpoints)
  // r.rotate(PI/2,'x')
}





function draw() {
  // background(255)
noFill();
stroke('black')
// var sort = sortPoints(movers,ging,true)
// cam.displayHL()
// r.display(cam)

// console.log(pp)

// l.display(cam)

for (let i = 0;i<100;i++){
  var lineAngle = l.getAngle(random(1))
  console.log(lineAngle)
  var pp = placePoint3D(lineAngle[2],lineAngle[0]+90,lineAngle[1]+90,Math.abs(randomGaussian(0,200)))
  stroke(0,10)
  var c = new Sphere3D(pp,1)
  c.display(cam)
}

stroke('red')
// ss.display(cam)


// r.fill()
// r.translate(createVector(random(-1,1),random(-1,1),1))

// for (let i = 0;i<ding.length;i++){
//   m = ding[i]
//   var d = p5.Vector.dist(m.mesh.center,createVector(0,0,0)); //map(m.life,200,0,0,1)
//   // var c = lerpColor(m.color,color(255),Math.abs(d/range))
//   var c = lerpColor2(m.color,color('#d5f5ff'),map(m.life,500,0,0,1), "MIX", null, null, LINEAR_)
//   // var c =
//   c.setAlpha(0.10)
//   stroke(c)
//   fill(c)
// }

key3d(cam);

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





















function key3d(camera){
  if (keyIsPressed === true) {
    if (key === 'w'){
  camera.translate(w,createVector(0,10,0))
} else if (key === 's'){
  camera.translate(w,createVector(0,-10,-0)) ////sin(radians(ging.rotation.x))*10
}  else if (key === 'a'){
  camera.translate(w,createVector(-10,0,-0))
} else if (key === 'd'){
  camera.translate(w,createVector(10,0,-0))
} else if (key === 'y'){
  camera.translate(w,createVector(-0,0,10))
} else if (key === 'h'){
  camera.translate(w,createVector(0,0,-10))
} else if (key === 'l'){
  camera.rotate(w,0,0,-.5)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'k'){
  camera.rotate(w,-0,0,.5)
  // w.rotate(ging.sp2,-5,'x')
}else if (key === 'u'){
  camera.rotate(w,.5,0,0)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'j'){
  camera.rotate(w,-.5,0,0)
  }
}

  // fill(0)
  // text("x: " + camera.rotation.x.toString(),50,50)
  // text("z: " +camera.rotation.z.toString(),50,75)
  // text("Cam location",50,100)
  // text("X: " + (camera.location.x ).toString(),50,120)
  // text("Y: " + (camera.location.y ).toString() ,50,140)
  // text("Z: " + (camera.location.z ).toString(),50,160)

  params.locationX = camera.location.x;
  params.locationY = camera.location.y;
  params.locationZ = camera.location.z;
  params.rotationX = camera.rotation.x;
  params.rotationY = camera.rotation.y;
  params.rotationZ = camera.rotation.z;

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
