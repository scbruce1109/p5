
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
