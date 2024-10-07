var force1,force2,g1, movers;
function setup() {
  createCanvas(600, 600);
  background('#6789a4')
  // background(0,25,50)
  console.log('angel')
  console.log(Math.ceil(degrees(meanAngle([radians(0),radians(90)],[2,2]))))

  g1 = new NewGrid(0,0,width,height,5);
  // console.log(g1.grid.length)
  // console.log(g1.grid)
  // g1.fillNoise(0.016)
  var ps = []
  for (let i = 0;i<3;i++){
    ps.push(createVector(random(width),random(height)))
  }
  g1.fillAngle(ps)
  // g1.display('a')

  // movers = []
  // for (let i = 0;i<100;i++){
  // // var loc = createVector(random(-100,width+100),random(-100,height+100))
  //   var loc = createVector(width/2,random(20),0)
  // var m = new NewMover(loc.x,loc.y, 2,5000, color(0,0,200,50))
  // movers.push(m)
  // }

 movers = []
  for (let i = 0;i<10000;i++){
  // var loc = createVector(width/2,random(20)+height/2)
    var loc = createVector(random(-50,width+50),random(-50,height+50))
  var m = new NewMover(loc.x,loc.y, 2,50, color(255,255,255,10),2,10)
  movers.push(m)
  }
  m.display()
  force1 = 1;
  force2 = -1

  // console.log(weightedAv([1,2],[2,1]))
}



function draw() {
  // background(220);
  // var force = 0;
  // if (random(0,1) > 0.5){

  for (let i =0;i<movers.length;i++){
    var m = movers[i]
  // var foop = map(m.location.y,0,height,1,0)
  // var force = weightedAv([force1,g1.getValue(m.location.x,m.location.y,'a')],[foop, 1-foop])
  m.applyForce(g1.getValue(m.location.x,m.location.y,'a'),true);
  }


  // } else {
  //   m.applyForce(force2)
  // }
  // m.display()
  // force += random(-.2,.2)
}
