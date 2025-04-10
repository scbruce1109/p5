var force1,force2,g1, movers;

var params = {

}

rectStroke = document.getElementById('rect-stroke').getAttribute('data-current-color')
console.log(rectStroke)

function setup() {
  createCanvas(600, 600);

  g1 = new ColorGrid(100,100,300,300,5);
  params.cList = [color("#ff7a40")];

  // params.points = makeLandscape(0,0,width,height,3)

params.points = [createVector(width/4,height/4)]
params.points[0].mass = 1

console.log(params.points)



  g1.fillColor(params.cList,params.points,300,color('#ffffff'))
  g1.display()


  stroke(255,0.3)

  for (let i = 0;i<1000;i++){
    var x = random(width)
    var y = random(height)
    var c1 = g1.getValue(x,y).c
    c1.setAlpha(0.3)
    noStroke()
    fill(c1)
    // rect(x,y,random(100),random(100))
  }



}



function draw() {

}
