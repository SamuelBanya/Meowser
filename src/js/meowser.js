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
    breedLink = breedLink.toString().replace(/\s/g, '');
    console.log(`breedLink: ${breedLink}`);
    console.log(breedLink);
    console.log(`breedName: ${breedName}`);
    console.log(breedName);

    console.log("breedLink: ", breedLink);
    console.log(`typeof(breedLink): ${typeof(breedLink)}`);
    let splitBreedName = breedLink.toString().replace("https://en.wikipedia.org/wiki/", " ");
    console.log("splitBreedName: ", splitBreedName);

    let wikiURL = "https://en.wikipedia.org/w/api.php";

    // Call the 'MediaWiki' with the 'breedLink' you obtained using this API endpoint:
    // https://github.com/wikimedia/mediawiki-api-demos/blob/master/javascript/get_page_images.js
    var apiParams = {
      action: "query",
      prop: "images",
      titles: `${splitBreedName}`,
      format: "json"
    };

    let apiURL = wikiURL + "?origin=*";

    Object.keys(apiParams).forEach(function(key){apiURL += "&" + key + "=" + apiParams[key];});

    console.log(`apiURL: ${apiURL}`);

    fetch(apiURL, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        let imagesObj = data.query.pages;
        console.log("imagesObj:");
        console.log(imagesObj);

        let imageObjArray;

        for (let imageObj in imagesObj) {
          console.log("imageObj: ");
          console.log(imageObj);
          imageObjArray = imagesObj[imageObj]["images"];
          console.log("imageObjArray (inside for loop): ");
          console.log(imageObjArray);
        }

        console.log("imageObjArray (outside of for loop): ");
        console.log(imageObjArray);

        let imageTitleArray = [];

        imageObjArray.forEach ((imageObjEl) => {
          let imageTitle = imageObjEl["title"];
          // Desired format:
          // breedLink + '#/media/' + imageTitle
          imageTitle = imageTitle.toString();
          // Replace space with '_' instead:
          imageTitle = imageTitle.replace(/ /g, "_");
          console.log("imageTitle: ");
          console.log(imageTitle);
          imageTitleArray.push(imageTitle);
        });

        console.log("imageTitleArray:");
        console.log(imageTitleArray);

        return imageTitleArray;

      })
      .then((imageTitleArray) => {
        // console.log(`imageTitleArray: ${imageTitleArray}`);
        imageTitleArray.forEach((imageTitle) => {
          // TODO: Rip out 'File:' sections with String.prototype.replace():
          imageTitle = imageTitle.toString().replace("File:", "");
          console.log(`Converted imageTitle: ${imageTitle}`);
          // Now, use this API endpoint example to obtain the images we need:
          // https://github.com/wikimedia/mediawiki-api-demos/blob/master/javascript/get_allimages_by_name.js

          // TODO: Read on API docs how to further configure the 'aifrom' parameter properly as its only
          // doing a fuzzy search
          // https://www.mediawiki.org/wiki/API:Main_page
          var apiParams = {
            action: "query",
            format: "json",
            list: "allimages",
            aifrom: `${imageTitle}`,
            ailimit: "3"
          };

          let wikiURL = "https://en.wikipedia.org/w/api.php";
          let apiURL = wikiURL + "?origin=*";

          Object.keys(apiParams).forEach(function(key){apiURL += "&" + key + "=" + apiParams[key];});

          console.log(`apiURL: ${apiURL}`);

          fetch(apiURL)
            .then(response => response.json())
            .then(response => {
              console.log("_______________________");
              console.log("Testing Second API Call");
              console.log("_______________________");
              console.log(`response: ${response}`);
              console.log(response);

              // TODO:
              // We need to index into the response:
              // End goal:
              // Sample output:
              // url: "https://upload.wikimedia.org/wikipedia/en/2/24/AbylaiKhanUniversity.png"

              // let resultObjArray = [];
              // resultObjArray.push(response["query"]["allimages"]);

              let images = response.query.allimages;
              for (let img in images) {
                console.log(images[img].title);
              }
            });
        });
      });
  });

  let catWikiButton = document.querySelector("#catWikiButton");

  catWikiButton.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("'catWikiButton' button clicked!");

    let breedSelectTag = document.querySelector("#breedSelect");
    console.log(`breedSelectTag: ${breedSelectTag}`);
    console.log(breedSelectTag);
    let breedLink = breedSelectTag.options[breedSelectTag.selectedIndex].value;
    let breedName = breedSelectTag.options[breedSelectTag.selectedIndex].textContent;
    breedLink = breedLink.toString().replace(/\s/g, '');
    console.log(`breedLink: ${breedLink}`);
    console.log(breedLink);
    console.log(`breedName: ${breedName}`);
    console.log(breedName);

    // Set the contents of 'resultsHeader' and 'resultsParagraph' to a blank string on each run:
    let resultsHeader = document.querySelector("#resultsHeader");
    let resultsParagraph = document.querySelector("#resultsParagraph");

    // Clear out 'resultsHeader' and 'resultsParagraph' if present on page:
    if (resultsHeader) {
      resultsHeader.innerHTML = "";
    }

    if (resultsParagraph) {
      resultsParagraph.innerHTML = "";
    }

    // Place wikipedia article contents into <iframe> within 'resultsParagraph' location
    let wikipediaIFrame = document.createElement("iframe");
    wikipediaIFrame.src = breedLink;
    wikipediaIFrame.id = "wikipediaIFrame";
    console.log(`wikipediaIFrame: ${wikipediaIFrame}`);
    console.log(wikipediaIFrame);
    resultsParagraph.append(wikipediaIFrame);
  });

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

        // Clear out Wikipedia iframe if present on page:
        let wikipediaIFrame = document.querySelector("#wikipediaIFrame");
        if (wikipediaIFrame) {
          wikipediaIFrame.innerHTML = "";
        }

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
        optionTag.value = catBreed["link"];
        optionTag.textContent = catBreed["name"];
        breedSelectTag.append(optionTag);
      });
      console.log("name: ", data["name"]);
    });
}
