// This example downloads a file blob.
//
// The trick is to create an invisible <a> element, with the blob as source,
// and force a click event on it.
//
// The relevant functions in use are:
//
// Blob constructor -> to build a blob from a text string
// URL.createObjectURL -> to create a URL from a stream so we can use it as src
// document.createElement -> to create a link tag on the fly

var MESSAGES = [
    "Winter is coming.",
    "All your base are belong to us.",
    "Program testing can be used to show the presence of bugs, but never to show their absence.",
    "Never gonna give you up, never gonna let you down~",
    "42."
];

window.onload = function () {
    var button = document.getElementById('download');

    button.addEventListener('click', function (evt) {
        evt.preventDefault();
        download();
    });
};


function download() {
    // get a random text blob
    var blob = getTextBlob();

    // this will create a link tag on the fly
    // <a href="..." download>
    var link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', 'cookie.txt');

    // NOTE: We need to add temporarily the link to the DOM so
    //       we can trigger a 'click' on it.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getTextBlob() {
    var text = MESSAGES[randomInt(0, MESSAGES.length)];

    // build a text blob with plain text mimetype
    return new Blob([text], { type: 'text/plain' });
}

// returns a random int between min (inclusive) and max (exclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
