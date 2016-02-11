// This example renders a video stream from the user's webcam into a canvas
// element, and then applies a filter to it.
//
// The relevant functions used are:
//
// navigator.mediaDevices.getUserMedia -> to get a video stream from the webcam
// requestAnimationFrame -> to create a render loop (better than setTimeout)
// CanvasRenderingContext2D.drawImage -> to draw the video stream
// CanvasRenderingContext2D.getImageData -> to read the canvas pixels
// CanvasRenderingContext2D.putImageData -> to write the canvas pixels

var cutOff = 128;

window.onload = function () {
  // get video stream from user's webcam
  navigator.mediaDevices.getUserMedia({
    video: true
  })
  .then(function (stream) {
    // We'll use an input element to modify the cutOff variable
    // (used as parameter for the image filter we apply later)
    var cutOffInput = document.getElementById('cutoff');
    cutOffInput.addEventListener('input', function(e) {
      cutOff = Math.round(cutOffInput.value);
    });

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

  // NOTE: In order to make the example simpler, we have opted to use a 2D
  // context. In a real application, you should use WebGL shaders to 
  // manipulate pixels, since it will be way faster.
  // You can see an example of this in Boo! https://github.com/mozdevs/boo
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

    // apply an image filter to the context
    applyFilter(context, width, height);
  };

  // Start the animation loop
  requestAnimationFrame(draw);
}

function applyFilter(context, width, height) {
  // read pixels
  var imageData = context.getImageData(0, 0, width, height);
  var data = imageData.data; // data is an array of pixels in RGBA

  // modify pixels applying a simple effect
  for (var i = 0; i < data.length; i+=4) {
    data[i] = data[i] >= cutOff ? 255 : 0; // red
    data[i + 1] = data[i + 1] >= cutOff ? 255 : 0; // green
    data[i + 2] = data[i + 2] >= cutOff ? 255 : 0; // blue
    // note: i+3 is the alpha channel, we are skipping that one
  }

  // render pixels back
  context.putImageData(imageData, 0, 0);
}
