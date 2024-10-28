// Função para carregar o conteúdo do modal na página, mas não exibi-lo automaticamente
function loadModalContent() {
    fetch('templateModal.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modalContainer').innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o modal:', error));
}

// Função para exibir o modal quando o ícone de notificação é clicado
function showModal() {
    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
    alertModal.show();
}

// Carregar o conteúdo do modal ao inicializar a página, mas sem exibir
document.addEventListener('DOMContentLoaded', () => {
    loadModalContent();

    // Adiciona o evento de clique ao ícone de notificação para exibir o modal
    const notificationIcon = document.querySelector('.bi-bell'); // Seletor do ícone de notificação
    if (notificationIcon) {
        notificationIcon.addEventListener('click', showModal);
    }
});

