function setup(){
  createCanvas(600,600);
  background(255);

  ting = new RandomGrowth(width,height,1000,.1);
  // for (let i =0;i<100;i++){
  //   // ting.grow(100);
  //   // ting.display();
  // }


}

function draw(){
  ting.grow(100);
  ting.display();
}


function mapPerspectiveLines(start, end, numLines, mapType){
  var spacig = map(posY, start, end, 10,1);

  var startY = start.y;

  for (let i=0;i<numLines;i++){

    startY += spacing;
  }


}


class RandomGrowth{

  constructor(width, height,num, pval){
    this.width = width;
    this.height = height;
    this.num = num;
    this.pval = pval;
    this.points = [];

    for (let i = 0; i< num; i++){
      var point = new p5.Vector(random(width),random(height));
      this.points.push(point);
    }
  }

  display(){
    for (let i = 0;i<this.points.length;i++){
      // point(this.points[i].x, this.points[i].y);
      fill(0,10);
      noStroke();
      ellipse(this.points[i].x, this.points[i].y,random(8),random(8));
    }
  }

  grow(num){

    for (let i = 0; i< num; i++){
      if (random(1)<this.pval){
        var point = new p5.Vector(random(width),random(height))
      } else {
        var zing = floor(random(this.points.length-1));
        // console.log(zing);
        var point = new p5.Vector(this.points[zing].x+random(-5,5),this.points[zing].y+random(-5,5))
      }

      this.points.push(point);
    }
  }



}

// function randomGrowth(width, height,num, pval, iters){
//   var points = [];
//
//   for (let i = 0; i< num; i++){
//     var point = new p5.Vector(random(width),random(height);)
//
//   }
//
// }
