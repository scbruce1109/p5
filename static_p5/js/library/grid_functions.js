
function drawGrid(xoff, yoff, width, height, divisionsX, divisionsY, scale){
  for (let i=0;i<divisionsX+1;i++){
    if (i==0){
      // noStroke();
    }
    else {
    stroke(0);
    }
    // line(xoff+width/divisionsY*i, yoff, xoff+width/divisionsY*i,yoff+height);
    dottedLine(new p5.Vector(xoff+width/divisionsY*i, yoff), new p5.Vector(xoff+width/divisionsY*i,yoff+height), 0.3);
    // dashedLine(new p5.Vector(xoff+width/divisionsY*i, yoff), new p5.Vector(xoff+width/divisionsY*i,yoff+height), int(random(5,15)), 20);
  }

  for (let i=0;i<divisionsY+1;i++){
    if (i==0){
      // noStroke();
    }
    else {
    stroke(0);
    }
    // line(xoff, yoff+height/divisionsY*i, xoff+width,yoff+height/divisionsY*i);
    dottedLine(new p5.Vector(xoff, yoff+height/divisionsY*i), new p5.Vector(xoff+width,yoff+height/divisionsY*i), 0.3);
    // dashedLine(new p5.Vector(xoff, yoff+height/divisionsY*i), new p5.Vector(xoff+width,yoff+height/divisionsY*i),int(random(5,15)), 20);
  }
}

class Grid {
  // var xOff, yOff, spacing, rez;
  // ArrayList<ArrayList<GridRect>> grid;

  constructor(xOff, yOff, spacing, rez){
    this.grid = [];
    this.spacing = spacing;

    for (let x =xOff; x<width-xOff; x+=spacing) {
      var row = [];
    // ArrayList<GridRect> row  = new ArrayList<GridRect>();
    for (let y = yOff; y<height-yOff; y+=spacing) {
      console.log(x)
      //float angle = map(noise(x*rez, y*rez), 0.0, 1.0, 0.0, TAU);
      // var ncolor = map(noise(x*rez, y*rez), 0.0, 1.0, 0.0, 255);

      //row.add(new GridAngle(x, y, spacing/2, angle));
      row.push(new p5.Vector(x,y,noise(x*rez, y*rez)));
    }
    this.grid.push(row);
  }

  }

  displayAngle(){
    var r = this.spacing / 2;
    for (let x = 0; x<this.grid.length; x++) {
    for (let y = 0; y<this.grid[x].length; y++) {
      var a = map(this.grid[x][y].z, 0.0, 1.0, 0.0, TAU)
      var x_ = this.grid[x][y].x;
      var y_ = this.grid[x][y].y;
      var v =  new p5.Vector(x_+r * cos(a), y_ + r * sin(a));
      line(x_, y_, v.x, v.y);
      // grid[x][y].display();
    }
  }
  }

  displayPix(){
    for (let x = 0; x<this.grid.length; x++) {
    for (let y = 0; y<this.grid[x].length; y++) {
      var c = map(this.grid[x][y].z, 0.0, 1.0, 0.0, 255.0);
      var x_ = this.grid[x][y].x;
      var y_ = this.grid[x][y].y;
      fill(c);
      noStroke();
      rect(x_, y_, this.spacing, this.spacing);
      // grid[x][y].display();
    }
  }
  }

  // gridDraw(){
  //   for (let x = 0; x<grid.size(); x++) {
  //   for (let y = 0; y<grid.get(0).size(); y++) {
  //     grid[x][y].display();
  //
  //   }
  // }
  // }

}


function averageGrid(listGrids, weightGrid){
  var rez = 100000;
  var highest;
  //// gets highest resolution of all grid for the new average grid
  for (let i = 0;i<listGrids.length;i++){
    if (listGrids[i].spacing < rez){
      rez = listGrids[i].spacing;
      highest = i;
    }
  }
  var avGrid = new Grid2(0,0,width,height,rez,noise,0.1);
  var weightFactor = 0.75;

  for (let i = 0; i<avGrid.grid.length;i++){
    for (let j = 0; j<avGrid.grid[i].length;j++){
      // this.grid[i][j].getAngleFromPoints([createVector(width/2,height/2),createVector(width,height)]);
      // this.grid[i][j].offsetAngle(PI/2)
      var x = avGrid.grid[i][j].x;
      var y = avGrid.grid[i][j].y;
      v1 = listGrids[0].getValue(x,y)
      v2 = listGrids[1].getValue(x,y)
      var w = weightGrid.getValue(x,y);
      v1 = v1 * w;
      v2 = v2 * (1 - w);
      avGrid.grid[i][j].v = (v1 + v2);
      avGrid.grid[i][j].angle = map((v1 + v2), 0.0, 1.0, 0.0, TAU);
    }
  }
  return avGrid

  // console.log(highest + "  " + rez)
}

function calcAv(array) {
  const sum = array.reduce((acc, val) => acc + val, 0);
  return array.length ? sum / array.length : 0;
}


function cornerToCenter(x,y,width_,height_){

  var newX = x - width_/2;
  var newY = y - height_/2

  return [newX,newY]
}

function sinThing(x,y,spacing){
var noiseV = sin(x * 0.01/spacing) + cos(y * 0.01/spacing) * PI *2
  return(noiseV)
}

// function

class Grid2 {
  constructor(xLoc, yLoc, width_, height_, spacing, func, rez){
    this.grid = [];
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    this.width = this.xLoc + width_
    this.height = this.yLoc+ height_
    this.spacing = spacing;
    // if (! rez){
    //   this.rez = 1;
    // } else {
    this.rez = rez;


    for (let x = this.xLoc; x< this.width; x+= this.spacing){
      var row = [];
      for (let y = this.yLoc; y< this.height;y += this.spacing){
        var noiseV = func(x*this.rez, y*this.rez);
        console.log(noiseV)
        // var noiseV = valFromPoints(createVector(x,y),[createVector(width/2,height/2,1)],0)
        // var noiseV = sin(x * 0.01/this.spacing) + cos(y * 0.01/this.spacing) * PI *2
        var gridObj = new GridValue(x,y, this.spacing, noiseV)
        // gridObj.getAngleFromPoints([createVector(0,0),createVector(width/2,height/2)]);
        // gridObj.offsetAngle(PI/2)
        row.push(gridObj);
      }
      this.grid.push(row);
    }

  }

  display(){
    for (let i = 0; i<this.grid.length;i++){
      for (let j = 0; j<this.grid[i].length;j++){
        // this.grid[i][j].getAngleFromPoints([createVector(width/2,height/2),createVector(width,height)]);
        // this.grid[i][j].offsetAngle(PI/2)
        this.grid[i][j].display();
      }
    }

  }

  displayRect(){
    for (let i = 0; i<this.grid.length;i++){
      for (let j = 0; j<this.grid[i].length;j++){
        // this.grid[i][j].getAngleFromPoints([createVector(width/2,height/2),createVector(width,height)]);
        // this.grid[i][j].offsetAngle(PI/2)
        this.grid[i][j].displayRect();
      }
    }

  }



  getValue(x,y){
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
    var val = this.grid[columnIndex][roIndex].v;
    return val;
  }

  getAngle(x,y){
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
    // console.log(x + "  " + y)
    // console.log(columnIndex + "  " + roIndex)
    var angle = this.grid[columnIndex][roIndex].angle;
    return angle;
  }
}

class GridValue {
  constructor(x,y,size, value){
    this.x = x;
    this.y = y;
    this.size = size;
    this.v = value;
    this.angle = map(this.v, 0.0, 1.0, 0.0, TAU);
  }

  getValFromPoints(listPoints){

  }

  getAngleFromPoints(listPoints){
    var x = 0;
    var y = 0;
    var sumWeights = 0;
    for (let i = 0;i < listPoints.length;i++){
      var loc = new p5.Vector(this.x,this.y);
      var weight = dist(loc.x,loc.y,listPoints[i].x,listPoints[i].y)
      weight = map(weight,320,0,0.0,1.0)
      var angle = getAngle(loc,listPoints[i])
      x += cos(angle)*weight;
      y += sin(angle)*weight;
      sumWeights += weight;
    }
    // x = x/sumWeights;
    // y = y/sumWeights;
    this.angle = atan2(y,x);
  }

  setVal(val){
    this.v = val;
    this.angle = map(val, 0.0, 1.0, 0.0, TAU);
  }

  setAngle(angle){
    this.angle = angle;
  }

  offsetAngle(offset){
    this.angle += offset;
  }

  display(){
  // var angle = map(this.v, 0.0, 1.0, 0.0, TAU);
  var v = new p5.Vector(this.x+this.size/2 * cos(this.angle), this.y+this.size/2 * sin(this.angle))
  line(this.x, this.y, v.x, v.y);
  // console.log(this.x + "  " + this.y + "  " + this.size + "  " + this.v)
  }

  displayRect(){
    var nColor = map(this.v,0,1,0,255)
    fill(nColor);
   rect(this.x,this.y,this.size,this.size);
  }
}

// class Mover2 {
//   constructor(x,y, topSpeed, fillC,size_){
//     this.location = new p5.Vector(x,y);
//     this.velocity = new p5.Vector(0,0);
//     this.topSpeed = topSpeed;
//     this.mNoise = random(0,100000);
//     this.nsize = 2;
//     this.alive = true;
//     this.lifeForce = 40;
//     this.fillC = fillC;
//     this.size = size_
//   }
//
//   update(grid){
//
//     this.checkEdges(grid);
//     // this.checkAlive()
//     if (this.alive){
//     // var acceleration = sin(this.location.x * 0.01) + cos(this.location.y * 0.001) * PI *2;
//     var acceleration = grid.getAngle(this.location.x,this.location.y);
//     this.velocity.x += cos(acceleration);
//     this.velocity.y += sin(acceleration);
//     this.velocity.limit(this.topSpeed);
//     this.location.add(this.velocity);
//
//     this.display();
//     }
//     // this.mnoise += 0.01;
//     // this.msize = map(noise(this.mnoise),0, 1, 1, 50);
//     // this.msize -=10;
//   }
//
//   checkAlive(){
//     if (this.alive){
//       if (this.lifeForce <= 0){
//         this.alive = false;
//       } else {
//         this.lifeForce -= 1;
//       }
//     }
//   }
//
//   checkEdges(grid){
//     if (this.location.x > grid.width){
//       this.alive = false;
//     } else if (this.location.x < grid.xLoc){
//       this.alive = false;
//     } else if (this.location.y > grid.height){
//       this.alive = false;
//     } else if (this.location.y < grid.yLoc){
//       this.alive = false;
//     }
//   }
//
//   display(){
//     if (1 == 2){
//     // stroke(random(255),random(255),random(255),20);
//     // fill(random(255),random(255),random(255),10);
//   } else {
//     noStroke();
//     fill(this.fillC,20);
//   }
//     ellipse(this.location.x, this.location.y, this.size,this.size);
//   }
//
// }


/////////////////////// Layout grids

class GridLayout {
  constructor(x,y,width_,height_,borderX,borderY, space, numRow, numCol){
    this.x = x;
    this.y = y;
    this.borderX = borderX;
    this.borderY = borderY;

    this.width = width_ - borderX*2;
    this.height = height_ - borderY*2;

    this.space = space;
    this.numRow = numRow;
    this.numCol = numCol;

    this.startX = this.x + this.borderX;
    this.startY = this.y + this.borderY;

		this.grids = [];

		this.build();
  }

  // build(){
  //   for (let i=0;i<this.numCol;i++){
  //     for (let r=0;r<this.numRow;r++){

  //     }
  //   }
  // }

  build(){
    // fill(0);
    var x = this.startX;
    var y = this.startY;
    // rect(this.x+this.borderX, this.y + this.borderY, this.width,this.height)

    for (let i=0;i<this.numCol;i++){
      for (let r=0;r<this.numRow;r++){
        var xloc = (this.width-this.space*(this.numCol-1))/this.numCol;////random(endx/numCol);
        var yloc = (this.height-this.space*(this.numRow-1))/this.numRow;/////random(endy/numCol);
				this.grids.push(new GridRect(x,y,xloc,yloc))
        // rect(x, y, xloc,yloc);
        y += yloc;
        y += this.space;
      }
      y = this.startY;
      x += xloc;
      x += this.space;
    }
  }

	display(){
		for (let i = 0;i<this.grids.length;i++){
			this.grids[i].display();
		}
	}
}

class GridRect{
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

	display(fillC, strokeC){
		if (! fillC){
			fill(0)
		} else {
		fill(fillC)
		}
		if (! strokeC){
		noStroke()
		} else {
			stroke(strokeC)
		}
		rect(this.x,this.y,this.width,this.height)
	}
}

class GridBasic{
  constructor(x, y, width_, height_, spacing){
    this.x = x;
    this.y = y;
    this.width = width_;
    this.height = height_;
    this.spacing = spacing;
    this.points = []

    for (let x = this.x; x<=this.width;x+= this.spacing){
      var row = [];
      for (let y = this.y;y<=this.height;y+= this.spacing){
        var xloc = x;
        var yloc = y
        row.push(createVector(xloc,yloc))
  }
  this.points.push(row)
}
}

  display(){
    for (let x = this.x; x<=this.width;x+= this.spacing){
      for (let y = this.y;y<=this.height;y+= this.spacing){
        var xloc = x;
        var yloc = y
        // stroke(0,40);
        // line(xloc,yloc, xloc+this.spacing,yloc);
        // line(xloc,yloc,xloc,yloc+this.spacing)
        // rectMode(CENTER);
        // fill(0)
        // noStroke();
        // rect(x,y,10,10);
        // rect(x+this.spacing/2, y+this.spacing/2,10,10);

        var r = random(0,4);
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

// class Grid {
//   // var xOff, yOff, spacing, rez;
//   // ArrayList<ArrayList<GridRect>> grid;
//
//   constructor( xOff_, yOff_, spacing_, rez_){
//     this.grid = [];
//     this.xOff = xOff_;
//     this.yOff = yOff_;
//     this.spacing = spacing_;
//     this.rez = rez_;
//
//     for (let x =this. xOff; x<width-this.xOff; x+=this.spacing) {
//       var rows; = [];
//     // ArrayList<GridRect> row  = new ArrayList<GridRect>();
//     for (let y = this.yOff; y<width-this.yOff; y+=this.spacing) {
//       //float angle = map(noise(x*rez, y*rez), 0.0, 1.0, 0.0, TAU);
//       var ncolor = map(noise(x*this.rez, y*this.rez), 0.0, 1.0, 0.0, 255);
//
//       //row.add(new GridAngle(x, y, spacing/2, angle));
//       row.push(new GridRect(x, y, this.spacing, ncolor));
//     }
//     grid.push(row);
//   }
//
//   }
//
//   gridDraw(){
//     for (let x = 0; x<grid.size(); x++) {
//     for (let y = 0; y<grid.get(0).size(); y++) {
//       grid[x][y].display();
//     }
//   }
//   }
//
// }
//
// class GridAngle{
// constructor (x_, y_, r_, angle_){
//  this.x = x_;
//  this.y = y_;
//
//  this.angle = angle_;
//  this.r = r_;
//  this.v = new p5.Vector(x+r * cos(angle), y + r * sin(angle));
// }
// display(){
//   strokeWeight(2);
//   line(this.x, this.y, this.v.x, this.v.y);
// }
// }
//
// class GridRect {
// // float x, y, r;
// // float val;
// //
// // color v;
//
// constructor(x_, y_, r_, val_){
//  this.x = x_;
//  this.y = y_;
//
//  val = val_;
//  this.r = r_;
//  this.v = new color(val);
// }
//
// display(){
//   noStroke();
//   fill(this.v);
//   rect(this.x, this.y, this.r, this.r);
// }
// }
