var e,r,e2,r2,g1,g2,s;

loadParams = false;
var paramName = 'building'

var params = {
  noiseSeed: 0,
  locationX: 0,
  locationY: -1000,
  locationZ: 200,
  rotationX: 0,
  rotationY: -0,
  rotationZ: 0
}

function preload() {
  if (loadParams){
    params = loadJSON(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\Everydays"+"\\"+paramName +".json");
    console.log(params)
   params = JSON.parse(params)
  } else {
    params = params;
  }
}

function setup() {
  w = ''
  createCanvas(900, 900);
  background('#ffffff');

  var cp1 = [
    '#5bb3f6',
    '#edf0fe',
    // '#f89d5f'
  ]

  g1 = new ColorGrid(0,0,width,height,5);
  g2 = new ColorGrid(0,0,width,height,5);

  movers = [];
  params.noiseSeed = 88767.3074244767

  pPoints = [
    createVector(random(width),random(height)),
    createVector(random(width),random(height)),
    createVector(random(width),random(height)),
    createVector(random(width),random(height))
  ]

  pPoints[3].mass = 2
  pPoints[1].mass = 2

  noiseSeed(params.noiseSeed)
  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  g1.fillGradient(cp1)
  g2.fillColor([color("#fefefe"),color("#feaca4"),color("#d4fdff"),color("#fec375")],pPoints,300,g1)
  // g1.display();
  // g2.jitterGrid(5)
  g2.display()
  for (let i =0;i<1000;i++){
    // var p = placePoint(createVector(width/2,height/2),200,false)
    var p = createVector(random(width),random(height))
    var c1 = g2.getValue(p.x,p.y).c
    c1.setAlpha(0.3)
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


// var heighty = 0;
//   for(let i = 0;i<300;i++){
//     var ting = new PolyLine([createVector(0,heighty),createVector(width,heighty)])
//     ting.subdivide()
//
//
//     // ting.smoothChaikin(3)
//     ting.displayWavy(5,5,g2,0.5)
//     // ting.displayWavy(5,5,g2,0.5)
//     // ting.displayWavy(5,5,g2,0.5)
//
//     heighty += 4
//   }
  // e = new Ellipse3D(createVector(0,1000,0),100,100,20)
}

function draw() {
  // background('#ffe8b2');
  // background(0,0,40)
  strokeWeight(1)
  stroke(0,100);

  randomWalker()
  // var c = color('#fff8db')
  // c.setAlpha(0.5)
  // fill(c)
  // for (let i = 0;i<r.length;i++){
  //   r[i].display(ging)
  //   // s[i].display(ging)
  // }
  // r2.display(ging)










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

  params.locationX = ging.location.x;
  params.locationY = ging.location.y;
  params.locationZ = ging.location.z;
  params.rotationX = ging.rotation.x;
  params.rotationY = ging.rotation.y;
  params.rotationZ = ging.rotation.z;

  strokeWeight(3);
  stroke(255,0,0);

    // ging.displayAxes();
  // point(ging.origin.pVerts[0].x,ging.origin.pVerts[0].y)
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


function randomWalker(steps){
  var p = createVector(random(width),random(height))
  var x = p.x
  var y = p.y
for (let i=0; i<20000; i++){




    let xchange=random(-2,2);
    let ychange=random(-2,2);
    var c1 = g2.getValue(p.x,p.y).c
    c1.setAlpha(0.02)
    stroke(c1);
    line(x,y,x+xchange,y+ychange);
    x=x+xchange
    y=y+ychange
  }
}
