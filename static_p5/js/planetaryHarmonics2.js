var outScale;

function preload() {
  result = loadJSON(dataURL + 'planets.json');
}

var json;
var plist;

function setup(){
  outScale = 2;

  var d = 1080*outScale;
  createCanvas(d,d);
  background(8,10,15);


  var p1 = "Saturn";
  var p2 = "Mercury";
  var detail = 1;
  var trueOrbit = false;

  plist = Object.values(result);

  var origin = new p5.Vector(width/2, height/2);
  var size = 457.2*outScale;

  // var weight = outScale
  // strokeWeight(outScale);

  // strokeWeight(1);

  // for (let i = 0;i<1;i++){
  //   // console.log(plist[i])
  //   for (let p = 0;p<plist.length;p++){
  //   if (plist[p]["Name"] != plist[i]["Name"]){
  //     if (plist[p]["Period"] > plist[i]["Period"]){
  //       p1 = plist[p]["Name"];
  //       p2 = plist[i]["Name"]
  //     } else {
  //       p1 = plist[i]["Name"];
  //       p2 = plist[p]["Name"]
  //     }
  //     generateHarmonic(origin,size,p1,p2,detail,trueOrbit);
  //     // var name = p1 + "_x_" + p2 + ".png"
  //     // saveCanvas(name)
  //     // clear();
  //   }
  // }
  // }

  strokeWeight(1*outScale);

  stroke(255,10);

  generateHarmonic(origin,size,p1,p2,detail,trueOrbit);
  // saveCanvas('thing2.png')
  // clear();

}

function generateHarmonic(origin, size, p1, p2, detail, trueOrbit){
  var planet2 = plist[plist.findIndex(item => item["Name"] === p1)]
  var planet1 = plist[plist.findIndex(item => item["Name"] === p2)]


  // console.log(planet2);

  // console.log(re)
//   JSONObject planet2 = json.getJSONObject(8);
//   JSONObject planet1 = json.getJSONObject(0);
//   //float[] thing = planet1.toArray();
//
   var orbitLength1 = planet1["Period"];
  var orbitLength2 = planet2["Period"];
  var orbitRadius1 = planet1["Aphelion"];
  var orbitRadius2 = planet2["Aphelion"];
//   //float orbitLength1 = 365.265;
//   //float orbitLength2 = 687;
//   //float orbitRadius1 = 1;
//   //float orbitRadius2 = 1.524;
  var opRatio = orbitLength2 / orbitLength1;
  var odRatio = orbitRadius2 / orbitRadius1;
//   var circSize = 457.2;
// //
//   var centerPoint = 540;
  var x1, x2;
  var y1, y2;
  var radius;
  if (trueOrbit){
    radius = size/odRatio;
  } else {
    radius = size;
  }
  var radius2 = size;
  var angle1 = 0;
  var angle2 = 0;
  var interval = 1/detail;
  console.log(radius);

  for (let i=0;i<72*45*detail;i++){
  x1 = sin(radians(angle1))*radius2+origin.x;
  y1 = cos(radians(angle1))*radius2+origin.y;
  x2 = sin(radians(angle2))*radius+origin.x;
  y2 = cos(radians(angle2))*radius+origin.y;

  var v1 = new p5.Vector(x1,y1);
  var v2  = new p5.Vector(x2,y2);
  // fill(0,10);
  // rotate(radians(5));
  // ellipse(x1, y1, 10, 10);
  // ellipse(x2, y2, 10, 10);


  dottedLine(v1,v2,0.2,0,outScale);
  // line(v1.x,v1.y,v2.x,v2.y);
  // line(x1,y1,x2,y2);
//radius -=10;
  angle1 +=interval;
  angle2 +=interval*opRatio;
// cColor +=10;
}



}
