

function generatePoints(xloc, yloc, xsize, ysize, numVerts, offset){
  var pList = [];
  if (! offset){
    offset = 0;
  }
  offset = offset - 90;
  var spacing = 360 / numVerts;

  for (let i=0;i<numVerts;i++){
    var x = xloc + cos(radians(i*spacing+offset)) * xsize;
    var y = yloc + sin(radians(i*spacing+offset)) * ysize;
    pList.push(new p5.Vector(x,y))
  }
  return pList;
}

function generateArc(xloc, yloc, rad1, rad2, angle, offsetAngle){
  var points = [];
  offsetAngle = offsetAngle-90;
  var theta = offsetAngle;
  angle = angle

  while (theta <= offsetAngle + angle){
    var x = xloc + cos(radians(theta)) * rad1;
    var y = yloc + sin(radians(theta)) * rad1;
    points.push(new p5.Vector(x,y));
    theta += 1;
  }
  theta = offsetAngle + angle;
  while ( theta >= offsetAngle){
    var x = xloc + cos(radians(theta)) * rad2;
    var y = yloc + sin(radians(theta)) * rad2;
    points.push(new p5.Vector(x,y));
    theta -= 1;
  }
  return points;

}

class myShape {
  constructor(pointsList,close){
    this.points = pointsList;
    if (close){
      this.close = true;
    }
  }

  calcLength(){
    var d = 0;
    for (let i = 0;i<this.points.length-1;i++){
      var segD = this.points[i+1].dist(this.points[i])
      d += segD
    }
    this.length = d
  }

  subdivide(numSubdivisions){
    if (!numSubdivisions){
      numSubdivisions = 1;
    }
    var newPoints = []
    for (let i = 0;i<this.points.length-1;i++){
      newPoints.push(this.points[i]);
      newPoints.push(p5.Vector.lerp(this.points[i],this.points[i+1],0.5))
      if (i == this.points.length-2){
        newPoints.push(this.points[i+1])
      }
    }
    if (this.close){
      newPoints.push(p5.Vector.lerp(this.points[this.points.length-1],this.points[0],0.5))
    }
    this.points = newPoints;
  }

  offsetPoints(amount,preserveEnds){
    var newPoints = [];
    // if (!preserveEnds){
    //   var start = 1;
    //   var end = this.points.length-1;
    // } else {
    //   newPoints.push(this.points[0])
    //   var start = 1;
    //   var end = this.points.length-1;
    // }
    for (let i = 0;i<this.points.length-1;i++){
      var segAngle = getAngle(this.points[i],this.points[i+1])
      var orthAngle = segAngle + PI/2
      var a = random(-amount,amount)
      var x = this.points[i].x + cos(orthAngle) * a;
      var y = this.points[i].y + sin(orthAngle) * a;
      newPoints.push(createVector(x,y))

    }
    newPoints.push(this.points[this.points.length-1])
    this.points = newPoints
  }

  smoothChaikin(depth){
    for (let i = 0;i<depth;i++){
      this.points = chaikinSmooth(this.points)
    }
  }

  display(){
    beginShape();
    for (let i=0;i<this.points.length;i++){
      vertex(this.points[i].x, this.points[i].y);
    }
    if (this.close){
    endShape(CLOSE);
  }
  else {
    endShape();
  }
  }


}

function ringArcs(locx, locy, radius1, radius2, numSegs, spacer){



}

function arcRing(xloc, yloc, radius1, radius2, numVerts, offset, angle,fillC){
  var pList = [];
  if (! offset){
    offset = 0;
  }
  offset = offset;
  var spacing = 360 / numVerts;

  for (let i=0;i<numVerts;i++){
    var theta = -i*spacing+offset
    var daArc = generateArc(xloc,yloc,radius1,radius2,angle,theta-angle/2)
    var daShape = new myShape(daArc);
    fill(fillC);
    daShape.display();
    // var x = xloc + cos(radians(i*spacing+offset)) * xsize;
    // var y = yloc + sin(radians(i*spacing+offset)) * ysize;
    // pList.push(new p5.Vector(x,y))
  }
  // return pList;
}

function arcCircle(xloc, yloc, radius, numY, numX, offset){
  var ySpacing = (radius / numY);
  var off = 0
  var num = 2
  var angle = 360 / numX;

  for (let i = 0;i<numY;i++){
    var r1 = radius-i* ySpacing;
    var r2 = radius-(i+1)* ySpacing;
    arcRing(xloc,yloc,r1,r2,numX,off,angle)
    // num += 1
    // off += 10;
    // noFill();
    // stroke(0);
    // ellipse(xloc,yloc,r*2,r*2);

  }

}


function polygonContainsPoint(polygonPoints, testPoint) {
  var numVerts = polygonPoints.length;
  var c = false;
  var j = numVerts - 1;
  for (let i = 0; i < numVerts; i++)     {
    var deltaX = polygonPoints[j].x - polygonPoints[i].y;
    var ySpread = testPoint.y - polygonPoints[i].y;
    var deltaY = polygonPoints[j].y - polygonPoints[i].y;
    if (((polygonPoints[i].y > testPoint.y) != (polygonPoints[j].y > testPoint.y)) &&
        (testPoint.x < (((deltaX * ySpread) / deltaY) + polygonPoints[i].x))) {
      c = !c;
    }
    j = i;
  }
  return c;
}

function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

    var x = point.x, y = point.y;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

//https://www.algorithms-and-technologies.com/point_in_polygon/javascript
// const pointInPolygon = function (polygon, point) {
//     //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
//     let odd = false;
//     //For each edge (In this case for each point of the polygon and the previous one)
//     for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
//         //If a line from the point into infinity crosses this edge
//         if (((polygon[i].y > point.y) !== (polygon[j].y > point.y)) // One point needs to be above, one below our y coordinate
//             // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
//             && (point.x < ((polygon[j].x - polygon[i].x) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
//             // Invert odd
//             odd = !odd;
//         }
//         j = i;

//     }
//     //If the number of crossings was odd, the point is in the polygon
//     return odd;
// };


function pointsBB(points){
  var l = Infinity;
  var r = -Infinity;
  var t = Infinity;
  var b = -Infinity;

  for (let i = 0;i<points.length;i++){
    // ellipse(points[i].x,points[i].y,10,10)
    console.log('hey')
    if (points[i].x < l){
      console.log('woo')
      l = points[i].x;
    }
    if (points[i].x > r){
      r = points[i].x;
      console.log('bif')
    }
    if (points[i].y < t){
      t = points[i].y;
      console.log('baff')
    }
    if (points[i].y > b){
      b = points[i].y;
      console.log('wobo')
    }

  }
  // rect(l,t,r-l,b-t)
  // rect(l,t,200,200)
  return [l,r,t,b];

}

function circumCircle(points){

}

function fillPoly(pPoints,numPoints){
  var bbb = pointsBB(pPoints)

  for (let i = 0;i<numPoints;i++){
    var pp = createVector(random(bbb[0],bbb[1]),random(bbb[2],bbb[3]))

    if(inside(pp,pPoints)){
      point(pp.x,pp.y)
    }


  }
}


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
//   } else if (axis == 'y'){
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
//   // display(mode,projected,fillC,strokeC){
//   //   if (!mode){
//   //     mode = this.displayMode;
//   //   }
//   //   mode = this.displayMode;
//   //   // if
//   //   var verts;
//   //   // if(projected){
//   //     verts = this.pVerts;
//   //   // } else {
//   //   //   verts = this.verts;
//   //   // }
//   //   // if (mode == 'p'){
//   //   //   stroke(0)
//   //   //   for (let i = 0;i<verts.length;i++){
//   //   //     point(verts[i].x,verts[i].y)
//   //   //   }
//   //   // } else if (mode == 'e'){
//   //   //
//   //   //   stroke(0,100)
//   //   //   for (let i = 0;i<this.edges.length;i++){
//   //   //     // var zz = map(this.verts[index[1].z,this.centerPoin.z,])
//   //   //     var index = this.edges[i];
//   //   //     // console.log(index)
//   //   //     line(verts[index[0]].x,verts[index[0]].y,verts[index[1]].x,verts[index[1]].y)
//   //   //   }
//   //   //   } else if (mode == 'f'){
//   //       // noStroke();
//   //       // fill(fillC);
//   //     for (let i = 0;i<this.faces.length;i++){
//   //       beginShape();
//   //
//   //       for (let i = 0;i<verts.length;i++){
//   //       vertex(verts[i].x,verts[i].y)
//   //     }
//
//
//   // endShape(CLOSE);
//   //
//   //     }
//     // }
//   // }
//
//   // project(cam){
//   //   this.pVerts = [];
//   //   for (let i = 0;i<this.verts.length;i++){
//   //       var pP = cam.pointInPerspective(this.verts[i])
//   //       this.pVerts.push(pP);
//   //     }
//   // }
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
//
//   // rotateMesh(angle, axis, p){
//   //   if (!p){
//   //     p = this.center
//   //   }
//   //   var rotMatrix = rotateAroundPoint(p, angle, axis);
//   //   for (let i =0;i<this.verts.length;i++){
//   //     this.verts[i] = applyM(this.verts[i],rotMatrix);
//   //   }
//   //   this.center = applyM(this.center,rotMatrix)
//   // }
//   // translateMesh(x,y,z){
//   //   var tMatrix = translateMatrix(x,y,z);
//   //   for (let i =0;i<this.verts.length;i++){
//   //     this.verts[i] = applyM(this.verts[i],tMatrix);
//   //   }
//   //   this.center = applyM(this.center,tMatrix)
//   // }
//
// }

// function makeRect(center,width_,height_,dMode){
//   var ps = [
//     createVector(center.x - width_/2,center.y - height_/2),
//     createVector(center.x + width_/2,center.y - height_/2),
//     createVector(center.x + width_/2,center.y + height_/2),
//     createVector(center.x - width_/2,center.y + height_/2),
//   ]
//   var rec = new Mesh(center,ps,dMode)
//   rec.edges = [
//     [0,1],
//     [1,2],
//     [2,3],
//     [3,0]
//   ]
//   rec.faces = [[0,1,2,3]]
//   // rec.display('e')
//   return rec;
// }
//
//
// function makeBox(center,width_,height_,girth,dmode){
//   var ps = [
//     createVector(center.x - width_/2,center.y - height_/2,center.z + girth/2),
//     createVector(center.x + width_/2,center.y - height_/2,center.z + girth/2),
//     createVector(center.x + width_/2,center.y + height_/2,center.z + girth/2),
//     createVector(center.x - width_/2,center.y + height_/2,center.z + girth/2),
//     createVector(center.x - width_/2,center.y - height_/2,center.z - girth/2),
//     createVector(center.x + width_/2,center.y - height_/2,center.z - girth/2),
//     createVector(center.x + width_/2,center.y + height_/2,center.z - girth/2),
//     createVector(center.x - width_/2,center.y + height_/2,center.z - girth/2),
//   ]
//   var boxx = new Mesh(center,ps,dmode)
//   boxx.edges = [
//     [0,1],
//     [1,2],
//     [2,3],
//     [3,0],
//     [0,4],
//     [1,5],
//     [2,6],
//     [3,7],
//     [4,5],
//     [5,6],
//     [6,7],
//     [7,4]
//   ]
//   boxx.faces = [[0,1,2,3]]
//   // rec.display('e')
//   return boxx;
// }

// function arrayOnLine(mesh,p1,p2,num){
//   var t = 1 / num;
//   var meshArray = []
//   for (let i = 0;i<num;i++){
//     var newP = p5.Vector.lerp(p1,p2,t*i)
//     var meshCopy = mesh.copy();
//     meshCopy.translate(p5.Vector.sub(newP,p1))
//     meshArray.push(meshCopy)
//   }
//   return meshArray;
// }

function arrayOnLine(mesh,line,num){
  var t = 1 / num;
  var meshArray = []
  for (let i = 0;i<num;i++){
    var newP = line.lerpLine(t*i,true)
    var meshCopy = mesh.copy();
    meshCopy.translate(p5.Vector.sub(newP[0],line.origin))
    var segA = getAngle3D(line.faces[0][newP[1]],newP[0])

    // meshCopy.rotate(radians(segA[0]+0),'x')
    meshCopy.rotate(radians(segA[1]),'z')
    meshArray.push(meshCopy)
  }
  return meshArray;
}

function makeArray(meshArray,space,num, axis){
  arrayMeshes = [];

  for (let i = 0;i<num;i++){
    for (let j = 0;j<meshArray.length;j++){
    var meshCopy = meshArray[j].copy();

    // meshCopy.edges = meshArray[j].edges
    // meshCopy.faces = meshArray[j].faces
    if (axis == 'x'){
      meshCopy.translate(createVector(space*(i+1),0,0));
    } else if (axis == 'y'){
      meshCopy.translate(createVector(0,space*(i+1),0))
    } else {
      meshCopy.translate(createVector(0,0,space*(i+1)))
    }

    arrayMeshes.push(meshCopy)
  }
}
  return arrayMeshes;

}

////// neighbor influence
