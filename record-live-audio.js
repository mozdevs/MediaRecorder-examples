// This example uses MediaRecorder to record an audio stream and use the
// resulting blob as a source for an audio element.
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get audio stream from mic
// MediaRecorder (contructor) -> create a MediaRecorder with a stream
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

    // create a new MediaRecorder and pipe the audio stream to it
    recorder = new MediaRecorder(stream);

    // listen to dataavailable, which gets triggered whenever we have
    // an audio blob available
    recorder.addEventListener('dataavailable', function (evt) {
      updateAudio(evt.data);
    });
  });
};

function startRecording() {
  // enable/disable buttons
  recordButton.disabled = true;
  stopButton.disabled = false;

  // make the MediaRecorder to start recording
  recorder.start();
}

function stopRecording() {
  // enable/disable buttons
  recordButton.disabled = false;
  stopButton.disabled = true;

  // make the MediaRecorder to stop recording
  // eventually this will trigger the dataavailable event
  recorder.stop();
}

function updateAudio(blob) {
  var audio = document.getElementById('audio');
  // use the blob from the MediaRecorder as source for the audio tag
  audio.src = URL.createObjectURL(blob);
  audio.play();
}
