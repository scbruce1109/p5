var scale, a, b,n, color1, color2, cType, lType, ease, flip, hexlist, cPalette, start1, end1, center,r,step,steps;

// function preload() {
//   result = loadStrings(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\txtFiles"+"\\Roxanne - The Police.txt");
// }

function setup() {
  // colorMode(HSB, 360,100,100,1.0)
  // colorMode(RGB, 255,255,255,1.0)
  scale = 1;
  createCanvas(600, 600);

  steps = 2500;

  a = 360 / steps;
  // print(360/2831);
  b = 0;
  n = 0;

  center = createVector(width/2,height/2);
  r = 1024 / 5;
  step = r / 1024;

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic)


  hexList = ["#181778", "#FF6600"]
  cPalette = new colorPalette(hexList);
  cPalette.mapColor(1.0);

  cType = "HSB";
  lType = QUADRATIC_;
  ease = null;
  flip = false;

  var x = 0;

  var curLerp = 0;
  // var steps = 100;
  noStroke();

colorMode(HSB, 360,100,100,1.0)
}

function draw() {
  // var n = 0;
  var spectrumA = fft.analyze()
  var spectrumB = spectrumA.reverse()
  // spectrumB.splice(0, 10)

  // push();
  //     translate(width/2, height/2);
  //     rotate(radians(b));

      for (let i = 0;i< spectrumB.length;i++){
        //print("hey");
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

       strokeWeight(scale);
       colorMode(RGB,255,255,255,255);
       stroke(0, spectrumB[i]/7.5);

       var x = center.x + cos(radians(b+90)) * i * step * scale;
       var y = center.y + sin(radians(b+90)) * i * step * scale;

       line(x,y,x,y);
      }
    b += a;
    //print(b + "    ");

    // pop();
    // n++;



  // background(220);
}
