function loadAlerts() {
    const savedAlerts = JSON.parse(localStorage.getItem('alerts')) || [
        { text: 'Realize sua refeição de Café da Manhã', type: 'alert-success' },
        { text: 'Verifique a quantidade de calorias', type: 'alert-warning' },
        { text: 'Novo alerta', type: 'alert-info' }
    ];

    const alertContainer = document.querySelector('.modal-body');
    alertContainer.innerHTML = '';

    savedAlerts.forEach((alert, index) => {
        createAlertElement(alert.text, alert.type, index);
    });

    updateAlertCount();
    addAlertEditListeners();
}

function createAlertElement(text, type, index) {
    const alertContainer = document.querySelector('.modal-body');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type} d-flex justify-content-between align-items-center`;
    alertDiv.innerText = text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-danger ms-2';
    deleteButton.innerHTML = '&times;';
    deleteButton.style.fontSize = '14px';

    deleteButton.addEventListener('click', () => {
        deleteAlert(index);
    });

    alertDiv.appendChild(deleteButton);
    alertContainer.appendChild(alertDiv);

    addAlertEditListeners();
}

function deleteAlert(index) {
    const savedAlerts = JSON.parse(localStorage.getItem('alerts')) || [];
    savedAlerts.splice(index, 1);
    localStorage.setItem('alerts', JSON.stringify(savedAlerts));
    loadAlerts();
}

function saveAlerts() {
    const alerts = Array.from(document.querySelectorAll('.modal-body .alert')).map(alert => ({
        text: alert.childNodes[0].nodeValue.trim(),
        type: alert.classList[1]
    }));

    localStorage.setItem('alerts', JSON.stringify(alerts));
    updateAlertCount();
}

function addAlertEditListeners() {
    const alerts = document.querySelectorAll('.modal-body .alert');
    alerts.forEach((alert, index) => {
        alert.addEventListener('click', () => {
            const currentText = alert.childNodes[0].nodeValue.trim();
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.className = 'form-control';

            alert.innerHTML = '';
            alert.appendChild(input);

            input.addEventListener('blur', () => {
                const newText = input.value.trim() || currentText;
                alert.innerHTML = '';
                alert.appendChild(document.createTextNode(newText));
                createDeleteButton(alert, index);
                saveAlerts();
            });

            input.focus();
        });
    });
}

function createDeleteButton(alertElement, index) {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-danger ms-2';
    deleteButton.innerHTML = '&times;';
    deleteButton.style.fontSize = '14px';

    deleteButton.addEventListener('click', () => {
        deleteAlert(index);
    });

    alertElement.appendChild(deleteButton);
}

function addNewAlert() {
    const alertContainer = document.querySelector('.modal-body');
    const newAlert = { text: 'Novo alerta', type: 'alert-info' };
    createAlertElement(newAlert.text, newAlert.type, alertContainer.children.length);
    saveAlerts();
}

function loadModalContent() {
    fetch('templateModal.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modalContainer').innerHTML = data;
            loadAlerts();
            setupModal();
        })
        .catch(error => console.error('Erro ao carregar o modal:', error));
}

function setupModal() {
    const alertModalElement = document.getElementById('alertModal');
    if (alertModalElement) {
        const alertModal = new bootstrap.Modal(alertModalElement);

        const notificationContainer = document.querySelector('.iconesDaNav .nav-link');
        if (notificationContainer) {
            notificationContainer.addEventListener('click', () => {
                alertModal.show();
            });
        }

        const registerAlertButton = document.querySelector('.btn-primary');
        if (registerAlertButton) {
            registerAlertButton.addEventListener('click', addNewAlert);
        }
    }
}

function updateAlertCount() {
    const savedAlerts = JSON.parse(localStorage.getItem('alerts')) || [];
    const alertCountElement = document.getElementById('alertCount');

    if (savedAlerts.length > 0) {
        alertCountElement.innerText = savedAlerts.length;
        alertCountElement.style.display = 'block';
    } else {
        alertCountElement.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', loadModalContent);