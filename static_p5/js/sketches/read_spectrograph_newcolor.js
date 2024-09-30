var scale;

function preload() {
  result = loadStrings(dataURL + "\\Pass it On - The Wailers.txt");
}

function setup() {
  colorMode(HSB, 360,100,100,1.0)
  // colorMode(RGB, 255,255,255,1.0)
  scale = 1;
  createCanvas(600, 600);
  // background(360);
  console.log(result[0][0]);
  json = JSON.parse(result[0])
  console.log(json[6][10])

  var a = 360 / json.length;
  // print(360/2831);
  var b = 0;
   //beginRecord(SVG, "C:\\Users\\bruce\\OneDrive\\Documents\\Art\\Processing\\outputs\\spec.svg");
  for (let n = 0;n< json.length;n++){
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
       var color1 = color(98.63,65.18,1);
       // var dblue = color("#2bf4e6ff");
       // var lblue = color("#251c32ff");
       var bluee = color("#181778");
       var pnik = color("#FC7D94");
       var blueee = color('#022e6a');
       var yelow = color('#FF6600');
       var redd = color('#6a1e1eff');
       var cfirst = color(0,100,100,1);
       var clast = color(360,100,100,1);

       var color2 = color(52.94,80.63,99.22);
       var newC = lerpColor2(yelow, redd, map(json[n][i],0,255,0.0,1.0),QUADRATIC_,EASE_OUT);

       newC.setAlpha(map(json[n][i],0,255,0.0,0.5)/2)
       //stroke(0,0,0, hi.get(n)[i]/10);
       strokeWeight(scale);
       stroke(newC);
       //stroke(255);
       //ellipse(10,10,10,10);
       line(0, i/5*scale, 0, i/5*scale);
      }
    b += a;
    //print(b + "    ");

    pop();


}
}

function draw() {
  // background(220);
}
