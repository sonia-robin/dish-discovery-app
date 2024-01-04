var recipeForm = document.querySelector('#recipe-form');

    recipeForm.addEventListener('submit', function(event) {
      event.preventDefault();

      var keyword = document.querySelector('#keyword').value;
      var dietaryRequirements = [];
      });