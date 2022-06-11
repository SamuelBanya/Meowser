// Adding 'dotenv' package to allow for securely accessing API keys:
// https://www.npmjs.com/package/dotenv
// require("dotenv").config();
const dotenv = require("dotenv").config();

console.log(`APIKEY: ${APIKEY}`);

document.addEventListener("DOMContentLoaded", () => {
    getFloridaResults();
})

let zipcodeSearchButton = document.getElementById("#zipcodeSearchButton");

zipcodeSearchField.addEventListener("click", (e) => {
    console.log(`e: ${e}`);
    console.log(`e: ${e.target}`);
})


function getFloridaResults() {
}
