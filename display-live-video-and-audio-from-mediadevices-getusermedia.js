// This example uses MediaDevices.getUserMedia to get an audio and video stream,
// and then displays it in a video element
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get live audio + video stream from webcam
// URL.createObjectURL -> to create a URL for the stream, which we can use as src for the video

window.onload = function () {

  // request video and audio stream from the user's webcam
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
  .then(function (stream) {
    var video = document.createElement('video');
    var main = document.querySelector('main');
    main.appendChild(video);
    video.src = URL.createObjectURL(stream);
    video.play();
  });
  
};

