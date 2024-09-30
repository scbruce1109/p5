var pause = false;

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
