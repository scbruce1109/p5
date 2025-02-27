/*
 * @name Load and Play Sound
 * @arialabel Red screen turns green when the user clicks on it and plays music
 * @description Load sound during preload(). Play a sound when canvas is clicked.
 * <br><br><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * a sound file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em>
 */
let song;
var title;
var ext = ".wav"

function setup() {
  title = 'Lovers Rock - Sade'
  createCanvas(100, 100);

  // Create a p5.MediaElement using createAudio().
  dragon = createAudio(musicUrl + "Tunes\\Spectrograms\\" + title + ext);

  // Show the default media controls.
  dragon.showControls();

  describe('The text "Speed: S" on a gray square with media controls beneath it. The number "S" oscillates between 0 and 1 as the music plays.');
}

function draw() {
  background(200);

  // Produce a number between 0 and 2.
  let n = sin(frameCount * 0.01) + 1;

  // Use n to set the playback speed.
  dragon.speed(n);

  // Get the current speed and display it.
  let s = dragon.speed();

  // Round s to 1 decimal place for display.
  s = round(s, 1);

  // Style the text.
  textAlign(CENTER);
  textSize(16);

  // Display the speed.
  text(`Speed: ${s}`, 50, 50);
}



// function setup() {
//   title = 'Lovers Rock - Sade'
//   song = loadSound(musicUrl + "Tunes\\Spectrograms\\" + title + ext)
//   // song = loadSound('assets/lucky_dragons_-_power_melody.mp3');
//   createCanvas(720, 200);
//   background(255, 0, 0);
// }



// function mousePressed() {
//   if (song.isPlaying()) {
//     // .isPlaying() returns a boolean
//     song.stop();
//     background(255, 0, 0);
//   } else {
//     song.speed(0.1)
//     song.play();
//     background(0, 255, 0);
//   }
// }


//
// var spectrumArray = [];
// var songNames = [
//   "Roxanne - The Police"
//
// ]
// // var textFile = null;
// var title;
// var ext = ".wav"
// var songs = [];
// var songIndex = 0;
//
// function preload(){
//
//   for (let i = 0;i< songNames.length;i++){
//     title = songNames[i]
//     song = loadSound(musicUrl + "Tunes\\Spectrograms\\" + title + ext)
//     song.onended(() => {playing = false; document.getElementById("audio").innerText = "Play";console.log("its length");console.log(spectrumArray.length);download(JSON.stringify(spectrumArray), title, 'text/plain');songIndex++;spectrumArray=[];clear();background(0);songs[songIndex].play();playing=true})
//     songs.push(song);
//   }
//
//   // song = loadSound(musicUrl + "Tunes\\Spectrograms\\" + title + ext)
//  //  //file = new SoundFile(this, "C:\\Users\\bruce\\Music\\Tunes\\Feel Like Making Love - Ana Mazzotti [2023-01-28 212845].wav");
//  // file = new SoundFile(this, "D:\\MusicLibrary\\Sawgrass Good\\Make A Move - 160 DM.mp3");
//
//   playing = false
//   // song.onended(() => {playing = false; document.getElementById("audio").innerText = "Play";console.log("its length");console.log(spectrumArray.length);download(JSON.stringify(spectrumArray), title, 'text/plain');})
//   fr = 30
//
//   // saveArray('heyyy', 'hii')
//
// }
