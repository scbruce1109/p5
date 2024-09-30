var movers = [];

function setup(){
  createCanvas(600,600);
  background(255);

  var grid1 = new FlowField(0,0,20,0.01);
  grid1.display();
  // var g2 = new GridBasic(100,100,width-100,height-100,10);
  // g2.display();

  for (let i = 0; i<1000;i++){
    movers.push(new Mover(random(0,width),random(0,height)))
  }

}


function draw(){
  for (let i=0; i<movers.length; i++) {
    movers[i].update();
    movers[i].display();
    // movers[i].checkEdges();
  }

}


class Curve{
  constructor(startX, startY, numSteps, xoff, yoff, stepLength){
    this.x = startX;
    this.y = startY;
    this.xOff = xoff;
    this.yOff = yoff;
    this.numSteps = numSteps;
    this.stepLength = stepLength;
  }

  drawCurve(grid, hue){
    beginShape();
    noFill();
    stroke(hue,80,50,0.1);
    strokeWeight(2);

    for (let i = 0;i<numSteps;i++){
      // if (x>width || x<0)

      vertex(x,y);
      var gridAngle = grid.getAngle(x,y);
      var xStep = stepLength * cos(gridAngle);
      var yStep = stepLength * sin(gridAngle);
      x += xStep;
      y += yStep;
    }
    endShape();
  }
}

class FlowField {
  constructor(xOff, yOff, spacing, rez){
    this.grid = [];
    this.xOff = xOff;
    this.yOff = yOff;
    this.spacing = spacing;
    this.rez = rez;

    for (let x = this.xOff; x< width - this.xOff; x+= this.spacing){
      var row = [];
      for (let y = this.yOff; y< height - this.yOff;y += this.spacing){
        var noiseV = noise(x*this.rez, y*this.rez);
        row.push(new GridValue(x,y, this.spacing, noiseV));
      }
      this.grid.push(row);
    }

  }

  display(){
    for (let i = 0; i<this.grid.length;i++){
      for (let j = 0; j<this.grid[i].length;j++){
        // console.log(this.grid[i][j])
        this.grid[i][j].display();
      }
    }

  }
}

// class GridValue {
//   constructor(x,y,size, value){
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.v = value;
//   }
//
//   display(){
//   var angle = map(this.v, 0.0, 1.0, 0.0, TAU);
//   var v = new p5.Vector(this.x+this.size/2 * cos(angle), this.y+this.size/2 * sin(angle))
//   line(this.x, this.y, v.x, v.y);
//   // console.log(this.x + "  " + this.y + "  " + this.size + "  " + this.v)
//   }
// }
//

class Mover {
  constructor(x,y){
    this.location = new p5.Vector(x,y);
    this.velocity = new p5.Vector(0,0);
    this.topSpeed = 1;
    this.mNoise = random(0,100000);
    this.nsize = 10;
  }

  update(){
    var acceleration = sin(this.location.x * 0.01) + cos(this.location.y * 0.001) * PI *2;
    this.velocity.x += cos(acceleration) * 0.8;
    this.velocity.y += sin(acceleration) * 0.8;
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
    this.mnoise += 0.01;
    // this.msize = map(noise(this.mnoise),0, 1, 1, 50);
    // this.msize -=10;
  }

  display(){
    stroke(0,10,275,20);
    fill(0,20,100,10);
    ellipse(this.location.x, this.location.y, 1,1);
  }

}


class GridBasic{
  constructor(x, y, width_, height_, spacing){
    this.x = x;
    this.y = y;
    this.width = width_;
    this.height = height_;
    this.spacing = spacing;
  }

  display(){
    for (let x = this.x; x<=this.width;x+= this.spacing){
      for (let y = this.y;y<=this.height;y+= this.spacing){
        var xloc = x;
        var yloc = y
        stroke(0,40);
        // line(xloc,yloc, xloc+this.spacing,yloc);
        // line(xloc,yloc,xloc,yloc+this.spacing)
        // rectMode(CENTER);
        // fill(0)
        // noStroke();
        // rect(x,y,10,10);
        // rect(x+this.spacing/2, y+this.spacing/2,10,10);

        var r = random(2,4);
        var rspace = Math.floor(random(1,4))
        if(r < 1 ){
          line(x,y,x+this.spacing*rspace,y+this.spacing*rspace)
        } else if(r < 2) {
          line(x+this.spacing*rspace, y, x, y+this.spacing*rspace);
        } else if (r < 3){
          line(x, y, x, y+this.spacing*rspace);
        } else if (r < 4){
          line(x, y, x+this.spacing*rspace, y);
        }

      }
    }
  }

}
