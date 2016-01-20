// This example uses MediaDevices.getUserMedia to get an audio and video stream,
// and then display it in a video element
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get live video stream from webcam
// AudioContext.createMediaStreamDestination -> to create a stream with audio out of a Web AudioContext
// Stream.getAudioTracks() -> to get only the audio tracks from a stream
// Stream.addTrack() -> to add a track to an existing stream
// URL.createObjectURL -> to create a URL for the stream, which we can use as src for the video


window.onload = function () {

  // request video stream from the user's webcam
  navigator.mediaDevices.getUserMedia({
    video: true
  })
  .then(function (stream) {
    var video = document.createElement('video');
    video.controls = true;
    var main = document.querySelector('main');
    main.appendChild(video);

    var audioContext = new AudioContext();
    var oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 110;
    var streamAudioDestination = audioContext.createMediaStreamDestination();
    oscillator.connect(streamAudioDestination);
    oscillator.start();
    
    // add audio track from audiocontext with beep
    var audioStream = streamAudioDestination.stream;
    var audioTracks = audioStream.getAudioTracks();
    var firstAudioTrack = audioTracks[0];
    stream.addTrack(firstAudioTrack);
    
    video.src = URL.createObjectURL(stream);
    video.play();
    
  });
  
};

