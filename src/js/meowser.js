document.addEventListener("DOMContentLoaded", () => {
  // Grab cat breeds from 'db.json':
  displayWikiCatBreeds();

  let catImageButton = document.querySelector("#catImageButton");

  catImageButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Clear out Wikipedia iframe if present on page:
    let wikipediaIFrame = document.querySelector("#wikipediaIFrame");
    clearElement(wikipediaIFrame);

    // Clear out 'resultsHeader' and 'resultsParagraph' if present on page:
    let resultsHeader = document.querySelector("#resultsHeader");
    let resultsParagraph = document.querySelector("#resultsParagraph");

    clearElement(resultsHeader);
    clearElement(resultsParagraph);

    let breedSelectTag = document.querySelector("#breedSelect");
    let breedName = breedSelectTag.options[breedSelectTag.selectedIndex].textContent;

    fetch("http://localhost:3000/breeds")
      .then(response => response.json())
      .then(data => {
        let filteredObject = data.filter(element => {
          return element.name == breedName;
        });

        let breedHeaderName = filteredObject[0]["name"];
        let filteredImageLink = filteredObject[0]["imageSrc"];

        let resultsHeader = document.querySelector("#resultsHeader");
        resultsHeader.textContent = breedHeaderName;

        let breakTag = document.createElement("br");

        let breedImage = document.createElement("img");
        breedImage.src = filteredImageLink;

        resultsHeader.append(breakTag);

        resultsHeader.append(breedImage);
      });
  });

  let catWikiButton = document.querySelector("#catWikiButton");

  catWikiButton.addEventListener("click", (e) => {
    e.preventDefault();

    let breedSelectTag = document.querySelector("#breedSelect");
    let breedLink = breedSelectTag.options[breedSelectTag.selectedIndex].value;
    let breedName = breedSelectTag.options[breedSelectTag.selectedIndex].textContent;
    breedLink = breedLink.toString().replace(/\s/g, '');

    // Clear out 'resultsHeader' and 'resultsParagraph' if present on page:
    let resultsHeader = document.querySelector("#resultsHeader");
    let resultsParagraph = document.querySelector("#resultsParagraph");

    clearElement(resultsHeader);
    clearElement(resultsParagraph);

    // Place wikipedia article contents into <iframe> within 'resultsParagraph' location
    let wikipediaIFrame = document.createElement("iframe");
    wikipediaIFrame.src = breedLink;
    wikipediaIFrame.id = "wikipediaIFrame";
    resultsParagraph.append(wikipediaIFrame);
  });

  let catFactButton = document.querySelector("#catFactButton");

  catFactButton.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("https://cat-fact.herokuapp.com/facts")
      .then(response => response.json())
      .then(data => {
        // Pick a random fact using Math.random() with 4 numbers for 5 index values from 0 to 4:
        let choiceMax = data.length - 1;

        let choiceMin = 0;
        // From MDN Docs:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

        let choiceNumber = Math.floor(Math.random() * (choiceMax - choiceMin) + choiceMin);

        let randomChoice = data[choiceNumber];

        // Clear out Wikipedia iframe if present on page:
        let wikipediaIFrame = document.querySelector("#wikipediaIFrame");
        clearElement(wikipediaIFrame);

        let resultsHeader = document.querySelector("#resultsHeader");
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
      data.forEach((catBreed) => {
        let optionTag = document.createElement("option");
        optionTag.value = catBreed["link"];
        optionTag.textContent = catBreed["name"];
        breedSelectTag.append(optionTag);
      });
    });
}

function clearElement(cssSelector) {
  if (cssSelector) {
    cssSelector.innerHTML = "";
  }
}
