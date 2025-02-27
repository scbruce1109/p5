var spectrumArray = [];
var songNames = [
  "Underdog - Kasabian",

]
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

  playing = false
  fr = 30
}


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


function setup() {
  createCanvas(500, 500);

  background('black')

  fft = new p5.FFT();
  a = 360/(songs[songIndex].duration()*fr);
  b = a

  noLoop();

}


function draw() {
  frameRate(fr);

  var spectrumA = fft.analyze()
  var spectrumB = spectrumA.reverse()
  // console.log('length of spectrum')
  // console.log(spectrumB.length)
  if (songs[songIndex].isPlaying()){
  spectrumArray.push(spectrumB)
}

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
