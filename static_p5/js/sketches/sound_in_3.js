/**
 * @name Mic Input
 * @arialabel Grey circle rises from the bottom of the screen based on the amplitude of the user’s audio input into their mic
 * @description <p>Get audio input from your computer's microphone.
 * Make noise to float the ellipse.</p>
 * <p>Note: p5.AudioIn contains its own p5.Amplitude object,
 * so you can call getLevel on p5.AudioIn without
 * creating a p5.Amplitude.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
let mic,fft,numSamples,movers;

function setup() {
  createCanvas(1200, 1200);
  colorMode(HSB,360,100,100,1.0)

  numSamples = 8192

  g1 = new NewGrid(0,0,width,height,10);
  // console.log(g1.grid.length)
  // console.log(g1.grid)
  g1.fillNoise(0.006)

  movers = [];
  for (let i = 0;i<numSamples;i++){

    var loc = createVector(random(width),random(height))

    var m = new NewMover(loc.x,loc.y, 2,0, color('black'),10,0.1)
    movers.push(m);

  }

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic)
}

function draw() {
  background(0,0.05);

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  let h = map(vol, 0, 1, height, 0);
  // ellipse(width / 2, h - 25, 50, 50);

  let spectrum = fft.analyze(numSamples);
  // var sp2 = fft.getOctaveBands(6);
  // var sp3 = fft.logAverages(sp2)
  noStroke();
  // fill(255, 0, 255);
  console.log(spectrum.indexOf(spectrum.max()))

  let largest = spectrum[0];
  let secondLargest = -Infinity;
  var firstFreq = spectrum.indexOf(spectrum.max())
  var secFreq;


  for (let i = 0; i< spectrum.length; i++){
    if (spectrum[i] > largest) {
      secondLargest = largest;
      largest = spectrum[i];
    } else if (spectrum[i] < largest && spectrum[i] > secondLargest) {
      secondLargest = spectrum[i];
      secFreq = spectrum.indexOf(secondLargest)
    }
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    var c = color(map(x,0,width,0,250),map(spectrum[i], 0, 255, 50, 100),map(spectrum[i], 0, 255, 50, 100),map(spectrum[i], 0, 255, 0.0, 1.0))
    // movers[i].
    movers[i].mixColor(c)
    movers[i].applyLife(map(spectrum[i],0,255,0,100))
    movers[i].applyForce(g1.getValue(movers[i].location.x,movers[i].location.y,'a'),true);

    // fill(c)
    // rect(x, 0, width / spectrum.length, height )
    // for (let i = 0;i<1;i++){
    //   rect(random(width),random(height),random(100))
    // }
  }
  console.log('freqs')
  console.log(firstFreq)
  console.log(secFreq)


}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
