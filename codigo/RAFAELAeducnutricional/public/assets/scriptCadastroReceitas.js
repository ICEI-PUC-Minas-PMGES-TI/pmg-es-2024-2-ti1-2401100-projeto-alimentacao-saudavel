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
    const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");
    const clearAllConfirmationModal = document.getElementById("clearAllConfirmationModal");
    const notification = document.getElementById("notification");

    let recipeIndexToDelete = null; 

    const toggleNoRecipesMessage = () => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        noRecipesMessage.style.display = recipes.length === 0 ? "block" : "none";
    };

    const showNotification = (message) => {
        notification.textContent = message;
        notification.classList.remove("hidden");
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 2000);
    };

    addRecipeBtn.addEventListener("click", () => {
        recipeForm.classList.toggle("hidden");
    });

    const loadRecipes = () => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipesList.innerHTML = "";
        recipes.forEach((recipe, index) => {
            const recipeItem = document.createElement("div");
            recipeItem.className = "recipe-item";
            recipeItem.innerHTML = `
                <h3 class="recipe-title">${recipe.name}</h3>
                <p>${recipe.ingredients.join(", ")}</p>
                <div class="details">
                    <p>Calorias: ${recipe.calories} kcal</p>
                    <p>Tempo de Preparo: ${recipe.prepTime} min</p>
                </div>
                <button class="delete-btn" onclick="confirmDeleteRecipe(${index})" title="Excluir Receita">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            recipesList.appendChild(recipeItem);
        });
        toggleNoRecipesMessage();
    };

    const saveRecipe = (recipe) => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        loadRecipes();
        showNotification("Receita adicionada com sucesso!");
    };

    recipeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const recipeName = recipeNameInput.value.trim();
        const recipeIngredients = recipeIngredientsInput.value.trim().split(",");
        const recipeCalories = recipeCaloriesInput.value.trim();
        const recipePrepTime = recipePrepTimeInput.value.trim();

        if (recipeName && recipeIngredients.length > 0 && recipeCalories && recipePrepTime) {
            saveRecipe({
                name: recipeName,
                ingredients: recipeIngredients.map(ing => ing.trim()),
                calories: recipeCalories,
                prepTime: recipePrepTime
            });
            recipeForm.reset();
            recipeForm.classList.add("hidden");
        }
    });

    window.confirmDeleteRecipe = (index) => {
        recipeIndexToDelete = index;
        deleteConfirmationModal.classList.remove("hidden");
    };

    document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
        if (recipeIndexToDelete !== null) {
            const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
            console.log("Receitas antes de excluir:", recipes);
            recipes.splice(recipeIndexToDelete, 1);
            console.log("Receitas depois de excluir:", recipes);
            localStorage.setItem("recipes", JSON.stringify(recipes));
            loadRecipes();
            showNotification("Receita excluída com sucesso!");
            recipeIndexToDelete = null;
        }
        deleteConfirmationModal.classList.add("hidden");
    });
    

    document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
        deleteConfirmationModal.classList.add("hidden");
        recipeIndexToDelete = null;
    });

    clearRecipesBtn.addEventListener("click", () => {
        clearAllConfirmationModal.classList.remove("hidden");
    });

    document.getElementById("confirmClearAllBtn").addEventListener("click", () => {
        localStorage.removeItem("recipes");
        loadRecipes();
        showNotification("Todas as receitas foram excluídas!");
        clearAllConfirmationModal.classList.add("hidden");
    });

    document.getElementById("cancelClearAllBtn").addEventListener("click", () => {
        clearAllConfirmationModal.classList.add("hidden");
    });

    loadRecipes();
});
