document.addEventListener("DOMContentLoaded", () => {
  // Grab cat breeds from 'db.json':
  displayWikiCatBreeds();

  let catImageButton = document.querySelector("#catImageButton");

  catImageButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("e.target: ");
    console.log(e.target);

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
    console.log("breedName: ");
    console.log(breedName);

    fetch("http://localhost:3000/breeds")
      .then(response => response.json())
      .then(data => {
        console.log("data: ");
        console.log(data);
        let filteredImage = data.filter(element => {
          return element.name == breedName;
        });

        filteredImage = filteredImage[0]["imageSrc"];

        console.log("filteredImage:");
        console.log(filteredImage);

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

    // Clear out 'resultsHeader' and 'resultsParagraph' if present on page:
    let resultsHeader = document.querySelector("#resultsHeader");
    let resultsParagraph = document.querySelector("#resultsParagraph");

    clearElement(resultsHeader);
    clearElement(resultsParagraph);

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
        clearElement(wikipediaIFrame);

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
        optionTag.id = catBreed["imageSrc"];
        optionTag.textContent = catBreed["name"];
        breedSelectTag.append(optionTag);
      });
      console.log("name: ", data["name"]);
    });
}

function clearElement(cssSelector) {
  if (cssSelector) {
    cssSelector.innerHTML = "";
  }
}
