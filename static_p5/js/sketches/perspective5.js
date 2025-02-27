var sp, ml, hl, mpl, mpr, vpl, vpr, cv, rotation,recCenter,ging, axis, w;


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

  boxCenter = makeBox(createVector(0,0,50),100,100,200,'e');
  var box2 = makeBox(createVector(110,0,50),100,100,100,'e');
  console.log('dmode')
  console.log(boxCenter.displayMode)
  w.objects.push(boxCenter);
  // w.objects.push(box2);
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
  ging.translate(w, createVector(0,0,10))
} else if (key === 'b'){
  ging.translate(w, createVector(0,0,-10))
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
  // boxCenter.project(ging)
  // boxCenter.display('e',true,'blue')

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
    // w.rotate(ging.sp2,-5,'x')
  // } else if (key === 'r'){
  //   ging.rotate(w,0,5,0)
  //   // w.rotate(ging.sp2,5,'x')
  // } else if (key === 'l'){
  //   ging.rotate(w,-0,-5,0)
    // w.rotate(ging.sp2,-5,'x')
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
