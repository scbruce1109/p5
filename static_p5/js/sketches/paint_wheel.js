var x1,x2,y1,y2, angle, phase;
var colorList = ["#9c0e01ff","#fcd300ff","#6b9404ff", "#004a29ff","#002a3eff","#543224ff"];

function setup(){
  createCanvas(600, 600);
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

  var painty = new ColorWheel(colorList, width/2, height/2, 200, 50, 50)
  // painty.colorRing(0);
  // painty.colorRing(1)
  painty.display()

}

function draw(){

  // for ()
  //
  // x1 = sin(radians(angle1))*radius+centerPoint;
  // y1 = cos(radians(angle1))*radius+centerPoint;
  // x2 = sin(radians(angle2))*radius2+x1;
  // y2 = cos(radians(angle2))*radius2+y1;
}

function multiColor(colorList, lerpVal){
   if (lerpVal > 1.0){
     lerpVal = 1.0;
   }
   if (lerpVal < 0.0){
     lerpVal = 0.0;
   }
   var stop;
   var segLength = 1 / (colorList.length-1);

   for (let i = 0;i< colorList.length-1;i++){
    lBound = segLength * i;
    hBound = segLength * (i+1);
    console.log(lBound + " - " + hBound);
    if (lerpVal >= lBound && lerpVal <=hBound){
      stop = i;
      break;
    }

    }
   console.log(colorList[stop])
   console.log(colorList[stop+1])
   var newLerp = map(lerpVal,lBound, hBound, 0.0,1.0)
   var newC = lerpColor2(color(colorList[stop]),color(colorList[stop+1]),newLerp, "MIX", null, null, LINEAR_)
   console.log("stop num " + stop);
   return newC;
 }

class ColorWheel {
  constructor(colorList, xloc, yloc, radius, xRez, yRez){
    colorList.push(colorList[0])
    this.colorList = colorList;
    this.colorP = new colorPalette(colorList)
    this.x = xloc;
    this.y = yloc;
    this.r = radius;
    this.numX = (colorList.length-1)*xRez;
    this.numY = yRez;
    this.angle = 360 / this.numX+1;
    this.ySpace = this.r / this.numY;
    this.xSpace = 360 / this.numX;

  }

  colorRing(depth){
    var pList = [];
    var offset;
    if (! offset){
      offset = 0;
    }
    offset = offset - 90;
    // var spacing = 360 / this.numX;
    var r1 = this.r-depth* this.ySpace;
      var r2 = this.r-(depth+1)* this.ySpace;

    for (let i=0;i<this.numX;i++){
      var theta = i*this.xSpace+offset
      var daArc = generateArc(this.x,this.y,r1,r2-1,this.angle,(360-theta-90)-this.angle/2)
      var daShape = new myShape(daArc);
      var lerpV = map(i*this.xSpace, 0,359,0.0,1.0)
      console.log('lerpv')
      console.log(lerpV)
      var fillC = multiColor(this.colorList, lerpV)
      var yLerp = map(depth,0,this.numY,0.0,1.0)
      var fillC2 = lerpColor2(fillC,color(0),yLerp, "MIX", null, null, LINEAR_)
      stroke(fillC2);
      fill(fillC2)
      daShape.display();
    }
  }

  display(){
    // var ySpacing = this.r / this.numY;
    // var angle = 360 / numX;

    for (let i = 0;i<this.numY;i++){
      // var r1 = this.r-i* ySpacing;
      // var r2 = radius-(i+1)* ySpacing;
      this.colorRing(i);
    }

  }


}
