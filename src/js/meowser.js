document.addEventListener("DOMContentLoaded", () => {
    // Grab cat breeds from 'db.json':
    displayWikiCatBreeds();


    let catImagesButton = document.querySelector("#catImagesButton");

    catImagesButton.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("'catImagesButton' button clicked!");

        let breedSelectTag = document.querySelector("#breed-select");
        let breedLink = breedSelectTag.options[breedSelectTag.selectedIndex].value;
        let breedName = breedSelectTag.options[breedSelectTag.selectedIndex].textContent;
        breedName = breedLink.toString().replace(/\s/g, '');
        console.log(`breedLink: ${breedLink}`);
        console.log(breedLink);
        console.log(`breedName: ${breedName}`);
        console.log(breedName);

        // Call the 'MediaWiki' with the 'breedLink' you obtained:
        var apiParams = {
            action: "query",
            prop: "images",
            titles: `${breedName}`,
            format: "json"
        };

        let apiURL = breedLink + "?origin=*";

        Object.keys(apiParams).forEach(function(key){apiURL += "&" + key + "=" + apiParams[key];});

        // Call the 'MediaWiki' with the 'breedLink' you obtained:
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                var pages = data.query.pages;

                console.log("pages:");
                console.log(pages);
            })

        // If no images are found, then default to using the stored image link in 'db.json' by placing it
        // into 'resultImage' image in 'rightResultsMenu' section:
        // let resultImage = document.querySelector("#resultImage");
    })

    let catWikiButton = document.querySelector("#catWikiButton");

    catWikiButton.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("'catWikiButton' button clicked!");

        let breedSelectTag = document.querySelector("#breed-select");
        let breedLink = breedSelectTag.options[breedSelectTag.selectedIndex].value;
        let breedName = breedSelectTag.options[breedSelectTag.selectedIndex].textContent;
        breedName = breedLink.toString().replace(/\s/g, '');
        console.log(`breedLink: ${breedLink}`);
        console.log(breedLink);
        console.log(`breedName: ${breedName}`);
        console.log(breedName);
        // Make API call to 'MediaWiki' REST API using 'breedLink'
        fetch(`https://cataas.com/cat/${breedValue}`)
            .then(response => {
                console.log(response);
                response.json();
            })
            .then(data => {
                console.log(`data: ${data}`);
            })
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
