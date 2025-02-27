
class Camera{
  constructor(x,y,width_,height_,fov,location,rotation,tilt){
    this.x = x;
    this.y = y;
    this.width = width_
    this.height = height_;
    this.fov = fov;

    this.cameraHeight;

    this.sp = new p5.Vector(x+ width_/2, (y+height_/2) + tan(radians(90-fov/2))*(width_/2))
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
    for (let i = 0;i<world.objects.length;i++){
      world.objects[i].rotateMesh(radians(-this.rotation.z),'z',this.sp2);
      world.objects[i].rotateMesh(radians(-this.rotation.x),'x',this.sp2);
      world.objects[i].rotateMesh(radians(-this.rotation.y),'y',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.y+y),'y',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.x+x),'x',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.z+z),'z',this.sp2);
    }
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;

    this.rotMatrixY = rotateAroundPoint(this.sp2, radians(this.rotation.y),'y')
    this.rotMatrixX = rotateAroundPoint(this.sp2,radians(this.rotation.x),'x')
    this.rotMatrixZ = rotateAroundPoint(this.sp2, radians(this.rotation.z),'z');
    this.displayHL()
  }

translate(world, v){
  for (let i = 0;i<world.objects.length;i++){
    world.objects[i].translateMesh(-v.x,-v.y,-v.z);
    // this.objects[i].display();
  }
  // this.location.add(v);
  this.location.x += -sin(radians(this.rotation.y))*v.z + cos(radians(this.rotation.y))*v.x
  this.location.z += cos(radians(this.rotation.y))*v.z + sin(radians(this.rotation.y))*v.x
  this.location.y += v.y

  this.worldTraslateV = p5.Vector.sub(this.location, this.sp2);
  this.tMatrix = translateMatrix(-this.worldTraslateV.x,-this.worldTraslateV.y,-this.worldTraslateV.z);
}

}

class World{
  constructor(x,y,width_,height_,origin){

    this.hl = height/2;
    this.objects = [];
    this.origin = origin;
    this.groundPlane = origin.y;
    this.rotation = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;

  }

  translate(x,y,z){
    for (let i = 0;i<this.objects.length;i++){
      this.objects[i].translateMesh(x,y,z);
      // this.objects[i].display();
    }
    this.x += x;
    this.y +=y;
    this.z +=z;
  }

  rotate(sp,angle,axis){
    this.rotation += angle;
    for (let i = 0;i<this.objects.length;i++){

      this.objects[i].rotateMesh(radians(angle),axis,sp);

    }
  }

  camRotate(cam){
    for (let i = 0;i<this.objects.length;i++){
      this.objects[i].rotateMesh(radians(cam.rotation.y),'y',cam.sp2);
      this.objects[i].rotateMesh(radians(cam.rotation.x),'x',cam.sp2);
      this.objects[i].rotateMesh(radians(cam.rotation.z),'z',cam.sp2);
    }
  }

  camUnRotate(cam, newRotation){
    for (let i = 0;i<this.objects.length;i++){
      this.objects[i].rotateMesh(radians(-cam.rotation.z),'z',cam.sp2);
      this.objects[i].rotateMesh(radians(-cam.rotation.x),'x',cam.sp2);
      this.objects[i].rotateMesh(radians(-cam.rotation.y),'y',cam.sp2);
      this.objects[i].rotateMesh(radians(cam.rotation.y+newRotation.y),'y',cam.sp2);
      this.objects[i].rotateMesh(radians(cam.rotation.x+newRotation.x),'x',cam.sp2);
      this.objects[i].rotateMesh(radians(cam.rotation.z+newRotation.z),'z',cam.sp2);
    }
  }

  display(cam){
    for (let i = 0;i<this.objects.length;i++){
      this.objects[i].project(cam);
      this.objects[i].display();
    }
  }

}

class Camera2{
  constructor(x,y,width_,height_,fov,tilt){
    this.x = x;
    this.y = y;
    this.width = width_
    this.height = height_;
    this.fov = fov;

    if (!tilt){
      this.tilt = 0;
    } else {
      this.tilt = tilt;
    }

    this.cameraHeight;

    this.sp = new p5.Vector(x+ width_/2, (y+height_/2) + tan(radians(90-fov/2))*(width_/2))
    this.sp2 = createVector(this.sp.x-width/2,this.height/2,-(this.sp.y-this.height/2))
    this.location = this.sp2.copy();
    this.cv = createVector(x+width_/2,y+height_/2)
    this.el = y + height_/2
    this.ml = y + height_
    this.mpr = createVector(this.cv.x + this.sp.dist(this.cv),this.el)
    this.mpl = createVector(this.cv.x - this.sp.dist(this.cv),this.el)
    this.rotation = {x: 0, y:0,z:0} ///// order for rotations .. y, x, then z

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
    // var hl = intersectPoint(createVector(x,y),this.cv,createVector(x+p.z,y),this.mpl)
    line(this.x,hl,this.x+this.width,hl)
    return hl;
  }

  tiltCam(angle){
    this.tilt += angle;
  }

  rotate(world,x,y,z){
    for (let i = 0;i<world.objects.length;i++){
      world.objects[i].rotateMesh(radians(-this.rotation.z),'z',this.sp2);
      world.objects[i].rotateMesh(radians(-this.rotation.x),'x',this.sp2);
      world.objects[i].rotateMesh(radians(-this.rotation.y),'y',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.y+y),'y',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.x+x),'x',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.z+z),'z',this.sp2);
    }
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;
    this.displayHL()
  }

translate(world, v){
  for (let i = 0;i<world.objects.length;i++){
    world.objects[i].translateMesh(-v.x,-v.y,-v.z);
    // this.objects[i].display();
  }
  this.location.add(v);
}

}



class Camera2_old{
  constructor(x,y,width_,height_,sp,rotation,fov){
    this.x = x;
    this.y = y;
    this.width = width_
    this.height = height_;
    this.fov = fov;

    this.cameraHeight;
    this.spw = sp;
    this.sp = new p5.Vector(x+ width_/2, (y+height_/2) + tan(radians(90-fov/2))*(width_/2))
    this.sp2 = createVector(this.sp.x-width/2,this.height/2,-(this.sp.y-this.height/2))
    this.cv = createVector(x+width_/2,y+height_/2)
    this.el = y + height_/2
    this.ml = y + height_
    this.mpr = createVector(this.cv.x + this.sp.dist(this.cv),this.el)
    this.mpl = createVector(this.cv.x - this.sp.dist(this.cv),this.el)
    this.rotation = {x: 0, y:0,z:0} ///// order for rotations .. y, x, then z
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
    var newH = tan(radians(this.rotation.x))*this.sp.y

    var hl = this.height/2 + newH
    // var hl = intersectPoint(createVector(x,y),this.cv,createVector(x+p.z,y),this.mpl)
    line(this.x,hl,this.x+this.width,hl)
    return hl;
  }

  tiltCam(angle){
    this.tilt += angle;
  }

  rotate(world,x,y,z){
    for (let i = 0;i<world.objects.length;i++){
      world.objects[i].rotateMesh(radians(-this.rotation.z),'z',this.sp2);
      world.objects[i].rotateMesh(radians(-this.rotation.x),'x',this.sp2);
      world.objects[i].rotateMesh(radians(-this.rotation.y),'y',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.y+y),'y',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.x+x),'x',this.sp2);
      world.objects[i].rotateMesh(radians(this.rotation.z+z),'z',this.sp2);
    }
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;
    this.displayHL()
  }

translate(world, v){
  for (let i = 0;i<world.objects.length;i++){
    world.objects[i].translateMesh(-v.x,-v.y,-v.z);
    // this.objects[i].display();
  }
  this.sp2.add(v);
}

}
