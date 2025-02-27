var a;

function setup() {
  createCanvas(600, 600);
  a = 0;
  noFill();
  stroke(0,150)
  var i = 0;
  for (let a = 0;a < 360; a += 360/48){
    ellipse(width/2,height/2,200,200)

    line(200,150,400,150)
    var x = width/2 + cos(radians(a)) * 100;
    var y = height/2 + sin(radians(a)) * 100;
    ellipse(x,y,5,5)
    ellipse(x,150,5,5)
    text((a % 360).toString(),20,20);
    // a += 360/48;
    name = "rotation_" + i  + ".png"
    i ++;

    saveCanvas(name)
    // setTimeout(1000)
    clear();
  }
  // frameRate(12)
  // background(240);



  // line(150,200,150,400)



  // ellipse(150,y,5,5)
  // stroke(0,75)
  // line(x,150,x,y)
  // line(150,y,x,y)



}

function draw() {
  // frameRate(12)
  // background(240);
  // noFill();
  // stroke(0,150)
  // ellipse(width/2,height/2,200,200)
  //
  // line(200,150,400,150)
  //
  // // line(150,200,150,400)
  //
  // var x = width/2 + cos(radians(a)) * 100;
  // var y = height/2 + sin(radians(a)) * 100;
  // ellipse(x,y,5,5)
  // ellipse(x,150,5,5)
  // // ellipse(150,y,5,5)
  // stroke(0,75)
  // // line(x,150,x,y)
  // // line(150,y,x,y)
  // text((a % 360).toString(),20,20);
  // a += 360/48;


}
