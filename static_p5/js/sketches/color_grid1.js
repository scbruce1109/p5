var force1,force2,g1, movers;
function setup() {
  createCanvas(600, 600);
  // background('black')
  // background(0,25,50)
  console.log('angel')
  console.log(Math.ceil(degrees(meanAngle([radians(0),radians(90)],[2,2]))))

  g1 = new NewGrid(0,0,width,height,5);
  console.log(g1.grid.length)
  console.log(g1.grid)
  g1.fillNoise(0.006)
  var ps = makeLandscape(0,0,width,height,3)
  for (let i = 0;i<3;i++){
    ps[i].z = 1
  }
  ps[2].z = 1
  console.log('points')
  console.log(ps)
  g1.fillColor([color("#515e67"),color("#f1e0ac"),color('#ff9c5e')],ps)
  // g1.display('c')
  colorMode(HSB,360,100,100,1.0)
  var bgGrid = new GridBasic(0,0,width,height,2)
  // var c1 = color('#efdbb7')
  for (let i = 0;i<bgGrid.points.length;i++){
    for (let j = 0;j<bgGrid.points[i].length;j++){
      var c1 = g1.getValue(bgGrid.points[i][j].x,bgGrid.points[i][j].y,'c')


      var c = jitterColor(c1,[5,5,5,0.1],true)
        fill(c);
        noStroke();
        rect(bgGrid.points[i][j].x,bgGrid.points[i][j].y,bgGrid.spacing,bgGrid.spacing)

    }
  }
  stroke(255,0.3)
  dottedLine(createVector(0,ps[2].y),createVector(width,ps[2].y),0.4,1,1)

  for (let i = 0;i<1000;i++){
    var x = random(width)
    var y = random(height)
    var c1 = g1.getValue(x,y,'c')
    c1.setAlpha(0.3)
    noStroke()
    fill(c1)
    // rect(x,y,random(100),random(100))
  }

}



function draw() {

}
