function setup(){
  createCanvas(600, 600);
  background(255);

  var zoop = generatePoints(width/2, height/2,200,300,6)
fill(0,random(2,20))
stroke(0,random(2,20))
// noStroke()
for (let i =0;i<200;i++){
  var p = placePoint(createVector(width/2,height/2),500,false)
  var zoop = generatePoints(p.x, p.y,random(50),random(300),4,45)
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

function draw(){

}
