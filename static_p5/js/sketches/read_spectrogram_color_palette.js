var scale, a, b,n, color1, color2, cType, lType, ease, flip, hexlist, cPalette, cVals;

// var cp = ["#515e67","#f1e0ac",'#ff9c5e',"#515e67"]

var cp = [
  '#35402c',
  '#f0d840',
  '#df6b2e',
  '#9e151c',
  '#4f111c',
  '#2b4866',
  '#35402c',
]

function preload() {
  result = loadStrings(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\txtFiles"+"\\I've Got a Crush On You - Ella Fitzgerald.txt");
}

function setup() {
  // colorMode(HSB, 360,100,100,1.0)
  // colorMode(RGB, 255,255,255,1.0)
  scale = 1;
  createCanvas(600, 600);
  // background(360);
  console.log(result[0][0]);
  json = JSON.parse(result[0])
  console.log(json[6][10])

  a = 360 / json.length;
  // print(360/2831);
  b = 0;
  n = 0;

  // color1 = color("#181778");
  // color2 = color("#FF6600");
  color1 = color("#3f434c");
  color2 = color("#fe5322");
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
cVals = [];
// for (let i = 0;i< json[n].length;i++){
//   // var a = 360 / json[n].length;
//   var curlLerp = map(i,0,json[n].length,0,1)
//   var strokeC = multiColor(cp,curlLerp)
//   cVals.push(strokeC);
// }

// console.log('j')

for (let i = 0;i< json.length;i++){
  // var a = 360 / json[n].length;
  var curlLerp = map(i,0,json.length,0,1)
  var strokeC = multiColor(cp,curlLerp)
  cVals.push(strokeC);
}


}

function draw() {
  // var n = 0;

  push();
      translate(width/2, height/2);
      rotate(radians(b));

      //print(max(tingb)+ "    ");
      //print(log(max(tingb))+"    ");
      // var newC = color(random(360),80,80)
      for (let i = 0;i< json[n].length;i++){
        //print("hey");
        stroke(255);
        var val = json[n][i];
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

       // strokeC.setAlpha(json[n][i]/7.5)
       // strokeC.setAlpha(map(json[n][i],0,255,0.0,1))
        colorMode(RGB,255,255,255,255);
        var sc = cVals[n]
        sc.setAlpha(json[n][i]/10)
       stroke(sc);
       //stroke(255);
       //ellipse(10,10,10,10);
       line(0, i/5*scale, 0, i/5*scale);
      }
    b += a;
    //print(b + "    ");

    pop();
    n++;



  // background(220);
}
