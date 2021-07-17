var contestants = [];

function handleFiles(files) {
    // Check for the various File API support.
    if (window.FileReader) {
        // FileReader are supported.
    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function handleFiles(files) {
    if (window.FileReader) {
        getAsText(files[0]);
        fileUploaded = true;
    } else {
        alert('Not supported');
    }
}

function getAsText(fileToRead) {
    var reader = new FileReader();

    reader.readAsText(fileToRead); // Read file into memory
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);

    randomizeWinner();
    displayWinner();

    runAgain();
}

function processData(csv) {
    let allTextLines = csv.split(/\r\n|\n/);
    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var tarr = [];
        for (var j=0; j<data.length; j++) {
            tarr.push(data[j]);
        }
        contestants.push(tarr);
    }
}

function randomizeWinner() {
    let min = 0;
    let max = contestants.length;
    let winnerIndex = Math.floor(Math.random() * (max - min + 1) + min);

    currentWinner = contestants[winnerIndex];
}

function displayWinner() {
    let winnerBox = document.getElementById('winners-name');
    let infoBox = document.getElementById('winners-information');

    winnerBox.innerHTML += currentWinner;
}

function runAgain() {
    let button = document.getElementById('pickNext');
    button.addEventListener('click', function(e) {
        console.log('Clicked');
        loadHandler(event);
    });
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Cannot read file !");
    }
}