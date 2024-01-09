  var keywordInput = document.querySelector("#keyword");
  var dietaryCheckboxes = document.querySelectorAll("input[name=dietary]");
  var allergiesCheckboxes = document.querySelectorAll("input[name=allergies]");

  // Retrieve saved values from local storage (if any)
  var savedKeyword = localStorage.getItem("keyword");
  var savedDietary = JSON.parse(localStorage.getItem("dietary"));
 var savedAllergies = JSON.parse(localStorage.getItem("allergies"));

  // Restore the saved values to the input elements
  keywordInput.value = savedKeyword;

 
  // Convert NodeList to array for ES5 compatibility
dietaryCheckboxes = Array.from(dietaryCheckboxes);
allergiesCheckboxes = Array.from(allergiesCheckboxes);

// Check and set checkbox values using forEach loop
dietaryCheckboxes.forEach(function(checkbox) {
    checkbox.checked = savedDietary && savedDietary.indexOf(checkbox.value) !== -1;
});

allergiesCheckboxes.forEach(function(checkbox) {
    checkbox.checked = savedAllergies && savedAllergies.indexOf(checkbox.value) !== -1;
});

  // Save user input to local storage when the form is submitted
  document.querySelector("#recipe-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var keywordValue = keywordInput.value;

   
    var dietaryValues = [];
    dietaryCheckboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        dietaryValues.push(checkbox.value);
      }
    });

    var allergiesValues = [];
    allergiesCheckboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        allergiesValues.push(checkbox.value);
      }
    });

    // Save the values to local storage
    localStorage.setItem("keyword", keywordValue);
    localStorage.setItem("dietary", JSON.stringify(dietaryValues));
    localStorage.setItem("allergies", JSON.stringify(allergiesValues));

  });


// Display the search history in modal

 function displaySearchResults() {
     var keywordValue = localStorage.getItem("keyword");
     var dietaryValues = JSON.parse(localStorage.getItem("dietary"));
     var allergiesValues = JSON.parse(localStorage.getItem("allergies"));
  
     var modalBody = document.querySelector("#staticBackdrop .modal-body");
     var modalContent = "<p>Keyword: " + keywordValue + "</p>" +
      "<p>Dietary Restrictions: " + dietaryValues.join(", ") + "</p>" +
      "<p>Allergies: " + allergiesValues.join(", ") + "</p>";
     modalBody.innerHTML = modalContent;
   };
  
  // Call the function to display the initial search results
   displaySearchResults();