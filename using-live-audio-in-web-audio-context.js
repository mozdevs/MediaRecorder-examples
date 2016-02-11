// This example uses MediaDevices.getUserMedia to get a live audio stream,
// and then bring it into a Web Audio context using a MediaStreamSourceNode
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get live audio stream from webcam
// AudioContext.createMediaStreamSource -> to create a node that takes a MediaStream
// as input and works as source of sound inside the audio graph

window.onload = function () {

  // request audio stream from the user's webcam
  navigator.mediaDevices.getUserMedia({
    audio: true
  })
  .then(function (stream) {
    var audioContext = new AudioContext();
    var mediaStreamNode = audioContext.createMediaStreamSource(stream);
    mediaStreamNode.connect(audioContext.destination);

    // This is a temporary workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=934512
    // where the stream is collected too soon by the Garbage Collector
    window.doNotCollectThis = stream;
  });
  
};

