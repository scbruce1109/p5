function threeDRandomWalk(startLoc, numSteps,stepSize){
  var start = startLoc.copy()
  var lines = [];
  for (let i =0;i<numSteps;i++){

  }
}


class Mover3D{

  constructor(startLoc,topSpeed,startVelocity){
    this.location = startLoc;
    this.topSpeed = topSpeed;
    if (startVelocity){
      this.velocity = startVelocity;
    } else {
      this.velocity = createVector(0,0,0)
    }
    this.acceleration = createVector(0,0,0)
  }

  addForce(force){
    this.acceleration.add(force);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
  }

  display(camera){
    var pp = camera.project([this.location])[0];

    ellipse(pp.x,pp.y,2,2)
  }
}

class MySphere{
  constructor(loc,radius,rotation){

  }

  displayPoints(){

  }
}

function placePointOnPlane(planePoints,xlerp,ylerp){
  var x1 = p5.Vector.lerp(planePoints[0],planePoints[1],xlerp);
  var x2 = p5.Vector.lerp(planePoints[3],planePoints[2],xlerp);
  var y = p5.Vector.lerp(x1,x2,ylerp)
  return y;
}

function fovWidth(camera,distance){
  var left = pointOnGround(camera,-25,distance)
  var right = pointOnGround(camera,25,distance);
  return [left[1],right[1]]
}

function placePointInFov(camera,alt, az){
  var altitude = camera.rotation.x + alt;
  var azimuthA = camera.rotation.y + az;
  var v = p5.Vector.fromAngles(radians(altitude),radians(azimuthA))
  // v.setMag(200);
  v.add(camera.location)
  // var vMag = camera.location.y / cos(radians(altitude))

  return v
}

function pointOnGround(camera,angle,depth){
  var groundSP = camera.location.copy();
  groundSP.y = 0;
  var newP = groundSP.copy()
  angle = radians(-camera.rotation.y+angle);
  newP.x = groundSP.x + sin(angle)*depth;
  newP.z = groundSP.z + cos(angle)*depth;
  return [groundSP,newP]
}

class Polygon_3D{
  constructor(points, centerPoint){
    this.points = points;
    this.center = centerPoint;
  }

  project(camera){
    this.projected = camera.project(this.points)
  }

  rotate(angle, axis, p){
    if (!p){
      p = this.center
    }
    angle = radians(angle)
    var rotMatrix = rotateAroundPoint(p, angle, axis);
    for (let i =0;i<this.points.length;i++){
      this.points[i] = applyM(this.points[i],rotMatrix);
    }
    this.center = applyM(this.center,rotMatrix)
  }

  translate(x,y,z){
    var tMatrix = translateMatrix(x,y,z);
    for (let i =0;i<this.points.length;i++){
      this.points[i] = applyM(this.points[i],tMatrix);
    }
    this.center = applyM(this.center,tMatrix)
  }


  display(camera){
    this.project(camera)
    beginShape();
    for (let i=0;i<this.projected.length;i++){
      vertex(this.projected[i].x, this.projected[i].y);
    }
    endShape(CLOSE);
  }
}

class Grid_2D{
  constructor(){

  }
}


class Grid_3D{
  constructor(loc,numX,numY,numZ,spacing){
    this.spacing = spacing;
    this.location = loc;
    this.num = num
    this.grid = [];

    for (let i = 0;i<this.numY;i++){
      var square = [];
      for (let j = 0;j<this.numX;j++){
        var row = [];
        for (let k = 0;k<this.numZ;i++){
          var x = this.loc.x + j * this.spacing;
          var z = this.loc.z + k * this.spacing;
          var y = this.loc.y + i * this.spacing;
          var valObj = {x:x,y:y,z:z,size:this.spacing}
          row.push(valObj)
        }
        square.push(row)
      }
      this.grid.push(square)
    }
  }

  getValue(x,y,z){
    var columnIndex = Math.floor((x-this.loc.x) / this.spacing)
    var roIndex = Math.floor((z-this.loc.z) / this.spacing)
    var sIndex = Math.floor((y-this.loc.y) / this.spacing)
    if (columnIndex < 0){
      columnIndex = 0
    } else if (columnIndex > this.grid.length-1){
      columnIndex = this.grid.length-1;
    }
    if (roIndex < 0){
      roIndex = 0
    } else if (roIndex > this.grid[0].length-1){
      roIndex = this.grid[0].length-1;
    }
    if (sIndex < 0){
      sIndex = 0
    } else if (sIndex > this.grid[0].length-1){
      sIndex = this.grid[0][0].length-1;
    }
    return this.grid[columnIndex][sIndex][roIndex];
  }

  display(camera){

  }
}

class Ellipse_3D extends Polygon_3D{
  constructor(numPoints,center,radiusX,radiusY,y){
    super(Polygon_3D)
    if (!y){
      y = 0;
    }
    var a = 360 / numPoints;
    this.points = []
    this.center = center
    this.center.y = y;
    for (let i = 0;i<numPoints;i++ ){
      var x = this.center.x +cos(radians(a*i)) * radiusX;
      var z = this.center.z + sin(radians(a*i)) * radiusY;
      var v = createVector(x,y,z)
      this.points.push(v)
    }
  }
}

class Sphere_3D{
  constructor(center,radius,numLats){
    this.points = []
    this.lats = []
    this.longs = []
    this.radius = radius
    this.center = center;

    var zStart = this.center.y - this.radius/4;
    var zAngle = 180 / numLats;
    for (let i =0;i<numLats;i++){
      var r = sin(radians(zAngle * i )) * this.radius;
      var y = zStart +cos(radians(zAngle*i)) * this.radius;
      this.lats.push(new Ellipse_3D(50,createVector(this.center.x,y,this.center.z),r,r,y))
    }


  }

  translate(x,y,z){
    for (let i = 0;i<this.lats.length;i++){
      this.lats[i].translate(x,y,z)
    }
  }

  display(camera){
    for (let i = 0;i<this.lats.length;i++){
      this.lats[i].display(camera)
    }
  }
}
