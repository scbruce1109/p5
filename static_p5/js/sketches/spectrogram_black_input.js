var scale, a, b,n, color1, color2, cType, lType, ease, flip, hexlist, cPalette;

// function preload() {
//   result = loadStrings(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\txtFiles"+"\\Roxanne - The Police.txt");
// }

function setup() {
  // colorMode(HSB, 360,100,100,1.0)
  // colorMode(RGB, 255,255,255,1.0)
  scale = 1;
  createCanvas(600, 600);


  a = 360 / 5000;
  // print(360/2831);
  b = 0;
  n = 0;

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
  var steps = 100;
  noStroke();

colorMode(HSB, 360,100,100,1.0)
}

function draw() {
  // var n = 0;
  var spectrumA = fft.analyze()
  var spectrumB = spectrumA.reverse()
  // spectrumB.splice(0, 10)

  push();
      translate(width/2, height/2);
      rotate(radians(b));

      //print(max(tingb)+ "    ");
      //print(log(max(tingb))+"    ");
      // var newC = color(random(360),80,80)
      for (let i = 0;i< spectrumB.length;i++){
        //print("hey");
        stroke(255);
        var val = spectrumB[i];
        //print(int(val));
        //print(val + "     ");
        //line(random(width),random(height),random(width),random(height));
       noFill();
       //strokeWeight(0.008 * val);
       //strokeWeight(2);
       //print(ting[i]);
       // var color1 = color(98.63,65.18,1);
       // var dblue = color("#2bf4e6ff");
       // var lblue = color("#251c32ff");
       // var bluee = color("#181778");
       // var pnik = color("#FC7D94");
       // var blueee = color('#022e6a');
       // // var yelow = color('#FF6600');
       // var redd = color('#6a1e1eff');
       // var cfirst = color(0,100,100,1);
       // var clast = color(360,100,100,1);

       // var color2 = color(52.94,80.63,99.22);
       var startl, endl;
       if (flip){
         startl = 1.0;
         endl = 0.0;
       } else {
         startl = 0.0;
         endl = 1.0;
       }
       // cPalette.mapColor(curLerp, "HSLUV", null,null,QUADRATIC_)
       // var newC = cPalette.mapColor(map(json[n][i],0,255,startl,endl),cType,null,null,lType,ease,1); //// RGB with quadratic is also good

       // var newC = color(0)
       // newC.setAlpha(map(json[n][i],0,255,0.0,0.5))
       // stroke(0,0,0, hi.get(n)[i]/10);
       strokeWeight(scale);
       colorMode(RGB,255,255,255,255);
       stroke(0, spectrumB[i]/7.5);
       //stroke(255);
       //ellipse(10,10,10,10);
       line(0, i/5*scale, 0, i/5*scale);
      }
    b += a;
    //print(b + "    ");

    pop();
    // n++;



  // background(220);
}
