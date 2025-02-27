var sp, ml, hl, mpl, mpr, vpl, vpr, cv, rotation,recCenter,ging, axis, w;


function setup() {
  createCanvas(600, 600);
  background(255);

  noFill();
  w = new World(0,0,width,height,createVector(0,0,0));
  ging = new Camera(0,0,width,height,60);

  ging.displayHL()
  fill('yellow')
  ellipse(ging.sp.x,ging.sp.y,20,20)
  ellipse(ging.mpl.x,ging.mpl.y,20,20)
  axis = 'y'

  boxCenter = makeBox(createVector(0,150,-50),100,300,100,'e');

  w.objects.push(boxCenter);
  w.display(ging);
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
  noStroke();

  w.display(ging);


  }

function keyPressed() {

  if (key === 'x') {
    axis = 'x'
  } else if (key === 'y'){
           axis = 'y'
  } else if (key === 'z'){
        axis = 'z'

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
