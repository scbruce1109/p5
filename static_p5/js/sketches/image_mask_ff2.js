var img,movers,g1,g2,cg1,cg2;

var params = {
  title: 'port',
  ext: '.png',
  noiseRez1: 0.02,
  noiseRez2: 0.00005
}

function preload()
{
  // load image
  img = loadImage(picsUrl + "Notan\\" + params.title + params.ext);
}

function setup(){
  createCanvas(img.width,img.height)
  background(255);
  // image(img,0,0)
  params.noiseSeed = random(10000);

  noiseSeed(params.noiseSeed)

  var cp = new colorPalette([color("#515e67"),color("#f1e0ac"),color("#FF6600")])
  var cp2 = new colorPalette([color("#166646"),color("#160036")])

  g1 = new VectorGrid(0,0,width,height,5)
  g2 = new VectorGrid(0,0,width,height,5)

  cg1 = new ColorGrid(0,0,width,height,5)
  cg1.fillGradient(cp)
  cg2 = new ColorGrid(0,0,width,height,5)
  cg2.fillGradient(cp2)

  g1.fillNoise(params.noiseRez1)
  params.noiseSeed2 = random(10000);
  noiseSeed(params.noiseSeed2)
  g2.fillNoise(params.noiseRez2)

  movers = [];

  for (let i = 0;i<10000;i++){
    var m = new Mover1(random(-50,width),random(-50,height),random(10),random(5))
    movers.push(m)
  }
  console.log(params)
}

function draw(){
  // noStroke();
  for (let i = 0;i<movers.length;i++){
    let c = img.get(int(movers[i].location.x), int(movers[i].location.y))

    if (c[0] < 150){
      var cc = cg2.getValue(movers[i].location.x,movers[i].location.y).c
      cc.setAlpha(0.1)
      movers[i].display(cc);
      movers[i].applyForce(g1.getValue(movers[i].location.x,movers[i].location.y).v)
    } else {
      noStroke()
      var cc = cg1.getValue(movers[i].location.x,movers[i].location.y).c
      cc.setAlpha(0.1)
      // movers[i].applyForce(g1.getValue(movers[i].location.x,movers[i].location.y).v)
      movers[i].applyForce(g2.getValue(movers[i].location.x,movers[i].location.y).v)
      movers[i].display(cc);
    }

  }
}
