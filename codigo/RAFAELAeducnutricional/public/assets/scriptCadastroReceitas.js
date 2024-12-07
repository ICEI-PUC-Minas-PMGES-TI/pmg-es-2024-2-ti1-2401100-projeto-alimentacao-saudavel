document.addEventListener("DOMContentLoaded", () => {
    const addRecipeBtn = document.getElementById("addRecipeBtn");
    const clearRecipesBtn = document.getElementById("clearRecipesBtn");
    const recipeForm = document.getElementById("recipeForm");
    const recipeNameInput = document.getElementById("recipeName");
    const recipeIngredientsInput = document.getElementById("recipeIngredients");
    const recipeCaloriesInput = document.getElementById("recipeCalories");
    const recipePrepTimeInput = document.getElementById("recipePrepTime");
    const recipesList = document.getElementById("recipesList");
    const noRecipesMessage = document.getElementById("noRecipesMessage");

    // Atualiza a mensagem "Nenhuma receita"
    const toggleNoRecipesMessage = () => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        noRecipesMessage.style.display = recipes.length === 0 ? "block" : "none";
    };

    // Carrega receitas do localStorage
    const loadRecipes = () => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipesList.innerHTML = ""; // Limpa a lista antes de recarregar

        recipes.forEach((recipe, index) => {
            const recipeItem = document.createElement("div");
            recipeItem.className = "recipe-item";
            recipeItem.innerHTML = `
                <h3 class="recipe-title">${recipe.name}</h3>
                <p>Ingredientes: ${recipe.ingredients.join(", ")}</p>
                <div class="details">
                    <p>Calorias: ${recipe.calories} kcal</p>
                    <p>Tempo de Preparo: ${recipe.prepTime} min</p>
                </div>
                <button class="delete-btn" data-index="${index}" title="Excluir Receita">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            `;

            // Adiciona evento ao botão de exclusão
            recipeItem.querySelector(".delete-btn").addEventListener("click", () => {
                deleteRecipe(index);
            });

            recipesList.appendChild(recipeItem);
        });

        toggleNoRecipesMessage();
    };

    // Salva nova receita no localStorage
    const saveRecipe = (recipe) => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        loadRecipes();
        alert("Receita adicionada com sucesso!");
    };

    // Exclui receita pelo índice
    const deleteRecipe = (index) => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        if (index >= 0 && index < recipes.length) {
            recipes.splice(index, 1); // Remove a receita pelo índice
            localStorage.setItem("recipes", JSON.stringify(recipes));
            loadRecipes(); // Recarrega a lista
            alert("Receita excluída com sucesso!");
        } else {
            console.error("Índice inválido para exclusão:", index);
        }
    };

    // Limpa todas as receitas
    clearRecipesBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir todas as receitas?")) {
            localStorage.removeItem("recipes");
            loadRecipes();
            alert("Todas as receitas foram removidas!");
        }
    });

    // Evento do formulário para adicionar receita
    recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const recipeName = recipeNameInput.value.trim();
        const recipeIngredients = recipeIngredientsInput.value.trim().split(",");
        const recipeCalories = recipeCaloriesInput.value.trim();
        const recipePrepTime = recipePrepTimeInput.value.trim();

        if (recipeName && recipeIngredients.length > 0 && recipeCalories && recipePrepTime) {
            saveRecipe({
                name: recipeName,
                ingredients: recipeIngredients.map((ing) => ing.trim()),
                calories: recipeCalories,
                prepTime: recipePrepTime,
            });
            recipeForm.reset();
            recipeForm.classList.add("hidden");
        }
    });

    // Exibe/oculta o formulário
    addRecipeBtn.addEventListener("click", () => {
        recipeForm.classList.toggle("hidden");
    });

    // Carrega as receitas ao iniciar a página
    loadRecipes();
});
