// This example uses MediaRecorder to record different media (audio, video,
// or both), making use of different mimetypes.
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get audio stream from mic
// MediaRecorder (contructor) -> create a MediaRecorder with a stream
// MediaRecorder.ondataavailable -> event to listen to when a record is ready
// MediaRecorder.start -> start recording
// MediaRecorder.stop -> stop recording (this will generate a blob of data)
// URL.createObjectURL -> to create a URL from a blob, which we can use as src

var recordButton, stopButton, recordingLabel, recorder;

window.onload = function () {
  recordButton = document.getElementById('record');
  stopButton = document.getElementById('stop');
  recordingLabel = document.getElementById('recording');

  recordButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    var mediaType = document.querySelector('[name=record-config]')
      .mediatype.value;
    recordButton.disabled = true;
    promptRecording(mediaType);
  });

  stopButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    stopRecording();
  });
};

function promptRecording(mediaType) {
  // select what to get from getUserMedia depending on mediaType
  var opts = {
    audio: mediaType === 'audio' || mediaType === 'both',
    video: mediaType === 'video' || mediaType === 'both'
  };

  navigator.mediaDevices.getUserMedia(opts)
  .then(function (stream) {
    // we need to wait until the metadata of the stream is ready
    // or we'll get a video with glitches
    var tmpVideo = document.createElement('video');
    tmpVideo.src = URL.createObjectURL(stream);
    tmpVideo.muted = true;
    tmpVideo.addEventListener('loadedmetadata', function () {
      startRecording();
    })
    tmpVideo.play();

    // set the mimetype for MediaRecorder. ogg for audio-only, webm otherwise
    var mime = mediaType === 'audio' ? 'audio/ogg' : 'video/webm';
    recorder = new MediaRecorder(stream, { mimeType: mime });
    // listen to dataavailable, which gets triggered whenever we have
    // an audio blob available
    recorder.addEventListener('dataavailable', function (evt) {
      // select whether to update the audio or video element depending on
      // media type
      var updateFunc = mediaType === 'audio' ? updateAudio : updateVideo;
      updateFunc(evt.data);
    });
  });
}

function startRecording() {
  // enable/disable buttons
  recordButton.disabled = true;
  stopButton.disabled = false;
  recordingLabel.style = 'display:inline';

  // make the MediaRecorder to start recording
  recorder.start();
}

function stopRecording() {
  // enable/disable buttons
  recordButton.disabled = false;
  stopButton.disabled = true;
  recordingLabel.style = 'display:none';

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

function updateVideo(blob) {
  var video = document.getElementById('video');
  // use the blob from the MediaRecorder as source for the video tag
  video.src = URL.createObjectURL(blob);
  video.play();
}
