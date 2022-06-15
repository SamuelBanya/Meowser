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

    console.log("breedLink: ", breedLink);
    console.log(`typeof(breedLink): ${typeof(breedLink)}`);
    let splitBreedName = breedLink.toString().replace("https://en.wikipedia.org/wiki/", " ");
    console.log("splitBreedName: ", splitBreedName);

    let wikiURL = "https://en.wikipedia.org/w/api.php";

    // Call the 'MediaWiki' with the 'breedLink' you obtained:
    var apiParams = {
      action: "query",
      prop: "images",
      titles: `${splitBreedName}`,
      format: "json"
    };

    // https://en.wikipedia.org/wiki/Abyssinian_cat
    // let splitURL = breedLink.split("https://en.wikipedia.org/wiki/");
    // console.log("splitURL: ", splitURL);
    // This link works in browser:
    // https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=images&titles=Abyssinian_cat&format=json

    let apiURL = wikiURL + "?origin=*";

    // Separate out the URL so that it cuts off the 'https://en.wikipedia.org/wiki/' section:
    // Ex:
    // https://en.wikipedia.org/wiki/Abyssinian_cat
    // URL that actually works:
    // https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=images&titles=Abyssinian_cat&format=json

    Object.keys(apiParams).forEach(function(key){apiURL += "&" + key + "=" + apiParams[key];});

    console.log(`apiURL: ${apiURL}`);

    fetch(apiURL, {
      method: "GET"
      /*
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
      */
    })
      .then(response => response.json())
      .then(data => {
        var imagesObj = data.query.pages;
        console.log("imagesObj:");
        console.log(imagesObj);


      });

    // If no images are found, then default to using the stored image link in 'db.json' by placing it
    // into 'resultImage' image in 'rightResultsMenu' section:
    // let resultImage = document.querySelector("#resultImage");

    // Display the images in a 'Fancybox' gallery using this pattern:
    // picture_img_tag = str('<a data-fancybox="gallery" href="' + str(regular_image_version) + '" data-fancybox="' + str(current_filename) + '" data-caption="' + str(current_filename) + '"><img src="' + str(thumb_image_version) + '"/></a>')
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
        // Set the contents of 'resultsHeader' and 'resultsParagraph' to a blank string on each run:
        let resultsHeader = document.querySelector("#resultsHeader");
        let resultsParagraph = document.querySelector("#resultsParagraph");
        // Place wikipedia article contents into <iframe> within 'resultsParagraph' location
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

        let resultsHeader = document.querySelector("#resultsHeader")
        console.log("resultsHeader: ");
        console.log(resultsHeader);
        resultsHeader.textContent = "Random Cat Fact: ";

        let resultsParagraph = document.querySelector("#resultsParagraph");
        resultsParagraph.textContent = randomChoice["text"];
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
