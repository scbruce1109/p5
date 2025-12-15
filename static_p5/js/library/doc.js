
for (let i = 0;i<thing.length;i++){

}

for (let j = 0;j<thing1.length;j++){
  for (let i = 0;i<thing.length;i++){

  }
}

//// camera stuff
Camera(x,y,width_,height_,fov,location,rotation,tilt)



///// 3D classes
Mover3D(startLoc,topSpeed,mesh,startVelocity)
  addForce(force)
  attract(mover, g)
  display(camera)


Mesh(centerPoint, faces, verts,line,dMode)
  rotate(angle,axis) -- rotation matrix applied to points, rotation stored
  translate(v)

Rect3D(center, width_, height_, centerOnBase)

Box3D(center, width_, height_, girth, centerOnBase)

Ellipse3D(center,radiusX,radiusY,numPoints)


Line3D(points)
  calcLength()
  lerpLine(lerpVal,returnIndex)
  smoothChaikin(depth)
  randomPoints(numPoints)


Sphere3D(center,radius)


//////// 3D functions
pointOnGround(camera,angle,depth)

placePointInFov(camera,alt, az)

fovWidth(camera,distance)

placePoint3D(p, altitude,azimuthA,r)

getAngle3D(p1,p2)

spherePoints(center,radius,numPoints)

sortPoints(meshes, camera)

noise3D1(v)

arrayOnLine(mesh,line,num)

makeArray(meshArray,space,num, axis)

vectorFromAngles(altitude,azimuthA,mag)


//////2D shape functions

getAngle(origin, endpoint)

pointsBB(points)

inside(point, vs)

fillPoly(pPoints,numPoints)

distributePointsOnArc(center,radius,numPoints,startAngle,endAngle)

distributePointsOnLine(origin, endpoint, numPoints)

intersectPoint(point1, point2, point3, point4)

endpointFromAngle(origin, angle, distance)

/////// 2D shape classes
myShape(pointsList,close)
  calcLength()
  subdivide(numSubdivisions)
  offsetPoints(amount,preserveEnds)
  smoothChaikin(depth)

PolyLine(listPoints)
  calcLength()
  subdivide(numSubdivisions)
  offsetPoints(amount,preserveEnds)
  smoothChaikin(depth)
  displayDotted(density,color)
  displayWavy(amount,step,color,alpha)


//// color classes
colorPalette(listHexes)
  getColor(val, reps)
  mapColor(lerpVal, colorSpace, start_, end, type, ease, reps)
  multiColor(colorList, lerpVal)
  multiColor2(colorList, lerpVal,reps)


//// color functions
hsbToRGB(hsbColor)

getImgColor(img, x, y)

rgb2hsluv(rgbColor)

lerpColor2(color1,color2,lurpVal, colorSpace, start, end, type, ease)

bumpColor(c, bList)

jitterColor(c, jList, gaussian)

mixColors(colors,weights)

multiColor(colorList, lerpVal)

multiColor2(colorList, lerpVal,reps)

/// grid class
Grid(x, y, width_, height_, spacing)
  getValue(x,y, vType)
  display()

ScalarGrid(x, y, width_, height_, spacing)
  fillNoise(rez)
  display()

VectorGrid(x, y, width_, height_, spacing)
  fillNoise(rez)
  display()

ColorGrid(x, y, width_, height_, spacing)
  fillGradient(listColorsX,paletteY)
  fillColor(listColors,listPoints,radius,defaultC)

/// grid functions
weightedAv(listVals,listWeights)

colorFromPoints(location, colors, listPoints, radius, defaultC) -- takes list of colors (as color type)

newAngleFromPoints(location,listPoints, radius)

meanAngle(listAngles,listWeights)

//// idw
function idw5(samplePoint, listKnownPoints, radius, w, defaultVal)
