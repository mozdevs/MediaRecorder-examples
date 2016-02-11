// This example uses MediaRecorder to record an audio and video stream and use the
// resulting blob as a source for an video element.
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get the video & audio stream from user
// MediaRecorder (contructor) -> create a MediaRecorder with a stream
// MediaRecorder.ondataavailable -> event to listen to when a recording is ready
// MediaRecorder.start -> start recording
// MediaRecorder.stop -> stop recording (this will generate a blob of data)
// URL.createObjectURL -> to create a URL from a blob, which we use as video src

var recordButton, stopButton, recorder, liveStream;

window.onload = function () {
  recordButton = document.getElementById('record');
  stopButton = document.getElementById('stop');

  // get video & audio stream from user
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
  .then(function (stream) {
    liveStream = stream;

    var liveVideo = document.getElementById('live');
    liveVideo.src = URL.createObjectURL(stream);
    liveVideo.play();

    recordButton.disabled = false;
    recordButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);

  });
};

function startRecording() {
  recorder = new MediaRecorder(liveStream);

  recorder.addEventListener('dataavailable', onRecordReady);

  recordButton.disabled = true;
  stopButton.disabled = false;

  recorder.start();
}

function stopRecording() {
  recordButton.disabled = false;
  stopButton.disabled = true;

  // Stopping the recorder will eventually trigger the 'dataavailable' event and we can complete the recording process
  recorder.stop();
}

function onRecordReady(e) {
  var video = document.getElementById('recording');
  // use the blob from MediaRecorder as source for the video tag
  video.src = URL.createObjectURL(e.data);
  video.play();
}
