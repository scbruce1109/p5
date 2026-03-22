var force1,force2,g1, movers;

var params = {

}

rectStroke = document.getElementById('rect-stroke').getAttribute('data-current-color')
console.log(rectStroke)

function setup() {
  createCanvas(600, 600*14/11);
  // background(0)

  g1 = new ColorGrid(0,0,width,height,5);
  params.cList = [];

  // params.points = makeLandscape(0,0,width,height,3)

// params.points = generatePoints(width/2, height/2, 200, 200, 5, 0)
params.points = distributePointsOnLine(createVector(150,150), createVector(550,height), 4)
// params.points = distributePointsOnLine(createVector(random(width),random(height)), createVector(random(width),random(height)), 4)

  for (let i = 0;i<3;i++){
    params.points[i].z = 1
  }
  params.points[2].z = 1
  console.log('points')
  console.log(params)
  g1.fillColor([color("#515e67"),color("#f1e0ac"),color('#ff9c5e'),color('#cc1d1d'),color('#0c2947')],params.points,350,color('#ffffff'))
  // g1.display()
  console.log('typpy')
  console.log(typeof g1)
  colorMode(HSB,360,100,100,1.0)

  var bgGrid = new GridBasic(0,0,width,height,2)
  var c1 = color('#efdbb7')

  for (let i =0;i<500;i++){
    // var p = placePoint(createVector(width/2,height/2),200,false)
    var p = createVector(random(width),random(height))
    var c1 = g1.getValue(p.x,p.y).c
    c1.setAlpha(0.1)
    fill(c1);
    noStroke();
    var zoop = generatePoints(p.x, p.y,random(200),random(200),Math.floor(random(3,8)))
    var ding = new myShape(zoop,true)
    ding.offsetPoints(random(50))
    ding.subdivide(2)
    // console.log(ding.points)
    ding.offsetPoints(random(20))
    ding.subdivide(2)
    // console.log(ding.points)
    ding.offsetPoints(random(50))
    // var c1 = g1.getValue(bgGrid.points[i][j].x,bgGrid.points[i][j].y).c
    // c1.
    ding.smoothChaikin(2)
    ding.offsetPoints(random(5))
    ding.smoothChaikin(2)
    ding.offsetPoints(random(10))
    // ding.smoothChaikin(2)
    ding.display()
  }

  // for (let i = 0;i<bgGrid.points.length;i++){
  //   for (let j = 0;j<bgGrid.points[i].length;j++){
  //     var c1 = g1.getValue(bgGrid.points[i][j].x,bgGrid.points[i][j].y).c
  //
  //
  //     var c = jitterColor(c1,[5,5,5,0.1],true)
  //       fill(c);
  //       noStroke();
  //       rect(bgGrid.points[i][j].x,bgGrid.points[i][j].y,bgGrid.spacing,bgGrid.spacing)
  //
  //   }
  // }
  // stroke(255,0.3)
  // dottedLine(createVector(0,params.points[2].y),createVector(width,params.points[2].y),0.4,1,1)
  //
  // for (let i = 0;i<1000;i++){
  //   var x = random(width)
  //   var y = random(height)
  //   var c1 = g1.getValue(x,y).c
  //   c1.setAlpha(0.3)
  //   noStroke()
  //   fill(c1)
  //   rect(x,y,random(100),random(100))
  // }

  var button = createButton('reset')
  button.mousePressed(newColor);

  var expButton = createButton('export')
  expButton.mousePressed(exportParams)

}

function newColor(){
  var clist = document.getElementById('color-list').value
  console.log(clist)
  clear();
  params.points = [];
  console.log('hey hye')
  if (clist == ''){
    var color = '#ffffff'
    console.log('white')
    clist = ['#ffffff','#ffffff']
  } else {

  clist = clist.split(' ')
  console.log(clist)
  for (let i = 0;i<clist.length;i++){
    clist[i] = '#'+clist[i]
  }
}
  var cp = new colorPalette(clist);

  g1 = new ColorGrid(0,0,width,height,5)
  g1.fillGradient(cp)
  g1.display('c')
colorMode(HSB,360,100,100,1.0)
  var bgGrid = new GridBasic(0,0,width,height,2)
  // var c1 = color('#efdbb7')
  // for (let i = 0;i<bgGrid.points.length;i++){
  //   for (let j = 0;j<bgGrid.points[i].length;j++){
  //     var c1 = g1.getValue(bgGrid.points[i][j].x,bgGrid.points[i][j].y).c
  //
  //
  //     var c = jitterColor(c1,[5,5,5,0.1],true)
  //       fill(c);
  //       noStroke();
  //       rect(bgGrid.points[i][j].x,bgGrid.points[i][j].y,bgGrid.spacing,bgGrid.spacing)
  //
  //   }
  // }

  // for (let i = 0;i<1000;i++){
  //   var x = random(width)
  //   var y = random(height)
  //   var c1 = g1.getValue(x,y).c
  //   c1.setAlpha(0.3)
  //   noStroke()
  //   fill(c1)
  //   // rect(x,y,random(100),random(100))
  // }


}

function mouseClicked(){
  var v = createVector(mouseX,mouseY);
  var c = document.getElementById('rect-stroke').getAttribute('data-current-color')
  var cc = document.querySelector('#rect-stroke').jscolor.toHEXString()
  console.log('colorrr')
  console.log(cc)

  params.cList.push(color(cc))
  params.points.push(v)

  // var g2 = new ColorGrid(0,0,width,height,5)
  // g2.fillColor(params.cList,params.points,800,color('#ffffff'))
  // g2.display()
}

// document.getElementById('add-data-bttn').addEventListener('click',newColor())


function draw() {

}
