var ging, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e,r
var g,g2,t,sort, lats;

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -1000,
  locationZ: 300,
  rotationX: 0,
  rotationY: -0,
  rotationZ: 0
}

var colors = ['#da5b0a',
'#ffc500',
'#d5f5ff',
'#bd6c40',
]

// colors = ["#515e67","#f1e0ac",'#ff9c5e',"#515e67"]



var pal = []



function setup() {
  createCanvas(600, 600);
  background('#d5f5ff');
  w = ''

  sort = []

  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  // e = new Box3D(createVector(0,0,0),100,100,100);
  // r = new Sphere3D(createVector(0,0,0),100,100)
  lats = []
  scaleA = 0;
  var num = 18
  for (let i = 0;i<num;i++){
  z = cos(scaleA) * 100
  e = new Ellipse3D(createVector(0,0,0+z),100*sin(scaleA),100*sin(scaleA),20)
  e2 = new Ellipse3D(createVector(0,0,0),100,100,20)
  e2.rotate(PI/2,'x')
  e2.rotate(scaleA,'z')
  e.rotate(radians(23),'y',createVector(0,0,0))
  e2.rotate(radians(23),'y')
  scaleA += PI / num;
  lats.push(e);
  lats.push(e2);
}
  // r.rotate(PI/2,'x')
  t = 10000

}





function draw() {
  background(255)

// var sort = sortPoints(movers,ging,true)
var ding = sort[0]
var range = (sort[2] - sort[1])*5

var rc = color('#d5f5ff')
rc.setAlpha(0.2)
noFill();
stroke(0,75)
ging.displayHL();
e.display(ging)
for (let i = 0;i<lats.length;i++){
  lats[i].display(ging)
}
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
