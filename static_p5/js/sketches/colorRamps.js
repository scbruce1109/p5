var params,colors;

function preload() {
    params = loadJSON(dataURL + "spec_colors.json");

   //  console.log(params.length)

}

function setup(){
  createCanvas(1000,1000);
  background(255)

  console.log(params)
  // console.log(params['0'])

  colors = Object.values(params)

  console.log(colors.length)


  var start = 25;
  var end = 975;

  cType = "HSB";
  lType = QUADRATIC_;
  ease = null;
  flip = true;

  var y = 25;

  cp = new colorPalette(['#420a52','#fd0500'])

  for (let i = 0;i<colors.length;i++){
    cType = colors[i]['cType']
    cp = new colorPalette(colors[i]['colors'])
    var len = end - start;
    var numSteps = 100;
    var step = len / numSteps;
    noStroke()
    for (let i = 0;i<numSteps;i++){
      var x = start+step*i;
      var c = cp.mapColor(map(i,0,numSteps,0,1),cType,null,null,LINEAR_,ease,1)

      fill(c)
      rect(x, y, x+step,25)

      var x = start+step*i;
      var c = cp.mapColor(map(i,0,numSteps,0,1),cType,null,null,QUADRATIC_,ease,1)
      // y += 30
      fill(c)
      rect(x, y+30, x+step,25)

    }
    y +=60

  }




}
