var scale, a, b,n, color1, color2, cType, lType, ease, flip, hexlist, cPalette, start1, end1, center,r,step;
var params
var loadColor = false
var colName = "breweryellow"
var img;

function preload() {
  if(loadColor){
    params = loadJSON(dataURL + "spec_colors.json");
  }
  // result = loadStrings(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\txtFiles"+"\\Without - Sampha.txt");
  result = loadStrings(dataURL + "It's Possible - Piero Piccioni.txt");

  // img = loadImage(picsUrl+ "cool_rect_colors4.png");
  img = loadImage(picsUrl+ "spec_color_bg_11x14.png");
}

function setup() {
  scale = 1;
  createCanvas(600, 600*14/11);
  // background(0)
  json = JSON.parse(result[0])

  image(img, 0, 0, 600, 763)
  rectMode(CENTER)
  fill(0,180)
  noStroke()
  // rect(width/2,height/2,600,900)

  if (params){
    colors = colors = Object.values(params)
    console.log(colors)
    var col = colors.filter(obj => {
  return obj.name === colName
})
hexList = col[0]['colors']
cType = col[0]['cType']
console.log(hexList)
} else {
  hexList = ["#000000","#ffffff"]
  cType = "RGB";
}

  console.log('file length')
  console.log(json.length)

  a = 360 / json.length;
  b = 0;
  n = 0;

  center = createVector(width/2,height/2);
  r = 300;
  step = r / 1024;

  console.log('lengthy')
  console.log(json[0].length)

  // hexList = ["#181778", "#FF6600"]
  // hexList = ["#181778", "#ffe600"]
  // hexList = ["#181778", "#fffefe"] // HSB



  cPalette = new colorPalette(hexList);
  cPalette.mapColor(1.0);


  lType = QUADRATIC_;
  ease = EASE_IN;
  flip = true;

  var x = 0;

  var curLerp = 0;
  var steps = 100;
  noStroke();

  if (flip){
    startl = 1.0;
    endl = 0.0;
  } else {
    startl = 0.0;
    endl = 1.0;
  }

colorMode(HSB, 360,100,100,1.0)
}

function draw() {
json[n].reverse()


// // //// the new stuff
// push();
    // translate(width/2, height/2);
    // rotate(radians(b));

    for (let i = 0;i< json[n].length;i++){
      stroke(255);
      var val = json[n][i];

     noFill();

     // function endpointFromAngle(origin, angle, distance)


     // var newC = cPalette.mapColor(map(json[n][i],0,255,startl,endl),cType,null,null,lType,ease,1); //// RGB with quadratic is also good

     // newC.setAlpha(map(json[n][i],0,255,0.0,0.1))
     // strokeWeight(scale);
     // // colorMode(RGB,255,255,255,255);
     // stroke(newC);


     var x = center.x + cos(radians(b+90))*100 + (cos(radians(b+90)) * i * step * scale);
     var y = center.y + sin(radians(b+90))*100 + (sin(radians(b+90)) * i * step * scale);

     // var x = center.x + cos(radians(b+90)) * i * step * scale;
     // var y = center.y + sin(radians(b+90)) * i * step * scale;

     // var x = center.x + cos(radians(b+90)) * i * step * scale;
     // var y = center.y + sin(radians(b+90)) * i * step * scale;

     let c = img.get(int(x), int(y));

     // console.log(c[0])
      c = color(c[0],c[1],c[2])
  c = lerpColor2(color(255),c,map(json[n][i],0,255,startl,endl),cType,null,null,lType,ease,1)
    // c = color(0)
    var alph = map2(json[n][i],0,255, 0, .15, QUADRATIC_, EASE_IN_OUT)
     // c.setAlpha(map(json[n][i],0,255,0.0,0.1))
     c.setAlpha(alph)
     strokeWeight(scale);
     // colorMode(RGB,255,255,255,255);
     stroke(c);
     // fill(c[0],c[1],c[2],20);

     line(x, y, x, y);
    }
  b += a;

  // pop();
  n++;




//////// the old stuff
  // push();
  //     translate(width/2, height/2);
  //     rotate(radians(b));
  //
  //     for (let i = 0;i< json[n].length;i++){
  //       stroke(255);
  //       var val = json[n][i];
  //
  //      noFill();
  //
  //
  //
  //      var newC = cPalette.mapColor(map(json[n][i],0,255,startl,endl),cType,null,null,lType,ease,1); //// RGB with quadratic is also good
  //
  //      newC.setAlpha(map(json[n][i],0,255,0.0,0.5))
  //      strokeWeight(scale);
  //      colorMode(RGB,255,255,255,255);
  //      stroke(newC);
  //      line(0, i/5*scale, 0, i/5*scale);
  //     }
  //   b += a;
  //
  //   pop();
  //   n++;
}
