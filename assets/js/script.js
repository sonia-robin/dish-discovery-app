document.getElementById('recipe-form').addEventListener('submit', function (event) {
  event.preventDefault(); 

  var apiKey = "08cce16bdc354b6aa373715c0843bfc8";
  var searchInput = document.getElementById('keyword').value;
  var recipeListContainer = document.getElementById('recipe-List');

  var queryurl = "https://api.spoonacular.com/recipes/complexSearch?query=" + "pasta" + "&apiKey=" + apiKey

  console.log(queryurl);

  console.log("Hi");

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
                  <p>ID: ${recipe.id}</p>
                  <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; height: auto;">
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

