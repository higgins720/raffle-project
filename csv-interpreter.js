const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
const winnerBox = document.getElementById("winnerBox");
const winnerList = document.getElementById("winnerList");
const winnersInfo = document.getElementById('winnersInfo');

var contestants = [];
var winners = [];

myForm.addEventListener("submit", function (e) {

    e.preventDefault(); //Prevent page refresh on submission

    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        var csvString = event.target.result; // the CSV content as string
        //const chosen = text.findIndex(element => element == 2);
        processData(csvString);
        winnersInfo.innerHTML = (contestants);
    };

    reader.readAsText(input); //Read csv file
});

function processData(csvString) {
    let allTextLines = csvString.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var tarr = [];
        for (var j = 0; j < data.length; j++) {
            tarr.push(data[j]);
        }
        contestants.push(tarr);
    }
}

document.getElementById('pickNext').addEventListener('click', function randomSelector(max) {
    
    // Pick random number to choose contestant
    let select = Math.floor(Math.random() * contestants.length);
    let winner = contestants[select];

    // Post Winner
    winnerBox.innerHTML = winner;
    // Cut winner out of contestants array
    let index = contestants.indexOf(select);
    if (index > -1) {
      array.splice(index, 1);
    }
    winnersInfo.innerHTML = (contestants);
    // Paste winner into winners array
    winners.push(winner);
    winnerList.innerHTML = (winners);
});