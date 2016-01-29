// This example gets a video stream from a canvas on which we will draw
// black and white noise, and captures it to a video
//
// The relevant functions in use are:
//
// requestAnimationFrame -> to create a render loop (better than setTimeout)
// canvas.captureStream -> to get a stream from a canvas
// context.getImageData -> to get access to the canvas pixels
// URL.createObjectURL -> to create a URL from a stream so we can use it as src

window.onload = function () {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var width = canvas.width;
  var height = canvas.height;
  var capturing = false;

  video.width = width;
  video.height = height;

  // We need the 2D context to individually manipulate pixel data
  var ctx = canvas.getContext('2d');

  // Start with a black background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  
  // Since we're continuously accessing and overwriting the pixels
  // object, we'll request it once and reuse it across calls to draw()
  // for best performance (we don't need to create ImageData objects
  // on every frame)
  var pixels = ctx.getImageData(0, 0, width, height);
  var data = pixels.data;
  var numPixels = data.length;

  var stream = canvas.captureStream(15);
  var recorder = new MediaRecorder(stream);

  recorder.addEventListener('dataavailable', finishCapturing);
  recorder.addEventListener('start', startCapturing);

  recorder.start();

  setTimeout(function() {
    recorder.stop();
  }, 2000);


  function startCapturing() {
    capturing = true;
    draw();
  }


  function finishCapturing(e) {
    capturing = false;
    var videoData = [ e.data ];
    var blob = new Blob(videoData, { 'type': 'video/webm' });
    var videoURL = URL.createObjectURL(blob);
    video.src = videoURL;
  }


  function draw() {
    // We don't want to render again if we're not capturing
    if(capturing) {
      requestAnimationFrame(draw);
    }
    drawWhiteNoise();
  }


  function drawWhiteNoise() {
    var offset = 0;

    for(var i = 0; i < numPixels; i++) {
      var grey = Math.round(Math.random() * 255);
      
      // The data array has pixel values in RGBA order
      // (Red, Green, Blue and Alpha for transparency)
      // We will make R, G and B have the same value ('grey'),
      // then skip the Alpha value by increasing the offset,
      // as we're happy with the opaque value we set when painting
      // the background black at the beginning
      data[offset++] = grey;
      data[offset++] = grey;
      data[offset++] = grey;
      offset++;
    }

    // And tell the context to draw the updated pixels in the canvas
    ctx.putImageData(pixels, 0, 0);
  }

};

