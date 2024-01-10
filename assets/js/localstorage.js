//Selectors
var keywordInput = document.querySelector("#keyword");
var dietaryCheckboxes = document.querySelectorAll("input[name=dietary]");
var cuisineCheckboxes = document.querySelectorAll("input[name=cuisine]");

// Retrieve saved values from local storage
var savedKeyword = localStorage.getItem("keyword");
var savedDietary = JSON.parse(localStorage.getItem("dietary"));
var savedCuisine = JSON.parse(localStorage.getItem("cuisine"));

// Set values
keywordInput.value = savedKeyword;

// ForEach loop to set value of checkboxes
dietaryCheckboxes.forEach(function (checkbox) {
  checkbox.checked = savedDietary && savedDietary.includes(checkbox.value);
});

cuisineCheckboxes.forEach(function (checkbox) {
  checkbox.checked = savedCuisine && savedCuisine.includes(checkbox.value);
});

// Save user input to local storage when the form is submitted
document
  .querySelector("#recipe-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

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

    // Save the values to local storage
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

    // Function to display all search results in the modal
    function displaySearchResults() {
      var modalBody = document.querySelector("#staticBackdrop .modal-body");
      modalBody.innerHTML = ""; // Clear the modal body content

      // Loop through all local storage keys
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);

        // Check if the key starts with "recipe-"
        if (key.indexOf("recipe-") === 0) {
          // Retrieve recipe object from local storage
          var recipeValues = JSON.parse(localStorage.getItem(key));

          if (recipeValues) {
            var keywordValue = recipeValues.keyword;
            var dietaryValues = recipeValues.dietary;
            var cuisineValues = recipeValues.cuisine;

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

    // Call the function to display all search results when the page loads
    displaySearchResults();
  });
