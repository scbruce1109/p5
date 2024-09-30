var pause = false


function setup() {
  createCanvas(600, 600);
  background(250);
  // noLoop();
}

function draw() {
  noFill();
  stroke(0,20);
  ellipse(random(width),random(height),100,100);
}

function keyTyped() {
  if (key === 'p') {
    if (pause){
      pause = false;
      loop();
    } else {
      pause = true;
      noLoop();
    }
  } else if (key === 'c') {
    clear();
  } else if (key === 'd') {
    redraw();
  }
  // uncomment to prevent any default behavior
  return false;
}
