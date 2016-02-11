// This example gets a video stream from a canvas and renders it in a video
// element.
//
// The relevant functions in use are:
//
// requestAnimationFrame -> to create a render loop (better than setTimeout)
// canvas.captureStream -> to get a stream from a canvas
// URL.createObjectURL -> to create a URL from a stream so we can use it as src

window.onload = function () {
  var canvas = document.getElementById('canvas');
  var video = document.getElementById('video');

  var width = canvas.width;
  var height = canvas.height;
  video.width = width;
  video.height = height;

  // we need to get the context first before trying to get a canvas stream
  var ctx = canvas.getContext('2d');

  // pipe a canvas stream into a video element
  pipeCanvasIntoVideo(canvas, video);

  // This will render a rectangle that will fade from black to bright red and
  // then cycle back
  var red = 0;
  var inc = 1;
  var draw = function () {
    requestAnimationFrame(draw); // create a render loop

    // cycle between 0..255 and reverse
    red += inc * 2;
    if (red < 0) {
      red = 0;
      inc = 1;
    }
    else if (red > 255) {
      red = 255;
      inc = -1;
    }

    // draw a red rectangle covering the full canvas
    ctx.fillStyle = 'rgb(' + red + ', 0, 0)';
    ctx.fillRect(0, 0, width, height);
  };

  draw();
};

function pipeCanvasIntoVideo(canvas, video) {
  var stream = canvas.captureStream(15); // build a 15 fps stream
  video.src = URL.createObjectURL(stream);
  video.play();
}
