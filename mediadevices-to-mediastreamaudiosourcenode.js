// This example uses MediaDevices.getUserMedia to get an audio stream,
// and then bring it into a Web Audio context using a MediaStreamSourceNode
//
// The relevant functions in use are:
//
// navigator.mediaDevices.getUserMedia -> to get live audio stream from webcam
// AudioContext.createMediaStreamSource -> to create a node that takes a MediaStream as input and outputs its audio data

window.onload = function () {

  // request audio stream from the user's webcam
  navigator.mediaDevices.getUserMedia({
    audio: true
  })
  .then(function (stream) {
    var audioContext = new AudioContext();
	var mediaStreamNode = audioContext.createMediaStreamSource(stream);
	mediaStreamNode.connect(audioContext.destination);
  });
  
};

