var cam, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e,r,ss
var g,g2,t,sort,l2
var palette, lines
var print = false;

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 5000,
  locationY: -5000,
  locationZ: 200,
  rotationX: 0,
  rotationY: -0,
  rotationZ: 52
}

var colors = [
// '#91b3d5',
// '#2c587c',
// '#45607c',
// '#91af8d',
// '#9baf70',
// '#acaf96',
// '#2c587c',

// '#fceacd',
// '#dfdedc',

'#2e78b0',
'#ff7373',
//
'#fdff73',

'#738997',
'#97837f',
'#89666e',
'#696879',
]

// colors = ["#515e67","#f1e0ac",'#ff9c5e',"#515e67"]



var pal = []



function setup() {
  createCanvas(600, 600);
  background('#d5f5ff');
  // background(0)
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
shapes = [];
movers = []
var points = []

for (let i = 0;i<4;i++){
  var pp = placePoint3D(p,0,random(360),random(5000))
  points.push(pp)
}

// l = new Line3D([createVector(0,0,0),createVector(0,1000,0),createVector(3000,2000,0)])
l = new Line3D(points)

l.smoothChaikin(3)
  for (let i = 0;i<1000;i++){
      var lerp = random(1)
      var a = l.getAngle(lerp)
      // if (lerp > 0.5){
      //   lerp = 1-lerp
      // }
      var mshape = new Sphere3D(a[2].copy(),random(50),random(50))
      mshape.rotate(radians(90),'x')
      var m = new Mover3D(a[2].copy(),10)
      m.location.z += 2000
      movers.push(m)
      m.c = palette.mapColor(lerp)
      m.c.setAlpha(2)

      var p = placePoint3D(a[2],0,a[1]+90,randomGaussian(0,map(lerp,0,0.5,10,150)));
      var p2 = p.copy()
      p2.z = 400;
      var size = random(50,400)
      var r = new Rect3D(p2, size,size,true);
      // r.rotate(radians(90),'x')
      r.rotate(radians(a[1]+90),'z')
      // movers = [];

      // var p = l.lerpLine(random(1))

      var s = new Sphere3D(p, size) //map(lerp,0,0.5,20,200)
      if (!s.collision(shapes)){
        shapes.push(s)
        shapes.push(r)

        s.c = palette.mapColor(lerp)
        s.c.setAlpha(150)
        r.c = palette.mapColor(lerp)
        r.c.setAlpha(150)
        var array = makeArray([r],100,20,'z')
        for (let h = 0;h<array.length;h++){
          // array[h].scale(random(1))
          shapes.push(array[h])
          array[h].c = palette.mapColor(lerp)
          array[h].c.setAlpha(360)
        }
      }
  }
  console.log(points)




  cam = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  r = new Rect3D(createVector(0,0,0),100,100)

  // for (let i = 0;i<shapes.length;i++){
  //   shapes[i].c.setAlpha(.1)
  //   fill(shapes[i].c)
  //   stroke(shapes[i].c)
  //   shapes[i].display(cam)
  // }

}





function draw() {
  if (print){
  // background(255)
}
// noFill();
// stroke(255,0,0,110)
// fill(255,0,0,50)

// l.display(cam)
for (let i = 0;i<shapes.length;i++){
  shapes[i].c.setAlpha(.1)
  fill(shapes[i].c)
  stroke(shapes[i].c)
  shapes[i].display(cam)
}

noStroke();
fill(255,0,0,2)
for (let i = 0;i<movers.length;i++){
  console.log('movin')
  movers[i].c.setAlpha(0.1)
  fill(movers[i].c)
  // fill(shapes[i].c)
  // stroke(shapes[i].c)
  movers[i].size += random(-10,10)
  // movers[i].addForce(noise3D1(movers[i].location))
  // movers[i].addForce(createVector(0,0,-random(10)))
  if (movers[i].location.z <= 0){
    movers[i].addForce(noise3D1(movers[i].location))
    movers[i].location.z = 0
  } else {
    movers[i].addForce(createVector(0,0,-random(1)))
  }
  movers[i].display(cam)
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
