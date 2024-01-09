var urlParams = new URLSearchParams(window.location.search);
var recipeIdUrl = urlParams.get('recipe-id');
var recipeSection = document.getElementById("recipe-info")
var apiKeySona = "f197b6604aa242d3bf1aa8e74d25e259";

console.log(recipeIdUrl);

var queryUrlRecipeInfo = "https://api.spoonacular.com/recipes/" + recipeIdUrl + "/information?includeNutrition=false&apiKey=" + apiKeySona;

fetch(queryUrlRecipeInfo)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var recipeInstructions = data.instructions;
        console.log(recipeInstructions);
        var parser = new DOMParser();
        var document = parser.parseFromString(recipeInstructions, "text/html");
        console.log(document);
        var content = document.querySelector("ol").innerHTML;
        recipeSection.innerHTML = content;

    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    })
