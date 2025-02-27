var sp, ml, hl, mpl, mpr, vpl, vpr, cv, rotation,recCenter,ging, axis, w;
var lineMesh,sphereMesh,sphereMesh2,m,rec,v,v1;

loadParams = false;

var params = {
  locationX: 1139.1475749326555,
  locationY: 200,
  locationZ: -689.2285044967944,
  rotationX: 0,
  rotationY: 42.5,
  rotationZ: 0
}

function preload() {
  if (loadParams){
    params = loadJSON(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\Everydays"+"\\persp.json");
    console.log(params)
   params = JSON.parse(params)
  } else {
    params = params;
  }
}

function setup() {
  createCanvas(600, 600);
  background(255);

  noFill();
  w = new World(0,0,width,height,createVector(0,0,0));
  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});



  boxCenter = makeBox(createVector(0,0,0),100,100,100,'e');
w.objects.push(boxCenter);
console.log(boxCenter.verts)

rec = [createVector(0,0,0),createVector(0,0,200),createVector(0,600,200),createVector(0,600,0)]

v1 = createVector(0,0,0);
v = p5.Vector.fromAngles(radians(180), radians(0),100)
console.log('v')
console.log(v)
// console.log(ging.project([v]))

// m = []
// numMovers = 1000
//
// var v0 = createVector(0,0,0)
// var v1 = createVector(0,0,2000)
// for (let i = 0;i<numMovers;i++){
//   var t = 1/numMovers * i;
//   var v = p5.Vector.lerp(v0, v1, t)
//   m.push(v)
// }


 // m = [createVector(0,0,0),createVector(0,100,0)]
  // var arrays = makeArray([boxCenter],100,10,'z')
  // // var arrays2 = makeArray(arrays,100,10,'x')
  // // var arrays3 = makeArray(arrays2,100,10,'y')
  //
  // for (let i = 0;i<arrays.length;i++){
  //   w.objects.push(arrays[i])
  //   // console.log('arraaa')
  //   // console.log(arrays[i])
  // }
  console.log(boxCenter.verts)
  console.log('w.objects')
  console.log(w.objects)
  // w.objects.push(boxCenter);
  ging.initWorld(w)
  // ging.displayOrigin()
  // ging.angleToPoint(createVector(0,0,0),w)
  ging.displayHL()
  w.display(ging);
  // z = ging.project(m)
  // console.log('mm')
  // console.log(m)
  // console.log(z)
  // line(z[0].x,z[0].y,z[1].x,z[1].y)


}

function draw() {
  background(255);
  strokeWeight(1)
  stroke(0,100);

  // m.add(createVector(random(-1,1),random(-1,1),random(-1,1)))
  //
  // var mp = ging.pointInPerspective(m);
  //
  // ellipse(mp.x,mp.y,10,10)



  if (keyIsPressed === true) {
    if (key === 'w'){
  ging.translate(w,createVector(0,sin(radians(ging.rotation.x))*-10,10))
} else if (key === 's'){
  ging.translate(w,createVector(0,sin(radians(ging.rotation.x))*10,-10))
}  else if (key === 'a'){
  ging.translate(w,createVector(-10,0,-0))
} else if (key === 'd'){
  ging.translate(w,createVector(10,0,-0))
} else if (key === 'y'){
  ging.translate(w,createVector(-0,10,-0))
} else if (key === 'h'){
  ging.translate(w,createVector(0,-10,-0))
} else if (key === 'l'){
  ging.rotate(w,0,-.5,0)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'k'){
  ging.rotate(w,-0,.5,0)
  // w.rotate(ging.sp2,-5,'x')
}else if (key === 'u'){
  ging.rotate(w,.5,0,0)
  // w.rotate(ging.sp2,5,'x')
} else if (key === 'j'){
  ging.rotate(w,-.5,0,0)
  }
}

  var hl = ging.displayHL();


  w.display(ging);
  // ging.displayOrigin();

  // for (let i =0;i<m.length;i++){
  //   m[i].add(createVector(random(-10,10),2,random(-10,10)))
  //   z = ging.project([m[i]])
  //   noFill();
  //   stroke(0,15)
  //   ellipse(z[0].x,z[0].y,5)
  // }

  recProjec = ging.project(rec);

  var shadow = [];
  for (let i = 0;i<rec.length;i++){
    var zoob = projectPointToGround(rec[i],90-35,-90);
    // var goob = p5.Vector.add(rec[i],zoob;)
    // var goob = ging.project([zoob]);
    shadow.push(zoob)
    // line(recProjec[i].x,recProjec[i].y,goob[0].x,goob[0].y)

  }

  shadowProjec = ging.project(shadow)

  fill('yellow')
  noStroke();
  ting = new myShape(shadowProjec);
  ting.display();

fill('black')
  ting = new myShape(recProjec);
  ting.display();
  var z1 = ging.project([v1])
  var z2 = ging.project([v])
  line(z1[0].x,z1[0].y,z2[0].x,z2[0].y)

  // console.log('mm')
  // console.log(m)
  // line(z[0].x,z[0].y,z[1].x,z[1].y)

  fill(0)
  text("x: " + ging.rotation.x.toString(),50,50)
  text("y: " +ging.rotation.y.toString(),50,75)
  text("Cam location",50,100)
  text("X: " + (ging.location.x - w.x).toString(),50,120)
  text("Y: " + (ging.location.y - w.y).toString() ,50,140)
  text("Z: " + (ging.location.z - w.z).toString(),50,160)

  params.locationX = ging.location.x;
  params.locationY = ging.location.y;
  params.locationZ = ging.location.z;
  params.rotationX = ging.rotation.x;
  params.rotationY = ging.rotation.y;
  params.rotationZ = ging.rotation.z;

  // ging.displayAxes();

  strokeWeight(3);
  stroke(255,0,0);

    // ging.displayAxes();
  point(ging.origin.pVerts[0].x,ging.origin.pVerts[0].y)
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

function projectPointToGround(point, altitude, azimuthA){
  var v = p5.Vector.fromAngles(radians(altitude),radians(azimuthA))
  var vMag = point.y / cos(radians(altitude))
  v.setMag(vMag);
  // v.x += point.x;
  // v.z += point.z;
  v.add(point)
  return v;
}
