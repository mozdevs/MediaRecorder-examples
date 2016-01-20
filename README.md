# MediaRecorder

This is a collection of [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder_API) examples.

You can take a look at the [examples online](http://mozdevs.github.io/MediaRecorder-examples).

## Requirements

### Hardware requirements

- A working webcam
- Speakers or audio output

### Software requirements

- **Firefox 45**. This is a Firefox technical demo. So it might not work on your browser, if it doesn't implement what we're demoing. At the time of writing (December 2015), you need to download [Firefox Nightly](https://nightly.mozilla.org).
- Support for `canvas.captureStream` (this lets us get a video stream out of a canvas tag)
- Support for `MediaRecorder` (this lets us encode a video file natively in the browser, without using additional JS libraries)

Note: `MediaRecorder` is an upcoming API part of the [W3C MediaCapture](https://w3c.github.io/mediacapture-record/MediaRecorder.html) standard. `canvas.captureStream` is based on [another part of the same W3C standard](https://w3c.github.io/mediacapture-fromelement/#widl-HTMLCanvasElement-captureStream-CanvasCaptureMediaStream-double-frameRate). There's nothing proprietary or exclusive to Firefox here, other than the fact that other browsers do not implement these features yet. Once they do, these examples will work in them too!

## How to run the examples

Just [download](https://github.com/mozdevs/mediarecorder/archive/gh-pages.zip) this repository and open `index.html` in your browser (see requirements above). It can't be easier!
