// This example uses MediaDevices.getUserMedia to add a computer generated
// 'beep' to a silent live video stream,
// An audio stream is generated using Web Audio, the audio track is
// taken out of that stream and added to the original stream
// A video element will display both the live video and the 'beep'
// generated with an oscillator within the Web Audio context
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get live video stream from webcam
// AudioContext.createMediaStreamDestination -> to create a stream with audio out of a Web AudioContext
// Stream.getAudioTracks -> to get only the audio tracks from a stream
// Stream.addTrack -> to add a track to an existing stream
// AudioContext.createOscillator -> create node that generates a beep
// AudioContext.createMediaStreamDestination -> create node that exposes stream property
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

