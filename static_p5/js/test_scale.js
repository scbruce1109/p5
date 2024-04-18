function preload() {
  result = loadJSON(dataURL +'color_palette1.json')

  // json = JSON.parse(result)

  // var hi = new colorPalette('color_palette1')
}


function setup(){
var scale = 3;
createCanvas(1800,1800);
background(255);
// colorMode(HSB,360,100,100,1.0)


var hey = new p5.Vector(0,0);
var hi = new p5.Vector(200*scale,200*scale);

var woop = getAngle(hey, hi);
// console.log(degrees(woop));
stroke(255,0,0)
strokeWeight(1*scale);
dottedLine(hey,hi,0.1,0,scale);
// stroke(100)
// drawGrid(0,0,600,600, 10,10);
//
// var field = new Grid(0,0,1,0.001);
// field.displayPix();
//
// var colors = new colorPalette(result)
//
// for (let i = 0;i<100;i++){
//   fill(colors.mapColor(random(0,1)));
//   ellipse(random(width),random(height),10,10)
// }

origin = new p5.Vector(random(width),random(height));
  endpoint = new p5.Vector(random(width),random(height));
  // dashedLine(origin, endpoint, int(random(5,15)), 20);
// console.log(degrees(hey.angleBetween(hi)))


}
