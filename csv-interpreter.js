const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);

console.log(found);

myForm.addEventListener("submit", function (e) {

    //Prevent page refresh on submission
    e.preventDefault();

    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result; // the CSV content as string
        const chosen = text.findIndex(element => element == 2);
        document.write(chosen);
    };

    //Read file
    reader.readAsText(input);
});