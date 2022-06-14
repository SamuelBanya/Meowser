document.addEventListener("DOMContentLoaded", () => {
    // Grab cat breeds from 'db.json':
    displayWikiCatBreeds();

    let catImagesButton = document.querySelector("#catImagesButton");

    catImagesButton.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("'catImagesButton' button clicked!");

        let breedSelectTag = document.querySelector("#breedSelect");
        console.log(`breedSelectTag: ${breedSelectTag}`);
        console.log(breedSelectTag);
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

        console.log(`apiURL: ${apiURL}`);

        fetch(apiURL, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "mode": "no-cors"
            },
        })
            .then(response => response.json())
            .then(data => {
                var pages = data.query.pages;

                console.log("pages:");
                console.log(pages);
            });

        // If no images are found, then default to using the stored image link in 'db.json' by placing it
        // into 'resultImage' image in 'rightResultsMenu' section:
        // let resultImage = document.querySelector("#resultImage");
    })

    let catWikiButton = document.querySelector("#catWikiButton");

    catWikiButton.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("'catWikiButton' button clicked!");

        let breedSelectTag = document.querySelector("#breedSelect");
        let breedLink = breedSelectTag.options[breedSelectTag.selectedIndex].value;
        let breedName = breedSelectTag.options[breedSelectTag.selectedIndex].textContent;
        breedName = breedLink.toString().replace(/\s/g, '');
        console.log(`breedLink: ${breedLink}`);
        console.log(breedLink);
        console.log(`breedName: ${breedName}`);
        console.log(breedName);
        // Make API call to 'MediaWiki' REST API using 'breedLink'
        fetch(`https://cataas.com/cat/${breedName}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => {
                console.log(response);
                response.json();
            })
            .then(data => {
                console.log(`data: ${data}`);
            })
    })

    let catFactButton = document.querySelector("#catFactButton");

    catFactButton.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("'catFactButton' button clicked!");
        fetch("https://cat-fact.herokuapp.com/facts")
            .then(response => response.json())
            .then(data => {
                // console.log("data: ");
                // Pick a random fact using Math.random() with 4 numbers for 5 index values from 0 to 4:
                let choiceMax = data.length - 1;
                console.log(`choiceMax: ${choiceMax}`);

                let choiceMin = 0;
                // From MDN Docs:
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

                let choiceNumber = Math.floor(Math.random() * (choiceMax - choiceMin) + choiceMin);
                console.log("choiceNumber: ");
                console.log(choiceNumber);

                let randomChoice = data[choiceNumber];
                console.log("randomChoice: ");
                console.log(randomChoice);

                let resultsCatFactHeader = document.querySelector("#resultsCatFactHeader")
                console.log("resultsCatFactHeader: ");
                console.log(resultsCatFactHeader);
                resultsCatFactHeader.textContent = "Random Cat Fact: ";

                let resultsCatFactParagraph = document.querySelector("#resultsCatFactParagraph");
                resultsCatFactParagraph.textContent = randomChoice["text"];
            });
    });
});

function displayWikiCatBreeds() {
    fetch("http://localhost:3000/breeds")
        .then(response => response.json())
        .then(data => {
            let breedSelectTag = document.querySelector("#breedSelect");
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
