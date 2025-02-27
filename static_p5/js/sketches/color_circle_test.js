function setup() {
  createCanvas(600, 600);
  noStroke();

  // colors = [
  //   '#35402c',
  //   '#f0d840',
  //   '#df6b2e',
  //   '#9e151c',
  //   '#4f111c',
  //   '#2b4866',
  //   '#35402c',
  // ]

  colors = ["#515e67","#f1e0ac",'#ff9c5e',"#515e67"]

  var cp = new colorPalette(colors);
  var num = 50
  for (let j = 0;j<num;j++){
    var a = 360 / num
    var lerpVal = map(a*j,0,360,0,1);
    console.log('lerpval')
    console.log(lerpVal)
    // var fillC = cp.colorList[1]
    var fillc = multiColor(cp.colorList,lerpVal);
    var arc = arcRing(width/2,height/2,50,200,1,a*j,a,fillc)


  }
  // var arc = arcRing(width/2,height/2,50,200,1,0,45,'red')
  // var arc = arcRing(width/2,height/2,50,200,1,45,45,'blue')

}

function draw() {
  // background(220);
}
