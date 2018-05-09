'use strict';

var result = {
  capture: null
};

// Grab a frame from the video player.
var video = document.querySelector('video.html5-main-video');
if (video) {
  var capture = captureVideoFrame(video);
  if (capture) {
    result.capture = capture.blob;
  }
}

// This is the data returned to the background script.
result; // jshint ignore:line

// Capture a frame from an HTML5 video.
// https://github.com/ilkkao/capture-video-frame
function captureVideoFrame(video, format, quality) {
  if (typeof video === 'string') {
      video = document.getElementById(video);
  }

  format = format || 'jpeg';
  quality = quality || 0.92;

  if (!video || (format !== 'png' && format !== 'jpeg')) {
      return false;
  }

  var canvas = document.createElement("CANVAS");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  canvas.getContext('2d').drawImage(video, 0, 0);

  var dataUri = canvas.toDataURL('image/' + format, quality);
  var data = dataUri.split(',')[1];
  var mimeType = dataUri.split(';')[0].slice(5);

  var bytes = window.atob(data);
  var buf = new ArrayBuffer(bytes.length);
  var arr = new Uint8Array(buf);

  for (var i = 0; i < bytes.length; i++) {
      arr[i] = bytes.charCodeAt(i);
  }

  var blob = new Blob([ arr ], { type: mimeType });
  return { blob: blob, dataUri: dataUri, format: format };
}
