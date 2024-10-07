function ruleOfThirds(x,y,width_,height_,divisions){
  var divWidth = width_ / divisions;
  var divHeight = height_ / divisions;

  var focalPoints = [];

  for (let i = 1;i<divisions;i++){
    for (let j = 1;j<divisions;j++){
      var p = intersectPoint(createVector(x+divWidth*i,y),createVector(x+divWidth*i,y+height_),createVector(x,y+divHeight*j),createVector(x+width_,y+divHeight*j))
      focalPoints.push(p)
    }
  }
  return focalPoints
}


function makeLandscape(x,y,width_,height_,numPoints){
  fps = ruleOfThirds(x,y,width_,height_,3);
  // foc = Math.floor(random(numPoints))

  var foc = fps[Math.floor(random(fps.length))]
  console.log('foc')
  console.log(foc)
  console.log(fps)

  // var hl = random(height_/5, height/5*4)
  var hl = foc.y + random(-height/3, height/3)
  var p1 = createVector(random(x,width_),hl)
  var p2 = createVector(random(x,width_),hl)

  return([foc,p1,p2])
}


function calcSum(array) {
  const sum = array.reduce((acc, val) => acc + val, 0);
  return sum
}

function idwWeights(p1, listp, radius, w, rev){
   var distances = [];
  var ws = []
  // var val1 = defaultVal;
  for (let i = 0;i < listp.length;i++){
    var mass;
    if (w){
      mass = listp[i].z
    } else {
      mass = 1;
    }
    var d = dist(p1.x,p1.y,listp[i].x,listp[i].y) * mass;

    if (d < radius){
      distances.push(d)
    }
  }
    // console.log(distances)
    var avD = calcSum(distances);
    var weights = [];
    for (let i = 0;i<distances.length;i++){
      if(rev){
      weights.push(1-distances[i]/avD);
      } else {
        weights.push(distances[i]/avD);
      }

    }
   return weights;
}


function getProbability(listProbs){
  var randomProb = random(0,1);
  // console.log(randomProb)
  var prob = 0;
  var probIndex;
  for (let i = 0;i<listProbs.length;i++){
      // console.log(listProbs[i])
      // console.log(prob)
       if (randomProb > prob && randomProb < prob + listProbs[i]){
         probIndex = i;
         // console.log('hey')
         break;
       }
        prob += listProbs[i]
       }
      return probIndex
  }

function chooseVal(listProbs){
  var max = listProbs.reduce((a, b) => Math.max(a, b), -Infinity);
  return listProbs.indexOf(max)
}
