// Global variables
var apiKey = "08cce16bdc354b6aa373715c0843bfc8";
var apiKeyYT = "AIzaSyBz2fXaCNuTho3B_k-OLJpoMlLzrnw7KfA";
var spoonaDiv = document.querySelector("#spoonacular-api");
var youTubeDiv = document.querySelector("#youtube-api");

// Add event listener when form submitted
document
  .querySelector("#recipe-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var searchInput = document.querySelector("#keyword").value;
    var diet = [];
    var cuisine = [];
    // Select all checked dietary and cuisine requirements
    var checkedDietary = document.querySelectorAll(
      "input[type='checkbox'][name='dietary']:checked"
    );
    var checkedCuisine = document.querySelectorAll(
      "input[type='checkbox'][name='cuisine']:checked"
    );
    // Dietary and cuisine requirements into 2 arrays
    checkedDietary.forEach(function (checkbox) {
      diet.push(checkbox.value);
    });
    checkedCuisine.forEach(function (checkbox) {
      cuisine.push(checkbox.value);
    });
    // Call fetch recipe function, diet and cuisine pass as parameters
    fetchRecipeId(searchInput, diet, cuisine, apiKey);
    displayYouTubeResults(searchInput, diet, cuisine, apiKeyYT);
  });

// Function to search by user input, diet and cuisine and get recipe ID
function fetchRecipeId(searchPar, dietPar, cuisinePar, apiKeyPar) {
  var queryUrl =
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
    searchPar +
    "&number=6&diet=" +
    dietPar +
    "&cuisine=" +
    cuisinePar +
    "&instructionsRequired=true&apiKey=" +
    apiKeyPar;
  var recipeId = [];
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.results) {
        // Loop through results and get all IDs in an array
        for (var i = 0; i < data.results.length; i++) {
          recipeId.push(data.results[i].id);
        }
        // Call display recipe function, pass recipe IDs as parameter
        displayRecipe(recipeId, apiKey);
        // If no results found, display an error
      } else {
        spoonaDiv.innerHTML = "No recipes found.";
      }
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
      spoonaDiv.innerHTML =
        "Error fetching recipes. Please try again later.";
    });
  return recipeId;
}

// Function to display recipe data using a string of IDs
function displayRecipe(idsPar, apiKeyPar) {
  var queryUrl =
    "https://api.spoonacular.com/recipes/informationBulk?ids=" +
    idsPar +
    "&apiKey=" +
    apiKeyPar;

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Empty section first
      spoonaDiv.textContent = "";
      // Display results in 6 bootsrap cards
      for (var i = 0; i < data.length; i++) {
        var link = "./recipe.html?recipe-id=" + data[i].id;
        var recipeTitle = data[i].title;
        var recipeImg = data[i].image;
        var cookingTime = data[i].readyInMinutes;
        var servings = data[i].servings;
        var YtImg;
        isSpoona = true;
        isYT = false;
        createBootstrapCard(
          spoonaDiv,
          link,
          recipeTitle,
          isYT,
          isSpoona,
          YtImg,
          recipeImg,
          cookingTime,
          servings
        );
      }
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
      spoonaDiv.innerHTML =
        "Error fetching recipes. Please try again later.";
    });
}

// Function to display YouTube results
function displayYouTubeResults(searchPar, dietPar, cuisinePar, apiKeyPar) {
  var baseSearchUrl = "https://www.youtube.com/watch?v=";
  var queryURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=" +
    searchPar +
    "+" +
    dietPar +
    "+" +
    cuisinePar +
    "+recipe&key=" +
    apiKeyPar;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // empty YouTube section first
      youTubeDiv.textContent = "";
      // Display results in 6 bootsrap cards
      for (var i = 0; i < data.items.length; i++) {
        var videoId = data.items[i].id.videoId;
        var titleVideo = replaceHtmlEntity(data.items[i].snippet.title);
        var thumbnailImg = data.items[i].snippet.thumbnails.medium.url;
        isSpoona = false;
        isYT = true;
        createBootstrapCard(
          youTubeDiv,
          baseSearchUrl + videoId,
          titleVideo,
          isYT,
          isSpoona,
          thumbnailImg
        );
      }
    });
}

// Function to replace HTML entities in a string for special characters
function replaceHtmlEntity(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'");
}

// Function to create a Bootsrap card
function createBootstrapCard(
  sectionDiv,
  linkPar,
  titlePar,
  isYT,
  isSpoona,
  YtImgPar,
  recipeImgPar,
  cookingTimePar,
  servingsPar
) {
  // Create a col div and append to section div
  var colDiv = document.createElement("div");
  colDiv.setAttribute("class", "col");
  sectionDiv.appendChild(colDiv);
  // create card div element which is a link and set bootsrap class card, append
  var cardDiv = document.createElement("a");
  cardDiv.setAttribute("href", linkPar);
  cardDiv.setAttribute("target", "blank");
  cardDiv.setAttribute(
    "class",
    "card h-100 link-underline link-underline-opacity-0 p-0"
  );
  cardDiv.style.overflow = "hidden";
  colDiv.appendChild(cardDiv);
  if (isYT) {
    // create img element and set class and src, append to card div
    var imgIconEl = document.createElement("div");
    imgIconEl.setAttribute("class", "center-container");
    cardDiv.appendChild(imgIconEl);
    var imgEl = document.createElement("img");
    imgEl.setAttribute("class", "card-img-top");
    imgEl.setAttribute("src", YtImgPar);
    imgEl.setAttribute("alt", "thumbnail");
    imgIconEl.appendChild(imgEl);
    var iconEl = document.createElement("div");
    iconEl.setAttribute("class", "icon-overlay");
    imgIconEl.appendChild(iconEl);
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-brands fa-youtube");
    iconEl.appendChild(icon);
  }
  if (isSpoona) {
    var imgEl = document.createElement("img");
    imgEl.setAttribute("class", "card-img-top custom-width");
    imgEl.setAttribute("src", recipeImgPar);
    imgEl.setAttribute("alt", "recipe-image");
    cardDiv.appendChild(imgEl);
  }
  // Create card body el, set class, append to card div
  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  cardDiv.append(cardBody);
  // Create title el
  var cardTitle = document.createElement("h6");
  cardTitle.setAttribute("class", "card-title text-center");
  cardTitle.textContent = titlePar;
  cardBody.appendChild(cardTitle);
  if (isSpoona) {
    // Footer
    var cardFooter = document.createElement("div");
    cardFooter.setAttribute("class", "card-footer bg-body");
    cardDiv.appendChild(cardFooter);
    var timeIconDiv = document.createElement("div");
    timeIconDiv.setAttribute("class", "position");
    cardFooter.appendChild(timeIconDiv);
    var timeIcon = document.createElement("i");
    timeIcon.setAttribute("class", "fa-solid fa-stopwatch");
    timeIconDiv.appendChild(timeIcon);
    var timeText = document.createElement("span");
    timeText.textContent = " " + cookingTimePar;
    timeIconDiv.appendChild(timeText);
    var servIconDiv = document.createElement("div");
    cardFooter.appendChild(servIconDiv);
    var servingIcon = document.createElement("i");
    servingIcon.setAttribute("class", "fa-solid fa-utensils");
    servIconDiv.setAttribute("class", "position");
    servIconDiv.appendChild(servingIcon);
    var servingText = document.createElement("span");
    servingText.textContent = " " + servingsPar;
    servIconDiv.appendChild(servingText);
  }
}
