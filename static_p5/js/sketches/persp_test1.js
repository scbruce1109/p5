var sp, ml, hl, mpl, mpr, vpl, vpr, cv, rotation,recCenter,ging, axis;


function setup() {
  createCanvas(600, 600);
  background(255);

  noFill();
  // rect(100,100,300,300)

  var ps = [
    createVector(-150,0,1050),
    createVector(-150,0,1150),
    createVector(-50,0,1150),
    createVector(-50,0,1050)

  ]

  ging = new Camera(0,0,width,height,60);
  ging.displayHL()
  fill('yellow')
  ellipse(ging.sp.x,ging.sp.y,20,20)
  ellipse(ging.mpl.x,ging.mpl.y,20,20)
  axis = 'y'
  // for (let i = 0;i<ps.length;i++){
  //   var p = ging.pointInPerspective(ps[i]);
  //   point(p.x,p.y);
  // }

  // recCenter = makeRect(createVector(0,300),100,100);
  // recCenter.translateMesh(0,-0,0);
  // recCenter.rotateMesh(radians(0),'x');
  // recCenter.rotateMesh(radians(0),'y');
  // recCenter.project(ging)
  // recCenter.display('f',true,'blue')

  boxCenter = makeBox(createVector(0,0,0),100,100,100);
  boxCenter.translateMesh(-0,300,0);
  boxCenter.rotateMesh(radians(0),'x');
  boxCenter.rotateMesh(radians(0),'y');
  boxCenter.project(ging)
  boxCenter.display('e',true,'blue')

//   var depth = 0;
//   for (let i = 0;i<10;i++){

//   var rec = makeRect(createVector(250,50),100,100)
//   rec.translateMesh(0,0,0+depth);
//   rec.rotateMesh(radians(90),'x');
//   rec.rotateMesh(radians(90),'z');
//   rec.project(ging)
//   rec.display('e',true)
//     depth += 100;
//   }

//   var depth = 0;
//   for (let i = 0;i<10;i++){

//   var rec = makeRect(createVector(350,150),100,100)
//   rec.translateMesh(0,0,0+depth);
//   rec.rotateMesh(radians(90),'x');
//   rec.rotateMesh(radians(90),'z');
//   rec.project(ging)
//   rec.display('e',true)
//     depth += 100;
//   }

//   var depth = 0;
//   for (let i = 0;i<10;i++){

//   var rec = makeRect(createVector(300,100),100,100)
//   rec.translateMesh(0,0,0+depth);
//   rec.rotateMesh(radians(90),'x');
//   rec.rotateMesh(radians(0),'z');
//   rec.project(ging)
//   rec.display('e',true)
//     depth += 100;
//   }

//   var rez = 0;
//   var p1s = [];
//   for (let i = 0;i<4000;i+=10){



//     var y = sin(rez) * 20-400;
//     var p = createVector(y,0,i)
//     var pP = ging.pointInPerspective(p);
//      p1s.push(pP)

//     // ellipse(pP.x,pP.y,1,1)
//     rez += 0.1

//   }

//     var rez = 0;
//   var p2s = [];
//   for (let i = 0;i<2000;i+=10){



//     var y = sin(rez) * 100-400;
//     var p = createVector(y,200,i)
//     var pP = ging.pointInPerspective(p);
//     p2s.push(pP)

//     // ellipse(pP.x,pP.y,1,1)
//     rez += 0.1

//   }

//   var maxX = 0;
//   for (let i = 0;i<p1s.length;i++){
//     if (p1s[i].x > maxX){
//       line(p1s[i].x,p1s[i].y,p1s[i].x,0)
//       maxX = p1s[i].x
//     }

//   }

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
  ging.displayHL();
  // boxCenter.rotateMesh(radians(.5),'y');
  // boxCenter.translateMesh(1,1,5);
  // boxCenter.rotateMesh(radians(1),'x');
  boxCenter.project(ging)
  boxCenter.display('e',true,'blue')
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
    boxCenter.rotateMesh(radians(5),axis);
  } else if (keyCode === DOWN_ARROW){
    boxCenter.rotateMesh(radians(-5),axis);
  }
}
