// Função para carregar o conteúdo do modal
function loadModal() {
  fetch('templateModal.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('modalContainer').innerHTML = data;
      })
      .catch(error => console.error('Erro ao carregar o modal:', error));
}

// Carregar o modal ao inicializar a página
document.addEventListener('DOMContentLoaded', loadModal);

