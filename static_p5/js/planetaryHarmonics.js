function preload() {
  result = loadJSON(dataURL + 'planets.json');
}


var json;

function setup(){
  createCanvas(1080,1080);
  background(8,10,15);

  var p1 = "Uranus";
  var p2 = "Mercury";
  var detail = 2;
  var trueOrbit = false;
//
  // json = JSON.parse(result);
  // console.log(Object.values(result));
  var plist = Object.values(result);

  var planet2 = plist[plist.findIndex(item => item["Name"] === p1)]
  var planet1 = plist[plist.findIndex(item => item["Name"] === p2)]

  console.log(planet2);

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
  var circSize = 457.2;
//
  var centerPoint = 540;
  var x1, x2;
  var y1, y2;
  var radius;
  if (trueOrbit){
    radius = circSize/odRatio;
  } else {
    radius = circSize;
  }
  var radius2 = circSize;
  var angle1 = 0;
  var angle2 = 0;
  var interval = 1/detail;
  console.log(radius);

  for (let i=0;i<72*45*detail;i++){
  x1 = sin(radians(angle1))*radius2+centerPoint;
  y1 = cos(radians(angle1))*radius2+centerPoint;
  x2 = sin(radians(angle2))*radius+centerPoint;
  y2 = cos(radians(angle2))*radius+centerPoint;
  fill(0,10);
  // rotate(radians(5));
  // ellipse(x1, y1, 10, 10);
  // ellipse(x2, y2, 10, 10);
  strokeWeight(1);
  stroke(255,10);
  line(x1,y1,x2,y2);
//radius -=10;
  angle1 +=interval;
  angle2 +=interval*opRatio;
// cColor +=10;
}
}
