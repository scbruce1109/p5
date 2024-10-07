var m,force1,force2,movers;

function setup(){
  createCanvas(600,600)
  background('#efdbb7')
  colorMode(HSB,360,100,100,1.0);
  var bgGrid = new GridBasic(0,0,width,height,2)
  var c1 = color('#efdbb7')
  for (let i = 0;i<bgGrid.points.length;i++){
    for (let j = 0;j<bgGrid.points[i].length;j++){
      var c = jitterColor(c1,[4,4,4,0.4],true)
        fill(c);
        noStroke();
        rect(bgGrid.points[i][j].x,bgGrid.points[i][j].y,bgGrid.spacing,bgGrid.spacing)

    }
  }
  var loc = createVector(width/2,height/2)
  m = new NewMover_old(loc.x,loc.y, 2, color(0,0,200,50))
  m.display()
  force1 = 1;
  force2 = -1

  // var dotGrid = new GridBasic(0,0,width,height,50)
  // stroke(150,100,100,0.2)
  // dotGrid.display()

  noFill()
  stroke(0)
  // rect(100,100,200,200)
  fPoints = ruleOfThirds(0,0,width,height,3)
  for (let i =0;i<fPoints.length;i++){
    stroke(0);
    var loc = placePoint(fPoints[i], 10);
    ellipse(loc.x,loc.y,10,10)
  }

   movers = [];

  fPoints = distributePointsOnArc(createVector(width/2,height/2),50,100,45,270)
  // fPoints = distributePointsOnLine(createVector(width/2,height/2),100)
  for (let i =0;i<fPoints.length;i++){
    fill(0);
    // var loc = placePoint(fPoints[i], 10);
    m = new NewMover_old(fPoints[i].x,fPoints[i].y, 2, color(0,0,200,50))
    movers.push(m)
    // ellipse(fPoints[i].x,fPoints[i].y,5,5)
  }
  // for (let i = 0;i<dotGrid.points.length;i++){
  //   for (let j = 0;j<dotGrid.points[i].length;j++){
  //     var x = dotGrid.points[i][j].x + randomGaussian(0,dotGrid.spacing/3)
  //     var y = dotGrid.points[i][j].y + randomGaussian(0,dotGrid.spacing/3)
  //     fill('#625e5d')
  //     ellipse(x,y,50,50)
  //
  //   }
  // }


  // for (let i = 0;i<height;i+=5){
  //   stroke(jitterColor(c1,[10,4,4,0.4],true))
  //   dottedLine(createVector(0,i),createVector(width,i),0.5,1,1)
  // }

  // for (let i=0;i<200;i++){
  //   var c = jitterColor(c1,[100,0,30,0.5],true)
  //   fill(c);
  //   noStroke();
  //   rect(random(width),random(height),100,100)
  // }

  var c = mixColors([color('blue'),color('yellow'),color('white')],[0.2,0.2,0.6])
  console.log('clrlr')
  console.log(c)
  fill(c);
  ellipse(width/2,height/2,50,50)

}


function draw(){
//   for (let i = 0;i<movers.length;i++){
//   if (random(0,1) > 0.80){
//     movers[i].applyForce(force1);
//     } else {
//       movers[i].applyForce(force2)
//     }
//     movers[i].display()
// }
    // force += random(-.2,.2)
}
