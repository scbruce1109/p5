var sp, ml, hl, mpl, mpr, vpl, vpr, cv, rotation,recCenter,ging, axis, w;
var lineMesh,sphereMesh,sphereMesh2;

function setup() {
  createCanvas(600, 600);
  background(255);

  noFill();
  w = new World(0,0,width,height,createVector(0,0,0));
  ging = new Camera(0,0,width,height,60);
  console.log('sp2')
  console.log(ging.sp2)
  ging.displayHL()
  fill('yellow')
  ellipse(ging.sp.x,ging.sp.y,20,20)
  ellipse(ging.mpl.x,ging.mpl.y,20,20)
  axis = 'y'

  boxCenter = makeBox(createVector(0,50,50),100,100,100,'e');
  var box2 = makeBox(createVector(110,0,50),100,100,100,'e');
  console.log('dmode')
  console.log(boxCenter.displayMode)
  // w.objects.push(boxCenter);
  var polyLine = [
    createVector(0,0,0),
  ]
  var sx = 0;
  var sy = 0;
  var sz = 0;
  for (let i = 0;i<100;i++){
    sx += random(-100,100)
    sy += random(-50,100)
    sz += random(50,100)
    polyLine.push(createVector(sx,sy,sz))

  }

  // var spherePoints = [];
  // for(let i=0;i<1000;i++){
  //   var u = random(0,PI*2)
  //   var v = random(0,PI);
  //
  //   var x = sin(v)*cos(u)*100;
  //   var y = sin(v)*sin(u)*100;
  //   var z = cos(v)*100;
  //
  //   spherePoints.push(createVector(x,y,z))
  // }
  //
  // var spherePoints2 = [];
  // for(let i=0;i<1000;i++){
  //   var u = random(0,PI*2)
  //   var v = random(0,PI);
  //
  //   var x = sin(v)*cos(u)*200;
  //   var y = sin(v)*sin(u)*200;
  //   var z = cos(v)*200;
  //
  //   spherePoints2.push(createVector(x,y,z))
  // }
  //
  // sphereMesh = new Mesh(createVector(0,0,0),spherePoints,'p')
  // sphereMesh2 = new Mesh(createVector(0,0,0),spherePoints,'p')
  //
  // lineMesh = new Mesh(createVector(0,0,0),polyLine, 'e')
  //
  // w.objects.push(sphereMesh);
  // w.objects.push(sphereMesh2);
  w.objects.push(boxCenter);
  w.display(ging);
  // boxCenter
  // boxCenter.translateMesh(-0,50,0);
  // boxCenter.project(ging)
  // boxCenter.display('e',true,'blue')

}


function intersectPoint(point1, point2, point3, point4) {
   const ua = ((point4.x - point3.x) * (point1.y - point3.y) -
             (point4.y - point3.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) -
             (point4.x - point3.x) * (point2.y - point1.y));

  const ub = ((point2.x - point1.x) * (point1.y - point3.y) -
             (point2.y - point1.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) -
             (point4.x - point3.x) * (point2.y - point1.y));

  const x = point1.x + ua * (point2.x - point1.x);
  const y = point1.y+ ua * (point2.y - point1.y);

  // console.log(x)
  // console.log(y)
  if (!x || !y){
    // console.log('ohhn noooo')
    return false;
  } else {
  return new p5.Vector(x,y)
  }
}

function draw() {
  background(255);
  stroke(0,100);



  if (keyIsPressed === true) {
    if (key === 'w'){
  ging.translate(w,createVector(0,0,10))
} else if (key === 'b'){
  ging.translate(w,createVector(0,0,-10))
} else if (key === 'r'){
  ging.rotate(w,0,.5,0)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'l'){
  ging.rotate(w,-0,-.5,0)
  // w.rotate(ging.sp2,-5,'x')
}else if (key === 'u'){
  ging.rotate(w,.5,0,0)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'd'){
  ging.rotate(w,-.5,0,0)
  }
}

  var hl = ging.displayHL();
  // boxCenter.rotateMesh(radians(.5),'y');
  // boxCenter.translateMesh(1,1,5);
  // boxCenter.rotateMesh(radians(1),'x');
  noStroke();
  fill('green');
  rect(0,hl,width,height-hl)
  fill('blue');
  rect(0,0,width,hl)
  w.display(ging);
  // for (let i = 0;i<lineMesh.pVerts.length-1;i++){
  //   line(lineMesh.pVerts[i].x,lineMesh.pVerts[i].y,lineMesh.pVerts[i+1].x,lineMesh.pVerts[i+1].y)
  //   // dottedLine(lineMesh.pVerts[i], lineMesh.pVerts[i+1], 0.5, 1, 1)
  // }
  // boxCenter.project(ging)
  // boxCenter.display('e',true,'blue')
  fill(0)
  text("x: " + ging.rotation.x.toString(),50,50)
  text("y: " +ging.rotation.y.toString(),50,75)
  text("Cam location",50,100)
  text("X: " + (ging.location.x - w.x).toString(),50,120)
  text("Y: " + (ging.location.y - w.y).toString() ,50,140)
  text("Z: " + (ging.location.z - w.z).toString(),50,160)

  }

function keyPressed() {

  if (key === 'x') {
    axis = 'x'
  } else if (key === 'y'){
           axis = 'y'
  } else if (key === 'z'){
        axis = 'z'
  // } else if (key === 'u'){
  //   ging.rotate(w,5,0,0)
  //   // w.rotate(ging.sp2,5,'x')
  // } else if (key === 'd'){
  //   ging.rotate(w,-5,0,0)
  //   // w.rotate(ging.sp2,-5,'x')
  // } else if (key === 'r'){
  //   ging.rotate(w,0,5,0)
  //   // w.rotate(ging.sp2,5,'x')
  // } else if (key === 'l'){
  //   ging.rotate(w,-0,-5,0)
  //   // w.rotate(ging.sp2,-5,'x')
  // } else if (key === 'w'){
  //   w.translate(0,0,10)
  // } else if (key === 'b'){
  //   w.translate(0,0,-10)
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
