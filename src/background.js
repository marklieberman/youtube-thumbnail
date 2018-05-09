'use strict';

browser.pageAction.onClicked.addListener(tab => {
  // Execute the script to capture a frame.
  browser.tabs.executeScript(tab.id, {
    file: 'capture.js'
  }).then(data => {
    if (data.length && data[0].capture) {
      return blobToArrayBuffer(data[0].capture).then(buffer => {
        // Put the image buffer on the clipboard.
        browser.clipboard.setImageData(buffer, 'jpeg').then(() => {
          console.log('image copied to clipboard');
          flashIcon(tab.id, 'icons/film-blue.svg');
        });
      });
    }
  }).catch(error => {
    console.log('failed to capture frame', error);
    flashIcon(tab.id, 'icons/film-red.svg');
  });
});

// Convert a blob to an ArrayBuffer.
function blobToArrayBuffer (blob) {
  return new Promise((resolve, reject) => {
    var fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = () => {
      reject(fileReader.error);
    };
    fileReader.readAsArrayBuffer(blob);
  });
}

// Flash the pageAction icon.
function flashIcon (tabId, path) {
  browser.pageAction.setIcon({ tabId, path });
  window.setTimeout(() => {
    browser.pageAction.setIcon({
      tabId,
      path: 'icons/film-dark.svg'
    });
  }, 500);
}
