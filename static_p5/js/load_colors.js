var hi;

function preload() {
  result = loadJSON(dataURL +'color_palette1.json')

  // json = JSON.parse(result)

  // var hi = new colorPalette('color_palette1')
}

var tings = getAngle("hey", "end");

function setup(){
 createCanvas(600,600);
 background(255);
 colorMode(HSB,360,100,100,1.0);
   // console.log(result[0])
 //json = loadJSONArray("planets.json");

 var ori = p5.Vector(0,0);
 var end = p5.Vector(200,0);

console.log('angle')

 // console.log(getAngle(ori, end));

 var hey = color(unhex("2e5932"));
 print(hey);
 stroke(unhex("2e5932"));
 ellipse(200,200,200,200);
 // console.log(result);
 var hi = new colorPalette(result)
 hi.mapColor(0.25);
 // console.log(hi.colorList)

  for (let i = 0;i<4000;i++){
     noStroke();
     var y = random(height);
     var mapy = map(y, 0, height, 0, 1.0);
  fill(hi.mapColor(mapy));
  rect(random(width),y,random(40),random(40));
  }
}



// function loadColors(pfile){
//  var json;
//  var colorList;
//
//  var loc = "C:\\Users\\bruce\\OneDrive\\Documents\\Art\\Processing\\colorPalettes\\"+ pfile+".json";
//  json = loadJSONArray(loc);
//  colorList = [];
//
//  for (let i = 0;i<json.size();i++){
//   var hu = json.getJSONObject(i).getFloat("hue");
//   var sat = json.getJSONObject(i).getFloat("saturation");
//   var val = json.getJSONObject(i).getFloat("value");
//   colorList[i] = color(hu, sat, val);
//  }
//   return colorList;
// }
//
// function colorProb(colors, probs_){
//   var theColor = 0;
//   var randomProb = random(1.0);
//   //print(colors);
//   //print(probs_);
//
//   for (let i = 0;i<probs_.length;i++){
//     //print(randomProb);
//     if (randomProb <= probs_[i]){
//       //print("hey");
//       coonsole.log(probs_[i]);
//      theColor = colors[i];
//      break;
//     }
//   }
//
//   return theColor;
// }

// class ColorPalette{
//   var colorList;
//
//   ColorPalette(name){
//     var loc = "C:\\Users\\bruce\\OneDrive\\Documents\\Art\\Processing\\colorPalettes\\"+ name+".json";
//     json = loadJSONArray(loc);
//     colorList = new color[json.size()];
//
//    for (let i = 0;i<json.size();i++){
//     var hu = json.getJSONObject(i).getFloat("hue");
//     var sat = json.getJSONObject(i).getFloat("saturation");
//     var val = json.getJSONObject(i).getFloat("value");
//     colorList[i] = color(hu, sat, val);
//    }
//   }
//
// }
