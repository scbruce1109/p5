function setup(){
  createCanvas(600,600)
  background('#e1621b')
  colorMode(HSB,360,100,100,1.0);
  var bgGrid = new GridBasic(0,0,width,height,2)
  var c1 = color('#e1621b')
  for (let i = 0;i<bgGrid.points.length;i++){
    for (let j = 0;j<bgGrid.points[i].length;j++){
      var c = jitterColor(c1,[4,4,4,0.4],true)
        fill(c);
        noStroke();
        rect(bgGrid.points[i][j].x,bgGrid.points[i][j].y,bgGrid.spacing,bgGrid.spacing)

    }
  }


  var dotGrid = new GridBasic(0,0,width,height,50)
  stroke(150,100,100,0.2)
  dotGrid.display()
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

}


function draw(){

}
