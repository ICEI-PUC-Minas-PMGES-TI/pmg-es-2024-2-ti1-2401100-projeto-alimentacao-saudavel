// dashboard.js

// Função para carregar os dados do JSON
async function loadDashboardData() {
    const response = await fetch('dashboard.json');
    const data = await response.json();
    renderDashboard(data);
  }
  
  // Função principal para renderizar o dashboard
  function renderDashboard(data) {
    // Renderizar as calorias
    renderStats(data.cards[0]);
  
    // Renderizar as refeições feitas hoje
    renderMeals(data.meals);
  
    // Renderizar a dieta atual
    renderCurrentDiet(data.current_diet);
  
    // Renderizar as receitas prontas
    renderRecipes(data.recipes);
  }
  
  // Função para renderizar as calorias (cards - calories, consumed, remaining)
  function renderStats(cards) {
    document.querySelector('.stats-overview .stat-box:nth-child(1) h3').textContent = cards.calories;
    document.querySelector('.stats-overview .stat-box:nth-child(2) h3').textContent = cards.consumed;
    document.querySelector('.stats-overview .stat-box:nth-child(3) h3').textContent = cards.remaining;
  }
  
  // Função para renderizar as refeições feitas hoje (meals - name, items - name, calories)
  function renderMeals(meals) {
    const mealWrapper = document.querySelector('.meals-today .meal-wrapper');
    mealWrapper.innerHTML = ''; // Limpa o conteúdo existente
  
    meals.forEach(meal => {
      const mealDiv = document.createElement('div');
      mealDiv.className = 'meal';
  
      // Título da refeição
      const mealTitle = document.createElement('h3');
      mealTitle.textContent = meal.name;
      mealDiv.appendChild(mealTitle);
  
      // Lista de itens da refeição
      const mealList = document.createElement('ul');
      meal.items.forEach(item => {
        const mealItem = document.createElement('li');
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        mealItem.appendChild(checkbox);
  
        const itemDetails = document.createElement('div');
        const itemName = document.createElement('p');
        itemName.textContent = item.name;
        const itemCalories = document.createElement('p');
        itemCalories.textContent = `${item.calories} kcal`;
  
        itemDetails.appendChild(itemName);
        itemDetails.appendChild(itemCalories);
        mealItem.appendChild(itemDetails);
        mealList.appendChild(mealItem);
      });
      mealDiv.appendChild(mealList);
      mealWrapper.appendChild(mealDiv);
    });
  }
  
  // Função para renderizar a dieta atual (current_diet - name, items - name, calories)
  function renderCurrentDiet(currentDiet) {
    const dietWrapper = document.querySelector('.current-diet .diet-wrapper');
    dietWrapper.innerHTML = ''; // Limpa o conteúdo existente
  
    currentDiet.forEach(diet => {
      const dietDiv = document.createElement('div');
      dietDiv.className = 'diet';
  
      // Título da dieta
      const dietTitle = document.createElement('h3');
      dietTitle.textContent = diet.name;
      dietDiv.appendChild(dietTitle);
  
      // Lista de itens da dieta
      const dietList = document.createElement('ul');
      diet.items.forEach(item => {
        const dietItem = document.createElement('li');
        const itemDetails = document.createElement('div');
        
        const itemName = document.createElement('p');
        itemName.textContent = item.name;
        const itemCalories = document.createElement('p');
        itemCalories.textContent = `${item.calories} kcal`;
  
        itemDetails.appendChild(itemName);
        itemDetails.appendChild(itemCalories);
        dietItem.appendChild(itemDetails);
        dietList.appendChild(dietItem);
      });
      dietDiv.appendChild(dietList);
      dietWrapper.appendChild(dietDiv);
    });
  }
  
  // Função para renderizar as receitas prontas (recipes - name, description, rating)
  function renderRecipes(recipes) {
    const recipeWrapper = document.querySelector('.recipes .recipe-wrapper');
    recipeWrapper.innerHTML = ''; // Limpa o conteúdo existente
  
    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';
  
      const recipeTitle = document.createElement('h3');
      recipeTitle.textContent = recipe.name;
      recipeCard.appendChild(recipeTitle);
  
      const recipeDescription = document.createElement('p');
      recipeDescription.textContent = recipe.description;
      recipeCard.appendChild(recipeDescription);
  
      const ratingDiv = document.createElement('div');
      ratingDiv.className = 'rating';
  
      const starIcon = document.createElement('i');
      starIcon.className = 'uil uil-star';
      ratingDiv.appendChild(starIcon);
  
      const ratingValue = document.createElement('p');
      ratingValue.textContent = recipe.rating;
      ratingDiv.appendChild(ratingValue);
  
      recipeCard.appendChild(ratingDiv);
      recipeWrapper.appendChild(recipeCard);
    });
  }
  
  // Inicializa o dashboard ao carregar a página
  window.addEventListener('DOMContentLoaded', loadDashboardData);
  