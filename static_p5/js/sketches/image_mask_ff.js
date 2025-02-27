var img,movers,g1,g2;

var params = {
  title: 'port',
  ext: '.png',
  noiseRez1: 0.002,
  noiseRez2: 0.0005
}

function preload()
{
  // load image
  img = loadImage(picsUrl + "Notan\\" + params.title + params.ext);
}

function setup(){
  createCanvas(img.width,img.height)
  background(225);
  // image(img,0,0)
  params.noiseSeed = random(10000);

  noiseSeed(params.noiseSeed)

  g1 = new VectorGrid(0,0,width,height,5)
  g2 = new VectorGrid(0,0,width,height,5)

  g1.fillNoise(params.noiseRez1)
  params.noiseSeed2 = random(10000);
  noiseSeed(params.noiseSeed2)
  g2.fillNoise(params.noiseRez2)

  movers = [];

  for (let i = 0;i<10000;i++){
    var m = new Mover1(random(-50,width),random(-50,height),2,2)
    movers.push(m)
  }
  console.log(params)
}

function draw(){
  for (let i = 0;i<movers.length;i++){
    let c = img.get(int(movers[i].location.x), int(movers[i].location.y))

    if (c[0] > 150){
      movers[i].applyForce(g1.getValue(movers[i].location.x,movers[i].location.y).v)
    } else {
      movers[i].applyForce(g2.getValue(movers[i].location.x,movers[i].location.y).v)
    }
    movers[i].display();
  }
}
