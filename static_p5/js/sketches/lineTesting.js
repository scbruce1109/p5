var params = {
  noiseSeed: 1000,

}

function setup(){
  createCanvas(600,600);
  // background(200,150,150)
  stroke(0,0.1)

  g1 = new ColorGrid(0,0,width,height,5);
  params.cList = [];

  params.points = makeLandscape(0,0,width,height,3)
  for (let i = 0;i<3;i++){
    params.points[i].z = 1
  }
  params.points[2].z = 1
  console.log('points')
  console.log(params)
  g1.fillColor([color("#515e67"),color("#f1e0ac"),color('#ff9c5e')],params.points,800,color('#ffd2d2'))

var heighty = 0;
for(let i = 0;i<300;i++){
  var ting = new PolyLine([createVector(0,heighty),createVector(width,heighty)])
  ting.subdivide()

  // console.log(ting.points)

  // ting.offsetPoints(50,true)
  // ting.subdivide()
  // ting.offsetPoints(25,true)
  // ting.subdivide()
  // ting.offsetPoints(5,true)
  // ting.subdivide()
  // ting.offsetPoints(12,true)
  ting.smoothChaikin(3)
  ting.displayWavy(2,1,g1)
  // console.log(ting.length)
  // ting.calcLength();
  // console.log(ting.length)
  // ting.displayDotted(0.1,g1)
  heighty += 2
}
}

function draw(){

}
