var ging, w;
var lineMesh,sphereMesh,sphereMesh2,m,rec,v,v1,shapes,recp,sphe,sphe2;

loadParams = true;
var paramName = 'sphere'

var params = {
  locationX: 0,
  locationY: 0,
  locationZ: -1000,
  rotationX: 0,
  rotationY: 0,
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
  createCanvas(600, 900);
  background(225);

  noFill();
  w = new World(0,0,width,height,createVector(0,0,0));
  ging = new Camera(0,0,width,height,60,createVector(params.locationX,params.locationY,params.locationZ),{x:params.rotationX,y:params.rotationY,z:params.rotationZ});

  recp = [
    createVector(-200,0,-200),
    createVector(-200,0,200),
    createVector(200,0,200),
    createVector(200,0,-200),
  ]

  shapes = [];
  var rott = 0

  sphe = new Sphere_3D(createVector(0,0,0),100,18)
  sphe2 = new Sphere_3D(createVector(0,0,0),200,18)
  sphe2.translate(0,-0,-600)

v1 = createVector(0,0,0);
v = p5.Vector.fromAngles(radians(180), radians(0),100)

  ging.initWorld(w)

  ging.displayHL()
  w.display(ging);

  var hl = ging.displayHL();
  w.display(ging);

  noFill()
var g = 0;
stroke(0,g,200,50)
fill(0,g,200,20)

sphe.display(ging)
fill(200,g,0,50)
sphe2.display(ging)

}

function draw() {

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
