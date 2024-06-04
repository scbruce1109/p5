var movers = [];
var grid1,grid2;
var clist = ["#0d1b44ff","#c62800ff","#feec01ff"]
var tog;
var gridList;
var theGrid;

function setup(){
  createCanvas(600,600);
  background(255);
  // clist = [];
  cP = new colorPalette(clist)
  tog = 0;

//   for (let i = 0;i<100;i++){
//   var l = new MyLine(random(width),random(height),random(width),random(height),20);
//   l.offsetPoints(3);
//   l.display();
// }

  grid1 = new Grid2(0,0,width,height,20,noise,0.002);
  // grid1.displayRect();
console.log('grid size')
console.log(grid1.grid.length + " x " + grid1.grid[0].length)

  var grid2 = new Grid2(0,0,width,height,10,noise,0.01);

  gridList = [grid1,grid2];

  var ting = averageGrid(gridList);

  gridList[2] = ting;
  // var g2 = new GridBasic(100,100,width-100,height-100,10);
  // g2.display();
  theGrid = ting;

  for (let i = 0; i<10000;i++){
    var fillC = cP.mapColor(random(0,1), "HSB", null, null, LINEAR_, null, 1);
    // var fillC = cP.getColor(random(0.0,1.0),1);

    movers.push(new Mover(random(0,width),random(0,height),random(1,5),fillC))
  }

}


function draw(){
  for (let i=0; i<movers.length; i++) {
    movers[i].update(theGrid);
    // i
    movers[i].display();
    // movers[i].checkEdges();
  }



}

function mouseClicked(){
  if (tog > 2){
    tog = 0;
  } else if (tog == 1){
    // tog = 0;
  }
  // gridList[tog].displayRect();
  theGrid = gridList[tog]
  tog ++;

}

function averageGrid(listGrids, weightGrid){
  var rez = 100000;
  var highest;
  for (let i = 0;i<listGrids.length;i++){
    if (listGrids[i].spacing < rez){
      rez = listGrids[i].spacing;
      highest = i;
    }
  }
  var avGrid = new Grid2(0,0,width,height,rez,noise,0.1);

  for (let i = 0; i<avGrid.grid.length;i++){
    for (let j = 0; j<avGrid.grid[i].length;j++){
      // this.grid[i][j].getAngleFromPoints([createVector(width/2,height/2),createVector(width,height)]);
      // this.grid[i][j].offsetAngle(PI/2)
      var x = avGrid.grid[i][j].x;
      var y = avGrid.grid[i][j].y;
      v1 = listGrids[0].getValue(x,y)
      v2 = listGrids[1].getValue(x,y)
      avGrid.grid[i][j].v = (v1 + v2)/2;
    }
  }
  return avGrid

  // console.log(highest + "  " + rez)
}

function calcAv(array) {
  const sum = array.reduce((acc, val) => acc + val, 0);
  return array.length ? sum / array.length : 0;
}

// function valFromPoints(location,listPoints, defaultVal){
//
//   var vals = [];
//   var val1 = defaultVal;
//   for (let i = 0;i < listPoints.length;i++){
//     var weight = dist(location.x,location.y,listPoints[i].x,listPoints[i].y)
//     if (weight > 200){
//       weight = 200;
//     }
//     weight = map(weight,200,0,0.0,1.0);
//     var w1 = val1 * (1-weight);
//     var w2 = listPoints[i].z * weight;
//     val1 = w1 + w2;
//     // vals.push(val)
//   }
//   return val1;
//
// }
//
// function angleFromPoints(location,listPoints, defaultVal){
//
//   var x = 0;
//   var y = 0;
//
//   for (let i = 0;i < listPoints.length;i++){
//     var angle = getAngle(location,listPoints[i])
//     x += cos(angle);
//     y += sin(angle);
//   }
//
//   var newAngle = atan2(y,x);
//   return calcAv(vals);
//
// }
//
// function meanAngle(listAngles){
//   console.log(listAngles)
//   var n = listAngles.length
//   var x = 0;
//   var y = 0;
//   for (let i = 0;i<listAngles.length;i++){
//     x += cos(listAngles[i]);
//     y += sin(listAngles[i]);
//   }
//   console.log(x + "  "+ y + "  " + n)
//   var angle = atan2(y,x)
//   console.log(angle)
//   return angle
//
// }
//
//
// class FlowField {
//   constructor(xOff, yOff, spacing, rez){
//     this.grid = [];
//     this.xOff = xOff;
//     this.yOff = yOff;
//     this.spacing = spacing;
//     this.rez = rez;
//
//     for (let x = this.xOff; x< width - this.xOff; x+= this.spacing){
//       var row = [];
//       for (let y = this.yOff; y< height - this.yOff;y += this.spacing){
//         var noiseV = noise(x*this.rez, y*this.rez);
//         // var noiseV = valFromPoints(createVector(x,y),[createVector(width/2,height/2,1)],0)
//         // var noiseV = sin(x * 0.01/this.spacing) + cos(y * 0.01/this.spacing) * PI *2
//         var gridObj = new GridValue(x,y, this.spacing, noiseV)
//         // gridObj.getAngleFromPoints([createVector(0,0),createVector(width/2,height/2)]);
//         // gridObj.offsetAngle(PI/2)
//         row.push(gridObj);
//       }
//       this.grid.push(row);
//     }
//
//   }
//
//   display(){
//     for (let i = 0; i<this.grid.length;i++){
//       for (let j = 0; j<this.grid[i].length;j++){
//         // this.grid[i][j].getAngleFromPoints([createVector(width/2,height/2),createVector(width,height)]);
//         // this.grid[i][j].offsetAngle(PI/2)
//         this.grid[i][j].display();
//       }
//     }
//
//   }
//
//   displayRect(){
//     for (let i = 0; i<this.grid.length;i++){
//       for (let j = 0; j<this.grid[i].length;j++){
//         // this.grid[i][j].getAngleFromPoints([createVector(width/2,height/2),createVector(width,height)]);
//         // this.grid[i][j].offsetAngle(PI/2)
//         this.grid[i][j].displayRect();
//       }
//     }
//
//   }
//
//
//
//   getValue(x,y){
//     var columnIndex = Math.floor(x / this.spacing)
//     var roIndex = Math.floor(y / this.spacing)
//     if (columnIndex < 0){
//       columnIndex = 0
//     } else if (columnIndex > this.grid.length-1){
//       columnIndex = this.grid.length-1;
//     }
//     if (roIndex < 0){
//       roIndex = 0
//     } else if (roIndex > this.grid[0].length-1){
//       roIndex = this.grid[0].length-1;
//     }
//     var val = this.grid[columnIndex][roIndex].v;
//     return val;
//   }
//
//   getAngle(x,y){
//     var columnIndex = Math.floor(x / this.spacing)
//     var roIndex = Math.floor(y / this.spacing)
//     if (columnIndex < 0){
//       columnIndex = 0
//     } else if (columnIndex > this.grid.length-1){
//       columnIndex = this.grid.length-1;
//     }
//     if (roIndex < 0){
//       roIndex = 0
//     } else if (roIndex > this.grid[0].length-1){
//       roIndex = this.grid[0].length-1;
//     }
//     // console.log(x + "  " + y)
//     // console.log(columnIndex + "  " + roIndex)
//     var angle = this.grid[columnIndex][roIndex].angle;
//     return angle;
//   }
// }
//
// class GridValue {
//   constructor(x,y,size, value){
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.v = value;
//     this.angle = map(this.v, 0.0, 1.0, 0.0, TAU);
//   }
//
//   getValFromPoints(listPoints){
//
//   }
//
//   getAngleFromPoints(listPoints){
//     var x = 0;
//     var y = 0;
//     var sumWeights = 0;
//     for (let i = 0;i < listPoints.length;i++){
//       var loc = new p5.Vector(this.x,this.y);
//       var weight = dist(loc.x,loc.y,listPoints[i].x,listPoints[i].y)
//       weight = map(weight,320,0,0.0,1.0)
//       var angle = getAngle(loc,listPoints[i])
//       x += cos(angle)*weight;
//       y += sin(angle)*weight;
//       sumWeights += weight;
//     }
//     // x = x/sumWeights;
//     // y = y/sumWeights;
//     this.angle = atan2(y,x);
//   }
//
//   setVal(val){
//
//   }
//
//   setAngle(angle){
//
//   }
//
//   offsetAngle(offset){
//     this.angle += offset;
//   }
//
//   display(){
//   // var angle = map(this.v, 0.0, 1.0, 0.0, TAU);
//   var v = new p5.Vector(this.x+this.size/2 * cos(this.angle), this.y+this.size/2 * sin(this.angle))
//   line(this.x, this.y, v.x, v.y);
//   // console.log(this.x + "  " + this.y + "  " + this.size + "  " + this.v)
//   }
//
//   displayRect(){
//     var nColor = map(this.v,0,1,0,255)
//     fill(nColor);
//    rect(this.x,this.y,this.size,this.size);
//   }
// }





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

////https://www.artfromcode.com/?p=1656
////https://www.youtube.com/watch?v=lmSgB5dfiKU
////https://www.reddit.com/r/proceduralgeneration/comments/1bpt9tu/my_simulated_ivy_on_a_cliff_any_ideas_for_the/
////https://www.reddit.com/r/proceduralgeneration/comments/982yo4/state_of_the_art_in_ndimensional_noise/?rdt=49664
