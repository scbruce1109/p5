function setup(){
  createCanvas(600, 600);
  background(255);

  var g = new Grid(0,0,width,height,50);
  // g.display()
  fill(0,0,150,random(2,20))
  stroke(0,0,150,random(2,20))
  console.log(g.grid)

  for (let i = 0;i<g.grid.length;i++){
    for (let j = 0;j<g.grid[i].length;j++){
      var p = g.grid[i][j]
      var ww = random(g.spacing*2)
      var zoop = generatePoints(p.x, p.y,ww,ww,4,45)
      var ding = new myShape(zoop,true)
      // ding.offsetPoints(random(10))
      ding.subdivide(2)
      console.log(ding.points)
      // ding.offsetPoints(random(10))
      ding.subdivide(2)
      console.log(ding.points)
      ding.offsetPoints(random(10))
      // ding.smoothChaikin(2)
      // ding.offsetPoints(random(50))
      ding.smoothChaikin(2)
      ding.offsetPoints(random(2))
      ding.smoothChaikin(2)
      ding.display()
    }
  }

  var zoop = generatePoints(width/2, height/2,200,300,6)
fill(0,0,150,random(2,20))
stroke(0,0,150,random(2,20))
// noStroke()
// for (let i =0;i<100;i++){
//   var p = placePoint(createVector(width/2,height/2),500,false)
//   var zoop = generatePoints(p.x, p.y,random(50),random(300),4,45)
//   var ding = new myShape(zoop,true)
//   // ding.offsetPoints(random(10))
//   ding.subdivide(2)
//   console.log(ding.points)
//   // ding.offsetPoints(random(10))
//   ding.subdivide(2)
//   console.log(ding.points)
//   ding.offsetPoints(random(10))
//   // ding.smoothChaikin(2)
//   // ding.offsetPoints(random(50))
//   ding.smoothChaikin(2)
//   ding.offsetPoints(random(2))
//   ding.smoothChaikin(2)
//   ding.display()
// }
}

function draw(){

}
