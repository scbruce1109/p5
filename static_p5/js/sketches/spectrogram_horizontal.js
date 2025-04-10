var scale, a, b,n, color1, color2, cType, lType, ease, flip, hexlist, cPalette, start1, end1, center,r,step;

var loadParams = true;
var loadColor = true;
var colName = 'heat'

var params = {
  name: "It's Possible",
  rectCP1: ["#38291d","#38291d"],
  rectCP2: ["#53100b","#cca272","#143421"],
  spectCP: [],
  rect2Width: 900,
  rect2Height: 600,
  notes: "",
  steps: 4000,
}

function preload() {
  // result = loadStrings(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\txtFiles"+"\\Without - Sampha.txt");
  result = loadStrings(dataURL + "It's Possible - Piero Piccioni.txt");

  // if (loadParams){
  //   params = loadJSON(docsUrl + "Art\\SplitCloud\\Etsy\\Spectrograph\\Everydays"+"\\passiton2.json");
  //   console.log(params)
  //  params = JSON.parse(params)
  // } else {
  //   params = params;
  // }

  if(loadColor){
    colors = loadJSON(dataURL + "spec_colors.json");
  }
}

function setup() {
  scale = 1;
  createCanvas(900, 600);
  background(20)

  if (colors){
    colors = Object.values(colors)
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

  var cp = new colorPalette(params.rectCP2)
  var cp2 = new colorPalette(params.rectCP1)

  rectp = cornerToCenter(width/2,height/2,params.rect2Width,params.rect2Height)

  g1 = new ColorGrid(rectp[0],rectp[1],params.rect2Width,params.rect2Height,5);
  g2 = new ColorGrid(0,0,width,height,5);
  g2.fillGradient(cp2)
  // g1 = new NewGrid(0,0,width,height,5);
  // g1.fillNoise(0.006)
  g1.fillGradient(cp)
  // g2.display();
  // g2.jitterGrid(2)
  // g1.display()



  colorMode(HSB,360,100,100,1.0)
  var bgGrid = new GridBasic(rectp[0],rectp[1],params.rect2Width,params.rect2Height,2)
  // var bgGrid = new GridBasic(0,0,width,height,2)
  var c1 = color('#efdbb7')

  // for (let i = 0;i<bgGrid.points.length;i++){
  //   for (let j = 0;j<bgGrid.points[i].length;j++){
  //     var c1 = g1.getValue(bgGrid.points[i][j].x,bgGrid.points[i][j].y).c
  //     var c = jitterColor(c1,[5,5,5,0.1],true)
  //       fill(c);
  //       noStroke();
  //       rect(bgGrid.points[i][j].x,bgGrid.points[i][j].y,bgGrid.spacing,bgGrid.spacing)
  //
  //   }
  // }

  for (let i = 0;i<1000;i++){
    var x = random(rectp[0],rectp[0]+400-50)
    var y = random(rectp[1],rectp[1]+800-50)
    var c1 = g1.getValue(x,y).c
    c1.setAlpha(0.05)
    noStroke()
    fill(c1)
    // rect(x,y,random(100),random(100))
  }

  json = JSON.parse(result[0])

  a = 800 / json.length;
  b = 0;
  n = 0;

  center = createVector(width/2,height/2);
  r = 250;
  step = r / 1024;

  // hexList = ["#000000","#ffffff"]


  cPalette = new colorPalette(hexList);
  cPalette.mapColor(1.0);

  // cType = "RGB";
  lType = QUADRATIC_;
  ease = null;
  flip = false;

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
var spectrum = json[n].reverse()
    for (let i = 0;i< spectrum.length;i++){
      stroke(255);
      var val = spectrum[i];

     noFill();
     colorMode(RGB, 255,255,255,1.0)


     var newC = cPalette.mapColor(map(json[n][i],0,255,startl,endl),cType,null,null,lType,ease,1); //// RGB with quadratic is also good
     // var newC = color(0,0,0)
      var alph = map2(spectrum[i],0,255, 0, 0.2, QUADRATIC_, EASE_IN_OUT)
     newC.setAlpha(alph)
     strokeWeight(step*scale*2);
     // colorMode(RGB,255,255,255,255);
     // colorMode(RGB,255,255,255,255);
     // stroke(0, json[n][i]/7.5)
     stroke(newC)


     var x = 50 + b * scale;
     var y = center.y -  i * step * scale;
     var y2 = center.y +  i * step * scale;

     line(x, y, x, y);
     line(x, y2, x, y2);
    }
  b += a;

  n++;

}
