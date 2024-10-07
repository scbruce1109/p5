function valFromPoints(location,listPoints, defaultVal){

  var vals = [];

  for (let i = 0;i < listPoints.length;i++){
    var val = dist(location,listPoints[i])
    val = map(val,400,0,0.0,1.0);
    vals.push(val)
  }
  return calcAv(vals);

}

function oldAngleFromPoints(location,listPoints, defaultVal){

  var x = 0;
  var y = 0;

  for (let i = 0;i < listPoints.length;i++){
    var angle = getAngle(location,listPoints[i])
    x += cos(angle);
    y += sin(angle);
  }

  var newAngle = atan2(y,x);
  return calcAv(vals);

}

function meanAngle(listAngles,listWeights){
  // console.log(listAngles)
  var n = listAngles.length
  var x = 0;
  var y = 0;
  for (let i = 0;i<listAngles.length;i++){
    if (listWeights){
      x += cos(listAngles[i]) * listWeights[i]
    y += sin(listAngles[i]) * listWeights[i];
    } else {
    x += cos(listAngles[i]);
    y += sin(listAngles[i]);
    }
  }
  // console.log(x + "  "+ y + "  " + n)
  var angle = atan2(y,x)
  // console.log(angle)
  return angle

}

function angleFromPoints(location,listPoints, defaultVal){

  var vals = [];

  for (let i = 0;i < listPoints.length;i++){
    var val = getAngle(location,listPoints[i]) + PI/2
    vals.push(val)
  }
  return calcAv(vals);

}

function newAngleFromPoints(location,listPoints, radius){

  var vals = [];
  var weights = idwWeights(location, listPoints, radius,false,true)
  // console.log('weights')
  //  console.log(weights)

  for (let i = 0;i < listPoints.length;i++){
    var val = getAngle(location,listPoints[i])
    vals.push(val)
  }
  // console.log(vals)

  return meanAngle(vals,weights)+PI/2;

}

function colorFromPoints(location, colors, listPoints, radius, colorMode){
  var vals = [];
  var weights = idwWeights(location, listPoints, radius,true,false);

  return mixColors(colors,weights)
}

// function colorFromGradient(location, )


function weightedAv(listVals,listWeights){
  var products = []
  for (let i = 0;i<listVals.length;i++){
    products.push(listVals[i] * listWeights[i])
  }
  // console.log(products)
  return calcSum(products)
}


class NewGrid{
  constructor(x, y, width_, height_, spacing){
    this.x = x;
    this.y = y;
    this.width = width_;
    this.height = height_;
    this.spacing = spacing;
    this.grid = [];

    for (let x = this.x; x < this.width + this.x; x+= this.spacing){
      var row = [];
      for (let y = this.y; y < this.height + this.y;y += this.spacing){


        row.push(new NewGridValue(x,y, this.spacing,0));
      }
      this.grid.push(row);
    }
  }

  fillNoise(rez){
    for (let i = 0;i<this.grid.length;i++){
      for (let j = 0;j<this.grid[i].length;j++){
        this.grid[i][j].v = noise(this.grid[i][j].x*rez, this.grid[i][j].y*rez)
        this.grid[i][j].valueToAngle();
      }
    }
  }

  fillAngle(listAngles){
    for (let i = 0;i<this.grid.length;i++){
      for (let j = 0;j<this.grid[i].length;j++){

        // this.grid[i][j].angle = angleFromPoints(createVector(this.grid[i][j].x,this.grid[i][j].y),listAngles)

        this.grid[i][j].angle = newAngleFromPoints(createVector(this.grid[i][j].x,this.grid[i][j].y),listAngles,1200)

        // this.grid[i][j].valueToAngle();
      }
    }

  }

  fillPoints(listPoints){

  }

  fillColor(listColors,listPoints){
    for (let i = 0;i<this.grid.length;i++){
      for (let j = 0;j<this.grid[i].length;j++){

        // this.grid[i][j].angle = angleFromPoints(createVector(this.grid[i][j].x,this.grid[i][j].y),listAngles)

        this.grid[i][j].color_ = colorFromPoints(createVector(this.grid[i][j].x,this.grid[i][j].y),listColors,listPoints,1200)

        // this.grid[i][j].valueToAngle();
      }
    }

  }

  display(mode){
    for (let i = 0; i<this.grid.length;i++){
      for (let j = 0; j<this.grid[i].length;j++){
        this.grid[i][j].display(mode);
      }
    }

  }

   getValue(x,y, vType){
    var columnIndex = Math.floor(x / this.spacing)
    var roIndex = Math.floor(y / this.spacing)
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

    if (vType == 'v'){
    var val = this.grid[columnIndex][roIndex].v;
    return val;
    } else if (vType == 'a'){
      var a = this.grid[columnIndex][roIndex].angle;
      return a;
    }else if (vType == 'c'){
      var c = this.grid[columnIndex][roIndex].color_;
      return c;
    }
  }


}

class NewGridValue {
  constructor(x,y,size,v){
    this.x = x;
    this.y = y;
    this.size = size;
    this.v = v;
    this.angle;
    this.color_;
    this.probs;
  }

  display(mode){
  if (mode == 'a'){
    var v = new p5.Vector(this.x+this.size/2 * cos(this.angle),this.y+this.size/2 * sin(this.angle))
    line(this.x, this.y, v.x, v.y);
  } else if (mode == 'v'){
    var nColor = map(this.v,0,1,0,255)
    fill(nColor);
    rect(this.x,this.y,this.size,this.size);
  } else if (mode == 'c'){
    // var nColor = map(this.v,0,1,0,255)
    noStroke();
    fill(this.color_);
    rect(this.x,this.y,this.size,this.size);
  }
  }

  valueToAngle(){
    this.angle = map(this.v, 0.0, 1.0, 0.0, TAU)
  }

}


class NewMover {
  constructor(x,y,topSpeed,lifeForce,fillC,size,alpha_){
    this.location = new p5.Vector(x,y);
    this.velocity = new p5.Vector(0,0);
    this.topSpeed = topSpeed;
    this.mNoise = random(0,100000);
    this.nsize = 2;
    this.initSize = size;
    this.alive = true;
    this.lifeForce = lifeForce;
    this.fillC = fillC;
    this.initC = fillC;
    this.maxlifeForce = lifeForce
    this.alpha = alpha_;
  }

  applyForce(force,mortal){

    this.checkEdges();
    if (mortal){
    this.checkAlive()
    }
    if (this.alive){
    // var acceleration = sin(this.location.x * 0.01) + cos(this.location.y * 0.001) * PI *2;
    // var acceleration = grid.getAngle(this.location.x,this.location.y);
    this.velocity.x += cos(force);
    this.velocity.y += sin(force);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);

    this.display();
    }
    // this.mnoise += 0.01;
    // this.msize = map(noise(this.mnoise),0, 1, 1, 50);
    // this.msize -=10;
  }

  checkAlive(){
    if (this.alive){
      if (this.lifeForce <= 0){
        this.alive = false;
      } else {
        this.lifeForce -= 1;
      }
    }
  }

  checkEdges(){
    if (this.location.x > width+50){
      this.alive = false;
    } else if (this.location.x < -50){
      this.alive = false;
    } else if (this.location.y > height+50){
      this.alive = false;
    } else if (this.location.y <-50){
      this.alive = false;
    }
  }

  mixColor(color){
    var t = map(this.lifeForce, 0, this.maxlifeForce,0,1.0);
    var c = lerpColor2(this.initC, color,t, "MIX")
    this.fillC = c;
  }

  applyLife(life){
    this.lifeForce = life;
    if (life>0){
      this.alive = true;
    }
  }

  display(mix){
    if (1 == 2){
    // stroke(random(255),random(255),random(255),20);
    // fill(random(255),random(255),random(255),10);
  } else {
    noStroke();
    // if (mix){
    //   fill(this.mixColor)
    // }
    this.fillC.setAlpha(this.alpha)
    fill(this.fillC);
  }
    ellipse(this.location.x, this.location.y, this.initSize,this.initSize);
  }

}
