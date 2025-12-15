var cam, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e,r
var g,g2,t,sort,l2
var palette

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -10000,
  locationZ: 100,
  rotationX: -0,
  rotationY: -0,
  rotationZ: 0
}

var colors = [
'#91b3d5',
'#2c587c',
'#45607c',
'#91af8d',
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
  // background('#78a298');
  w = ''

  palette = new colorPalette(colors);
  sort = []

var az = 0;
var alt = 0
var points = [];
var t = 1000
var t2 = 1000000


var p = createVector(0,0,0);


  // for (let i = 0;i<100;i++){
  //   var pp = placePoint3D(p,az,alt,100)
  //   points.push(pp);
  //   az += noise(t)*10//random(-10,10)
  //   alt += noise(t2)*10//random(-10,10)
  //   // console.log(noise(t))
  //   t += 0.1
  //   t2 += 0.1
  //
  // }
  // console.log(points)

  // l = new Line3D(points)


  cam = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});
  // g = new ColorGrid(0,0,width,height,10)
  // g.fillGradient(colors)
  // g.display()
  // paintStrokes(1000,g)
  // e = new Box3D(createVector(0,0,0),100,100,100);
  r = new Rect3D(createVector(0,0,0),100,100)
  movers = []
  for (let i = 0;i<2;i++){
  var v = placePoint3D(createVector(0,0,0),random(2*PI),random(2*PI),Math.abs(randomGaussian(300,600)))
  var m = new Mover3D(createVector(0,0,0),10)
  m.life = random(200)
  m.col  = colors[Math.floor(random(colors.length))]
  // m.c.setAlpha(20)
  console.log(m.col)
  movers.push(m)
  }



  // l2 = new Line3D(lpoints)
  // r.rotate(PI/2,'x')
}





function draw() {
  // background(255)
noFill();
// var sort = sortPoints(movers,ging,true)
cam.displayHL()
r.display(cam)

var rez = 0.001
if (movers.length <500){
for (let i = movers.length - 1; i >= 0; i--){
  m = movers[i]
  console.log(m.col)
  var c = color('#fff200')
  c.setAlpha(10)
stroke(c)
noFill();
var f = noise(m.location.x*rez,m.location.y*rez,m.location.z*rez)
var d = map(f, 0,1, 0,4*PI)
var v = p5.Vector.fromAngles(radians(90+random(-90,90)),-radians(random(-120,120)),1)
m.addForce(v)
m.display(cam);
m.life -= 1

if (m.life <=0){
  var m2 = new Mover3D(m.location.copy(),10)
  var m3 = new Mover3D(m.location.copy(),10)
  m2.life = random(100)
  m3.life = random(100)
  m2.col  = colors[Math.floor(random(colors.length))]
  m3.col  = m.col
  m3.col  = colors[Math.floor(random(colors.length))]
  movers.splice(i,1)
  movers.push(m3)
  movers.push(m2)

}
}
}

// console.log(pp)


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

  fill(0)
  text("x: " + camera.rotation.x.toString(),50,50)
  text("z: " +camera.rotation.z.toString(),50,75)
  text("Cam location",50,100)
  text("X: " + (camera.location.x ).toString(),50,120)
  text("Y: " + (camera.location.y ).toString() ,50,140)
  text("Z: " + (camera.location.z ).toString(),50,160)

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
