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

  // Renderizar os gráficos
  renderGraphs(data.graphs[0]);
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

// Função para renderizar os gráficos
function renderGraphs(graphs) {
  // Gráfico de Nutrientes
  const nutrientsContainer = document.querySelector('.nutrients-graph');
  nutrientsContainer.innerHTML = ''; // Limpa o conteúdo existente

  graphs.nutrients.forEach((nutrient) => {
      const nutrientCanvas = document.createElement('canvas');
      const nutrientDiv = document.createElement('div');
      nutrientDiv.textContent = nutrient.label;
      nutrientDiv.className = 'nutrients-label';
      nutrientsContainer.appendChild(nutrientDiv);
      nutrientsContainer.appendChild(nutrientCanvas);

      new Chart(nutrientCanvas, {
          type: 'doughnut',
          data: {
              labels: [nutrient.label],
              datasets: [
                  {
                      data: [nutrient.value, 100 - nutrient.value],
                      backgroundColor: [nutrient.color, '#EFEFEF'],
                      hoverBackgroundColor: [nutrient.color, '#EFEFEFAA'],
                  },
              ],
          },
          options: {
              plugins: {
                  legend: {
                      display: false,
                  },
                  tooltip: {
                      callbacks: {
                          label: function (context) {
                              return `${context.label}: ${context.raw}%`;
                          },
                      },
                  },
              },
              responsive: true,
              cutout: '70%',
          },
      });

      const centerText = document.createElement('p');
      centerText.className = 'center-text';
      centerText.textContent = `${nutrient.value}%`;
      nutrientCanvas.parentNode.appendChild(centerText);
  });

  // Gráfico de Calorias (linha)
  const caloriesCtx = document.querySelector('.calories-graph').appendChild(document.createElement('canvas'));

  new Chart(caloriesCtx, {
      type: 'line',
      data: {
          labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          datasets: [
              {
                  label: 'Calorias consumidas',
                  data: graphs.calories, // Usando os dados dinâmicos de calorias
                  borderColor: '#36A2EB',
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  tension: 0.4,
                  fill: true,
              },
          ],
      },
      options: {
          plugins: {
              legend: {
                  display: true,
                  position: 'top',
              },
          },
          responsive: true,
          scales: {
              x: {
                  title: {
                      display: false,
                  },
                  grid: {
                      display: false,
                  },
              },
              y: {
                  title: {
                      display: false,
                  },
                  grid: {
                      display: false,
                  },
                  beginAtZero: true,
              },
          },
      },
  });
}

// Inicializa o dashboard ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  loadDashboardData(); // Carrega os dados
});
