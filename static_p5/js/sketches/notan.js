var img,movers,g1,g2,cg1,cg2;

var params = {
  title: 'milpa_test',
  ext: '.png',
  noiseRez1: 0.2,
  noiseRez2: 0.5
}

function preload()
{
  // load image
  img = loadImage(picsUrl + "Notan\\" + params.title + params.ext);
}

function setup(){
  createCanvas(img.width,img.height)
  background(0);
  // image(img,0,0)
  params.noiseSeed = random(10000);

  noiseSeed(params.noiseSeed)

  params.cp = [color("#515e67"),color("#f1e0ac"),color("#FF6600")]
  params.p1 = randomPointGenerator(0,0,width,height,3)
  params.cp2 = [color("#420000"),color("#160036")]
  params.p2 = randomPointGenerator(0,0,width,height,2)
  params.cp3 = [color("#001542"),color("#f2deb0")]
  params.p3 = randomPointGenerator(0,0,width,height,2)

  g1 = new VectorGrid(0,0,width,height,5)
  g2 = new VectorGrid(0,0,width,height,5)

  cg1 = new ColorGrid(0,0,width,height,5)
  cg1.fillColor(params.cp,params.p1,1000,color(255))
  cg2 = new ColorGrid(0,0,width,height,5)
  cg2.fillColor(params.cp2,params.p2,1000,color(0))
  cg3 = new ColorGrid(0,0,width,height,5)
  cg3.fillColor(params.cp3,params.p3,1000,color(0))

  g1.fillNoise(params.noiseRez1)
  params.noiseSeed2 = random(10000);
  noiseSeed(params.noiseSeed2)
  g2.fillNoise(params.noiseRez2)

  movers = [];

  for (let i = 0;i<3000;i++){
    var x = random(0,width);
    var y = random(0,height);

    var cc = cg3.getValue(x,y).c
    cc.setAlpha(0.1)
    fill(cc)
    noStroke()
    rect(x,y,random(200))

  }

  for (let i = 0;i<3000;i++){
    var x = random(0,width);
    var y = random(0,height);

    var c = img.get(int(x), int(y))

    if (c[0] < 90){
      var cc = cg2.getValue(x,y).c
      cc.setAlpha(0.1)
      fill(cc)
      noStroke()
      rect(x,y,random(100),random(100))
    } else if (c[0] > 180) {
    var cc = cg1.getValue(x,y).c
    cc.setAlpha(0.1)
    fill(cc)
    noStroke()
    rect(x,y,random(100),random(100))
    }




  }

  for (let i = 0;i<10000;i++){
    var m = new Mover1(random(-50,width),random(-50,height),random(10),random(5))
    movers.push(m)
  }
  console.log(params)
}

function draw(){
  noStroke();
  for (let i = 0;i<movers.length;i++){
    let c = img.get(int(movers[i].location.x), int(movers[i].location.y))

    if (c[0] < 90){
      var cc = cg2.getValue(movers[i].location.x,movers[i].location.y).c
      cc.setAlpha(0.1)
      movers[i].display(cc);
      movers[i].applyForce(g1.getValue(movers[i].location.x,movers[i].location.y).v)
    } else if (c[0] > 180) {
      noStroke()
      var cc = cg1.getValue(movers[i].location.x,movers[i].location.y).c
      cc.setAlpha(0.1)
      // movers[i].applyForce(g1.getValue(movers[i].location.x,movers[i].location.y).v)
      movers[i].applyForce(g2.getValue(movers[i].location.x,movers[i].location.y).v)
      movers[i].display(cc);
    }

  }
}

function randomPointGenerator(x,y,width,height,numPoints){
  var points = []
  for (let i = 0;i<numPoints;i++ ){
    var p = createVector(random(x,width),random(y,height))
    points.push(p)
  }
  return points
}
