//// Coordinates -- X is right / left, Y axis forward / back, Z axis up/down.  Rotation is counter clockwise for Z and X axis


///// Press A,W,S,D keys to move camera forward back, left right, Y and H for up and down, U and J to rotate camera up and down, K and L to rotate camera left and right

var cam
var box1, e, grid, a,rec, shapes
var g

var displayCamInfo = true


// params can be used to set camera position and rotation
var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -1800,
  locationZ: 501,
  rotationX: 0,
  rotationY: -0,
  rotationZ: 0
}



function setup() {
  createCanvas(600, 600);
  w = '' //// w has to be definied, or something breaks

  shapes = []

  cam = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  box1 = new Box3D(createVector(200,0,0),200,200,200,true) // creates a box

  e = new Ellipse3D(createVector(-400,200,100),200,200,100)
  e.rotate(radians(90),'x')
  rec = new Rect3D(createVector(0,400,0),400,400, true)
  rec.rotate(radians(90),'x')

  g = new Grid2D(createVector(-500,-500,0),2000,2000,200)


  shapes.push(e,rec,box1,g)
  a = 0

}



function draw() {
  background(255)
noFill();
stroke('black')

cam.displayHL() // displays a horizon line

  var sorted = sortPoints(shapes,cam) // sorts the shapes by distance from camera -- this will dictate the drawing order
  fill(255)


// iterate over the sorted shapes and display
  for (let i = 0;i<sorted[0].length;i++){
  sorted[0][i].display(cam) // the display function projects 3D coordinates to 2D coordinates, then draws them on the screen.  Every mesh object uses the method to draw
}

box1.translate(createVector(0,0,10*sin(radians(a))))
box1.rotate(radians(2),'z')


e.scale(1- map(sin(radians(a)),-1,1,-.01,.01))
rec.rotate(radians(2),'z')

  a +=1



key3d(cam); // controls for moving and rotating camera

  }







// Key controls for navigation
// w,s,a,d = move forward, back, left, right
// k, l = turn left, right
// y, h = move up, down

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

  if (displayCamInfo){
  fill(0)
  text("x: " + camera.rotation.x.toString(),50,50)
  text("z: " +camera.rotation.z.toString(),50,75)
  text("Cam location",50,100)
  text("X: " + (camera.location.x ).toString(),50,120)
  text("Y: " + (camera.location.y ).toString() ,50,140)
  text("Z: " + (camera.location.z ).toString(),50,160)
  }

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
