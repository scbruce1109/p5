var theGrid, gridList, tog, movers;
var avting;


function setup(){
  createCanvas(600,600);
  background(100,0,0);

// for (let i = 0;i<100;i++){
//   var l = new MyLine(random(width),random(height),random(width),random(height),20);
//   l.offsetPoints(3);
//   l.display();
// }
tog = 0;
var zoop = cornerToCenter(width/2,height/2,width/2,height/2);
var ting = new Grid2(0,0,width,height,20,noise,0.0001);
var ting2 = new Grid2(0,0,width,height,10,noise,0.5);
var wting = new Grid2(0,0,width,height,10,noise,0.2);

for (let i=0;i<wting.grid.length;i++){
  for (let j = 0;j<wting.grid[i].length;j++){
    var gval = wting.grid[i][j];
    if (gval.y > height/(3/2)){
    gval.setVal(0.2)
  } else {
    gval.setVal(0.8);
  }
  }

}

gridList = [ting,ting2,wting]

avting = averageGrid(gridList,wting);
gridList.push(avting);
// avting.displayRect();
movers = [];

for (let i = 0; i<10000;i++){
  // var fillC = color(200,100,0,20);
  var fillC = color(0,20);
  // var fillC = cP.getColor(random(0.0,1.0),1);

  movers.push(new Mover2(random(0,width),random(0,height),random(1,5),fillC,3))
}

}

function draw(){
  for (let i=0; i<movers.length; i++) {
    movers[i].update(avting);
    // i
    // movers[i].display();
    // movers[i].checkEdges();
  }
}

function mouseClicked(){
  if (tog > 3){
    tog = 0;
  } else if (tog == 1){
    // tog = 0;
  }
  // gridList[tog].displayRect();
  theGrid = gridList[tog]
  tog ++;

}
