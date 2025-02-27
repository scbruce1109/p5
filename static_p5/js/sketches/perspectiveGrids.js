var sp, ml, hl, mpl, mpr, vpl, vpr, cv, rotation,recCenter,ging, axis, w;
var lineMesh,sphereMesh,sphereMesh2;

function setup() {
  createCanvas(600, 600);
  background(255);

  noFill();
  w = new World(0,0,width,height,createVector(0,0,0));
  ging = new Camera(0,0,width,height,60,createVector(0,300,-500),{x:-0,y:0,z:0});

  ging.displayHL()
  var vpz = ging.getVps()
  var pp = 0;
for (let j = 0;j<1;j++){

  var zc = 0;
  for (let i = 0;i<50;i++){
    var pd = ging.pointInPerspective(createVector(0,pp,zc))
    stroke(0,50)
    line(0,pd.y,width,pd.y)
    zc += 100;
  }
  var xc = -5000;
  for (let i = 0;i<100;i++){
    var px = ging.pointInPerspective(createVector(xc,pp,0))
    var px2 = ging.pointInPerspective(createVector(xc,pp,5000))
    stroke(0,50)
    line(px.x,px.y,px2.x,px2.y)
    xc += 100;
  }
  pp += 100
}

  // boxCenter = makeBox(createVector(0,50,1000),100,100,100,'e');
  // w.objects.push(boxCenter);



  console.log('vpssss')
  console.log(vpz)
  ellipse(vpz.x,vpz.y,10,10)

  w.display(ging)

}

function draw() {
//   background(255);
//   strokeWeight(1)
//   stroke(0,100);
//
//
//
//   if (keyIsPressed === true) {
//     if (key === 'w'){
//   ging.translate(w,createVector(0,sin(radians(ging.rotation.x))*-10,10))
// } else if (key === 's'){
//   ging.translate(w,createVector(0,sin(radians(ging.rotation.x))*10,-10))
// }  else if (key === 'a'){
//   ging.translate(w,createVector(-10,0,-0))
// } else if (key === 'd'){
//   ging.translate(w,createVector(10,0,-0))
// } else if (key === 'y'){
//   ging.translate(w,createVector(-0,10,-0))
// } else if (key === 'h'){
//   ging.translate(w,createVector(0,-10,-0))
// } else if (key === 'l'){
//   ging.rotate(w,0,-.5,0)
//   // w.rotate(ging.sp2,5,'x')
// } else if (key === 'k'){
//   ging.rotate(w,-0,.5,0)
//   // w.rotate(ging.sp2,-5,'x')
// }else if (key === 'u'){
//   ging.rotate(w,.5,0,0)
//   // w.rotate(ging.sp2,5,'x')
// } else if (key === 'j'){
//   ging.rotate(w,-.5,0,0)
//   }
// }
//
//   var hl = ging.displayHL();
//
//
//   w.display(ging);
//   // ging.displayOrigin();
//
//   fill(0)
//   text("x: " + ging.rotation.x.toString(),50,50)
//   text("y: " +ging.rotation.y.toString(),50,75)
//   text("Cam location",50,100)
//   text("X: " + (ging.location.x - w.x).toString(),50,120)
//   text("Y: " + (ging.location.y - w.y).toString() ,50,140)
//   text("Z: " + (ging.location.z - w.z).toString(),50,160)
//
//   // ging.displayAxes();
//
//   strokeWeight(3);
//   stroke(255,0,0);
//     ging.displayAxes();
//   point(ging.origin.pVerts[0].x,ging.origin.pVerts[0].y)
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
