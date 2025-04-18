class Camera{
  constructor(x,y,width_,height_,fov,location,rotation,tilt){
    this.x = x;
    this.y = y;
    this.width = width_
    this.height = height_;
    this.fov = fov;

    if (this.width > this.height){
      var splen = this.width
    } else if (this.height > this.width) {
      var splen = this.height
    } else {
      var splen = this.width
    }

    this.cameraHeight;

    this.sp = new p5.Vector(x+ width_/2, (y+height_/2) + tan(radians(90-fov/2))*(splen/2))
    this.sp2 = createVector(this.sp.x-width/2,this.height/2,-(this.sp.y-this.height/2))
    if (! location){
      this.location = this.sp2.copy()
    } else {
      this.location = location;
    }
    this.worldTraslateV = p5.Vector.sub(this.location, this.sp2);
    this.tMatrix = translateMatrix(-this.worldTraslateV.x,-this.worldTraslateV.y,-this.worldTraslateV.z);
    this.origin = new Mesh(createVector(0,0,0),[createVector(0,0,0)],'p')
    this.xMark = new Mesh(createVector(1,0,0),[createVector(100,0,0)],'p')
    this.yMark = new Mesh(createVector(0,1,0),[createVector(0,100,0)],'p')
    this.zMark = new Mesh(createVector(0,0,1),[createVector(0,0,100)],'p')
    this.cv = createVector(x+width_/2,y+height_/2)
    this.el = y + height_/2
    this.ml = y + height_
    this.mpr = createVector(this.cv.x + this.sp.dist(this.cv),this.el)
    this.mpl = createVector(this.cv.x - this.sp.dist(this.cv),this.el)
    if (! rotation){
    this.rotation = {x: 0, y:0,z:0} ///// order for rotations .. y, x, then z
  } else {
    this.rotation = rotation;
  }
  this.rotMatrixY = rotateAroundPoint(this.sp2, radians(this.rotation.y),'y')
  this.rotMatrixX = rotateAroundPoint(this.sp2,radians(this.rotation.x),'x')
  this.rotMatrixZ = rotateAroundPoint(this.sp2, radians(this.rotation.z),'z');


}

  project(listPoints){
    var projectedPoints = [];
    // var worldTraslateV = p5.Vector.sub(this.location, this.sp2);
    // var tMatrix = translateMatrix(-worldTraslateV.x,-worldTraslateV.y,-worldTraslateV.z);
    // var rotMatrixY = rotateAroundPoint(radians(this.sp2,-this.rotation.y,'y'))
    // var rotMatrixX = rotateAroundPoint(radians(this.sp2,-this.rotation.x,'x'))
    // var rotMatrixZ = rotateAroundPoint(radians(this.sp2,-this.rotation.z,'z'));

    for (let i =0;i<listPoints.length;i++){
      var pp = applyM(listPoints[i],this.tMatrix);



      pp = applyM(pp,this.rotMatrixY);
      pp = applyM(pp,this.rotMatrixX);
      pp = applyM(pp,this.rotMatrixZ);


    // world.objects[i].rotateMesh(radians(-this.rotation.z),'z',this.sp2);
    // world.objects[i].rotateMesh(radians(-this.rotation.x),'x',this.sp2);
    // world.objects[i].rotateMesh(radians(-this.rotation.y),'y',this.sp2);



        pp = this.pointInPerspective(pp)
        projectedPoints.push(pp);
    }
    return projectedPoints
  }

  initWorld(world){
    var worldTraslateV = p5.Vector.sub(this.location, this.sp2)

    world.objects.push(this.origin)
    world.objects.push(this.xMark)
    world.objects.push(this.yMark)
    world.objects.push(this.zMark)

    // this.translate(world,worldTraslateV)

    for (let i = 0;i<world.objects.length;i++){
      world.objects[i].translateMesh(-worldTraslateV.x,-worldTraslateV.y,-worldTraslateV.z);
      // this.objects[i].display();
    }

    for (let i = 0;i<world.objects.length;i++){
      world.objects[i].rotateMesh(radians(this.rotation.y),'y',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.x),'x',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.z),'z',this.sp2);
    }

    // this.displayHL()

  }

  displayAxes(){
    // var spD = dist(this.cv.x + this.sp.y,this.cv.y,this.cv.x,this.hl);
    // var vpx = tan(radians(this.rotation.y))*spD;
    // var vpy = createVector(this.cv.x + vpx, this.hl)
    //

    //
    // line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpy.x,vpy.y)
    var vpZ = intersectPoint(this.origin.pVerts[0],this.zMark.pVerts[0],createVector(this.x,this.hl),createVector(this.width,this.hl))
    var vpX = intersectPoint(this.origin.pVerts[0],this.xMark.pVerts[0],createVector(this.x,this.hl),createVector(this.width,this.hl))
    var vpY = intersectPoint(this.origin.pVerts[0],this.yMark.pVerts[0],createVector(this.x,this.y),createVector(this.width,this.y))
    line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpZ.x,vpZ.y)
    line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpX.x,vpX.y)
    line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpY.x,vpY.y)
    line(this.xMark.pVerts[0].x,this.xMark.pVerts[0].y,vpZ.x,vpZ.y)
    console.log(this.origin.verts)
  }

  getVps(){
    var spD = dist(this.cv.x + this.sp.y,this.cv.y,this.cv.x,this.hl);
    var vpx = tan(radians(this.rotation.y))*spD;
    var vpy = createVector(this.cv.x + vpx, this.hl)

    return vpy
  }

  angleToPoint(p,w){
    var angleV = p5.Vector.sub(this.location, p);
    // console.log('anglee heading')
    // console.log(angleV.heading())
    var angleY = createVector(angleV.x,angleV.z).heading()
    var angleX = createVector(angleV.y,angleV.z).heading()
    console.log('anglee heading')
    console.log(angleV)
    console.log(degrees(angleY)+90)
    console.log(degrees(angleX)+90)
    this.rotate(w,-degrees(angleX)-90,degrees(angleY)+90,0)

  }

  pointInPerspective(p,vp, mp){
  ///// should prob be based of of cv x
  var x = this.cv.x + p.x;
  var y = this.ml - p.y;
  var z = p.z;

  // line(x,y,vpl.x,vpl.y)
  // line(x+point.z,y,mpl.x,mpl.y)

  var pInP = intersectPoint(createVector(x,y),this.cv,createVector(x+p.z,y),this.mpl)

  if (! pInP){
    pInP = createVector(x,y)
  }
  // ellipse(pInP.x,pInP.y,5,5);
  return pInP;
}

  displayHL(){
    var newH = tan(radians(this.rotation.x))*-this.sp2.z

    var hl = this.height/2 + newH
    this.hl = hl
    // var hl = intersectPoint(createVector(x,y),this.cv,createVector(x+p.z,y),this.mpl)
    line(this.x,hl,this.x+this.width,hl)
    return hl;
  }


  rotate(world,x,y,z){
    // for (let i = 0;i<world.objects.length;i++){
    //   world.objects[i].rotateMesh(radians(-this.rotation.z),'z',this.sp2);
    //   world.objects[i].rotateMesh(radians(-this.rotation.x),'x',this.sp2);
    //   world.objects[i].rotateMesh(radians(-this.rotation.y),'y',this.sp2);
    //   world.objects[i].rotateMesh(radians(this.rotation.y+y),'y',this.sp2);
    //   world.objects[i].rotateMesh(radians(this.rotation.x+x),'x',this.sp2);
    //   world.objects[i].rotateMesh(radians(this.rotation.z+z),'z',this.sp2);
    // }
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;

    this.rotMatrixY = rotateAroundPoint(this.sp2, radians(this.rotation.y),'y')
    this.rotMatrixX = rotateAroundPoint(this.sp2,radians(this.rotation.x),'x')
    this.rotMatrixZ = rotateAroundPoint(this.sp2, radians(this.rotation.z),'z');
    this.displayHL()
  }

translate(world, v){
  // for (let i = 0;i<world.objects.length;i++){
  //   world.objects[i].translateMesh(-v.x,-v.y,-v.z);
  //   // this.objects[i].display();
  // }
  // this.location.add(v);
  this.location.x += -sin(radians(this.rotation.y))*v.z + cos(radians(this.rotation.y))*v.x
  this.location.z += cos(radians(this.rotation.y))*v.z + sin(radians(this.rotation.y))*v.x
  this.location.y += v.y

  this.worldTraslateV = p5.Vector.sub(this.location, this.sp2);
  this.tMatrix = translateMatrix(-this.worldTraslateV.x,-this.worldTraslateV.y,-this.worldTraslateV.z);
}

}

function translateMatrix(x,y,z){
  var t = math.matrix([[1, 0, 0, x], [0, 1,0, y], [0, 0, 1,z],[0,0,0,1]])
  return t
}

function rotateMatrix(angle, axis){
  var r;
  if (axis == 'x'){
    r = math.matrix([[1, 0, 0,0],[0,cos(angle), -sin(angle),0], [0,sin(angle), cos(angle),0], [0,0,0,1]])

  } else if (axis == 'y'){
  r = math.matrix([[cos(angle), 0, sin(angle),0], [0, 1, 0,0], [-sin(angle), 0, cos(angle),0], [0,0,0,1]])
  } else {
  r = math.matrix([[cos(angle), -sin(angle), 0,0], [sin(angle), cos(angle), 0,0], [0, 0, 1,0],[0,0,0,1]])
  }
  // var r = math.multiply(z,y);
  // r = math.multiply()
  return r;
}

function rotateAroundPoint(pointVector, angle, axis){
  // var pMatrix = [vector.x,vector.y,1]
  // var transformed = math.multiply(translateMatrix(-pointVector.x,-pointVector.y), pMatrix)
  var rotated = math.multiply(rotateMatrix(angle, axis),translateMatrix(-pointVector.x,-pointVector.y,-pointVector.z))
  var final = math.multiply(translateMatrix(pointVector.x,pointVector.y,pointVector.z), rotated)
  // var t = math.matrix([[1, 0, 7], [2, 5, 8], [3, 6, 9]])
  return final;
}

function applyM(p,transMatrix){
  var pMatrix = [p.x,p.y,p.z,1]
  var transformed = math.multiply(transMatrix, pMatrix)
  // console.log('transformed')
  // console.log(transformed)
  return createVector(transformed.get([0]),transformed.get([1]),transformed.get([2]))
}

class Mesh {
  constructor(centerPoint, faces, dMode){
    // this.verts = verts;
    this.pVerts = [];
    this.edges = [];
    this.faces = faces;
    this.center = centerPoint;
    this.displayMode = dMode
    this.rotation = {x:0,y:0,z:0}
  }

  display(camera){
    for (let f = 0;f<this.faces.length;f++){
      var projected = camera.project(this.faces[f]);
      var pshape = new myShape(projected)
      pshape.display()
    }
  }

  copy(){
    var newFaces = [];
    for (let i = 0;i<this.faces.length;i++){
      newFaces.push(this.faces[i].slice())
    }
    var copy = new Mesh(this.center.copy(),newFaces)
    copy.rotation = this.rotation;
    return copy
  }

  // display(mode,projected,fillC,strokeC){
  //   if (!mode){
  //     mode = this.displayMode;
  //   }
  //   mode = this.displayMode;
  //   // if
  //   var verts;
  //   // if(projected){
  //     verts = this.pVerts;
  //   // } else {
  //   //   verts = this.verts;
  //   // }
  //   // if (mode == 'p'){
  //   //   stroke(0)
  //   //   for (let i = 0;i<verts.length;i++){
  //   //     point(verts[i].x,verts[i].y)
  //   //   }
  //   // } else if (mode == 'e'){
  //   //
  //   //   stroke(0,100)
  //   //   for (let i = 0;i<this.edges.length;i++){
  //   //     // var zz = map(this.verts[index[1].z,this.centerPoin.z,])
  //   //     var index = this.edges[i];
  //   //     // console.log(index)
  //   //     line(verts[index[0]].x,verts[index[0]].y,verts[index[1]].x,verts[index[1]].y)
  //   //   }
  //   //   } else if (mode == 'f'){
  //       // noStroke();
  //       // fill(fillC);
  //     for (let i = 0;i<this.faces.length;i++){
  //       beginShape();
  //
  //       for (let i = 0;i<verts.length;i++){
  //       vertex(verts[i].x,verts[i].y)
  //     }


  // endShape(CLOSE);
  //
  //     }
    // }
  // }

  // project(cam){
  //   this.pVerts = [];
  //   for (let i = 0;i<this.verts.length;i++){
  //       var pP = cam.pointInPerspective(this.verts[i])
  //       this.pVerts.push(pP);
  //     }
  // }

  rotate(angle,axis){
    var rotMatrix = rotateAroundPoint(this.center, angle, axis);
      for (let i =0;i<this.faces.length;i++){
        for (let j = 0;j<this.faces[i].length;j++){
        this.faces[i][j] = applyM(this.faces[i][j],rotMatrix);
      }
      }
    if (axis = 'x'){
      this.rotation.x += angle;
    } else if (axis = 'y'){
      this.rotation.y += angle;
    } else {
      this.rotation.z += angle;
    }
  }

  translate(v){
    var tMatrix = translateMatrix(v.x,v.y,v.z);
    for (let i =0;i<this.faces.length;i++){
      for (let j = 0;j<this.faces[i].length;j++){
      this.faces[i][j] = applyM(this.faces[i][j],tMatrix);
    }
    }
    this.center = applyM(this.center,tMatrix)
  }

  // rotateMesh(angle, axis, p){
  //   if (!p){
  //     p = this.center
  //   }
  //   var rotMatrix = rotateAroundPoint(p, angle, axis);
  //   for (let i =0;i<this.verts.length;i++){
  //     this.verts[i] = applyM(this.verts[i],rotMatrix);
  //   }
  //   this.center = applyM(this.center,rotMatrix)
  // }
  // translateMesh(x,y,z){
  //   var tMatrix = translateMatrix(x,y,z);
  //   for (let i =0;i<this.verts.length;i++){
  //     this.verts[i] = applyM(this.verts[i],tMatrix);
  //   }
  //   this.center = applyM(this.center,tMatrix)
  // }

}







/////
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


class Camera{
  constructor(x,y,width_,height_,fov,location,rotation,tilt){
    this.x = x;
    this.y = y;
    this.width = width_
    this.height = height_;
    this.fov = fov;

    if (this.width > this.height){
      var splen = this.width
    } else if (this.height > this.width) {
      var splen = this.height
    } else {
      var splen = this.width
    }

    this.cameraHeight;

    this.sp = new p5.Vector(x+ width_/2, (y+height_/2) + tan(radians(90-fov/2))*(splen/2))
    this.sp2 = createVector(this.sp.x-width/2,this.height/2,-(this.sp.y-this.height/2))
    if (! location){
      this.location = this.sp2.copy()
    } else {
      this.location = location;
    }
    this.worldTraslateV = p5.Vector.sub(this.location, this.sp2);
    this.tMatrix = translateMatrix(-this.worldTraslateV.x,-this.worldTraslateV.y,-this.worldTraslateV.z);
    this.origin = new Mesh(createVector(0,0,0),[createVector(0,0,0)],'p')
    this.xMark = new Mesh(createVector(1,0,0),[createVector(100,0,0)],'p')
    this.yMark = new Mesh(createVector(0,1,0),[createVector(0,100,0)],'p')
    this.zMark = new Mesh(createVector(0,0,1),[createVector(0,0,100)],'p')
    this.cv = createVector(x+width_/2,y+height_/2)
    this.el = y + height_/2
    this.ml = y + height_
    this.mpr = createVector(this.cv.x + this.sp.dist(this.cv),this.el)
    this.mpl = createVector(this.cv.x - this.sp.dist(this.cv),this.el)
    if (! rotation){
    this.rotation = {x: 0, y:0,z:0} ///// order for rotations .. y, x, then z
  } else {
    this.rotation = rotation;
  }
  this.rotMatrixY = rotateAroundPoint(this.sp2, radians(this.rotation.y),'y')
  this.rotMatrixX = rotateAroundPoint(this.sp2,radians(this.rotation.x),'x')
  this.rotMatrixZ = rotateAroundPoint(this.sp2, radians(this.rotation.z),'z');


}

  project(listPoints){
    var projectedPoints = [];
    // var worldTraslateV = p5.Vector.sub(this.location, this.sp2);
    // var tMatrix = translateMatrix(-worldTraslateV.x,-worldTraslateV.y,-worldTraslateV.z);
    // var rotMatrixY = rotateAroundPoint(radians(this.sp2,-this.rotation.y,'y'))
    // var rotMatrixX = rotateAroundPoint(radians(this.sp2,-this.rotation.x,'x'))
    // var rotMatrixZ = rotateAroundPoint(radians(this.sp2,-this.rotation.z,'z'));

    for (let i =0;i<listPoints.length;i++){
      var pp = applyM(listPoints[i],this.tMatrix);


      pp = applyM(pp,this.rotMatrixZ);
      pp = applyM(pp,this.rotMatrixX);
      pp = applyM(pp,this.rotMatrixY);




    // world.objects[i].rotateMesh(radians(-this.rotation.z),'z',this.sp2);
    // world.objects[i].rotateMesh(radians(-this.rotation.x),'x',this.sp2);
    // world.objects[i].rotateMesh(radians(-this.rotation.y),'y',this.sp2);



        pp = this.pointInPerspective(pp)
        projectedPoints.push(pp);
    }
    return projectedPoints
  }

  initWorld(world){
    var worldTraslateV = p5.Vector.sub(this.location, this.sp2)

    world.objects.push(this.origin)
    world.objects.push(this.xMark)
    world.objects.push(this.yMark)
    world.objects.push(this.zMark)

    // this.translate(world,worldTraslateV)

    for (let i = 0;i<world.objects.length;i++){
      world.objects[i].translateMesh(-worldTraslateV.x,-worldTraslateV.y,-worldTraslateV.z);
      // this.objects[i].display();
    }

    for (let i = 0;i<world.objects.length;i++){
      world.objects[i].rotateMesh(radians(this.rotation.y),'y',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.x),'x',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.z),'z',this.sp2);
    }

    // this.displayHL()

  }

  displayAxes(){
    // var spD = dist(this.cv.x + this.sp.y,this.cv.y,this.cv.x,this.hl);
    // var vpx = tan(radians(this.rotation.y))*spD;
    // var vpy = createVector(this.cv.x + vpx, this.hl)
    //

    //
    // line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpy.x,vpy.y)
    var vpZ = intersectPoint(this.origin.pVerts[0],this.zMark.pVerts[0],createVector(this.x,this.hl),createVector(this.width,this.hl))
    var vpX = intersectPoint(this.origin.pVerts[0],this.xMark.pVerts[0],createVector(this.x,this.hl),createVector(this.width,this.hl))
    var vpY = intersectPoint(this.origin.pVerts[0],this.yMark.pVerts[0],createVector(this.x,this.y),createVector(this.width,this.y))
    line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpZ.x,vpZ.y)
    line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpX.x,vpX.y)
    line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpY.x,vpY.y)
    line(this.xMark.pVerts[0].x,this.xMark.pVerts[0].y,vpZ.x,vpZ.y)
    console.log(this.origin.verts)
  }

  getVps(){
    var spD = dist(this.cv.x + this.sp.y,this.cv.y,this.cv.x,this.hl);
    var vpx = tan(radians(this.rotation.y))*spD;
    var vpy = createVector(this.cv.x + vpx, this.hl)

    return vpy
  }

  angleToPoint(p,w){
    var angleV = p5.Vector.sub(this.location, p);
    // console.log('anglee heading')
    // console.log(angleV.heading())
    var angleY = createVector(angleV.x,angleV.z).heading()
    var angleX = createVector(angleV.y,angleV.z).heading()
    console.log('anglee heading')
    console.log(angleV)
    console.log(degrees(angleY)+90)
    console.log(degrees(angleX)+90)
    this.rotate(w,-degrees(angleX)-90,degrees(angleY)+90,0)

  }

  pointInPerspective(p,vp, mp){
  ///// should prob be based of of cv x
  var x = this.cv.x + p.x;
  var y = this.ml - p.y;
  var z = p.z;

  // line(x,y,vpl.x,vpl.y)
  // line(x+point.z,y,mpl.x,mpl.y)

  var pInP = intersectPoint(createVector(x,y),this.cv,createVector(x+p.z,y),this.mpl)

  if (! pInP){
    pInP = createVector(x,y)
  }
  // ellipse(pInP.x,pInP.y,5,5);
  return pInP;
}

  displayHL(){
    var newH = tan(radians(this.rotation.x))*-this.sp2.z

    var hl = this.height/2 + newH
    this.hl = hl
    // var hl = intersectPoint(createVector(x,y),this.cv,createVector(x+p.z,y),this.mpl)
    line(this.x,hl,this.x+this.width,hl)
    return hl;
  }


  rotate(world,x,y,z){
    // for (let i = 0;i<world.objects.length;i++){
    //   world.objects[i].rotateMesh(radians(-this.rotation.z),'z',this.sp2);
    //   world.objects[i].rotateMesh(radians(-this.rotation.x),'x',this.sp2);
    //   world.objects[i].rotateMesh(radians(-this.rotation.y),'y',this.sp2);
    //   world.objects[i].rotateMesh(radians(this.rotation.y+y),'y',this.sp2);
    //   world.objects[i].rotateMesh(radians(this.rotation.x+x),'x',this.sp2);
    //   world.objects[i].rotateMesh(radians(this.rotation.z+z),'z',this.sp2);
    // }
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;

    this.rotMatrixY = rotateAroundPoint(this.sp2, radians(this.rotation.y),'y')
    this.rotMatrixX = rotateAroundPoint(this.sp2,radians(this.rotation.x),'x')
    this.rotMatrixZ = rotateAroundPoint(this.sp2, radians(this.rotation.z),'z');
    this.displayHL()
  }

translate(world, v){
  // for (let i = 0;i<world.objects.length;i++){
  //   world.objects[i].translateMesh(-v.x,-v.y,-v.z);
  //   // this.objects[i].display();
  // }
  // this.location.add(v);
  this.location.x += -sin(radians(this.rotation.y))*v.z + cos(radians(this.rotation.y))*v.x
  this.location.z += cos(radians(this.rotation.y))*v.z + sin(radians(this.rotation.y))*v.x
  this.location.y += v.y

  this.worldTraslateV = p5.Vector.sub(this.location, this.sp2);
  this.tMatrix = translateMatrix(-this.worldTraslateV.x,-this.worldTraslateV.y,-this.worldTraslateV.z);
}

}

function translateMatrix(x,y,z){
  var t = math.matrix([[1, 0, 0, x], [0, 1,0, y], [0, 0, 1,z],[0,0,0,1]])
  return t
}

function rotateMatrix(angle, axis){
  var r;
  if (axis == 'x'){
    r = math.matrix([[1, 0, 0,0],[0,cos(angle), -sin(angle),0], [0,sin(angle), cos(angle),0], [0,0,0,1]])

  } else if (axis == 'z'){
  r = math.matrix([[cos(angle), 0, sin(angle),0], [0, 1, 0,0], [-sin(angle), 0, cos(angle),0], [0,0,0,1]])
  } else {
  r = math.matrix([[cos(angle), -sin(angle), 0,0], [sin(angle), cos(angle), 0,0], [0, 0, 1,0],[0,0,0,1]])
  }
  // var r = math.multiply(z,y);
  // r = math.multiply()
  return r;
}

function rotateAroundPoint(pointVector, angle, axis){
  // var pMatrix = [vector.x,vector.y,1]
  // var transformed = math.multiply(translateMatrix(-pointVector.x,-pointVector.y), pMatrix)
  var rotated = math.multiply(rotateMatrix(angle, axis),translateMatrix(-pointVector.x,-pointVector.y,-pointVector.z))
  var final = math.multiply(translateMatrix(pointVector.x,pointVector.y,pointVector.z), rotated)
  // var t = math.matrix([[1, 0, 7], [2, 5, 8], [3, 6, 9]])
  return final;
}

function applyM(p,transMatrix){
  var pMatrix = [p.x,p.y,p.z,1]
  var transformed = math.multiply(transMatrix, pMatrix)
  // console.log('transformed')
  // console.log(transformed)
  return createVector(transformed.get([0]),transformed.get([1]),transformed.get([2]))
}

class Mesh {
  constructor(centerPoint, faces, dMode){
    // this.verts = verts;
    this.pVerts = [];
    this.edges = [];
    this.faces = faces;
    this.center = centerPoint;
    this.displayMode = dMode
    this.rotation = {x:0,y:0,z:0}
  }

  display(camera){
    for (let f = 0;f<this.faces.length;f++){
      var projected = camera.project(this.faces[f]);
      var pshape = new myShape(projected)
      pshape.display()
    }
  }

  copy(){
    var newFaces = [];
    for (let i = 0;i<this.faces.length;i++){
      newFaces.push(this.faces[i].slice())
    }
    var copy = new Mesh(this.center.copy(),newFaces)
    copy.rotation = this.rotation;
    return copy
  }

  // display(mode,projected,fillC,strokeC){
  //   if (!mode){
  //     mode = this.displayMode;
  //   }
  //   mode = this.displayMode;
  //   // if
  //   var verts;
  //   // if(projected){
  //     verts = this.pVerts;
  //   // } else {
  //   //   verts = this.verts;
  //   // }
  //   // if (mode == 'p'){
  //   //   stroke(0)
  //   //   for (let i = 0;i<verts.length;i++){
  //   //     point(verts[i].x,verts[i].y)
  //   //   }
  //   // } else if (mode == 'e'){
  //   //
  //   //   stroke(0,100)
  //   //   for (let i = 0;i<this.edges.length;i++){
  //   //     // var zz = map(this.verts[index[1].z,this.centerPoin.z,])
  //   //     var index = this.edges[i];
  //   //     // console.log(index)
  //   //     line(verts[index[0]].x,verts[index[0]].y,verts[index[1]].x,verts[index[1]].y)
  //   //   }
  //   //   } else if (mode == 'f'){
  //       // noStroke();
  //       // fill(fillC);
  //     for (let i = 0;i<this.faces.length;i++){
  //       beginShape();
  //
  //       for (let i = 0;i<verts.length;i++){
  //       vertex(verts[i].x,verts[i].y)
  //     }


  // endShape(CLOSE);
  //
  //     }
    // }
  // }

  // project(cam){
  //   this.pVerts = [];
  //   for (let i = 0;i<this.verts.length;i++){
  //       var pP = cam.pointInPerspective(this.verts[i])
  //       this.pVerts.push(pP);
  //     }
  // }

  rotate(angle,axis){
    var rotMatrix = rotateAroundPoint(this.center, angle, axis);
      for (let i =0;i<this.faces.length;i++){
        for (let j = 0;j<this.faces[i].length;j++){
        this.faces[i][j] = applyM(this.faces[i][j],rotMatrix);
      }
      }
    if (axis = 'x'){
      this.rotation.x += angle;
    } else if (axis = 'y'){
      this.rotation.y += angle;
    } else {
      this.rotation.z += angle;
    }
  }

  translate(v){
    var tMatrix = translateMatrix(v.x,v.y,v.z);
    for (let i =0;i<this.faces.length;i++){
      for (let j = 0;j<this.faces[i].length;j++){
      this.faces[i][j] = applyM(this.faces[i][j],tMatrix);
    }
    }
    this.center = applyM(this.center,tMatrix)
  }

  // rotateMesh(angle, axis, p){
  //   if (!p){
  //     p = this.center
  //   }
  //   var rotMatrix = rotateAroundPoint(p, angle, axis);
  //   for (let i =0;i<this.verts.length;i++){
  //     this.verts[i] = applyM(this.verts[i],rotMatrix);
  //   }
  //   this.center = applyM(this.center,rotMatrix)
  // }
  // translateMesh(x,y,z){
  //   var tMatrix = translateMatrix(x,y,z);
  //   for (let i =0;i<this.verts.length;i++){
  //     this.verts[i] = applyM(this.verts[i],tMatrix);
  //   }
  //   this.center = applyM(this.center,tMatrix)
  // }

}










//
// //////// updated 3D Axes 3d_stuff
// class Camera{
//   constructor(x,y,width_,height_,fov,location,rotation,tilt){
//     this.x = x;
//     this.y = y;
//     this.width = width_
//     this.height = height_;
//     this.fov = fov;
//
//     if (this.width > this.height){
//       var splen = this.width
//     } else if (this.height > this.width) {
//       var splen = this.height
//     } else {
//       var splen = this.width
//     }
//
//     this.cameraHeight;
//
//     this.sp = new p5.Vector(x+ width_/2, (y+height_/2) + tan(radians(90-fov/2))*(splen/2))
//     this.sp2 = createVector(this.sp.x-width/2,-(this.sp.y-this.height/2,this.height/2))
//     if (! location){
//       this.location = this.sp2.copy()
//     } else {
//       this.location = location;
//     }
//     this.worldTraslateV = p5.Vector.sub(this.location, this.sp2);
//     this.tMatrix = translateMatrix(-this.worldTraslateV.x,-this.worldTraslateV.y,-this.worldTraslateV.z);
//     this.origin = new Mesh(createVector(0,0,0),[createVector(0,0,0)],'p')
//     this.xMark = new Mesh(createVector(1,0,0),[createVector(100,0,0)],'p')
//     this.yMark = new Mesh(createVector(0,1,0),[createVector(0,100,0)],'p')
//     this.zMark = new Mesh(createVector(0,0,1),[createVector(0,0,100)],'p')
//     this.cv = createVector(x+width_/2,y+height_/2)
//     this.el = y + height_/2
//     this.ml = y + height_
//     this.mpr = createVector(this.cv.x + this.sp.dist(this.cv),this.el)
//     this.mpl = createVector(this.cv.x - this.sp.dist(this.cv),this.el)
//     if (! rotation){
//     this.rotation = {x: 0, y:0,z:0} ///// order for rotations .. z, x, then y
//   } else {
//     this.rotation = rotation;
//   }
//   this.rotMatrixY = rotateAroundPoint(this.sp2, radians(this.rotation.y),'y')
//   this.rotMatrixX = rotateAroundPoint(this.sp2,radians(this.rotation.x),'x')
//   this.rotMatrixZ = rotateAroundPoint(this.sp2, radians(this.rotation.z),'z');
//
//
// }
//
//   project(listPoints){
//     var projectedPoints = [];
//
//     for (let i =0;i<listPoints.length;i++){
//       var pp = applyM(listPoints[i],this.tMatrix);
//
//       pp = applyM(pp,this.rotMatrixZ);
//       pp = applyM(pp,this.rotMatrixX);
//
//       pp = applyM(pp,this.rotMatrixY);
//
//         pp = this.pointInPerspective(pp)
//         projectedPoints.push(pp);
//     }
//     return projectedPoints
//   }
//
//   initWorld(world){
//     var worldTraslateV = p5.Vector.sub(this.location, this.sp2)
//
//     world.objects.push(this.origin)
//     world.objects.push(this.xMark)
//     world.objects.push(this.yMark)
//     world.objects.push(this.zMark)
//
//     // this.translate(world,worldTraslateV)
//
//     // for (let i = 0;i<world.objects.length;i++){
//     //   world.objects[i].translateMesh(-worldTraslateV.x,-worldTraslateV.y,-worldTraslateV.z);
//     //   // this.objects[i].display();
//     // }
//     //
//     // for (let i = 0;i<world.objects.length;i++){
//     //   world.objects[i].rotateMesh(radians(this.rotation.y),'y',this.sp2);
//     //   world.objects[i].rotateMesh(radians(this.rotation.x),'x',this.sp2);
//     //   world.objects[i].rotateMesh(radians(this.rotation.z),'z',this.sp2);
//     // }
//
//
//   }
//
//   displayAxes(){
//
//     var vpZ = intersectPoint(this.origin.pVerts[0],this.zMark.pVerts[0],createVector(this.x,this.hl),createVector(this.width,this.hl))
//     var vpX = intersectPoint(this.origin.pVerts[0],this.xMark.pVerts[0],createVector(this.x,this.hl),createVector(this.width,this.hl))
//     var vpY = intersectPoint(this.origin.pVerts[0],this.yMark.pVerts[0],createVector(this.x,this.y),createVector(this.width,this.y))
//     line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpZ.x,vpZ.y)
//     line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpX.x,vpX.y)
//     line(this.origin.pVerts[0].x,this.origin.pVerts[0].y,vpY.x,vpY.y)
//     line(this.xMark.pVerts[0].x,this.xMark.pVerts[0].y,vpZ.x,vpZ.y)
//     console.log(this.origin.verts)
//   }
//
//   getVps(){
//     var spD = dist(this.cv.x + this.sp.y,this.cv.y,this.cv.x,this.hl);
//     var vpx = tan(radians(this.rotation.y))*spD;
//     var vpy = createVector(this.cv.x + vpx, this.hl)
//
//     return vpy
//   }
//
//   angleToPoint(p,w){
//     var angleV = p5.Vector.sub(this.location, p);
//     // console.log('anglee heading')
//     // console.log(angleV.heading())
//     var angleZ = createVector(angleV.x,angleV.y).heading()
//     var angleX = createVector(angleV.z,angleV.y).heading()
//     console.log('anglee heading')
//     console.log(angleV)
//     console.log(degrees(angleZ)+90)
//     console.log(degrees(angleX)+90)
//     this.rotate(w,-degrees(angleX)-90,degrees(angleZ)+90,0)
//
//   }
//
//   pointInPerspective(p,vp, mp){
//   ///// should prob be based of of cv x
//   var x = this.cv.x + p.x;
//   var z = this.ml - p.z;
//   var y = p.y;
//
//   // line(x,y,vpl.x,vpl.y)
//   // line(x+point.z,y,mpl.x,mpl.y)
//
//   var pInP = intersectPoint(createVector(x,z),this.cv,createVector(x+p.y,z),this.mpl)
//
//   if (! pInP){
//     pInP = createVector(x,z)
//   }
//   // ellipse(pInP.x,pInP.y,5,5);
//   return pInP;
// }
//
//   displayHL(){
//     var newH = tan(radians(this.rotation.x))*this.sp2.y
//
//     var hl = this.height/2 + newH
//     this.hl = hl
//     // var hl = intersectPoint(createVector(x,y),this.cv,createVector(x+p.z,y),this.mpl)
//     line(this.x,hl,this.x+this.width,hl)
//     return hl;
//   }
//
//
//   rotate(world,x,y,z){
//     // for (let i = 0;i<world.objects.length;i++){
//     //   world.objects[i].rotateMesh(radians(-this.rotation.z),'z',this.sp2);
//     //   world.objects[i].rotateMesh(radians(-this.rotation.x),'x',this.sp2);
//     //   world.objects[i].rotateMesh(radians(-this.rotation.y),'y',this.sp2);
//     //   world.objects[i].rotateMesh(radians(this.rotation.y+y),'y',this.sp2);
//     //   world.objects[i].rotateMesh(radians(this.rotation.x+x),'x',this.sp2);
//     //   world.objects[i].rotateMesh(radians(this.rotation.z+z),'z',this.sp2);
//     // }
//     this.rotation.x += x;
//     this.rotation.y += y;
//     this.rotation.z += z;
//
//     this.rotMatrixZ = rotateAroundPoint(this.sp2, radians(this.rotation.z),'z');
//
//     this.rotMatrixX = rotateAroundPoint(this.sp2,radians(this.rotation.x),'x')
//     this.rotMatrixY = rotateAroundPoint(this.sp2, radians(this.rotation.y),'y')
//     this.displayHL()
//   }
//
// translate(world, v){
//   // for (let i = 0;i<world.objects.length;i++){
//   //   world.objects[i].translateMesh(-v.x,-v.y,-v.z);
//   //   // this.objects[i].display();
//   // }
//   // this.location.add(v);
//   this.location.x += -sin(radians(this.rotation.z))*v.y + cos(radians(this.rotation.z))*v.x
//   this.location.y += cos(radians(this.rotation.z))*v.y + sin(radians(this.rotation.z))*v.x
//   this.location.z += v.z
//
//   this.worldTraslateV = p5.Vector.sub(this.location, this.sp2);
//   this.tMatrix = translateMatrix(-this.worldTraslateV.x,-this.worldTraslateV.y,-this.worldTraslateV.z); /// u
// }
//
// }
//
//
// ///// shape stuff
// function translateMatrix(x,y,z){
//   var t = math.matrix([[1, 0, 0, x], [0, 1,0, y], [0, 0, 1,z],[0,0,0,1]])
//   return t
// }
//
// function rotateMatrix(angle, axis){
//   var r;
//   if (axis == 'x'){
//     r = math.matrix([[1, 0, 0,0],[0,cos(angle), -sin(angle),0], [0,sin(angle), cos(angle),0], [0,0,0,1]])
//
//   } else if (axis == 'z'){
//   r = math.matrix([[cos(angle), 0, sin(angle),0], [0, 1, 0,0], [-sin(angle), 0, cos(angle),0], [0,0,0,1]])
//   } else {
//   r = math.matrix([[cos(angle), -sin(angle), 0,0], [sin(angle), cos(angle), 0,0], [0, 0, 1,0],[0,0,0,1]])
//   }
//   // var r = math.multiply(z,y);
//   // r = math.multiply()
//   return r;
// }
//
// function rotateAroundPoint(pointVector, angle, axis){
//   // var pMatrix = [vector.x,vector.y,1]
//   // var transformed = math.multiply(translateMatrix(-pointVector.x,-pointVector.y), pMatrix)
//   var rotated = math.multiply(rotateMatrix(angle, axis),translateMatrix(-pointVector.x,-pointVector.y,-pointVector.z))
//   var final = math.multiply(translateMatrix(pointVector.x,pointVector.y,pointVector.z), rotated)
//   // var t = math.matrix([[1, 0, 7], [2, 5, 8], [3, 6, 9]])
//   return final;
// }
//
// function applyM(p,transMatrix){
//   var pMatrix = [p.x,p.y,p.z,1]
//   var transformed = math.multiply(transMatrix, pMatrix)
//   // console.log('transformed')
//   // console.log(transformed)
//   return createVector(transformed.get([0]),transformed.get([1]),transformed.get([2]))
// }
//
//
// class Mesh {
//   constructor(centerPoint, faces, dMode){
//     // this.verts = verts;
//     this.pVerts = [];
//     this.edges = [];
//     this.faces = faces;
//     this.center = centerPoint;
//     this.displayMode = dMode
//     this.rotation = {x:0,y:0,z:0}
//   }
//
//   display(camera){
//     for (let f = 0;f<this.faces.length;f++){
//       var projected = camera.project(this.faces[f]);
//       var pshape = new myShape(projected)
//       pshape.display()
//     }
//   }
//
//   copy(){
//     var newFaces = [];
//     for (let i = 0;i<this.faces.length;i++){
//       newFaces.push(this.faces[i].slice())
//     }
//     var copy = new Mesh(this.center.copy(),newFaces)
//     copy.rotation = this.rotation;
//     return copy
//   }
//
//   rotate(angle,axis){
//     var rotMatrix = rotateAroundPoint(this.center, angle, axis);
//       for (let i =0;i<this.faces.length;i++){
//         for (let j = 0;j<this.faces[i].length;j++){
//         this.faces[i][j] = applyM(this.faces[i][j],rotMatrix);
//       }
//       }
//     if (axis = 'x'){
//       this.rotation.x += angle;
//     } else if (axis = 'y'){
//       this.rotation.y += angle;
//     } else {
//       this.rotation.z += angle;
//     }
//   }
//
//   translate(v){
//     var tMatrix = translateMatrix(v.x,v.y,v.z);
//     for (let i =0;i<this.faces.length;i++){
//       for (let j = 0;j<this.faces[i].length;j++){
//       this.faces[i][j] = applyM(this.faces[i][j],tMatrix);
//     }
//     }
//     this.center = applyM(this.center,tMatrix)
//   }
// }
