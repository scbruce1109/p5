var scale, a, b,n, color1, color2, cType, lType, ease, flip, hexlist, cPalette, start1, end1, center,r,step,steps;

var loadParams = true;

var params = {
  name: "It's Possible",
  rectCP1: ["#38291d","#38291d"],
  rectCP2: ["#53100b","#cca272","#143421"],
  spectCP: [],
  rect2Width: 600,
  rect2Height: 900,
  notes: "",
  steps: 4000,
}

function preload() {
  if (loadParams){
    params = loadJSON(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\Everydays"+"\\passiton2.json");
    console.log(params)
   params = JSON.parse(params)
  } else {
    params = params;
  }

}

function setup() {

  scale = 1;
  createCanvas(600, 900);
  background(255)



  var cp = new colorPalette(params.rectCP2)
  var cp2 = new colorPalette(params.rectCP1)

  rectp = cornerToCenter(width/2,height/2,params.rect2Width,params.rect2Height)

  g1 = new ColorGrid(rectp[0],rectp[1],params.rect2Width,params.rect2Height,5);
  g2 = new ColorGrid(0,0,width,height,5);
  g2.fillGradient(cp2)
  // g1 = new NewGrid(0,0,width,height,5);
  // g1.fillNoise(0.006)
  g1.fillGradient(cp)
  g2.display();
  g2.jitterGrid(2)
  g1.display()



  colorMode(HSB,360,100,100,1.0)
  var bgGrid = new GridBasic(rectp[0],rectp[1],params.rect2Width,params.rect2Height,2)
  // var bgGrid = new GridBasic(0,0,width,height,2)
  var c1 = color('#efdbb7')

  for (let i = 0;i<bgGrid.points.length;i++){
    for (let j = 0;j<bgGrid.points[i].length;j++){
      var c1 = g1.getValue(bgGrid.points[i][j].x,bgGrid.points[i][j].y).c
      var c = jitterColor(c1,[5,5,5,0.1],true)
        fill(c);
        noStroke();
        rect(bgGrid.points[i][j].x,bgGrid.points[i][j].y,bgGrid.spacing,bgGrid.spacing)

    }
  }

  for (let i = 0;i<1000;i++){
    var x = random(rectp[0],rectp[0]+400-50)
    var y = random(rectp[1],rectp[1]+800-50)
    var c1 = g1.getValue(x,y).c
    c1.setAlpha(0.05)
    noStroke()
    fill(c1)
    rect(x,y,random(100),random(100))
  }

  // steps = 6000;
 steps = 4500;
  a = 360 / steps;
  b = 0;
  n = 0;

  center = createVector(width/2,height/2);
  r = 250;
  step = r / 1024;

  mic = new p5.AudioIn();

  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic)


  hexList = ["#181778", "#FF6600"]
  hexList = ["#000000", "#000000"]

  cPalette = new colorPalette(hexList);
  cPalette.mapColor(1.0);

  cType = "HSB";
  lType = QUADRATIC_;
  ease = null;
  flip = true;

  var x = 0;

  var curLerp = 0;
  noStroke();

colorMode(HSB, 360,100,100,1.0)
}

function draw() {

  var spectrumA = fft.analyze()
  var spectrumB = spectrumA.reverse()

      for (let i = 0;i< spectrumB.length;i++){
        stroke(255);
        var val = spectrumB[i];
       noFill();
       var startl, endl;
       if (flip){
         startl = 1.0;
         endl = 0.0;
       } else {
         startl = 0.0;
         endl = 1.0;
       }

       var newC = cPalette.mapColor(map(spectrumB[i],0,255,startl,endl),cType,null,null,lType,ease,1); //// RGB with quadratic is also good
       var alph = map2(spectrumB[i],0,255, 0, .6, LINEAR_, EASE_IN_OUT)
       // newC.setAlpha(map(spectrumB[i],0,255,0.0,1.0))
       strokeWeight(step*scale*2);
       newC.setAlpha(alph)
       // colorMode(RGB,255,255,255,255);
       stroke(newC, alph);

       var x = center.x + cos(radians(b+90)) * i * step * scale;
       var y = center.y + sin(radians(b+90)) * i * step * scale;

       line(x,y,x,y);
      }
    b += a;

}
