var urlParams = new URLSearchParams(window.location.search);
var recipeIdUrl = urlParams.get('recipe-id');
var recipeSection = document.getElementById("recipe-info")
var apiKeySona = "f197b6604aa242d3bf1aa8e74d25e259";
var apiKeyF = "8f932f55cd354bf89c0d697bb2662998";

console.log(recipeIdUrl);

var queryUrlRecipeInfo = "https://api.spoonacular.com/recipes/" + recipeIdUrl + "/information?includeNutrition=false&apiKey=" + apiKeyF;

fetch(queryUrlRecipeInfo)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var recipeTitle = data.title;
        var recipeImg = data.image;
        document.getElementById("recipe-title").textContent = recipeTitle;
        // var recipeImgEl = document.createElement("img");
        // recipeImgEl.setAttribute("src", recipeImg);
        // recipeImgEl.setAttribute("alt", "recipe-image");
        // recipeImgEl.setAttribute("class", "w-100")
        // document.getElementById("image").appendChild(recipeImgEl);
        var card = document.createElement("div");
        card.setAttribute("class", "card w-100");
        document.getElementById("image").appendChild(card);
        var recipeImgEl = document.createElement("img");
        recipeImgEl.setAttribute("src", recipeImg);
        recipeImgEl.setAttribute("alt", "recipe-image");
        recipeImgEl.setAttribute("class", "card-img-top custom-width-recipe");
        card.style.overflow = "hidden";
        card.appendChild(recipeImgEl);
        document.getElementById("ingredients")
        document.getElementById("instructions")
    
        var cookingTime = data.readyInMinutes;
        var servings = data.servings;

        document.getElementById("ingr-header").textContent = "Ingredients";
        document.getElementById("instr-header").textContent = "Instructions";
        for (var i = 0; i < data.extendedIngredients.length; i++){
            var ingredient = data.extendedIngredients[i].original
            var li = document.createElement("li");
            li.textContent = ingredient;
            document.getElementById("ingr-list").appendChild(li);

        }

        for (var i = 0; i < data.analyzedInstructions[0].steps.length; i++){
            var step = data.analyzedInstructions[0].steps[i].step;
            var li = document.createElement("li");
            li.textContent = step;
            document.getElementById("instr-list").appendChild(li);
        }
        
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    })
