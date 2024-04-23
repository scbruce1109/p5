function setup(){
  createCanvas(600,600);
  background(255);

for (let i = 0;i<100;i++){
  var l = new MyLine(random(width),random(height),random(width),random(height),20);
  l.offsetPoints(3);
  l.display();
}
}

function draw(){

}
