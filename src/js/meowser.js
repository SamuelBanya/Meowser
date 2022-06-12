document.addEventListener("DOMContentLoaded", () => {
    // Grab cat breeds from 'db.json':
    displayWikiCatBreeds();


    let catImagesButton = document.querySelector("#catImagesButton");

    catImagesButton.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("'catImagesButton' button clicked!");

        let breedSelectTag = document.querySelector("#breed-select");
        let breedLink = breedSelectTag.options[breedSelectTag.selectedIndex].value;
        breedLink = breedLink.toString().replace(/\s/g, '');
        console.log(`breedLink: ${breedLink}`);
        console.log(breedLink);
        // Place stored image link into 'resultImage' image in 'rightResultsMenu' section:
        let resultImage = document.querySelector("#resultImage");

        // resultImage.src =
    })

    let catWikiButton = document.querySelector("#catWikiButton");

    catWikiButton.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("'catWikiButton' button clicked!");

        let breedSelectTag = document.querySelector("#breed-select");
        let breedLink = breedSelectTag.options[breedSelectTag.selectedIndex].value;
        breedLink = breedLink.toString().replace(/\s/g, '');
        console.log(`breedLink: ${breedLink}`);
        console.log(breedLink);
        // Make API call to 'MediaWiki' REST API using 'breedLink'
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
                optionTag.value = catBreed["wikiArticleLink"];
                optionTag.textContent = catBreed["name"];
                breedSelectTag.append(optionTag);
            })
            console.log("name: ", data["name"]);
        })
}
