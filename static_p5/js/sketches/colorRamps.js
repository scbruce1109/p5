function setup(){
  createCanvas(1000,1000);
  background(255)

  var start = 25;
  var end = 975;

  cType = "HSB";
  lType = QUADRATIC_;
  ease = null;
  flip = true;

  cp = new colorPalette(['#420a52','#fd0500'])

  var len = end - start;
  var numSteps = 100;
  var step = len / numSteps;
  noStroke()
  for (let i = 0;i<numSteps;i++){
    var x = start+step*i;
    var c = cp.mapColor(map(i,0,numSteps,0,1),cType,null,null,lType,ease,1)

    fill(c)
    rect(x, 25, x+step,25)
  }
}
