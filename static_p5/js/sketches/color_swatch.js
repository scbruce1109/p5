function preload() {
  result = loadJSON(dataURL +'color_palette1.json')

  // json = JSON.parse(result)

  // var hi = new colorPalette('color_palette1')
}

function setup(){
  var scale = 1;
  createCanvas(4800/8,160/8);
  background(255);
  noStroke();
  colorMode(HSB,360,100,100,1.0);

  // var c1 = color(180,100,100);
  // fill(c1);
  // rect(20,20,100,100);
  // colorMode(RGB);
  // var c2 = hsbToRGB(c1);
  // fill(c2);
  // rect(120,20,100,100);
  // cluv = rgb2hsluv(c2);
  // var rgb = rgb = hsluv.hsluvToRgb(cluv);
  // var c3 = color(rgb[0]*255,rgb[1]*255,rgb[2]*255);
  // fill(c3);
  // rect(220,20,100,100);
  // print(hue(c1))

  // var color1 = color(0,100,100);
  // var color2 = color(180,100,100);

  var color1 = color('#181778');
  var color2 = color('#FF6600');

var hexList = ["#181778",'#788430',"#FF6600","#181778"]
var cPalette = new colorPalette(hexList);
console.log(cPalette.colorList)
  // var color1 = color('#53fd02');
  // var color2 = color('#025ca2');



// 440356
  var x = 0;

  var curLerp = 0;
  var steps = 200;
  for (let i =0;i<steps;i++){

    //// regular hsb lerp
    colorMode(HSB,360,100,100,1.0);
    var y = 0;
    fill(cPalette.mapColor(curLerp, "HSLUV", null,null,LINEAR_))
    // fill(cPalette.colorList[0]);
    rect(x,y,width/steps,20*scale);
    y +=height/10;
    print(i + "   " + curLerp)


//
//     fill(lerpColor2(color1,color2,curLerp, "MIX", null,null,LINEAR_))
//     rect(x,y,width/steps,height/10);
//     y +=height/10;
//
//
// //////////  color map 2
//   colorMode(HSB,360,100,100,1.0);
//
//     // // h = lerp(hue(color1),hue(color2),curLerp);
//     // h = map2(curLerp, 0.0, 1.0, hue(color1),hue(color2), SINUSOIDAL_, EASE_IN_OUT)
//     // // s = lerp(saturation(color1),saturation(color2),curLerp)
//     // s = map2(curLerp, 0.0, 1.0, saturation(color1),saturation(color2), SINUSOIDAL_, EASE_IN_OUT)
//     // // b = lerp(brightness(color1),brightness(color2),curLerp)
//     // b = map2(curLerp, 0.0, 1.0, brightness(color1),brightness(color2), SINUSOIDAL_, EASE_IN_OUT)
//     fill(lerpColor2(color1,color2,curLerp, "HSB", null,null,SINUSOIDAL_));
//     rect(x,y,width/steps,width/10);
//     y +=height/10;
//
// //////////// perceptually uniform lerp
//
//     // colorMode(RGB);
//     // c1 = hsbToRGB(color1);
//     // c2 = hsbToRGB(color2);
//     //
//     // l1 = rgb2hsluv(c1);
//     // l2 = rgb2hsluv(c2);
//     //
//     // var col1 = createVector(l1[0], l1[1], l1[2]);
//     // var col2 = createVector(l2[0], l2[1], l2[2]);
//     //
//     // var col = p5.Vector.lerp(col1, col2, curLerp);
//     // var rgb = hsluv.hsluvToRgb([col.x, col.y, col.z]);
// 		fill(lerpColor2(color1,color2,curLerp, "HSLUV", null,null,LINEAR_));
//     rect(x,y,width/steps,width/10);
//     y +=height/10;
//
//
// ////////// regular RGB Lerp color
//     fill(lerpColor2(color1,color2,curLerp, "RGB", null,null,LINEAR_))
//     rect(x,y,width/steps,width/10);


    x += width/steps;
    curLerp += 1/(steps-1);
    // console.log(curLerp)

  }
  stroke(0)
line(width/3,0,width/3,height)
line((width/3)*2,0,(width/3)*2,height)
line((width/3)*3,0,(width/3)*3,height)

  // var colors = new colorPalette(result)
  //
  //
  //
  // for (let i = 0;i<4000;i++){
  //    noStroke();
  //    var y = random(height);
  //    var mapy = map(y, 0, height, 0, 1.0);
  // fill(colors.mapColor(mapy));
  // rect(random(0,width/3),y,random(40),random(40));
  // }

}
