window.addEventListener('load', function() {
  var videoElement = document.querySelector('video');
  var fragments = document.getElementById('fragments');

  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(function (stream) {
    startRecording(stream);
  }).catch(function (err) {
    console.error(err);
  });

  function startRecording(stream) {

    videoElement.src = URL.createObjectURL(stream);
    videoElement.play();

    recordLoop(stream);

  }

  function recordLoop(stream) {

    recordClip(stream, function() {
      setTimeout(function() {
        console.log('and go');
        recordLoop(stream);
      }, 1);
    });

  }

  function recordClip(stream, doneCallback) {
    var recorder = new MediaRecorder(stream,  {
      type: 'video/mp4'
    });
    recorder.start();
    setTimeout(function() {
      recorder.stop();
      recorder.ondataavailable = function (evt) {
        console.log('data', evt);
        var videoURL = URL.createObjectURL(evt.data);
        addVideo(videoURL);
        doneCallback();
      };
    }, 1000);
  }

  function addVideo(src) {
    var el = document.createElement('video');
    el.controls = true;
    el.src = src;
    fragments.appendChild(el);

    var videos = fragments.querySelectorAll('video');
    if(videos.length > 20) {
      // remove the oldest
      var first = videos[0];
      first.parentNode.removeChild(first);
    }

    // Important: wait until data is ready or else
    // the browser will complain about a broken format
    el.onloadeddata = function() {
      el.play();
      // Loop seems to be broken (?)
      el.setAttribute('loop', true);
    };
  }
});
