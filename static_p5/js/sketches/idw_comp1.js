function setup() {
  createCanvas(600, 600);
  // background('#eacb9d');
  background(255)
  var probs = [.25,.5,.25]
  console.log(getProbability(probs))

  // var points = [createVector(random(width),random(height)),createVector(random(width),random(height))]

  var colors = ['#286992','#d4ff81','#f5e931']//,'#4cb027']

  // var points = [createVector(random(width),random(height),3),createVector(random(width),random(height),3),createVector(random(width),random(height),1)];
  var points = makeLandscape(0,0,width,height,3)



  // for (let i = 0;i<colors.length;i++){
  //   var p = createVector(random(width),random(height))
  //   points.push(p)
  // }



  for (let i = 0;i<10000;i++){
    var loc = createVector(random(width),random(height))
    var w = idwWeights(loc,points,2400);
    // console.log('wee')
    // console.log(w)
    var wi = getProbability(w);
    // var wi = chooseVal(w);

    var dis = dist(loc.x,loc.y,points[wi].x,points[wi].y)
    var alph = map(dis,800,0,0,75)
    var size = map(dis,600,0,100,50)
    //
    var c = color(colors[wi])
    c.setAlpha(alph)
    noStroke()
    fill(c)
    rect(loc.x,loc.y,random(size),random(size))
  }

  for (let i = 0;i<points.length;i++){
    fill('black')
    // ellipse(points[i].x,points[i].y,10,10)
  }

  // fill(255,150);
  // rect(width/2,height/2,200,200)

}

function draw() {

}
