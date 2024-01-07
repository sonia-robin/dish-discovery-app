// Global variables
var apiKey = "08cce16bdc354b6aa373715c0843bfc8";
var apiKeySona = "f197b6604aa242d3bf1aa8e74d25e259"
var recipeListContainer = document.getElementById('spoonacular-api');



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
}
});
console.log(allergies);

var arrayIds = fetchRecipeId(searchInput, diet, allergies, apiKey);
    console.log(arrayIds);
    var idsString = arrayIds.toString();
    console.log(idsString);

    
    displayRecipe(idsString, apiKey);
});

// Function to search recipes by user input and filtres and get recipe ID
function fetchRecipeId (searchPar, dietPar, allergiesPar, apiKeyPar){
    var queryUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchPar + "&number=2&diet=" + dietPar + "&intolerances=" + allergiesPar + "instructionsRequired=true&apiKey=" + apiKeyPar;
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
    
// function convertArrayToString (arr){
//     return arr.toString();
// }

// Function to display recipe data
function displayRecipe (idsPar, apiKeyPar){
    
    var queryUrl = "https://api.spoonacular.com/recipes/informationBulk?ids=" + idsPar + "&apiKey=" + apiKeyPar;
    console.log(queryUrl);

    fetch(queryUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

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
//                   recipeItem.innerHTML = `

//                   <h3>${recipe.title}</h3>
//                   <p>ID: ${recipe.id}</p>
//                   <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; height: auto;">
//               `;
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


