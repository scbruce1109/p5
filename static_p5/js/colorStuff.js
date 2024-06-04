// function hsbToRGB()

function hsbToRGB(hsbColor){
  var h = hue(hsbColor);
  var s = saturation(hsbColor);
  var b = brightness(hsbColor);



  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  var cc = color([255 * f(5), 255 * f(3), 255 * f(1)]);
  return cc;
};




function getImgColor(img, x, y){


  let c = img.get(int(x), int(y));

  return color(c[0],c[1],c[2]);
}


// function bumpHue
//
//
// function colorJit(){
//
// }



function rgb2hsluv(rgbColor){
  var r = red(rgbColor)/255;
  var g = green(rgbColor)/255;
  var b = blue(rgbColor)/255;

  return hsluv.rgbToHsluv([r,g,b])
}

function lerpColor2(color1,color2,lurpVal, colorSpace, start, end, type, ease){
  var newC;

///////// Set default parameters
  if (! start ){
    var start = 0.0;
  }

  if (! end ){
    var end = 1.0;
  }

  if (! type ){
    var type = LINEAR_;
  }

  if (! ease ){
    var ease = EASE_IN_OUT;
  }

  if (! colorSpace ){
    var colorSpace = "RGB";
  }

  ////////// Clamp color at start / end values
  if (lurpVal < start){
    return color1;
  } else if (lurpVal > end){
    return color2;
  }

  if (colorSpace == "HSB"){
    colorMode(HSB,360,100,100,1.0);
    h = map2(lurpVal, start, end, 0.0,1.0, type, ease)
  // h = map2(lurpVal, start, end, hue(color1),hue(color2), type, ease)
  // // s = lerp(saturation(color1),saturation(color2),curLerp)
  // s = map2(lurpVal, start, end, saturation(color1),saturation(color2), type, ease)
  // // b = lerp(brightness(color1),brightness(color2),curLerp)
  // b = map2(lurpVal, start, end, brightness(color1),brightness(color2), type, ease)

  newC = lerpColor(color1, color2,h);

} else if (colorSpace == "RGB"){
  colorMode(RGB,255,255,255,1.0);
  h = map2(lurpVal, start, end, 0.0,1.0, type, ease)
  // r = map2(lurpVal, start, end, red(color1),red(color2), type, ease)
  // // r = r * 255;
  // // s = lerp(saturation(color1),saturation(color2),curLerp)
  // g = map2(lurpVal, start, end, green(color1),green(color2), type, ease)
  // // g = g * 255;
  // // b = lerp(brightness(color1),brightness(color2),curLerp)
  // b = map2(lurpVal, start, end, blue(color1),blue(color2), type, ease);
  // b = b * 255;

  newC = lerpColor(color1, color2,h);
} else if (colorSpace == "HSLUV") {
  colorMode(RGB,255,255,255,1.0);
  c1 = hsbToRGB(color1);
  c2 = hsbToRGB(color2);

  l1 = rgb2hsluv(c1);
  l2 = rgb2hsluv(c2);

  var col1 = createVector(l1[0], l1[1], l1[2]);
  var col2 = createVector(l2[0], l2[1], l2[2]);
  h = map2(lurpVal, start, end, 0.0,1.0, type, ease)
  var col = p5.Vector.lerp(col1, col2, h);
  var rgb = hsluv.hsluvToRgb([col.x, col.y, col.z]);
  // console.log(rgb);
  newC = color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);


} else if (colorSpace == "MIX"){
  colorMode(RGB,255,255,255,1.0);
  var r1 = red(color1);
  var g1 = green(color1);
  var b1 = blue(color1);

  var r2 = red(color2);
  var g2 = green(color2);
  var b2 = blue(color2);

  var rgb1 = "rgb(" + r1.toString() + ", " + g1.toString() + ", " + b1.toString() + ")";
  var rgb2 = "rgb(" + r2.toString() + ", " + g2.toString() + ", " + b2.toString() + ")";


  t = map2(lurpVal, start, end, 0.0,1.0, type, ease)
  var mixed  = mixbox.lerp(rgb1, rgb2, t);
  // console.log('mixxed')
  // console.log(mixed);
  newC = color(mixed[0],mixed[1],mixed[2]);
}


  return newC;
}

// function hsluv2rgb(hluvArray){
//
//
//   var r = red(rgbColor)/255;
//   var g = green(rgbColor)/255;
//   var b = blue(rgbColor)/255;
//
//   return hsluv.rgbToHsluv([r,g,b])
// }

// function HSVtoRGB(hsbColor) {
//
//   var h = hue(hsbColor);
//   var s = saturation(hsbColor);
//   var b = brightness(hsbColor);
//
//     var r, g, b, i, f, p, q, t;
//     if (arguments.length === 1) {
//         s = h.s, v = h.v, h = h.h;
//     }
//     i = Math.floor(h * 6);
//     f = h * 6 - i;
//     p = v * (1 - s);
//     q = v * (1 - f * s);
//     t = v * (1 - (1 - f) * s);
//     switch (i % 6) {
//         case 0: r = v, g = t, b = p; break;
//         case 1: r = q, g = v, b = p; break;
//         case 2: r = p, g = v, b = t; break;
//         case 3: r = p, g = q, b = v; break;
//         case 4: r = t, g = p, b = v; break;
//         case 5: r = v, g = p, b = q; break;
//     }
//     return {
//         r: Math.round(r * 255),
//         g: Math.round(g * 255),
//         b: Math.round(b * 255)
//     };
//     return color(Math.round(r * 255))
// }


class colorPalette{

  constructor(list){
    // console.log(Object.keys(pjson).length);

    // var file = dataURL +'color_palette1.json';
    // console.log(file);
    // result = loadJSON(file)

    // json = JSON.parse(result[0])

    this.colorList = [];

     for (let i = 0;i<list.length;i++){
      // var hu = pjson[i]["hue"];
      // var sat = pjson[i]["saturation"];
      // var val = pjson[i]["value"];
      // var hex = pjson[i]["hex"];
      var hex = list[i];
      this.colorList[i] = color(hex);
     }
    // this.colorList = colorList;

  }

  getColor(val, reps){
     if (val > 1.0){
       val = 1.0;
     }
     if (val < 0.0){
       val = 0.0;
     }
     var stop;
     var segLength = 1 / (this.colorList.length*reps);
    // console.log(segLength)

     for (let i = 0;i< (this.colorList.length*reps);i++){
      // lBound = segLength * i;
      var hBound = segLength * (i+1);

      if (val <= hBound){
        // console.log('hey')
        // console.log(hBound)
        stop = i;
        break;
      }
       }
       // console.log(stop)
       var stop2 = stop % this.colorList.length;
       // console.log((stop2));

      return this.colorList[stop2]

   }

  mapColor(lerpVal, colorSpace, start_, end, type, ease, reps){
    if (lerpVal > 1.0){
     lerpVal = 1.0;
   }
   if (lerpVal < 0.0){
     lerpVal = 0.0;
   }
    if (! reps){
     reps = 1;
   }
   var stop;
   var segLength = 1 / ((this.colorList.length-1)*reps);

   for (let i = 0;i< (this.colorList.length-1)*reps;i++){
    var lBound = segLength * i;
    var hBound = segLength * (i+1);
    if (lerpVal >= lBound && lerpVal <=hBound){
      stop = i;
      break;
    }

    }
    stop = stop % (this.colorList.length-1)
   var newLerp = map(lerpVal,lBound, hBound, 0.0,1.0)
   var newC = lerpColor2(color(this.colorList[stop]),color(this.colorList[stop+1]),newLerp, colorSpace, start_, end, ease)
   return newC;
  }

}

function multiColor(colorList, lerpVal,reps){
   if (lerpVal > 1.0){
     lerpVal = 1.0;
   }
   if (lerpVal < 0.0){
     lerpVal = 0.0;
   }
  if (! reps){
     reps = 1;
   }
   var stop;
  console.log(reps)
   var segLength = 1 / ((colorList.length-1)*reps);
  console.log(segLength)

   for (let i = 0;i< (colorList.length-1)*reps;i++){
    var lBound = segLength * i;
    var hBound = segLength * (i+1);
    if (lerpVal >= lBound && lerpVal <=hBound){
      stop = i;
      break;
    }

    }
    stop = stop % (colorList.length-1)
  console.log('stop')
  console.log(stop)
   var newLerp = map(lerpVal,lBound, hBound, 0.0,1.0)
   var newC = lerpColor2(color(colorList[stop]),color(colorList[stop+1]),newLerp, "MIX", null, null, LINEAR_)
   return newC;
 }
