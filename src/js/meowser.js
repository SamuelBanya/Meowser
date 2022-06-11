document.addEventListener("DOMContentLoaded", () => {
    let phraseFormSubmit = document.querySelector("#phraseFormSubmit");
    phraseFormSubmit.addEventListener("click", (e) => {
        let phraseInputValue = document.querySelector("#phraseInput").value;
        console.log(`phraseInputValue: ${phraseInputValue}`);
    })
    displayWikiCatBreeds();
});

function displayWikiCatBreeds() {
    fetch("http://localhost:3000/breeds")
        .then(response => response.json())
        .then(data => {
            console.log("data: ", data);
            data.forEach((catBreed) => {
                console.log(`name: ${catBreed["name"]}`);
            })
            console.log("name: ", data["name"]);
        })
}
