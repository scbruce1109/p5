var cam, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e,r,ss
var g,g2,t,sort,l2
var palette
var displayRect, l3

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
  background('#d5f5ff');
  w = ''
  displayRect = true

  cam = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});



  m = new Mover3D(createVector(0,0,200),2)
  // var p2 = createVector(random(400),random(400),1000)
  p = createVector(0,0,0)
  var p2 = createVector(1000,0,1000)
var dif = p5.Vector.sub(p,p2);
var p3 = p5.Vector.add(p2,dif);

  var a = getAngle3D2(p,p2)
  var v = vectorFromAngles(a[0],a[1],100)
  v = p5.Vector.add(v,p2);
  dif.setMag(100);


  l = new Line3D([p2,p3])
  l2 = new Line3D([p2.copy(),v])


  var v2 = vectorFromAngles(-45,270,100);
  v2.add(p)
  l3 = new Line3D([p,v2])
  console.log(getAngle3D2(p,v2))
  l2.translate(createVector(100,0,0))
  g = new Grid2D(p,1000,1000,100)
  g.rotate(radians(90),'x')

  // m = new Mover_3D()
  // r = new Rect3D(createVector(0,0,0),200,200)
  // e = new Ellipse3D(createVector(0,0,0),100,100,100)
  // r.rotate(radians(90),'x')
  // e.rotate(radians(90),'x')

}

class IDW_Mover extends Mover_3D{


}



function draw() {
  background(255)
noFill();
stroke('black')
// var sort = sortPoints(movers,ging,true)
cam.displayHL()
// if (displayRect){
// r.display(cam)
// }

var a = getAngle3D2(m.location,p)
var v = vectorFromAngles(a[0],a[1]+90)
v.setMag(2)
m.addForce(v);
// m.location.add(v)
m.display(cam)

// l.display(cam)
// l2.display(cam)
l3.display(cam)
// g.displayProjected(cam)


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
} else if (key === 'r'){
  if (displayRect == true){
    displayRect = false
  } else {
    displayRect = true
  }
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
    r.rotate(radians(5),axis)
    e.rotate(radians(5),axis)
    // Code to run.
    // boxCenter.rotateMesh(radians(-w.rotation),'x',w.sp2);
    // boxCenter.rotateMesh(radians(5),axis);
    // boxCenter.rotateMesh(radians(w.rotation),'x',w.sp2);
  } else if (keyCode === DOWN_ARROW){
    r.rotate(radians(-5),axis)
    e.rotate(radians(-5),axis)
    // boxCenter.rotateMesh(radians(-w.rotation),'x',w.sp2);
    // boxCenter.rotateMesh(radians(-5),axis);
    // boxCenter.rotateMesh(radians(w.rotation),'x',w.sp2);
  }
}
