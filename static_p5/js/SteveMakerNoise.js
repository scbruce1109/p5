var colorList = ["#0d1b44ff","#c62800ff","#feec01ff","#0d1b44ff"];

function setup() {
  var colP = new colorPalette(colorList);
  createCanvas(400, 400);
  colorMode(HSB, 360,100,100,100);
  let rez = 0.001;
  noStroke();
  var fillC = getColor(colorList,0.9, 6);
  for (i = 0;i<width;i++){
    for (j = 0;j<height;j++){
      n = noise(i*rez,j*rez)
      var fillC = colP.mapColor(n, "HSB",null,null,LINEAR_,null,10);
      // var fillC = colP.getColor(n,10);


      let brt = map(n,0,1,0,100);
      // fill(color(0,0,brt,100));
      fill(fillC);
      rect(i,j,3);
    }
  }
}

function draw() {
  // background(220);
}

// function getColor(colorList, val){

// }

function getColor(colorList, val, reps){
   if (val > 1.0){
     val = 1.0;
   }
   if (val < 0.0){
     val = 0.0;
   }
   var stop;
   var segLength = 1 / (colorList.length*reps);
  // console.log(segLength)

   for (let i = 0;i< (colorList.length*reps);i++){
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
     stop2 = stop % colorList.length;
     // console.log((stop2));

    return color(colorList[stop2])

 }
