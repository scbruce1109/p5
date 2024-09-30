var title = "It's Possible - Piero Piccioni"
var ext = ".wav";
var peaks;
var song;
function preload(){
  song = loadSound(url + title + ext)
 //  //file = new SoundFile(this, "C:\\Users\\bruce\\Music\\Tunes\\Feel Like Making Love - Ana Mazzotti [2023-01-28 212845].wav");
 // file = new SoundFile(this, "D:\\MusicLibrary\\Sawgrass Good\\Make A Move - 160 DM.mp3");

  // playing = false
  // song.onended(() => {playing = false; document.getElementById("audio").innerText = "Play";console.log("its length");console.log(spectrumArray.length);download(JSON.stringify(spectrumArray), title, 'text/plain');})
  // fr = 30

  // saveArray('heyyy', 'hii')

}

function setup(){
  createCanvas(600,600);
  background(255);
  var num = 100

  peaks = song.getPeaks(width*num);
  console.log(peaks.length)

  for(let i = 0; i < peaks.length; i++){
    line(i/num, height/2 + peaks[i]*100, i/num, height/2 -peaks[i]*100);
  }



}
