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
  } else if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
}else if (key === 's') {
  saveCanvas();
} else if (key === 'e') {
  exportParams();
}
  // uncomment to prevent any default behavior
  return false;
}
