document.addEventListener("DOMContentLoaded", () => {
    // Grab cat breeds from 'db.json':
    displayWikiCatBreeds();
    let catWikiButton = document.querySelector("#catWikiButton");
    catWikiButton.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("'catWikiButton' button clicked!");

        let breedSelectTag = document.querySelector("#breed-select");
        // Used this reference to be able to drill down into 'select' tag's value:
        // https://www.javascripttutorial.net/javascript-dom/javascript-select-box/
        let breedValue = breedSelectTag.options[breedSelectTag.selectedIndex].value;
        // Used this example as a basis on how to use .replace() to rip out
        // spaces:
        // https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
        breedValue = breedValue.toString().replace(/\s/g, '');
        console.log(`breedValue: ${breedValue}`);
        console.log(breedValue);
        // Make API call to https://cataas.com/ website with this format:
        // https://cataas.com/cat/<tag>
        // More specifically to include 'phraseInputValue':
        // https://cataas.com/cat/tabby/says/phraseInputValue
        // fetch(`https://cataas.com/cat/${breedValue}/${phraseInputValue}`)
        fetch(`https://cataas.com/cat/${breedValue}`)
            .then(response => {
                console.log(response);
                response.json();
            })
            .then(data => {
                console.log(`data: ${data}`);
            })
        // https://cataas.com/cat/Tabby
    })
});

function displayWikiCatBreeds() {
    fetch("http://localhost:3000/breeds")
        .then(response => response.json())
        .then(data => {
            let breedSelectTag = document.querySelector("#breed-select");
            breedSelectTag.innerHTML = "";
            console.log("data: ", data);
            data.forEach((catBreed) => {
                console.log(`name: ${catBreed["name"]}`);
                let optionTag = document.createElement("option");
                optionTag.value = catBreed["name"];
                optionTag.textContent = catBreed["name"];
                breedSelectTag.append(optionTag);
            })
            console.log("name: ", data["name"]);
        })
}
