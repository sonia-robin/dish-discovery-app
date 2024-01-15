//Selectors
var keywordInput = document.querySelector("#keyword");
var dietaryCheckboxes = document.querySelectorAll("input[name=dietary]");
var cuisineCheckboxes = document.querySelectorAll("input[name=cuisine]");

// // Retrieve saved values from local storage
var savedKeyword = localStorage.getItem("keyword");
var savedDietary = JSON.parse(localStorage.getItem("dietary"));
var savedCuisine = JSON.parse(localStorage.getItem("cuisine"));

// Remember previous keyword input by setting its value
keywordInput.value = savedKeyword;

// Set value of checkboxes based on saved dietary and culinary preferences
dietaryCheckboxes.forEach(function (checkbox) {
  checkbox.checked = savedDietary && savedDietary.includes(checkbox.value);
});

cuisineCheckboxes.forEach(function (checkbox) {
  checkbox.checked = savedCuisine && savedCuisine.includes(checkbox.value);
});

// Function to retrive all input and save to local storage
function saveToLocalStorage() {

  // Get value from input box
  var keywordValue = keywordInput.value;

  // Get checked value from checkboxes
  var dietaryValues = [];
  dietaryCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      dietaryValues.push(checkbox.value);
    }
  });

  var cuisineValues = [];
  cuisineCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      cuisineValues.push(checkbox.value);
    }
  });

  // Save the values to local storage as an object
  var recipeValues = {
    keyword: keywordValue,
    dietary: dietaryValues,
    cuisine: cuisineValues,
  };

  // Create a unique key using the current timestamp
  var timestamp = new Date().getTime();
  var key = "recipe-" + timestamp;

  // Save the recipe values to local storage with the unique key
  localStorage.setItem(key, JSON.stringify(recipeValues));
}

// Function to display all search results in the modal
function displaySearchResults() {
  var modalBody = document.querySelector("#staticBackdrop .modal-body");
  modalBody.innerHTML = ""; // Clear the modal body content

  // Loop through all local storage keys
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);

    // Check if the key starts with "recipe-"
    if (key.indexOf("recipe-") === 0) {
        var recipeValues = JSON.parse(localStorage.getItem(key)); // Retrieve recipe object from local storage

      if (recipeValues) {
        var keywordValue = recipeValues.keyword;
        var dietaryValues = recipeValues.dietary;
        var cuisineValues = recipeValues.cuisine;

        if (!keywordValue) {
          keywordValue = "none";
        }
        if (dietaryValues.length === 0) {
          dietaryValues = ["none"];
        }
        if (cuisineValues.length === 0) {
          cuisineValues = ["none"];
        }

        // Create content for each saved recipe
        var modalContent =
          "<button type='button'>" +
          keywordValue +
          "</button>" +
          "<ul> <li>Dietary Restrictions: " +
          dietaryValues.join(", ") +
          "</li>" +
          "<li>Cuisine: " +
          cuisineValues.join(", ") +
          "</li> </ul>";

        // Append the content to the modal body
        modalBody.innerHTML = modalBody.innerHTML + modalContent;
      }
    }
  }
}

// Event listener to save and display search results
document
  .querySelector("#recipe-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Call the function to save to local storage
    saveToLocalStorage();

    // Call the function to display search results
    displaySearchResults();
  });
