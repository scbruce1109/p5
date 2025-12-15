var ging, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e,ls
var g1,g2

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -1000,
  locationZ: 0,
  rotationX: -0,
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
  var cp1 = [
    '#ffffff',
    '#dcff8b',
    '#78a1bc'
  ]

  pPoints = [
    createVector(random(width),random(height)),
    createVector(random(width),random(height)),
    createVector(random(width),random(height))
  ]
  g1 = new ColorGrid(0,0,width,height,5);
  g2 = new ColorGrid(0,0,width,height,5);
  g1.fillGradient(cp1)
  g2.fillColor([color("#ff7a40"),color("#ffe040"),color("#00016b")],pPoints,300,g1)
  g1.display();
  g2.jitterGrid(5)
  g2.display()
  for (let i =0;i<1000;i++){
    // var p = placePoint(createVector(width/2,height/2),200,false)
    var p = createVector(random(width),random(height))
    var c1 = g2.getValue(p.x,p.y).c
    c1.setAlpha(0.1)
    fill(c1);
    noStroke();
    // rect(random(width),random(height),random(100),random(100))
    var zoop = generatePoints(p.x, p.y,random(200),random(200),Math.floor(random(3,8)))
    var ding = new myShape(zoop,true)
    ding.offsetPoints(random(50))
    ding.subdivide(2)
    // console.log(ding.points)
    ding.offsetPoints(random(20))
    ding.subdivide(2)
    // console.log(ding.points)
    ding.offsetPoints(random(50))
    // var c1 = g1.getValue(bgGrid.points[i][j].x,bgGrid.points[i][j].y).c
    // c1.
    ding.smoothChaikin(2)
    ding.offsetPoints(random(5))
    ding.smoothChaikin(2)
    ding.offsetPoints(random(10))
    // ding.smoothChaikin(2)
    ding.display()
  }

  // c = createVector(0,0,0)

  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  var glurp = fovWidth(ging,10000)

  ls = [];

  for (let i = 0;i<10;i++){
    var p = placePoint3D(createVector(0,0,0),0,random(360),randomGaussian(300,200))
    var sp = spherePoints(p,randomGaussian(100,50),100)
    console.log(sp)
    // l = new Mesh(createVector(0,0,0),[sp])
    l = new Mesh(p,[sp])
    ls.push(l)
  }




  e = new Ellipse3D(createVector(0,0,100),100,100,100);
  // e.rotate(radians(90),'x')
}





function draw() {
  // background(0)
// noFill();
stroke(360,.05)
// stroke(255,10)

for (let i = 0;i<ls.length;i++){
  ls[i].rotate(PI/180,'x')
  ls[i].rotate(PI/180*20,'z')
  // ls[i].scale(0.999)
  ls[i].displayPoints(ging)
}

// l.translate(createVector(0,0,-.01))
// l.scale(0.999)
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
