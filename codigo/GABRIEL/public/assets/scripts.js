// Função para editar a foto de perfil
function editProfilePicture() {
    document.getElementById("pictureInput").style.display = 'block';
    document.getElementById("savePictureButton").style.display = 'inline-block';
  }
  
  // Função para atualizar a foto de perfil quando o usuário escolher um arquivo
  function updateProfilePicture() {
    const file = document.getElementById("pictureInput").files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Image = e.target.result;
        document.getElementById("profilePicture").style.backgroundImage = `url(${base64Image})`;
        document.getElementById("profilePicture").innerHTML = ''; // Limpa as iniciais
        localStorage.setItem('profilePicture', base64Image); // Salva a imagem em localStorage
      };
      reader.readAsDataURL(file);
    }
  }
  
  // Função para carregar a foto de perfil ao carregar a página
  function loadProfilePicture() {
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
      document.getElementById("profilePicture").style.backgroundImage = `url(${savedImage})`;
      document.getElementById("profilePicture").innerHTML = ''; // Limpa as iniciais
    }
  }
  
  // Função para salvar a foto de perfil
  function saveProfilePicture() {
    document.getElementById("pictureInput").style.display = 'none';
    document.getElementById("savePictureButton").style.display = 'none';
  }
  
  // Funções de editar e salvar nome
  const editNameButton = document.getElementById('editName');
  const nameDisplay = document.getElementById('nameDisplay');
  const saveNameButton = document.getElementById('saveName');
  const nameInput = document.getElementById('nameInput');
  
  if (editNameButton) {
    editNameButton.addEventListener('click', () => {
      nameDisplay.style.display = 'none';
      nameInput.style.display = 'block';
      saveNameButton.style.display = 'inline-block';
    });
  }
  
  if (saveNameButton) {
    saveNameButton.addEventListener('click', () => {
      const newName = nameInput.value.trim();
      if (newName) {
        nameDisplay.textContent = newName;
        nameDisplay.style.display = 'block';
        nameInput.style.display = 'none';
        saveNameButton.style.display = 'none';
      }
    });
  }
  
  // Funções de editar e salvar metas nutricionais
  const editGoalsButton = document.getElementById('editGoals');
  const goalsDisplay = document.getElementById('goalsDisplay');
  const saveGoalsButton = document.getElementById('saveGoals');
  const goalsInput = document.getElementById('goalsInput');
  
  if (editGoalsButton) {
    editGoalsButton.addEventListener('click', () => {
      goalsDisplay.style.display = 'none';
      goalsInput.style.display = 'block';
      saveGoalsButton.style.display = 'inline-block';
    });
  }
  
  if (saveGoalsButton) {
    saveGoalsButton.addEventListener('click', () => {
      const newGoals = goalsInput.value.trim();
      if (newGoals) {
        goalsDisplay.textContent = newGoals;
        goalsDisplay.style.display = 'block';
        goalsInput.style.display = 'none';
        saveGoalsButton.style.display = 'none';
        // Salva as metas nutricionais no localStorage
        localStorage.setItem('userGoals', newGoals);
      }
    });
  }
  
  // Carregar as metas nutricionais salvas do localStorage
  document.addEventListener("DOMContentLoaded", function () {
    const caloriesGoal = localStorage.getItem("caloriesGoal");
    const userGoal = localStorage.getItem("userGoal");
  
    if (caloriesGoal) {
      document.getElementById("caloriesGoal").textContent = caloriesGoal + " kcal";
    }
    if (userGoal) {
      document.getElementById("userGoal").textContent = userGoal;
    }
  
    // Carregar as metas nutricionais do localStorage (se existirem)
    const savedGoals = localStorage.getItem('userGoals');
    if (savedGoals) {
      goalsDisplay.textContent = savedGoals;
      goalsDisplay.style.display = 'block';
      goalsInput.style.display = 'none';
      saveGoalsButton.style.display = 'none';
    }
  });
  
  // Carrega a foto de perfil ao carregar a página
  document.addEventListener('DOMContentLoaded', loadProfilePicture);
  document.getElementById("pictureInput").addEventListener('change', updateProfilePicture);