// This example uses MediaRecorder to record a filtered audio stream and use the
// resulting blob as a source for an audio element.
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get audio stream from mic
// AudioContext (constructor) and the various types of nodes to manipulate sound
// MediaRecorder (constructor) -> create a MediaRecorder with a stream
// MediaRecorder.ondataavailable -> event to listen to when a record is ready
// MediaRecorder.start -> start recording
// MediaRecorder.stop -> stop recording (this will generate a blob of data)
// URL.createObjectURL -> to create a URL from a blob, which we can use as src

var recordButton, stopButton, recorder;

window.onload = function () {
  recordButton = document.getElementById('record');
  stopButton = document.getElementById('stop');

  // get audio stream from user's mic
  navigator.mediaDevices.getUserMedia({
    audio: true
  })
  .then(function (stream) {
    recordButton.disabled = false;
    recordButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);

    // Create a Web Audio based pipeline to modify the input sound in real time
    var audioContext = new AudioContext();
    var now = audioContext.currentTime;


    // We'll build a pipeline like this
    // stream -> MediaStreamSource -> filter -> outputNode
    // where the frequency of the filter changes automatically with an oscillator + gain
    var inputNode = audioContext.createMediaStreamSource(stream);
    var filter = audioContext.createBiquadFilter();
    filter.frequency.setValueAtTime(1000, now);
    filter.type = 'highpass';
    filter.Q.value = 40;
    var oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(0.5, now);
    oscillator.start();
    var gain = audioContext.createGain();
    gain.gain.setValueAtTime(1000, now);
    oscillator.connect(gain);
    gain.connect(filter.frequency);

    var outputNode = audioContext.createMediaStreamDestination();
    inputNode.connect(filter);
    filter.connect(outputNode);

    // create a new MediaRecorder and pipe the filtered audio stream to it
    recorder = new MediaRecorder(outputNode.stream);

    // listen to dataavailable, which gets triggered whenever we have
    // an audio blob available
    recorder.addEventListener('dataavailable', function (evt) {
      updateAudio(evt.data);
    });
    
    // Work around for bug https://bugzilla.mozilla.org/show_bug.cgi?id=934512
    window.dontGCThis = stream;
    
  });
};

function startRecording() {
  // enable/disable buttons
  recordButton.disabled = true;
  stopButton.disabled = false;

  // make the MediaRecorder start recording
  recorder.start();
}

function stopRecording() {
  // enable/disable buttons
  recordButton.disabled = false;
  stopButton.disabled = true;

  // make MediaRecorder stop recording
  // eventually this will trigger the dataavailable event
  recorder.stop();
}

function updateAudio(blob) {
  var audio = document.getElementById('audio');
  // use the blob from the MediaRecorder as source for the audio tag
  audio.src = URL.createObjectURL(blob);
  audio.play();
}
