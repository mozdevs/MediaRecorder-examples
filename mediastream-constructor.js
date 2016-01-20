// This example uses MediaDevices.getUserMedia to get an audio and video stream,
// then we create a new stream using the MediaStream constructor, extract the tracks
// from the original stream, add them to the new stream we created and finally display 
// it in a video element
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get live audio + video stream from webcam
// MediaStream.getTracks(), MediaStream.addTrack() -> to get and add tracks from/to a stream
// MediaStream() constructor -> to create a new stream
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

    // Create a new stream
    var newStream = new MediaStream();

    // If we display this stream right now, it will have nothing to show
    // We need to add some tracks, which we'll take from the initial stream
    var tracks = stream.getTracks();
    tracks.forEach(function(t) {
      newStream.addTrack(t);
    });

    // Finally we create a URL to display this newStream we created
    video.src = URL.createObjectURL(newStream);
    video.play();
  });
  
};


