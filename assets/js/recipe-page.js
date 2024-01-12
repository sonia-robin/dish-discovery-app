var urlParams = new URLSearchParams(window.location.search);
var recipeIdUrl = urlParams.get("recipe-id");
var recipeSection = document.querySelector("#recipe-info")
var apiKey = "08cce16bdc354b6aa373715c0843bfc8";

var queryUrlRecipeInfo = "https://api.spoonacular.com/recipes/" + recipeIdUrl + "/information?includeNutrition=false&apiKey=" + apiKey;

fetch(queryUrlRecipeInfo)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // display title, cooking time and servings
        var recipeTitle = data.title;
        var cookingTime = data.readyInMinutes;
        var servings = data.servings;
        document.querySelector("#recipe-title").textContent = recipeTitle;
        document.querySelector("#cooking-time").innerHTML = "<i class = 'fa-solid fa-stopwatch'></i> Ready in " + cookingTime + "mins";
        document.querySelector("#servings").innerHTML = "<i class = 'fa-solid fa-utensils'></i> Serves " + servings;
        // display recipe image in a card
        var card = document.createElement("div");
        card.setAttribute("class", "card w-100");
        document.querySelector("#image").appendChild(card);
        var recipeImg = data.image;
        var recipeImgEl = document.createElement("img");
        recipeImgEl.setAttribute("src", recipeImg);
        recipeImgEl.setAttribute("alt", "recipe-image");
        recipeImgEl.setAttribute("class", "card-img-top custom-width-recipe");
        card.style.overflow = "hidden";
        card.appendChild(recipeImgEl);
        // display ingredients and instructions
        document.querySelector("#ingr-header").textContent = "Ingredients";
        document.querySelector("#instr-header").textContent = "Instructions";
        for (var i = 0; i < data.extendedIngredients.length; i++){
            var ingredient = data.extendedIngredients[i].original
            var li = document.createElement("li");
            li.textContent = ingredient;
            document.querySelector("#ingr-list").appendChild(li);
        }
        for (var i = 0; i < data.analyzedInstructions[0].steps.length; i++){
            var step = data.analyzedInstructions[0].steps[i].step;
            var li = document.createElement("li");
            li.textContent = step;
            document.querySelector("#instr-list").appendChild(li);
        }
        
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    })
