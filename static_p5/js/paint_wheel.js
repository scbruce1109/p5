var x1,x2,y1,y2, angle, phase;
var colorList = ["#181778", "#FF6600","#788430"];

function setup(){
  createCanvas(1080, 1080);
  background(255);
  ellipse()
  angle = 0;
  var radius = 200;
  centerPoint = width/2;

  // var zing = arcCircle(width/2,height/2,200,10,60);

  var angleSpace = 360 / colorList.length;
  phase = 180;


  for (let i=0;i<colorList.length;i++){
    x1 = sin(radians(angle+180))*radius+centerPoint;
    y1 = cos(radians(angle+180))*radius+centerPoint;
    fill(color(colorList[i]))
    ellipse(x1, y1, 20, 20)
    angle += angleSpace;
  }

  var painty = new ColorWheel(colorList, width/2, height/2, 200, 2, 1);
  painty.colorRing()

}

function draw(){

  // for ()
  //
  // x1 = sin(radians(angle1))*radius+centerPoint;
  // y1 = cos(radians(angle1))*radius+centerPoint;
  // x2 = sin(radians(angle2))*radius2+x1;
  // y2 = cos(radians(angle2))*radius2+y1;
}

class ColorWheel {
  constructor(colorList, xloc, yloc, radius, xRez, yRez){
    colorList.push(colorList[0])
    this.colorP = new colorPalette(colorList)
    this.x = xloc;
    this.y = yloc;
    this.r = radius;
    this.numX = (colorList.length-1)*xRez;
    this.numY = yRez;
    this.angle = 360 / this.numX;
    this.ySpace = this.r / this.numY;

  }

  colorRing(radius1, radius2, numSegs, offset, angle){
    var pList = [];
    var offset;
    if (! offset){
      offset = 0;
    }
    offset = offset - 90;
    var spacing = 360 / this.numX;

    for (let i=0;i<this.numX;i++){
      var theta = i*spacing+offset
      var daArc = generateArc(this.x,this.y,this.r,this.r-20,this.angle,(360-theta-90)-this.angle/2)
      var daShape = new myShape(daArc);
      var lerpV = map(i*spacing, 0,359,0.0,1.0)
      console.log('lerpv')
      console.log(lerpV)
      var fillC = this.colorP.mapColor(lerpV, 'MIX',null,null,LINEAR_,null)
      console.log(fillC)
      noStroke();
      fill(fillC)
      // fill(random(255));
      daShape.display();
      // var x = xloc + cos(radians(i*spacing+offset)) * xsize;
      // var y = yloc + sin(radians(i*spacing+offset)) * ysize;
      // pList.push(new p5.Vector(x,y))
    }
  }

  display(){
    var ySpacing = this.r / this.numY;
    var angle = 360 / numX;

    for (let i = 0;i<numY;i++){
      var r1 = this.r-i* ySpacing;
      var r2 = radius-(i+1)* ySpacing;
      arcRing(xloc,yloc,r1,r2,numX,off,angle)
      // num += 1
      // off += 10;
      // noFill();
      // stroke(0);
      // ellipse(xloc,yloc,r*2,r*2);

    }

  }


}
