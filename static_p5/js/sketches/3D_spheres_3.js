var ging, colors,ding
var s,shapes,l,m, m2,m3,movers,w,e,r
var g,g2,t,sort

loadParams = false;
var paramName = 'sphere'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -5000,
  locationZ: 100,
  rotationX: -10,
  rotationY: -0,
  rotationZ: 0
}

var colors = ['#da5b0a',
'#ffc500',
'#d5f5ff',
'#bd6c40',
]

// colors = ["#515e67","#f1e0ac",'#ff9c5e',"#515e67"]

// var colors = ['#feec01',
// '#fcd300',
// '#e7ac04',
// '#f59701',
// '#ff6900',
// '#ff2702',
// '#c62800',
// '#bf0012',
// '#9c0e01',
// '#80022e',
// '#4e0142',
// '#4a0065',
// '#002a3e',
// '#0d1b44',
// '#190059',
// '#002185',
// '#0c4576',
// '#003c32',
// '#004a29',
// '#076d16',
// '#6b9404',
// '#7b4800',
// '#543224',
// '#3a2700',
// '#261200',
// '#0d0901',
// '#3d414f',
// '#f9faf9',
// '#000000',
// '#000000',
// '#000000',
// ]

var pal = []



function setup() {
  // frameRate(200)
  createCanvas(600, 600);
   g = new ColorGrid(0,0,width,height,5)

  w = ''
  // ding = 360;
  // colors = [
  //   color(255,0,0),
  //   color(0,20,255)
  // ]
  var ccc
  sort = []
  for (let i = 0;i<5;i++){
    ccc = colors[Math.floor(random(colors.length))]
    pal.push(ccc)
  }
  console.log(pal)
ccc2 = pal[0]
var ccc3 = pal[1]

  // background('#d5f5ff');
  var cp = spherePoints(createVector(0,0,0),600,1000);
  movers = []
  for (let i = 0;i<cp.length;i++){
    m = new Mover3D(cp[i],10, new Sphere3D(cp[i],2))
    m.color = color(pal[Math.floor(random(pal.length))])
    m.color.setAlpha(.20)
    m.life = random(10,500)
    movers.push(m)
    sort.push(m.mesh)
  }


  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  g.fillColor([color(ccc),color(ccc2)],[ging.project([createVector(0,0,0)])[0],createVector(random(width),random(height)),],150,color(ccc2))
  // g.display();
  for (let i =0;i<1000;i++){
    // var p = placePoint(createVector(width/2,height/2),200,false)
    var p = createVector(random(width),random(height))
    var c1 = g.getValue(p.x,p.y).c
    c1.setAlpha(0.1)
    fill(c1);
    noStroke();
    rect(p.x,p.y,random(100),random(100))
    var zoop = generatePoints(p.x, p.y,random(100),random(200),Math.floor(random(3,8)))
    var ding = new myShape(zoop,true)
    ding.offsetPoints(random(200))
    ding.subdivide(2)
    // console.log(ding.points)
    ding.offsetPoints(random(20))
    ding.subdivide(2)
    // console.log(ding.points)
    ding.offsetPoints(random(50))
    // var c1 = g1.getValue(bgGrid.points[i][j].x,bgGrid.points[i][j].y).c
    // c1.
    ding.smoothChaikin(2)
    // ding.offsetPoints(random(50))
    // ding.smoothChaikin(2)
    ding.offsetPoints(random(10))
    ding.smoothChaikin(2)
    ding.display()
  }
  // e = new Box3D(createVector(0,0,0),100,100,100);
  r = new Rect3D(createVector(0,0,0),100,100)
  r.rotate(PI/2,'x')
  t = 10000

  for (let i = 0;i<cp.length;i++){
    var rr = new Rect3D(cp[i].copy(),50,50);
    rr.rotate(radians(90),'x')
    rr.rotate(random(2*PI),'z')
    var pppp = ging.project([rr.center])[0]
    var cccc = g.getValue(pppp.x,pppp.y).c
    cccc.setAlpha(0.7)
    fill(cccc)
    rr.display(ging)
  }
}





function draw() {
  // background(255)
// noFill();
// stroke(255,0,0,2)
// fill("#70904e")
// r.rotate(PI/180,'z')

// ging.displayHL();
var sort = sortPoints(movers,ging,true)
var ding = sort[0]
var range = (sort[2] - sort[1])*5

var rc = color('#d5f5ff')
rc.setAlpha(0.2)
// r.fill()
// r.translate(createVector(random(-1,1),random(-1,1),1))

for (let i = 0;i<ding.length;i++){
  m = ding[i]
  var d = p5.Vector.dist(m.mesh.center,createVector(0,0,0)); //map(m.life,200,0,0,1)
  // var c = lerpColor(m.color,color(255),Math.abs(d/range))
  var pp = ging.project([m.location])[0]
  var c2 = g.getValue(pp.x,pp.y).c
  var c = lerpColor2(m.color,c2,map(m.life,500,0,0,1), "MIX", null, null, LINEAR_)
  m.addForce(noise3D1(m.location))////.z += map(noise(t),0,1,-1,1);  noise3D1(m.location) createVector(random(-1,1),random(-1,1),random(-1,1))
  // var c =
  c.setAlpha(0.10)
  stroke(c)
  fill(c)
  if (m.life >0){
  m.display(ging)
}
  m.life -=1
}

t+=0.01
if (t <.5){
  fill(rc)
  noStroke()
// r.display(ging)
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
