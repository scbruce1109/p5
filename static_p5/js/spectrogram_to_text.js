// const fs = require(['fs'])

var spectrumArray = [];
var songNames = [
  // "(There Is) No Greater Love - Amy Winehouse",
  // "Essence - Wizkid ft. Tems",
  // "Harvest Moon - Neil Young",
  // "Let's Stay Together - Al Green",
  "Light My Fire - The Doors",
  // "Lovers Rock - Sade",
  // "Satisfy My Soul - Bob Marley & The Wailers",
  "Solitude - Billie Holiday",
  "Something - The Beatles",
  "Without - Sampha",
  "You Send Me - Sam Cooke",
]
// var textFile = null;
var title;
var ext = ".wav"
var songs = [];
var songIndex = 0;

function preload(){

  for (let i = 0;i< songNames.length;i++){
    title = songNames[i]
    song = loadSound(musicUrl + "Tunes\\Spectrograms\\" + title + ext)
    song.onended(() => {playing = false; document.getElementById("audio").innerText = "Play";console.log("its length");console.log(spectrumArray.length);download(JSON.stringify(spectrumArray), title, 'text/plain');songIndex++;spectrumArray=[];clear();background(0);songs[songIndex].play();playing=true})
    songs.push(song);
  }

  // song = loadSound(musicUrl + "Tunes\\Spectrograms\\" + title + ext)
 //  //file = new SoundFile(this, "C:\\Users\\bruce\\Music\\Tunes\\Feel Like Making Love - Ana Mazzotti [2023-01-28 212845].wav");
 // file = new SoundFile(this, "D:\\MusicLibrary\\Sawgrass Good\\Make A Move - 160 DM.mp3");

  playing = false
  // song.onended(() => {playing = false; document.getElementById("audio").innerText = "Play";console.log("its length");console.log(spectrumArray.length);download(JSON.stringify(spectrumArray), title, 'text/plain');})
  fr = 30

  // saveArray('heyyy', 'hii')

}

// download(JSON.stringify(spectrumArray), 'Dream.txt', 'text/plain');

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, songNames[songIndex]+"txt");
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = songNames[songIndex] + ".txt";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

 // function makeTextFile(text) {
 //    var data = new Blob([text], {type: 'text/plain'});
 //
 //    // If we are replacing a previously generated file we need to
 //    // manually revoke the object URL to avoid memory leaks.
 //    if (textFile !== null) {
 //      window.URL.revokeObjectURL(textFile);
 //    }
 //
 //    textFile = window.URL.createObjectURL(data);
 //
 //    // returns a URL you can use as a href
 //    return textFile;
 //  };

  function saveArray(arrayString, title) {
    var endpoint = '/save';
    var httpMethod = 'POST'
    var data = {
      title: title,
      contents: arrayString
      };
      console.log('foooooper')

      $.ajax({
        url: endpoint,
        method: httpMethod,
        type: 'POST',
        // processData: false,
        data: data,
        success: function(data){
          console.log(data);
          if(data['success'] == 'yes'){
            console.log('hey hi')
          }
        },
        error: function(errorData){
          console.log('error')
          console.log(errorData)
        }
      })
  }



// function exportArray(array){
//   var arrayString = array.toString();
//   makeTextFile(arrayString)
// }

function setup() {
  createCanvas(500, 500);
  // layer = createGraphics(width, height)

  background('black')

  fft = new p5.FFT();
// console.log(song.duration());
  a = 360/(songs[songIndex].duration()*fr);
  b = a
  // a = 0;

  noLoop();
  // songs[0].play();
  // playing = true;
  //layer.clear()
}


function draw() {
  frameRate(fr);
// console.log(frameRate())
  // background(0);

  // layer.noFill()
  // layer.colorMode(RGB)

  var spectrumA = fft.analyze()
  var spectrumB = spectrumA.reverse()
  // console.log('length of spectrum')
  // console.log(spectrumB.length)
  if (songs[songIndex].isPlaying()){
  spectrumArray.push(spectrumB)
}
  // spectrumB.splice(0, 40)

  // push()
  // translate(250, 250)
  // noFill()
  // stroke('pink')
  //
  //
  // beginShape()
  //
  //   for(let i = 0; i < spectrumB.length; i++){
  //     var amp = spectrumB[i]
  //     var x = map(amp, 0, 256, -2, 2)
  //     var y = map(i, 0, spectrumB.length, 30, 215)
  //
  //     vertex(x, y)
  //   }
  // endShape()
  //
  // pop()


  push()

    translate(width/2, height/2)
    rotate(radians(a))
    // console.log(max(spectrumB))
    // console.log('\n')

      for(let i = 0; i < spectrumB.length; i++){


      // stroke(245 , 132, 255 - spectrumB[i], spectrumB[i]/40)
      stroke(255,255,255, spectrumB[i]/40)
      // console.log(spectrumB[i])
      line(0, i/5, 0, i/5)
    }


  pop()

  if(playing)a += b

}

function toggleAudio(){
  if(!playing){
    loop()
    songs[songIndex].play()
    console.log("playing")
    document.getElementById("audio").innerText = "Pause"
  }
  else{
    songs[songIndex].pause()
    noLoop()
    console.log("pasued")
    document.getElementById("audio").innerText = "Play"
  }

  playing = !playing
}
