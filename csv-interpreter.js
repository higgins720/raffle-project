//Input Elements
const uploadCSV = document.getElementById("uploadCSV");
const csvFile = document.getElementById("csvFile");
const nameInput = document.getElementById('addNames');
const names = document.getElementById('names');

//Output Elements
const contestantBox = document.getElementById("contestantBox");
const winnerList = document.getElementById("winnerList");
const winnersInfo = document.getElementById('winnersInfo');
const winnerBox = document.getElementById('winnerBox');

// Buttons
const pickWinnerBtn = document.getElementById('pickWinner');
pickWinnerBtn.disabled = true;
const refreshBtn = document.getElementById('refresh');
refreshBtn.disabled = true;
const submitBtns = document.getElementsByClassName('submit-button');
submitBtns.disabled = true;

//Arrays
const contestants = [];
const winners = [];

window.onload = function () {
    console.log('Ready');
}

//Add Contestants Form
nameInput.addEventListener("submit", function (e) {
    e.preventDefault();
    if (names.value == '') {
        alert('Nothing added');
    } else {
        processNameInput(names.value);
        showContestants();
        pickWinnerBtn.disabled = false;
    }
});

function processNameInput(value) {
    let vSplit = value.split(',');
    for (let i = 0; i < vSplit.length; i++) {
        contestants.push(vSplit[i]);
    }
}

// Submit CSV
uploadCSV.addEventListener("submit", function (e) {
    e.preventDefault();
    if (csvFile.value == '') {
        alert('Nothing added');
    } else {
        let input = csvFile.files[0];
        let reader = new FileReader();
        reader.onload = function (event) {
            var csvString = event.target.result; // CSV content as string
            processData(csvString);
            contestantBox.innerHTML = (contestants);
            pickWinnerBtn.disabled = false;
        }
        reader.readAsText(input); //Read csv file
    };
});

// Process Data
function processData(csvString) {
    let allTextLines = csvString.split(/\r\n|\n/);

    for (let i = 0; i < allTextLines.length; i++) {
        var row = allTextLines[i].split(';');
        var tarr = [];
        for (var j = 0; j < row.length; j++) {
            tarr.push(row[j]);
        }
        contestants.push(tarr);
    }
}

//Pick Winner Button
pickWinner.addEventListener('click', function () {

    let number = Math.floor(Math.random() * contestants.length);

    let winner = contestants[number];
    let index = contestants.indexOf(winner);
    contestants.splice(index, 1);
    contestantBox.innerHTML = contestants;

    winners.push(winner);
    winnerBox.innerHTML = winner;
    winnerList.innerHTML = winners;

    checkFinished();
});

//Refresh Button
refreshBtn.addEventListener('click', function () {
    location.reload();
    return false;
});

function checkFinished() {
    if (contestants.length === 0) {
        pickWinnerBtn.disabled = true;
        refreshBtn.disabled = false;
        return;
    }
}

function showContestants() {
    if (contestants.length > 0) {
        contestantBox.innerHTML = contestants;
        return;
    }
}