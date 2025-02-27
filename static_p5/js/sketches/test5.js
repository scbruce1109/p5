var force1,force2,g1, movers, m1,a;
var params = {
  seed: 20
}
function setup() {
  createCanvas(600, 600);
  noiseSeed(params.seed);
  a = 0;
  background(255)
//   var zoop = drawCurve([createVector(0,0),createVector(width/4,height),createVector(width/2,0),
//   createVector(width/4*3,height),createVector(width,0)], 8, false)
//   movers = [];
//   g1 = new VectorGrid(0,0,width,height,20)
//   // g1.fillGradient(new colorPalette(["#04d3c6","#d43667"]))
//   g1.fillNoise(0.005)
//   // g1.display();
//
// for (let i = 0;i<500;i++){
//   m1 = new Mover1(random(-50,width),random(-50,height),2,20)
//   movers.push(m1)
// }

drawGrid(0, 0, width, height, 50, 50, 1)

}



function draw() {
//   // background(220);
//   // var a = 90;
// var f = createVector(cos(radians(a)),sin(radians(a)))
// // f.add(createVector(1,0))
//
// for (let i = 0;i<movers.length;i++){
// movers[i].applyForce(g1.getValue(movers[i].location.x,movers[i].location.y).v)
// // movers[i].applyForce(f)
// movers[i].display();
// }
// a +=1
}
