var cam, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e,r,ss
var g,g2,t,sort,l2
var palette
var displayRect, frameCount
var axis, box,guides

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -600,
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
  background('#ffffff');
  w = ''
  displayRect = true
  shapes = [];

  frameCount = 0;
  axis = 'z'

  guides = true
  // shapes.push(new Sphere3D(createVector(0,0,0),100))
  // var s = new Sphere3D(createVector(200,0,0),100);
  // console.log(s.center.dist(shapes[0].center))
  // console.log(s.collision(shapes))
  // shapes.push(s)

  r = new Rect3D(createVector(0,0,0),100,100)
  r.strokeC = color(255,0,0)
  r.strokeW = 5
  r.raw = true
  r.guide = true
  e = new Ellipse3D(createVector(0,0,0),Math.sqrt(5000),Math.sqrt(5000),100)
  e.strokeC = color(0,0,0,100)
  e.strokeW = 1
  e.guide = true

  box = new Box3D(createVector(0,0,0),100,100,100,true)

  var r2 = new Rect3D(createVector(0,0,100),100,100)
  r2.strokeC = color(255,0,0)
  r2.strokeW = 5
  r2.raw = true
  r2.guide = true
  var e2 = new Ellipse3D(createVector(0,0,100),Math.sqrt(5000),Math.sqrt(5000),100)
  e2.strokeC = color(0,0,0,100)
  e2.strokeW = 1
  e2.guide = true
  // e.raw = false
  shapes.push(e)
  shapes.push(r)
  shapes.push(box)

  shapes.push(e2)
  shapes.push(r2)

  // for (let a = 0;a < 360; a += 360/48){
  //   ellipse(width/2,height/2,200,200)
  //
  //   line(200,150,400,150)
  //   var x = width/2 + cos(radians(a)) * 100;
  //   var y = height/2 + sin(radians(a)) * 100;
  //   ellipse(x,y,5,5)
  //   ellipse(x,150,5,5)
  //   text((a % 360).toString(),20,20);
  //   // a += 360/48;
  //   name = "rotation_" + i  + ".png"
  //   i ++;
  //
  //   // saveCanvas(name)
  //   // setTimeout(1000)
  //   clear();
  // }


  // for (let i = 0;i<10;i++){
  //   var p = placePoint3D(createVector(0,0,0), random(360),random(360),random(250))
  //   var s = new Sphere3D(p, random(200))
  //   s.c = color(random(255),random(255),0)
  //   s.c.setAlpha(50)
  //   if (!s.collision(shapes)){
  //     if (i != 0){
  //       console.log('fumpu')
  //       console.log(s.radius)
  //     while(!s.collision(shapes)){
  //       console.log('yoingus')
  //       s.radius += 2
  //       // console.log(s.radius)
  //     }
  //   }
  //   console.log('radius2')
  //   console.log(s.radius)
  //   shapes.push(s)
  // }
  // }

  var v = 0;
  while (v <10){
    console.log('din ding')
    v ++
  }

  cam = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  for (let j = 0;j<6;j++){
    cam.displayHL()

    var name = "rotation_" + j  + ".png"

      // frameCount += 1

  var sort = sortPoints(shapes,cam)
  // console.log(sort)
  // fill(0.550)
  for (let i = 0;i<sort[0].length;i++){
    // fill(sort[0][i].c)
  if (sort[0][i].c){
    fill(sort[0][i].c)
  }
  if (sort[0][i].strokeC){
    stroke(sort[0][i].strokeC)
    strokeWeight(sort[0][i].strokeW)
  } else {
    stroke(0)
    strokeWeight(1)
    // strokeWeight(sort[0][i].strokeW)
  }
    // sort[0][i].radius += 2
    if (sort[0][i].raw == true){
      if (sort[0][i].guide == true){
        if (guides){
          sort[0][i].displayPoints(cam)
        }
      } else {
      sort[0][i].displayPoints(cam)
    }
    } else {
      if (sort[0][i].guide == true){
        if (guides){
          sort[0][i].display(cam)
        }
      } else {
      sort[0][i].display(cam)
    }

    }

  }
  // saveCanvas(name)
clear()
for (let i = 0;i<sort[0].length;i++){
  shapes[i].rotate(radians(-15),axis)
}
}

}





function draw() {
  background(255)
noFill();
stroke('black')
strokeWeight(1)
cam.displayHL();


var sort = sortPoints(shapes,cam)
// console.log(sort)
// fill(0.550)
for (let i = 0;i<sort[0].length;i++){
  // fill(sort[0][i].c)
if (sort[0][i].c){
  fill(sort[0][i].c)
}
if (sort[0][i].strokeC){
  stroke(sort[0][i].strokeC)
  strokeWeight(sort[0][i].strokeW)
} else {
  stroke(0)
  strokeWeight(1)
  // strokeWeight(sort[0][i].strokeW)
}
  // sort[0][i].radius += 2
  if (sort[0][i].raw == true){
    if (sort[0][i].guide == true){
      if (guides){
        sort[0][i].displayPoints(cam)
      }
    } else {
    sort[0][i].displayPoints(cam)
  }
  } else {
    if (sort[0][i].guide == true){
      if (guides){
        sort[0][i].display(cam)
      }
    } else {
    sort[0][i].display(cam)
  }
  }

}










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
  text("x: " + r.rotation.x.toString(),50,50)
  text("z: " +degrees(r.rotation.z).toString(),50,75)
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
  } else if (key === 'g'){
    if (guides == true){
      guides = false
    } else {
      guides = true
    }
  }

  if (keyCode === UP_ARROW) {
    for (let i = 0;i<shapes.length;i++){
    // shapes[i].rotate(radians(5),axis)
    shapes[i].rotate(radians(5),axis)
  }
    // Code to run.
    // boxCenter.rotateMesh(radians(-w.rotation),'x',w.sp2);
    // boxCenter.rotateMesh(radians(5),axis);
    // boxCenter.rotateMesh(radians(w.rotation),'x',w.sp2);
  } else if (keyCode === DOWN_ARROW){
    for (let i = 0;i<shapes.length;i++){
    // shapes[i].rotate(radians(-5),axis)
    shapes[i].rotate(radians(-5),axis)
  }
    // boxCenter.rotateMesh(radians(-w.rotation),'x',w.sp2);
    // boxCenter.rotateMesh(radians(-5),axis);
    // boxCenter.rotateMesh(radians(w.rotation),'x',w.sp2);
  }
}
