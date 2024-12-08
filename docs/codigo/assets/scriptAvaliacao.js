const alimentos = [
    { nome: "Arroz", descricao: "Um alimento básico em muitas culturas.", nota: 4.8 },
    { nome: "Frango", descricao: "Uma excelente fonte de proteína.", nota: 4.6 },
    { nome: "Ovo", descricao: "Rico em proteínas e nutrientes.", nota: 4.6 },
    { nome: "Feijão", descricao: "Fonte de fibras e proteínas.", nota: 4.3 },
    { nome: "Brócolis", descricao: "Uma verdura rica em vitaminas.", nota: 4.1 },
];

const container = document.querySelector('.alimentos-container');

alimentos.forEach(alimento => {
    const card = document.createElement('a');
    card.classList.add('alimento-card');
    card.href = `detalhes.html?nome=${encodeURIComponent(alimento.nome)}`;
    card.innerHTML = `
        <h3>${alimento.nome}</h3>
        <p>${alimento.descricao}</p>
        <span class="nota">${alimento.nota} ${'⭐'.repeat(Math.round(alimento.nota))}</span>
    `;
    container.appendChild(card);
});
