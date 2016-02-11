// This example renders a video stream from the user's webcam into a canvas
// element.
//
// The relevant functions used are:
//
// navigator.mediaDevices.getUserMedia -> to get a video stream from the webcam
// requestAnimationFrame -> to create a render loop (better than setTimeout)
// CanvasRenderingContext2D.drawImage -> to draw the video stream


window.onload = function () {
  // get video stream from user's webcam
  navigator.mediaDevices.getUserMedia({
    video: true
  })
  .then(function (stream) {

    // We need to create a video element and pipe the stream into it so we
    // can know when we have data in the stream, and its width/height.
    // Note that this video doesn't need to be attached to the DOM for this
    // to work.
    var video = document.createElement('video');
    video.src = URL.createObjectURL(stream);
    video.addEventListener('loadedmetadata', function () {
      initCanvas(video);
    });
    // we need to play the video to trigger the loadedmetadata event
    video.play();
  });
};

function initCanvas(video) {
  var width = video.videoWidth;
  var height = video.videoHeight;

  var canvas = document.getElementById('video');
  canvas.width = width;
  canvas.height = height;

  // use requestAnimationFrame to render the video as often as possible
  var context = canvas.getContext('2d');
  var draw = function () {
    // schedule next call to this function
    requestAnimationFrame(draw);

    // draw video data into the canvas
    context.drawImage(video, 0, 0, width, height);
  };

  // Start the animation loop
  requestAnimationFrame(draw);
}

