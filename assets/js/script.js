// Global variables
var apiKey = "08cce16bdc354b6aa373715c0843bfc8";
var apiKeySona = "f197b6604aa242d3bf1aa8e74d25e259";
var apiKeyS = "5f91a7deb5df4f2db6a1138caa6d3e5f";
var apiKeyF = "8f932f55cd354bf89c0d697bb2662998";
var recipeListContainer = document.getElementById('spoonacular-api');
console.log(recipeListContainer);


// Add event listener when form submitted

document.getElementById('recipe-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    var searchInput = document.getElementById('keyword').value;
    var diet = [];
    var allergies = [];

    var checkedDietary = document.querySelectorAll("input[type='checkbox'][name='dietary']:checked");
    var checkedAllergies = document.querySelectorAll("input[type='checkbox'][name='allergies']:checked");

    checkedDietary.forEach(function(checkbox) {
    diet.push(checkbox.value);
    });
    console.log(diet);

    checkedAllergies.forEach(function (checkbox) {
    var labelFor = checkbox.getAttribute("id");
    if (labelFor) {
    allergies.push(labelFor);
    // check if needs converting to string - checked, it does not

    }
    });
    console.log(allergies);
    
    fetchRecipeId(searchInput, diet, allergies, apiKeyS);

    });


// Function to search by user input, diet and allergies and get recipe ID
function fetchRecipeId (searchPar, dietPar, allergiesPar, apiKeyPar){
    var queryUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchPar + "&number=1&diet=" + dietPar + "&intolerances=" + allergiesPar + "&instructionsRequired=true&apiKey=" + apiKeyPar;
    console.log(queryUrl);
    var recipeId = [];
    fetch(queryUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.results) {
           console.log(data);
           for(var i = 0; i < data.results.length; i++){
                recipeId.push(data.results[i].id)
           }
           console.log(recipeId);
        //    var idsString = recipeId.toString(); //CHECK IF CONVERSION TO STRING NEEDED - IT IS NOT NEEDED
        //    console.log(idsString);
           displayRecipe(recipeId, apiKeyS);

        } else {
            recipeListContainer.innerHTML = 'No recipes found.';
        }
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
        recipeListContainer.innerHTML = 'Error fetching recipes. Please try again later.';
    })
    console.log(recipeId);
    return recipeId;
    
}
    

// Function to display recipe data using a string of IDs
function displayRecipe (idsPar, apiKeyPar){
   
    var queryUrl = "https://api.spoonacular.com/recipes/informationBulk?ids=" + idsPar + "&apiKey=" + apiKeyPar;
    console.log(queryUrl);

    fetch(queryUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
            // empty section first
            recipeListContainer.textContent = "";
            // display image and title in Bootstrap cards
            for (var i = 0; i < data.length; i++){
                var recipeTitle = data[i].title;
                var recipeImg = data[i].image;
                  // create column div
                var colDiv = document.createElement("div");
                colDiv.setAttribute("class", "col");
                recipeListContainer.appendChild(colDiv)
                // create card div element which is a link to an empty page and set bootsrap class card, append
                var cardDiv = document.createElement("a");
                cardDiv.setAttribute("href", `./recipe.html?recipe-id=${data[i].id}`);
                cardDiv.setAttribute("target", "blank");
                cardDiv.setAttribute("class", "card h-100 link-underline link-underline-opacity-0 p-0");
                cardDiv.style.overflow = "hidden";
                colDiv.appendChild(cardDiv);
                // create img element and set class and src, append to card div
                var imgEl = document.createElement("img");
                imgEl.setAttribute("class", "card-img-top custom-width");
                imgEl.setAttribute("src", recipeImg);
                imgEl.setAttribute("alt", "recipe-image");
                cardDiv.appendChild(imgEl);

                // create card body el, set class, append to card div
                var cardBody = document.createElement("div");
                cardBody.setAttribute("class", "card-body");
                cardDiv.append(cardBody);
                // create title el
                var cardTitle = document.createElement("h6");
                cardTitle.setAttribute("class", "card-title");
                cardTitle.textContent = recipeTitle;
                cardBody.appendChild(cardTitle);
                }

                var recipeIngredients = data[0].extendedIngredients[0].original;
                var recipeDescription = data[0].instructions;
        

    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
        recipeListContainer.innerHTML = 'Error fetching recipes. Please try again later.';
    })
}

  
//   fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=${apiKey}`)

//       .then(function(response) {
//           return response.json();
//       })
//       .then(function(data) {
//           if (data.results) {
//               data.results.slice(0, 6).forEach(function(recipe) {
//                   var recipeItem = document.createElement('div');
//                   recipeItem.inne `

//                   <h3>${recipe.title}</h3>
//                   <p>ID: ${recipe.id}</p>
//                   <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; height: auto;">
//               `;rHTML =
//                   recipeListContainer.appendChild(recipeItem);
//               });
//           } else {
//               recipeListContainer.innerHTML = 'No recipes found.';
//           }
//       })
//       .catch(function(error) {
//           console.error('Error fetching data:', error);
//           recipeListContainer.innerHTML = 'Error fetching recipes. Please try again later.';
//       });


