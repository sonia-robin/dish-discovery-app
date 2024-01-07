var recipeForm = document.querySelector('#recipe-form');

    recipeForm.addEventListener('submit', function(event) {
      event.preventDefault();

      var keyword = document.querySelector('#keyword').value;
      var dietaryRequirements = [];
      });

      var recipeForm = document.querySelector('#recipe-form');

    recipeForm.addEventListener('submit', function(event) {
      event.preventDefault();

      var keyword = document.querySelector('#keyword').value;
      var dietaryRequirements = [];
      });

document.getElementById('recipe-form').addEventListener('submit', function (event) {
  event.preventDefault(); 

  var apiKey = "08cce16bdc354b6aa373715c0843bfc8";
  var searchInput = document.getElementById('keyword').value;
  var recipeListContainer = document.getElementById('recipe-List');

  var queryurl = "https://api.spoonacular.com/recipes/complexSearch?query=" + "pasa" + "&apiKey=" + apiKey


  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=${apiKey}`)

      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          if (data.results) {
              data.results.slice(0, 6).forEach(function(recipe) {
                  var recipeItem = document.createElement('div');
                  recipeItem.innerHTML = `
                      <h3>${recipe.title}</h3>
                      <p>${recipe.summary}</p>
                      <p>Ready in ${recipe.readyInMinutes} minutes</p>
                      <hr>
                  `;
                  recipeListContainer.appendChild(recipeItem);
              });
          } else {
              recipeListContainer.innerHTML = 'No recipes found.';
          }
      })
      .catch(function(error) {
          console.error('Error fetching data:', error);
          recipeListContainer.innerHTML = 'Error fetching recipes. Please try again later.';
      });
});

