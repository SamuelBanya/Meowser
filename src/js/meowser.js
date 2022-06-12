document.addEventListener("DOMContentLoaded", () => {
    // Grab cat breeds from 'db.json':
    displayWikiCatBreeds();
    let phraseFormSubmit = document.querySelector("#phraseFormSubmit");
    phraseFormSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        let phraseInputValue = document.querySelector("#phraseInput").value;
        console.log(`phraseInputValue: ${phraseInputValue}`);

        let breedSelectTag = document.querySelector("#breed-select");
        let breedValue = breedSelectTag.options[breedSelectTag.selectedIndex].value;
        breedValue = breedValue.toString().replace(/\s/g, '');
        console.log(`breedValue: ${breedValue}`);
        console.log(breedValue);
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
